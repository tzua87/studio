'use server';

import {
  explainConcept,
  type ExplainConceptOutput,
} from '@/ai/flows/ai-concept-explanation';

export async function explainConceptAction(
  topic: string
): Promise<ExplainConceptOutput | null> {
  try {
    return await explainConcept({ topic });
  } catch (e) {
    console.error(e);
    return null;
  }
}
