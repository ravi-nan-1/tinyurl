import { getLinkById, getAnalyticsByLinkId, type ClickAnalytic, type Link as LinkType } from '@/lib/data';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BarChart2, Globe, MousePointerClick, Smartphone, User, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AnalyticsCharts, RecentClicksTable } from '@/components/dashboard/analytics-charts';

type AnalyticsPageProps = {
  params: {
    shortId: string;
  };
};

function getUniqueCount(data: ClickAnalytic[], key: keyof ClickAnalytic) {
  return new Set(data.map(item => item[key])).size;
}

export async function generateMetadata({ params }: AnalyticsPageProps) {
  const link = await getLinkById(params.shortId);
  if (!link) {
    return { title: 'Analytics Not Found' };
  }
  return {
    title: `Analytics for ${link.shortUrl}`,
    description: `Detailed click analytics for the short link ${link.shortUrl}.`,
  };
}

export default async function AnalyticsPage({ params }: AnalyticsPageProps) {
  const link = await getLinkById(params.shortId);
  if (!link) {
    notFound();
  }
  const analytics = await getAnalyticsByLinkId(params.shortId);

  const totalClicks = analytics.length;
  const uniqueCountries = getUniqueCount(analytics, 'country');
  const uniqueReferrers = getUniqueCount(analytics, 'referrer');
  const uniqueBrowsers = getUniqueCount(analytics, 'browser');

  return (
    <div className="flex h-full min-h-full flex-col">
      <header className="flex items-center gap-4 border-b bg-background/50 p-4 backdrop-blur-sm sm:p-6">
        <Button variant="outline" size="icon" className="h-8 w-8" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to Dashboard</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
          <p className="font-mono text-sm text-muted-foreground">{link.shortUrl}</p>
        </div>
      </header>
      <main className="flex-1 space-y-6 p-4 sm:p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
              <MousePointerClick className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalClicks.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">All-time clicks on this link</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Countries</CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{uniqueCountries}</div>
              <p className="text-xs text-muted-foreground">Clicks from across the globe</p>
            </CardContent>
          </Card>
           <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Referrers</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{uniqueReferrers}</div>
              <p className="text-xs text-muted-foreground">Unique traffic sources</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Browsers</CardTitle>
              <Smartphone className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{uniqueBrowsers}</div>
              <p className="text-xs text-muted-foreground">Different browsers used</p>
            </CardContent>
          </Card>
        </div>
        
        <AnalyticsCharts data={analytics} />

        <Card>
          <CardHeader>
            <CardTitle>Recent Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentClicksTable data={analytics.slice(0, 10)} />
          </CardContent>
        </Card>

      </main>
    </div>
  );
}
