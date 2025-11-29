
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
            About TinyUrl
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-lg text-muted-foreground">
          <p>
            Welcome to TinyUrl, your go-to solution for shortening long, cumbersome links into manageable and shareable URLs. Our mission is to make link management simple, fast, and accessible for everyone, from individual users to large-scale businesses.
          </p>
          <p>
            In today's digital world, clean and concise links are essential for social media, marketing campaigns, and everyday sharing. We believe that a shorter link is a more powerful link. That's why we created a tool that is not only free and easy to use but also packed with features like click tracking, QR code generation, and custom aliases.
          </p>
          <p>
            We are committed to providing a reliable, secure, and efficient service. Every link you create is protected, and our infrastructure is built to handle millions of redirects without a hitch.
          </p>
          <p>
            Thank you for choosing TinyUrl. We're excited to be a part of your digital journey.
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
