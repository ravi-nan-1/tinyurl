
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for TinyUrl.',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="container mx-auto flex-1 space-y-8 p-4 sm:p-6 md:p-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold tracking-tight">
            Privacy Policy
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-muted-foreground">
          <p>Last updated: 30 November 2025</p>
          <p>
            This Privacy Policy explains how TinyURL by All2ools (“we”, “our”, “us”) handles user data when you use our URL shortener service located at tinyurl.all2ools.com.
          </p>
          <p>
            We value your privacy and are committed to providing a transparent, secure, and safe experience.
          </p>

          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-foreground">1. Information We Do NOT Collect</h3>
            <p>
              TinyURL does not require a login, and we do not collect:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>Names</li>
              <li>Emails</li>
              <li>Phone numbers</li>
              <li>Addresses</li>
              <li>Personal identification</li>
            </ul>
            <p>You can use the service completely anonymously.</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-foreground">2. URL Data</h3>
            <p>When you shorten a URL:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>We only process the link to generate a short version.</li>
              <li>We do not analyze or track the content behind your link.</li>
              <li>We do not share, sell, or expose links to third parties.</li>
              <li>Shortened URLs remain active unless removed manually.</li>
            </ul>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-foreground">3. Log Data</h3>
            <p>We may store non-personal technical information such as:</p>
            <ul className="list-disc list-inside space-y-1">
                <li>Browser type</li>
                <li>Device type</li>
                <li>Time of visit</li>
                <li>Usage statistics (anonymous)</li>
            </ul>
            <p>This helps us improve the tool performance.</p>
            <p>No personal data is collected.</p>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-foreground">4. Cookies</h3>
            <p>We may use simple cookies for:</p>
            <ul className="list-disc list-inside space-y-1">
                <li>Basic analytics</li>
                <li>Tool performance</li>
                <li>UI improvements</li>
            </ul>
            <p>Cookies do NOT store personal information.</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-foreground">5. Third-Party Services</h3>
            <p>We may use:</p>
            <ul className="list-disc list-inside space-y-1">
                <li>Cloudflare or other CDN providers</li>
                <li>Analytics tools</li>
            </ul>
             <p>No third party receives personal data from us.</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-foreground">6. Security</h3>
             <ul className="list-disc list-inside space-y-1">
                <li>HTTPS encryption</li>
                <li>No personal data stored</li>
                <li>Secure hosting environment</li>
            </ul>
            <p>
              While we strive to use the best security practices, no system is 100% secure.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-foreground">7. Updates</h3>
            <p>
              We may update this policy periodically. Updates are shown at the top of this page.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-foreground">8. Contact</h3>
            <p>
              If you have any privacy questions:
            </p>
            <p>
              📧 <a href="mailto:support@all2ools.com" className="text-primary hover:underline">support@all2ools.com</a>
            </p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
