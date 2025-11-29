
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
    title: 'Contact Us',
    description: 'Get in touch with the TinyUrl team.',
};

export default function ContactPage() {
  return (
    <main className="container mx-auto flex-1 space-y-8 p-4 sm:p-6 md:p-8">
        <Card className="mx-auto max-w-2xl">
            <CardHeader>
                <CardTitle className="text-3xl font-bold tracking-tight">Contact Us</CardTitle>
                <CardDescription>
                    Have questions or feedback? We’re here to help!
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 text-muted-foreground">
                <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-foreground">📧 Email Support</h3>
                    <p>
                        You can reach us anytime at:
                        <a href="mailto:support@all2ools.com" className="ml-1 text-primary hover:underline">
                            support@all2ools.com
                        </a>
                    </p>
                    <p>
                        We usually respond within 24–48 hours.
                    </p>
                </div>

                <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-foreground">🛠 How We Can Help</h3>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Issues with URL shortening</li>
                        <li>Feature requests</li>
                        <li>Bug reports</li>
                        <li>Business or partnership inquiries</li>
                        <li>Complaints or general support</li>
                    </ul>
                </div>
                
                <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-foreground">About Our Team</h3>
                    <p>
                        TinyURL by All2ools is built and managed by developers focused on creating fast and free online tools for everyone.
                    </p>
                </div>
                
                <p className="pt-4 text-center text-sm">
                    Your feedback helps us improve our tools every day — thank you for supporting All2ools!
                </p>

            </CardContent>
        </Card>
    </main>
  );
}
