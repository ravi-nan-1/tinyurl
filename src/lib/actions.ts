'use server';

import { z } from 'zod';
import { detectMaliciousUrl } from '@/ai/flows/detect-malicious-urls';
import { revalidatePath } from 'next/cache';
import { links } from './data';

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

function generateRandomAlias(length = 6) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let alias = '';
  for (let i = 0; i < length; i++) {
    alias += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return alias;
}

export async function shortenUrl(prevState: any, formData: FormData) {
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
      message: null,
      shortUrl: null,
    };
  }

  const { url, alias, expiresAt: expirationDate } = validatedFields.data;

  // GenAI Spam Protection
  try {
    const maliciousCheck = await detectMaliciousUrl({
      url,
      userActivity: 'User submitted this URL to be shortened.',
    });
    if (maliciousCheck.isMalicious) {
      return {
        error: null,
        message: `This URL is blocked for security reasons: ${maliciousCheck.reason}`,
        shortUrl: null,
      };
    }
  } catch (error) {
    console.error('AI check failed:', error);
    // Decide if you want to block or allow if the AI check fails.
    // For this example, we'll allow it but log the error.
  }

  const finalAlias = alias || generateRandomAlias();

  // Check if alias already exists
  if (links.some(link => link.id === finalAlias)) {
    return {
      error: { alias: ['This custom alias is already taken.'] },
      message: null,
      shortUrl: null,
    };
  }

  const newLink = {
    id: finalAlias,
    originalUrl: url,
    shortUrl: `lf.run/${finalAlias}`,
    createdAt: new Date().toISOString(),
    expiresAt: expirationDate ? expirationDate.toISOString() : null,
    clicks: 0,
  };

  // In a real app, you'd save this to your database.
  // Here, we're just pushing to a mock array.
  links.unshift(newLink);

  revalidatePath('/dashboard');
  
  return {
    error: null,
    message: 'Link shortened successfully!',
    shortUrl: newLink.shortUrl,
  };
}

export async function deleteLink(id: string) {
    // In a real app, delete from DB
    const index = links.findIndex(link => link.id === id);
    if(index > -1) {
        links.splice(index, 1);
    }
    revalidatePath('/dashboard');
    return { message: 'Link deleted successfully.' };
}

export async function updateLink(id: string, newAlias: string) {
    // In a real app, update in DB
    if (links.some(link => link.id === newAlias && newAlias !== id)) {
        return { error: 'This custom alias is already taken.' };
    }
    const link = links.find(link => link.id === id);
    if (link) {
        link.id = newAlias;
        link.shortUrl = `lf.run/${newAlias}`;
    }
    revalidatePath('/dashboard');
    revalidatePath(`/dashboard/${id}`);
    revalidatePath(`/dashboard/${newAlias}`);
    return { message: 'Link updated successfully.' };
}
