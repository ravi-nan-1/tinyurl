'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';

const shortenUrlSchema = z.object({
  url: z.string().url({ message: 'Please enter a valid URL.' }),
  alias: z
    .string()
    .min(3, { message: 'Alias must be at least 3 characters.' })
    .max(20, { message: 'Alias must be at most 20 characters.' })
    .regex(/^[a-zA-Z0-9_-]+$/, {
      message: 'Alias can only contain letters, numbers, hyphens, and underscores.',
    })
    .optional()
    .or(z.literal('')),
  expiresAt: z.date().optional(),
});


export type ShortenUrlState = {
  error?: { [key: string]: string[] } | null;
  message?: string | null;
  link?: {
    id: string;
    shortUrl: string;
    originalUrl: string;
    createdAt: string;
  } | null;
};


function generateRandomAlias(length = 6) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let alias = '';
  for (let i = 0; i < length; i++) {
    alias += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return alias;
}

export async function shortenUrl(prevState: any, formData: FormData): Promise<ShortenUrlState> {
  const rawFormData = Object.fromEntries(formData.entries());
  
  const expiresAt = rawFormData.expiresAt ? new Date(rawFormData.expiresAt as string) : undefined;

  const validatedFields = shortenUrlSchema.safeParse({
    url: rawFormData.url,
    alias: rawFormData.alias,
    expiresAt,
  });
  
  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { url, alias } = validatedFields.data;
  
  const finalAlias = alias || generateRandomAlias();

  // In a real app without a DB, we'd check against a client-side store,
  // but that check needs to happen on the client. Here we just create the link.
  // The client store will handle checking for duplicates if needed.

  const newLink = {
    id: finalAlias,
    originalUrl: url,
    shortUrl: `/${finalAlias}`, // Relative URL
    createdAt: new Date().toISOString(),
  };

  revalidatePath('/dashboard');
  
  return {
    message: 'Link shortened successfully!',
    link: newLink,
  };
}
