import { getLinkById } from '@/lib/data';
import { notFound, redirect } from 'next/navigation';

type RedirectPageProps = {
  params: {
    shortId: string;
  };
};

export default async function RedirectPage({ params }: RedirectPageProps) {
  const { shortId } = params;
  const link = await getLinkById(shortId);

  if (!link) {
    notFound();
  }

  // Check for expiration
  if (link.expiresAt && new Date(link.expiresAt) < new Date()) {
    // You could redirect to a specific "expired link" page
    // for now, we'll just show not found
    notFound();
  }

  // In a real app, you would log analytics here.
  // For example, you'd get the user's IP, user-agent, and referrer from the request headers.

  redirect(link.originalUrl);

  return null; // This component will not render anything
}
