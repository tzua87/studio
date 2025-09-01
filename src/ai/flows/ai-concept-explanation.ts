'use server';

/**
 * @fileOverview AI-powered concept explanation flow for students.
 *
 * - explainConcept - A function that explains a given concept, provides practice quizzes, and allows for deeper exploration.
 * - ExplainConceptInput - The input type for the explainConcept function.
 * - ExplainConceptOutput - The return type for the explainConcept function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainConceptInputSchema = z.object({
  topic: z.string().describe('The specific topic the student needs help with.'),
});
export type ExplainConceptInput = z.infer<typeof ExplainConceptInputSchema>;

const ExplainConceptOutputSchema = z.object({
  explanation: z.string().describe('A simplified explanation of the topic.'),
  quiz: z.string().describe('A practice quiz related to the topic.'),
  furtherExploration: z.string().describe('Suggestions for further exploration of the topic.'),
});
export type ExplainConceptOutput = z.infer<typeof ExplainConceptOutputSchema>;

export async function explainConcept(input: ExplainConceptInput): Promise<ExplainConceptOutput> {
  return explainConceptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainConceptPrompt',
  input: {schema: ExplainConceptInputSchema},
  output: {schema: ExplainConceptOutputSchema},
  prompt: `You are an AI assistant designed to help 9th-grade students understand complex topics in Physics, Chemistry, and Math.

A student is struggling with the following topic:
{{topic}}

Provide a simplified explanation of the topic, a practice quiz to test their understanding, and suggestions for further exploration.`,
});

const explainConceptFlow = ai.defineFlow(
  {
    name: 'explainConceptFlow',
    inputSchema: ExplainConceptInputSchema,
    outputSchema: ExplainConceptOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
