'use client';

import { useEffect } from 'react';
import { useUrlStore } from '@/lib/store';
import { notFound, useParams } from 'next/navigation';
import { Icons } from '@/components/icons';
import { useRouter } from 'next/navigation';

export default function RedirectPage() {
  const { shortId } = useParams() as { shortId: string };
  const links = useUrlStore((state) => state.links);
  const router = useRouter();

  useEffect(() => {
    if (shortId) {
      const link = links.find((l) => l.id === shortId);
      if (link) {
        // In a real app, you would log analytics here.
        window.location.href = link.originalUrl;
      } else {
        // Wait a moment to see if store is hydrating, then redirect to not found.
        const timer = setTimeout(() => {
            router.push('/not-found');
        }, 1000); 
        return () => clearTimeout(timer);
      }
    }
  }, [shortId, links, router]);

  // We can show a loading/redirecting message
  return (
    <div className="flex h-screen w-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
            <Icons.logo className="h-12 w-12 animate-spin text-primary" />
            <p className="text-muted-foreground">Redirecting...</p>
        </div>
    </div>
  );
}
