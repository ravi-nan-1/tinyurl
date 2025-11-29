
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export const metadata = {
  title: 'About Us',
  description: 'Learn more about TinyUrl and our mission.',
};

export default function AboutPage() {
  return (
    <main className="container mx-auto flex-1 space-y-8 p-4 sm:p-6 md:p-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold tracking-tight">
            About Us – TinyURL by All2ools
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-lg text-muted-foreground">
          <p>
            TinyURL by All2ools is a free and fast online URL shortener designed to make long, messy links short, clean, and easy to share. Whether you're sharing links on social media, WhatsApp, SMS, emails, websites, or marketing campaigns, our short links help you keep everything simple and professional.
          </p>

          <div className="space-y-2">
            <h3 className="text-2xl font-semibold text-foreground">Our Mission</h3>
            <p>
              To provide simple, secure, and reliable online tools that anyone can use — without sign-ups, ads, or complications.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-foreground">Why TinyURL by All2ools?</h3>
            <ul className="space-y-3">
                <li className="flex items-start">
                    <span className="mr-3 mt-1 h-5 w-5 flex-shrink-0">⚡</span>
                    <p>Instant link shortening</p>
                </li>
                <li className="flex items-start">
                    <span className="mr-3 mt-1 h-5 w-5 flex-shrink-0">🔒</span>
                    <p>Secure & privacy-first</p>
                </li>
                 <li className="flex items-start">
                    <span className="mr-3 mt-1 h-5 w-5 flex-shrink-0">💯</span>
                    <p>Free forever</p>
                </li>
                 <li className="flex items-start">
                    <span className="mr-3 mt-1 h-5 w-5 flex-shrink-0">🚀</span>
                    <p>No login required</p>
                </li>
                 <li className="flex items-start">
                    <span className="mr-3 mt-1 h-5 w-5 flex-shrink-0">📱</span>
                    <p>Perfect for social media sharing</p>
                </li>
            </ul>
          </div>

           <div className="space-y-2">
            <h3 className="text-2xl font-semibold text-foreground">Who We Are</h3>
            <p>
              This tool is created and maintained by All2ools, a growing suite of free online utilities built to help students, marketers, creators, developers, and everyday users.
            </p>
          </div>
          
           <div className="space-y-2">
            <h3 className="text-2xl font-semibold text-foreground">Our Values</h3>
            <ul className="list-disc list-inside space-y-2">
                <li>Simplicity</li>
                <li>Speed</li>
                <li>User privacy</li>
                <li>No data collection</li>
                <li>No unnecessary ads</li>
            </ul>
          </div>

          <p>
            If you have suggestions or want to collaborate, feel free to reach out.
          </p>
          <p>
            📧 Email: <a href="mailto:support@all2ools.com" className="text-primary hover:underline">support@all2ools.com</a>
          </p>

        </CardContent>
      </Card>
    </main>
  );
}
