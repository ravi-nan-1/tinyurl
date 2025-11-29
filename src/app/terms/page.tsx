
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
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-foreground">1. Acceptance of Terms</h3>
            <p>
              By accessing and using TinyUrl (the "Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use this Service.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-foreground">2. Description of Service</h3>
            <p>
              Our Service provides a URL shortening utility that allows users to create shortened, trackable links. You understand and agree that the Service is provided "as-is" and that we assume no responsibility for the timeliness, deletion, or failure to store any user communications or personalization settings.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-foreground">3. Prohibited Conduct</h3>
            <p>
              You agree not to use the Service to create short links for any illegal or unauthorized purpose, including but not limited to spam, phishing, malware distribution, or content that is abusive, fraudulent, or obscene. We reserve the right to deactivate any link suspected of malicious activity without notice.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-foreground">4. Disclaimer of Warranties</h3>
            <p>
              The Service is provided on an "as is" and "as available" basis. We expressly disclaim all warranties of any kind, whether express or implied, including, but not limited to, the implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-foreground">5. Limitation of Liability</h3>
            <p>
              You expressly understand and agree that TinyUrl shall not be liable for any direct, indirect, incidental, special, consequential, or exemplary damages resulting from the use or the inability to use the service.
            </p>
            <p>Last updated: July 22, 2024</p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
