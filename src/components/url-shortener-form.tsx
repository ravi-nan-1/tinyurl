'use client';

import { useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect, useRef, useState } from 'react';
import { shortenUrl } from '@/lib/actions';
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
import { CalendarIcon, Clipboard, ClipboardCheck } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

const formSchema = z.object({
  url: z.string().url({ message: 'Please enter a valid URL.' }),
  alias: z.string().optional(),
  expiresAt: z.date().optional(),
});

export function UrlShortenerForm() {
  const [copied, setCopied] = useState(false);
  const initialState = { message: null, error: null, shortUrl: null };
  const [state, formAction] = useFormState(shortenUrl, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: '',
      alias: '',
    },
  });

  useEffect(() => {
    if (state?.message) {
      toast({
        variant: state.error ? 'destructive' : 'default',
        title: state.error ? 'Error' : 'Success',
        description: state.message,
      });
    }
    if (state?.shortUrl) {
      form.reset();
    }
  }, [state, toast, form]);

  const onCopy = () => {
    if (state?.shortUrl) {
      navigator.clipboard.writeText(state.shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-4">
      <Form {...form}>
        <form
          ref={formRef}
          action={formAction}
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
                   <FormMessage>{state?.error?.alias}</FormMessage>
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
            {form.formState.isSubmitting ? 'Forging...' : 'Forge Link'}
          </Button>
          {state?.error && !state.error.alias && (
             <FormMessage>{Object.values(state.error).join(', ')}</FormMessage>
          )}
          {state?.message && state.error && (
            <FormMessage>{state.message}</FormMessage>
          )}
        </form>
      </Form>
      {state?.shortUrl && (
        <Alert className="bg-primary/10">
          <AlertTitle>Success! Here is your short link:</AlertTitle>
          <AlertDescription className="flex items-center justify-between">
            <a
              href={`http://${state.shortUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-primary hover:underline"
            >
              {state.shortUrl}
            </a>
            <Button variant="ghost" size="icon" onClick={onCopy}>
              {copied ? (
                <ClipboardCheck className="h-4 w-4" />
              ) : (
                <Clipboard className="h-4 w-4" />
              )}
            </Button>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
