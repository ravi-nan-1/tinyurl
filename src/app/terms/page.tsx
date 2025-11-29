
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
  title: 'Terms of Use',
  description: 'Terms of Use for TinyUrl.',
};

export default function TermsOfUsePage() {
  return (
    <main className="container mx-auto flex-1 space-y-8 p-4 sm:p-6 md:p-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold tracking-tight">
            Terms of Use
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-muted-foreground">
          <p>Last updated: 30 November 2025</p>
          <p>
            By using TinyURL by All2ools (the “Service”), you agree to the following terms.
          </p>
          
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-foreground">1. Use of Service</h3>
            <p>
              You agree to use the service responsibly and legally. You must NOT use the service to:
            </p>
            <ul className="list-disc list-inside space-y-1">
                <li>Spread harmful or illegal content</li>
                <li>Create phishing or scam links</li>
                <li>Distribute malware, viruses, or spam</li>
                <li>Mislead or harm others</li>
            </ul>
            <p>We reserve the right to block abusive use.</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-foreground">2. Intellectual Property</h3>
            <p>All2ools owns the:</p>
             <ul className="list-disc list-inside space-y-1">
                <li>Tool design</li>
                <li>Code</li>
                <li>Logos</li>
                <li>Brand</li>
                <li>UI/UX</li>
            </ul>
            <p>You retain full ownership of the URLs you shorten.</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-foreground">3. Disclaimer</h3>
            <p>The service is provided “as is” without warranties. We do not guarantee:</p>
            <ul className="list-disc list-inside space-y-1">
                <li>Link uptime</li>
                <li>Accuracy</li>
                <li>Performance</li>
                <li>Stability</li>
            </ul>
            <p>You use the service at your own risk.</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-foreground">4. Limitation of Liability</h3>
            <p>All2ools is not liable for:</p>
            <ul className="list-disc list-inside space-y-1">
                <li>Loss of data</li>
                <li>Misuse of shortened links</li>
                <li>Damages caused by third-party websites</li>
                <li>Any indirect or consequential damages</li>
            </ul>
            <p>Your only remedy is to stop using the service.</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-foreground">5. Changes</h3>
            <p>We may modify these Terms anytime. Your continued use implies acceptance.</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-foreground">6. Contact</h3>
            <p>For questions, contact:</p>
            <p>
              📧 <a href="mailto:support@all2ools.com" className="text-primary hover:underline">support@all2ools.com</a>
            </p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
