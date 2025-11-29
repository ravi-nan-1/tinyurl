import { getLinks } from '@/lib/data';
import { UrlTable } from '@/components/dashboard/url-table';

export const metadata = {
  title: 'Dashboard',
  description: 'Manage your shortened URLs.',
};

export default async function DashboardPage() {
  const links = await getLinks();

  return (
    <div className="flex h-full min-h-full flex-col">
      <header className="border-b bg-background/50 p-4 backdrop-blur-sm sm:p-6">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          View and manage all your shortened URLs.
        </p>
      </header>
      <main className="flex-1 p-4 sm:p-6">
        <UrlTable data={links} />
      </main>
    </div>
  );
}
