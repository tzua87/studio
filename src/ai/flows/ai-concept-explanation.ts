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

const QuizQuestionSchema = z.object({
    question: z.string().describe("The quiz question."),
    options: z.array(z.string()).describe("A list of multiple-choice options for the question."),
    answer: z.string().describe("The correct option from the list."),
    explanation: z.string().describe("A brief explanation for why the correct answer is right, to be shown if the user answers incorrectly."),
});

const ExplainConceptOutputSchema = z.object({
  explanation: z.string().describe('A simplified explanation of the topic.'),
  quiz: z.array(QuizQuestionSchema).describe('A practice quiz with multiple choice questions related to the topic.'),
  furtherExploration: z.string().describe('Suggestions for further exploration of the topic.'),
});
export type ExplainConceptOutput = z.infer<typeof ExplainConceptOutputSchema>;
export type QuizQuestion = z.infer<typeof QuizQuestionSchema>;


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

Provide a simplified explanation of the topic.

Then, create a practice quiz with 3-5 multiple-choice questions to test their understanding. For each question, provide a few options, specify the correct answer, and include a brief explanation for the correct answer that can be shown if the user gets it wrong.

Finally, provide suggestions for further exploration.`,
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
