// src/ai/flows/personalized-study-recommendations.ts
'use server';

/**
 * @fileOverview Provides personalized study recommendations based on student quiz performance.
 *
 * - `getPersonalizedRecommendations` -  A function that generates personalized study recommendations.
 * - `PersonalizedRecommendationsInput` - The input type for the `getPersonalizedRecommendations` function.
 * - `PersonalizedRecommendationsOutput` - The return type for the `getPersonalizedRecommendations` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedRecommendationsInputSchema = z.object({
  quizPerformanceData: z
    .string()
    .describe(
      'A string containing the student performance data, including subjects, topics, and scores.  Example: Physics: Kinematics (70%), Chemistry: Atomic Structure (50%), Math: Algebra (90%)'
    ),
  gradeLevel: z
    .number()
    .describe('The grade level of the student. Example: 9'),
});
export type PersonalizedRecommendationsInput = z.infer<
  typeof PersonalizedRecommendationsInputSchema
>;

const PersonalizedRecommendationsOutputSchema = z.object({
  recommendations: z
    .string()
    .describe(
      'Personalized study recommendations based on the student performance data.
      Example: Based on your quiz performance, it is recommended that you focus on Chemistry, particularly Atomic Structure, and review Physics Kinematics concepts.  Consider additional practice quizzes in these areas.'
    ),
});

export type PersonalizedRecommendationsOutput = z.infer<
  typeof PersonalizedRecommendationsOutputSchema
>;

export async function getPersonalizedRecommendations(
  input: PersonalizedRecommendationsInput
): Promise<PersonalizedRecommendationsOutput> {
  return personalizedRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedRecommendationsPrompt',
  input: {schema: PersonalizedRecommendationsInputSchema},
  output: {schema: PersonalizedRecommendationsOutputSchema},
  prompt: `You are an AI study assistant for {{gradeLevel}}th grade students.

  Based on the following quiz performance data, provide personalized study recommendations to the student. Be specific and actionable.

  Quiz Performance Data: {{{quizPerformanceData}}}

  Recommendations:`, // No Handlebars logic, just string.
});

const personalizedRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedRecommendationsFlow',
    inputSchema: PersonalizedRecommendationsInputSchema,
    outputSchema: PersonalizedRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
