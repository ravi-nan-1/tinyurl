export type Link = {
  id: string;
  originalUrl: string;
  shortUrl: string;
  createdAt: string;
  expiresAt: string | null;
  clicks: number;
};

export type ClickAnalytic = {
  id: string;
  linkId: string;
  timestamp: string;
  country: string;
  browser: string;
  device: 'Desktop' | 'Mobile' | 'Tablet';
  referrer: string;
};

export const links: Link[] = [
  {
    id: 'product-hunt',
    originalUrl: 'https://www.producthunt.com/',
    shortUrl: 'lf.run/product-hunt',
    createdAt: '2024-07-20T10:00:00Z',
    expiresAt: null,
    clicks: 1204,
  },
  {
    id: 'google',
    originalUrl: 'https://www.google.com/',
    shortUrl: 'lf.run/google',
    createdAt: '2024-07-19T14:30:00Z',
    expiresAt: '2024-08-19T14:30:00Z',
    clicks: 752,
  },
  {
    id: 'github-repo',
    originalUrl: 'https://github.com/facebook/react',
    shortUrl: 'lf.run/github-repo',
    createdAt: '2024-07-18T09:00:00Z',
    expiresAt: null,
    clicks: 301,
  },
  {
    id: 'my-blog',
    originalUrl: 'https://vercel.com/blog',
    shortUrl: 'lf.run/my-blog',
    createdAt: '2024-07-15T18:45:00Z',
    expiresAt: null,
    clicks: 88,
  },
];

export const analytics: ClickAnalytic[] = [
  // Analytics for product-hunt
  ...Array.from({ length: 1204 }).map((_, i) => ({
    id: `ph-${i}`,
    linkId: 'product-hunt',
    timestamp: new Date(Date.now() - i * 3600000).toISOString(),
    country: ['USA', 'India', 'Germany', 'UK', 'Canada'][i % 5],
    browser: ['Chrome', 'Safari', 'Firefox', 'Edge'][i % 4],
    device: (['Desktop', 'Mobile', 'Tablet'] as const)[i % 3],
    referrer: ['producthunt.com', 'google.com', 'twitter.com', 'Direct'][i % 4],
  })),
  // Analytics for google
  ...Array.from({ length: 752 }).map((_, i) => ({
    id: `ggl-${i}`,
    linkId: 'google',
    timestamp: new Date(Date.now() - i * 7200000).toISOString(),
    country: ['Brazil', 'USA', 'Japan', 'Nigeria'][i % 4],
    browser: ['Chrome', 'Safari', 'Firefox'][i % 3],
    device: (['Mobile', 'Desktop'] as const)[i % 2],
    referrer: ['google.com', 'Direct', 'bing.com'][i % 3],
  })),
  // Analytics for github-repo
  ...Array.from({ length: 301 }).map((_, i) => ({
    id: `gh-${i}`,
    linkId: 'github-repo',
    timestamp: new Date(Date.now() - i * 86400000).toISOString(),
    country: ['USA', 'Germany', 'India', 'China'][i % 4],
    browser: ['Chrome', 'Firefox', 'Edge', 'Brave'][i % 4],
    device: (['Desktop'] as const)[0],
    referrer: ['github.com', 'Direct', 'dev.to'][i % 3],
  })),
    // Analytics for my-blog
    ...Array.from({ length: 88 }).map((_, i) => ({
    id: `blog-${i}`,
    linkId: 'my-blog',
    timestamp: new Date(Date.now() - i * 2 * 86400000).toISOString(),
    country: ['USA', 'UK', 'Australia'][i % 3],
    browser: ['Chrome', 'Safari'][i % 2],
    device: (['Mobile', 'Desktop'] as const)[i % 2],
    referrer: ['twitter.com', 'Direct', 'linkedin.com'][i % 3],
  })),
];

export const getLinks = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return links;
};

export const getLinkById = async (id: string) => {
    // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));
  return links.find(link => link.id === id);
}

export const getAnalyticsByLinkId = async (linkId: string) => {
    // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  return analytics.filter(analytic => analytic.linkId === linkId);
}
