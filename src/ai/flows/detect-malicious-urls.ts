'use server';

/**
 * @fileOverview Detects malicious URLs by analyzing user behavior and URL content.
 *
 * - detectMaliciousUrl - A function that detects if a URL is potentially malicious.
 * - DetectMaliciousUrlInput - The input type for the detectMaliciousUrl function.
 * - DetectMaliciousUrlOutput - The return type for the detectMaliciousUrl function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetectMaliciousUrlInputSchema = z.object({
  url: z.string().url().describe('The URL to check.'),
  userActivity: z
    .string()
    .describe('Description of the user activity associated with the URL.'),
});
export type DetectMaliciousUrlInput = z.infer<typeof DetectMaliciousUrlInputSchema>;

const DetectMaliciousUrlOutputSchema = z.object({
  isMalicious: z
    .boolean()
    .describe('Whether the URL is considered malicious or not.'),
  reason: z.string().describe('The reason why the URL is considered malicious.'),
});
export type DetectMaliciousUrlOutput = z.infer<typeof DetectMaliciousUrlOutputSchema>;

export async function detectMaliciousUrl(input: DetectMaliciousUrlInput): Promise<DetectMaliciousUrlOutput> {
  return detectMaliciousUrlFlow(input);
}

const detectMaliciousUrlPrompt = ai.definePrompt({
  name: 'detectMaliciousUrlPrompt',
  input: {schema: DetectMaliciousUrlInputSchema},
  output: {schema: DetectMaliciousUrlOutputSchema},
  prompt: `You are an expert in identifying malicious URLs.
  Analyze the URL and the associated user activity to determine if the URL is malicious.
  Consider factors such as phishing attempts, spam, malware distribution, and suspicious user behavior.

  URL: {{{url}}}
  User Activity: {{{userActivity}}}

  Based on your analysis, determine if the URL is malicious and provide a reason for your determination.`,
});

const detectMaliciousUrlFlow = ai.defineFlow(
  {
    name: 'detectMaliciousUrlFlow',
    inputSchema: DetectMaliciousUrlInputSchema,
    outputSchema: DetectMaliciousUrlOutputSchema,
  },
  async input => {
    const {output} = await detectMaliciousUrlPrompt(input);
    return output!;
  }
);
