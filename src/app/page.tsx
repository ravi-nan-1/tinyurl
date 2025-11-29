import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { UrlShortenerForm } from '@/components/url-shortener-form';
import { Icons } from '@/components/icons';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          <Link href="/" className="flex items-center gap-2">
            <Icons.logo className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold tracking-tight">LinkForge</span>
          </Link>
          <nav>
            <Button asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
          <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
            <h1 className="font-headline text-3xl font-extrabold tracking-tighter sm:text-5xl lg:text-6xl">
              Shorten, Share, and Track Your Links
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              A powerful and easy-to-use URL shortener with advanced analytics,
              custom aliases, and robust security features.
            </p>
            <div className="w-full max-w-2xl pt-8">
              <UrlShortenerForm />
            </div>
          </div>
        </section>
      </main>
      <footer className="py-6 md:px-8 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built with passion by a Senior Engineer.
          </p>
        </div>
      </footer>
    </div>
  );
}
