
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
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-foreground">1. Information We Collect</h3>
            <p>
              We collect information you provide directly to us when you create a short link, such as the original URL. We also automatically collect information about how you use our services, including IP address, browser type, and analytics on link clicks (e.g., timestamps, country, referrer).
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-foreground">2. How We Use Information</h3>
            <p>
              We use the information we collect to operate, maintain, and provide you with the features and functionality of our service. This includes creating redirects, providing analytics on link performance, and preventing fraudulent or malicious activity.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-foreground">3. Information Sharing</h3>
            <p>
              We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-foreground">4. Data Security</h3>
            <p>
              We implement a variety of security measures to maintain the safety of your personal information. However, no method of transmission over the Internet or method of electronic storage is 100% secure.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-foreground">5. Changes to This Policy</h3>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
            </p>
            <p>Last updated: July 22, 2024</p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
