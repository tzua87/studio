'use server';

import { getPersonalizedRecommendations } from '@/ai/flows/personalized-study-recommendations';

export async function getRecommendationsAction(performanceData: string) {
  try {
    const result = await getPersonalizedRecommendations({
      quizPerformanceData: performanceData,
      gradeLevel: 9,
    });
    return result.recommendations;
  } catch (error) {
    console.error(error);
    return 'Sorry, I was unable to generate recommendations at this time.';
  }
}
