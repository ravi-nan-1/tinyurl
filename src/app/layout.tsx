import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const APP_NAME = 'TinyUrl';
const APP_DESCRIPTION = 'Shorten long links fast with our secure URL shortener. Track clicks, generate QR codes, and manage URLs easily. 100% free.';

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: `Best URL Shortener Tool | Create Custom Short URLs Fast`,
    template: `%s | ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: APP_NAME,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: APP_NAME,
    title: {
      default: 'Best URL Shortener Tool | Create Custom Short URLs Fast',
      template: `%s | ${APP_NAME}`,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: 'summary',
    title: {
      default: 'Best URL Shortener Tool | Create Custom Short URLs Fast',
      template: `%s | ${APP_NAME}`,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: '#4B0082',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('flex min-h-screen flex-col bg-background font-sans antialiased', inter.variable)}>
        <header className="container z-40 bg-background">
          <div className="flex h-20 items-center justify-between py-6">
            <Link href="/" className="flex items-center gap-2">
              <Icons.logo className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold tracking-tight">TinyUrl</span>
            </Link>
            <nav>
              <Button asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t py-6 md:px-8 md:py-8">
          <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} TinyUrl. A part of All2ools.com
            </p>
            <div className="flex items-center gap-4">
               <Link href="/about" className="text-sm text-muted-foreground hover:text-primary">About Us</Link>
               <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">Contact</Link>
               <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</Link>
               <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary">Terms of Use</Link>
            </div>
          </div>
        </footer>
        <Toaster />
      </body>
    </html>
  );
}
