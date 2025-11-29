'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Pie, PieChart, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import type { ClickAnalytic } from '@/lib/data';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

function aggregateData(data: ClickAnalytic[], key: keyof ClickAnalytic) {
  const counts = data.reduce((acc, item) => {
    const value = item[key] as string;
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(counts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5); // Top 5
}

const chartConfig = {
  value: { label: 'Clicks' },
  Chrome: { label: 'Chrome', color: 'hsl(var(--chart-1))' },
  Safari: { label: 'Safari', color: 'hsl(var(--chart-2))' },
  Firefox: { label: 'Firefox', color: 'hsl(var(--chart-3))' },
  Edge: { label: 'Edge', color: 'hsl(var(--chart-4))' },
  Brave: { label: 'Brave', color: 'hsl(var(--chart-5))' },
  Desktop: { label: 'Desktop', color: 'hsl(var(--chart-1))' },
  Mobile: { label: 'Mobile', color: 'hsl(var(--chart-2))' },
  Tablet: { label: 'Tablet', color: 'hsl(var(--chart-3))' },
};

export function AnalyticsCharts({ data }: { data: ClickAnalytic[] }) {
  const referrerData = aggregateData(data, 'referrer');
  const browserData = aggregateData(data, 'browser');
  const countryData = aggregateData(data, 'country');
  const deviceData = aggregateData(data, 'device');

  const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Top Referrers</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={referrerData} layout="vertical" margin={{ right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={80} />
                <ChartTooltip
                  cursor={{ fill: 'hsl(var(--accent) / 0.1)' }}
                  content={<ChartTooltipContent />}
                />
                <Bar dataKey="value" fill="hsl(var(--primary))" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Devices</CardTitle>
        </CardHeader>
        <CardContent>
           <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
                  <Pie data={deviceData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                     {deviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                   <ChartLegend content={<ChartLegendContent nameKey="name" />} />
                </PieChart>
              </ResponsiveContainer>
           </ChartContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Top Countries</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={countryData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip
                  cursor={{ fill: 'hsl(var(--accent) / 0.1)' }}
                  content={<ChartTooltipContent />}
                />
                <Bar dataKey="value" fill="hsl(var(--primary))" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Top Browsers</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={browserData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip
                  cursor={{ fill: 'hsl(var(--accent) / 0.1)' }}
                  content={<ChartTooltipContent />}
                />
                <Bar dataKey="value" fill="hsl(var(--primary))" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

    </div>
  );
}


export function RecentClicksTable({ data }: { data: ClickAnalytic[] }) {
    const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Timestamp</TableHead>
          <TableHead>Country</TableHead>
          <TableHead>Browser</TableHead>
          <TableHead>Device</TableHead>
          <TableHead>Referrer</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((click) => (
          <TableRow key={click.id}>
            <TableCell>{formatDate(click.timestamp)}</TableCell>
            <TableCell>{click.country}</TableCell>
            <TableCell>{click.browser}</TableCell>
            <TableCell>{click.device}</TableCell>
            <TableCell>{click.referrer}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
