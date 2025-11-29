'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { shortenUrl, type ShortenUrlState } from '@/lib/actions';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CalendarIcon, Clipboard, ClipboardCheck, QrCode } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { QRCodeSVG } from 'qrcode.react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useUrlStore } from '@/lib/store';
import Link from 'next/link';

const formSchema = z.object({
  url: z.string().url({ message: 'Please enter a valid URL.' }),
  alias: z.string().optional(),
  expiresAt: z.date().optional(),
});

export function UrlShortenerForm() {
  const [copied, setCopied] = useState(false);
  const addLink = useUrlStore((state) => state.addLink);
  const links = useUrlStore((state) => state.links);

  const initialState: ShortenUrlState = {};
  const [state, formAction] = useActionState(shortenUrl, initialState);
  
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: '',
      alias: '',
    },
  });

  const handleFormAction = (payload: FormData) => {
    const alias = payload.get('alias') as string;
    if (alias && links.some(link => link.id === alias)) {
        form.setError('alias', { type: 'manual', message: 'This custom alias is already taken.' });
        return;
    }
    formAction(payload);
  }

  useEffect(() => {
    if (state?.message && state.link) {
      addLink(state.link);
      toast({
        title: 'Success',
        description: state.message,
      });
       form.reset();
    } else if (state?.error) {
        // Handle server-side validation errors if any
        if(state.error.url) form.setError('url', { message: state.error.url[0] });
        if(state.error.alias) form.setError('alias', { message: state.error.alias[0] });
    }
  }, [state, toast, form, addLink]);

  const onCopy = () => {
    if (state?.link?.shortUrl) {
      const fullUrl = `${window.location.origin}${state.link.shortUrl}`;
      navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      toast({
          title: 'Copied to clipboard!',
          description: fullUrl,
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };
  
  const shortUrl = state?.link?.shortUrl ? `${window.location.origin}${state.link.shortUrl}` : '';

  return (
    <div className="space-y-4">
      <Form {...form}>
        <form
          ref={formRef}
          action={handleFormAction}
          className="space-y-4 rounded-lg border bg-card p-6 shadow-sm"
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Your Long URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com/very-long-url"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="alias"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Custom Alias (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="my-awesome-link" {...field} />
                  </FormControl>
                   <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="expiresAt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expiration Date (Optional)</FormLabel>
                   <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-full justify-start text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? 'Shortening...' : 'Shorten Link'}
          </Button>
        </form>
      </Form>
      {state?.link && (
        <Alert className="bg-primary/10">
          <AlertTitle>Success! Here is your short link:</AlertTitle>
          <AlertDescription className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex-grow space-y-2">
                <div className="flex items-center justify-between">
                    <Link
                    href={state.link.shortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-primary hover:underline"
                    >
                    {shortUrl}
                    </Link>
                    <Button variant="ghost" size="icon" onClick={onCopy}>
                    {copied ? (
                        <ClipboardCheck className="h-4 w-4" />
                    ) : (
                        <Clipboard className="h-4 w-4" />
                    )}
                    </Button>
                </div>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <div className="cursor-pointer rounded-lg bg-white p-2">
                  <QRCodeSVG value={shortUrl} size={80} />
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>QR Code for {shortUrl}</DialogTitle>
                </DialogHeader>
                <div className="mt-4 flex items-center justify-center">
                  <div className="rounded-lg bg-white p-4">
                    <QRCodeSVG value={shortUrl} size={256} />
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
