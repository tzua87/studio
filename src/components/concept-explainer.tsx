'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { explainConcept, type ExplainConceptOutput } from '@/ai/flows/ai-concept-explanation';
import { Skeleton } from './ui/skeleton';
import { Sparkles } from 'lucide-react';

const formSchema = z.object({
  topic: z.string().min(3, 'Please enter a topic with at least 3 characters.'),
});

type FormValues = z.infer<typeof formSchema>;

export default function ConceptExplainer() {
  const [result, setResult] = useState<ExplainConceptOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: '',
    },
  });

  async function explainConceptAction(topic: string): Promise<ExplainConceptOutput | null> {
    'use server';
    try {
      return await explainConcept({ topic });
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    setResult(null);
    setError(null);

    const response = await explainConceptAction(data.topic);

    if (response) {
      setResult(response);
    } else {
      setError('Sorry, we couldn\'t explain that topic. Please try another one.');
    }
    setIsLoading(false);
  };

  return (
    <div className="max-w-2xl">
      <Card className="shadow-sm">
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-start gap-2">
              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input placeholder="e.g., Photosynthesis, Pythagorean Theorem, Newton's Second Law" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                <Sparkles className="mr-2 h-4 w-4"/>
                {isLoading ? 'Explaining...' : 'Explain'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      {isLoading && (
        <div className="mt-6 space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-24 w-full" />
        </div>
      )}

      {error && <p className="mt-6 text-destructive">{error}</p>}
      
      {result && (
        <Card className="mt-6">
            <CardContent className="p-4 sm:p-6">
                <Accordion type="multiple" defaultValue={['explanation', 'quiz', 'exploration']} className="w-full">
                    <AccordionItem value="explanation">
                        <AccordionTrigger className="text-lg font-headline">Explanation</AccordionTrigger>
                        <AccordionContent className="prose prose-sm max-w-none text-foreground">
                        <div dangerouslySetInnerHTML={{ __html: result.explanation.replace(/```/g, '').replace(/\n/g, '<br/>') }}/>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="quiz">
                        <AccordionTrigger className="text-lg font-headline">Practice Quiz</AccordionTrigger>
                        <AccordionContent className="prose prose-sm max-w-none text-foreground">
                        <div dangerouslySetInnerHTML={{ __html: result.quiz.replace(/```/g, '').replace(/\n/g, '<br/>') }}/>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="exploration">
                        <AccordionTrigger className="text-lg font-headline">Further Exploration</AccordionTrigger>
                        <AccordionContent className="prose prose-sm max-w-none text-foreground">
                        <div dangerouslySetInnerHTML={{ __html: result.furtherExploration.replace(/```/g, '').replace(/\n/g, '<br/>') }}/>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
      )}
    </div>
  );
}
