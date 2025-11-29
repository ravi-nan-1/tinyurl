import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { UrlShortenerForm } from '@/components/url-shortener-form';
import { Icons } from '@/components/icons';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { CheckCircle } from 'lucide-react';

const faqItems = {
  "General FAQ": [
    { q: "What is a URL shortener?", a: "A URL shortener is a tool that converts a long URL into a shorter, more manageable link that redirects to the original page. It's great for sharing and tracking." },
    { q: "How does a URL shortener work?", a: "When you enter a long URL, our service generates a unique, shorter alias and stores the original link. When someone clicks the short link, they are instantly redirected to the long URL." },
    { q: "Is this URL shortener free to use?", a: "Yes, our core service is 100% free. You can create short links, generate QR codes, and track basic analytics without any cost or registration." },
    { q: "Do short URLs expire?", a: "By default, our short links never expire. You have the option to set an expiration date when you create a link for time-sensitive campaigns." },
    { q: "Can I track clicks on my short link?", a: "Absolutely. We provide real-time analytics for every short link, including the number of clicks, referrer source, device type, browser, and country." },
    { q: "Are short links safe?", a: "Yes. We use advanced spam protection and block malicious URLs to ensure all links are safe for users. We prioritize security to provide a reliable link minimizer service." },
    { q: "Can I create a custom alias?", a: "Yes, our custom URL shortener feature allows you to create a personalized, branded short link (also known as a vanity URL) to improve brand recognition and trust." },
  ],
  "Technical FAQ": [
    { q: "Do you store original URLs?", a: "Yes, we securely store the original URL to perform the redirect. Your data privacy is important to us." },
    { q: "What types of links are banned?", a: "We prohibit links to fraudulent, malicious, phishing, or illegal content. Our system actively scans for spam URLs to protect users." },
    { q: "What is a 301 redirect?", a: "We use permanent 301 redirects, which are the most SEO-friendly type of redirect. This tells search engines that the short link has permanently moved to the original URL." },
    { q: "Does it support UTM parameters?", a: "Yes, you can add UTM parameters to your long URL before shortening it. Our system will correctly redirect and preserve them, allowing you to track campaigns in tools like Google Analytics." },
  ],
  "Marketing FAQ": [
    { q: "Does a short URL increase CTR?", a: "Yes, clean, branded short links appear more trustworthy and are easier to share, which can significantly boost your click-through rate (CTR) in emails, social media, and ads." },
    { q: "Is link shortening good for SEO?", a: "When done with 301 redirects, link shortening is perfectly safe for SEO. It helps create clean, manageable URLs without harming your search rankings." },
    { q: "Does it hide affiliate links?", a: "Yes, you can use our tool to cloak or hide long, unattractive affiliate links, making them more appealing to your audience." },
  ],
};


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
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-24">
          <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
            <h1 className="font-headline text-3xl font-extrabold tracking-tighter sm:text-5xl lg:text-6xl">
              Best URL Shortener Tool – Shorten, Track & Manage Links
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              Our free URL shortener helps you create clean, simple, and trackable short URLs in one click. Whether you’re sharing links on social media, running ads, promoting products, or managing campaigns, our tool makes link management faster, easier, and more professional.
            </p>
            <div className="w-full max-w-2xl pt-8">
              <UrlShortenerForm />
            </div>
          </div>
        </section>

        <section id="features" className="container space-y-12 bg-slate-50/50 py-8 md:py-12 lg:py-24 dark:bg-slate-800/20">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
              <h2 className="font-headline text-3xl font-bold leading-[1.1] tracking-tighter sm:text-3xl md:text-4xl">
                Why Use Our URL Shortener?
              </h2>
              <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                Each short URL comes with analytics, including click count, device type, browser, country, and referrer. You can also generate QR codes, create custom aliases, and monitor link performance. No login required — just shorten and share.
              </p>
            </div>
            <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
              <div className="relative overflow-hidden rounded-lg border bg-background p-2">
                <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                  <h3 className="font-bold">Create Short URLs in One Click</h3>
                  <p className="text-sm text-muted-foreground">
                    Instantly create a short link with our fast, secure & reliable link shortener. Perfect for influencers, marketers & bloggers.
                  </p>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-lg border bg-background p-2">
                <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                  <h3 className="font-bold">Track Clicks & Analytics in Real Time</h3>
                  <p className="text-sm text-muted-foreground">
                    Our URL shortener with analytics lets you track clicks on your URLs to understand user behavior.
                  </p>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-lg border bg-background p-2">
                <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                  <h3 className="font-bold">QR Code Generator for Every Short URL</h3>
                  <p className="text-sm text-muted-foreground">
                    Automatically get a QR code for every short link, making it easy to share on posters, ads, and print media.
                  </p>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-lg border bg-background p-2">
                <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                  <h3 className="font-bold">Free Custom URL Shortening</h3>
                  <p className="text-sm text-muted-foreground">
                    Create a custom alias or vanity URL to make your links branded and more trustworthy. A great TinyURL alternative.
                  </p>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-lg border bg-background p-2">
                <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                  <h3 className="font-bold">Short Links That Never Expire</h3>
                  <p className="text-sm text-muted-foreground">
                    Our links are permanent, but you have the option to set an expiration date for time-sensitive campaigns.
                  </p>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-lg border bg-background p-2">
                <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                  <h3 className="font-bold">URL Monitoring & Spam Protection</h3>
                  <p className="text-sm text-muted-foreground">
                    We ensure every link is safe with automated spam protection and URL monitoring. A secure link reducer you can trust.
                  </p>
                </div>
              </div>
            </div>
             <div className="mx-auto text-center md:max-w-[58rem]">
              <p className="leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                Perfect for marketers, influencers, businesses, and creators who want high-performing links that boost engagement and conversions. Our short links are safe, secure, and never expire.
              </p>
            </div>
        </section>

        <section id="use-cases" className="container space-y-6 py-8 md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-headline text-3xl font-bold leading-[1.1] sm:text-3xl md:text-4xl">
              Who Will Use This Tool?
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
             This URL Shortener is perfect for: Social media influencers, digital marketers, bloggers & content creators, businesses & startups, students & teachers, affiliate marketers, e-commerce sellers, developers & API users, WhatsApp/Instagram/Facebook marketers, YouTubers, and agency owners.
            </p>
          </div>

          <div className="mx-auto grid gap-6 md:grid-cols-2 lg:max-w-[64rem] lg:grid-cols-2">
              <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
                  <h3 className="mb-4 text-xl font-bold">Use Cases</h3>
                  <ul className="space-y-3">
                      <li className="flex items-start">
                          <CheckCircle className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                          <p className="text-muted-foreground">Shorten URLs for social media bios (Instagram, Twitter, TikTok).</p>
                      </li>
                      <li className="flex items-start">
                          <CheckCircle className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                          <p className="text-muted-foreground">Create clean links for marketing campaigns to boost CTR.</p>
                      </li>
                      <li className="flex items-start">
                          <CheckCircle className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                          <p className="text-muted-foreground">Track clicks to understand user behavior and campaign performance.</p>
                      </li>
                      <li className="flex items-start">
                          <CheckCircle className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                          <p className="text-muted-foreground">Generate QR codes for ads, posters, and business cards.</p>
                      </li>
                      <li className="flex items-start">
                          <CheckCircle className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                          <p className="text-muted-foreground">Hide long affiliate URLs to make them more shareable.</p>
                      </li>
                      <li className="flex items-start">
                          <CheckCircle className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                          <p className="text-muted-foreground">Share compact links on WhatsApp, Telegram, and in emails.</p>
                      </li>
                  </ul>
              </div>
              <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
                  <h3 className="mb-4 text-xl font-bold">How Our URL Shortener Works</h3>
                   <ol className="list-inside list-decimal space-y-3 text-muted-foreground">
                      <li>Paste your long URL into the input box.</li>
                      <li>Optionally, create a custom alias for a branded short link.</li>
                      <li>Click "Short Link" to generate your short URL and QR code.</li>
                      <li>Copy your new short URL and share it anywhere.</li>
                      <li>Track its performance in our analytics dashboard.</li>
                  </ol>
                  <p className="mt-4 text-sm text-muted-foreground">It's that simple! No registration needed for unlimited short links.</p>
              </div>
          </div>
        </section>

        <section id="faq" className="container py-8 md:py-12 lg:py-24">
           <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-headline text-3xl font-bold leading-[1.1] sm:text-3xl md:text-4xl">
              Frequently Asked Questions
            </h2>
             <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                Have questions? We've got answers. Here are some of the most common questions our users ask.
             </p>
          </div>
          <div className="mx-auto mt-8 max-w-4xl">
            <Accordion type="multiple" className="w-full">
              {Object.entries(faqItems).map(([category, items]) => (
                 <div key={category} className="mb-6">
                    <h3 className="mb-4 text-2xl font-bold">{category}</h3>
                    {items.map((item, index) => (
                      <AccordionItem value={`${category}-${index}`} key={index}>
                        <AccordionTrigger className="text-lg">{item.q}</AccordionTrigger>
                        <AccordionContent className="text-base text-muted-foreground">
                          {item.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                 </div>
              ))}
            </Accordion>
          </div>
        </section>

      </main>
      <footer className="py-6 md:px-8 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
            Shorten your URLs instantly with our free URL shortening tool. Create branded short links, track clicks, generate QR codes, and manage campaigns — all in one place.
          </p>
        </div>
      </footer>
    </div>
  );
}
