
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SUBJECTS, type Subject } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ArrowRight, Sparkles } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { explainConceptAction } from '@/app/actions/explain-concept';
import { type ExplainConceptOutput } from '@/ai/flows/ai-concept-explanation';
import { Skeleton } from '@/components/ui/skeleton';
import ReactMarkdown from 'react-markdown';
import { InteractiveQuiz } from '@/components/interactive-quiz';

const getSubject = (slug: string): Subject | undefined => {
  return SUBJECTS.find((s) => s.slug === slug);
};


export default function SubjectPage({ params }: { params: { subject: string } }) {
  const { subject: subjectSlug } = params;
  const [explanation, setExplanation] = useState<ExplainConceptOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);


  const subject = getSubject(subjectSlug);

  if (!subject) {
    notFound();
  }

  const handleExplainClick = async (topic: string) => {
    setSelectedTopic(topic);
    setIsDialogOpen(true);
    setIsLoading(true);
    setExplanation(null);
    const result = await explainConceptAction(topic);
    if (result) {
      setExplanation(result);
    }
    setIsLoading(false);
  };
  
  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setExplanation(null);
    setSelectedTopic(null);
  }

  const Icon = subject.icon;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-primary/10 rounded-lg">
            <Icon className="w-8 h-8 text-primary" />
        </div>
        <div>
            <h1 className="text-3xl font-bold font-headline tracking-tight">{subject.name}</h1>
            <p className="text-muted-foreground">{subject.description}</p>
        </div>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Lessons</CardTitle>
                    <CardDescription>Start your learning journey by exploring these topics.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                    {subject.lessons.map((lesson, index) => (
                        <AccordionItem value={`item-${index}`} key={index}>
                          <AccordionTrigger className="font-semibold">{lesson.title}</AccordionTrigger>
                          <AccordionContent>
                            <div className="flex flex-col items-start gap-4">
                              <p>{lesson.content}</p>
                              <Button variant="outline" size="sm" onClick={() => handleExplainClick(lesson.title)}>
                                <Sparkles className="mr-2 h-4 w-4" />
                                Explain with AI
                              </Button>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                    ))}
                    </Accordion>
                </CardContent>
            </Card>
        </div>
        
        <div className="md:col-span-1">
            <Card className="bg-primary/10 border-primary/20 sticky top-8">
                 <CardHeader>
                    <CardTitle className="font-headline text-primary">Test Your Knowledge</CardTitle>
                    <CardDescription className="text-primary/80">Ready to see what you've learned? Take a practice quiz.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button asChild className="w-full" size="lg">
                        <Link href={`/subjects/${subject.slug}/quiz`}>
                            Start Quiz <ArrowRight className="ml-2"/>
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
        <DialogContent className="max-w-2xl h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="font-headline">
              AI Explanation: {selectedTopic}
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto pr-4">
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
            {explanation && (
                <Accordion type="multiple" defaultValue={['explanation', 'quiz', 'exploration']} className="w-full">
                    <AccordionItem value="explanation">
                        <AccordionTrigger className="text-lg font-headline">Explanation</AccordionTrigger>
                        <AccordionContent className="prose prose-sm max-w-none text-foreground">
                          <ReactMarkdown>{explanation.explanation}</ReactMarkdown>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="quiz">
                        <AccordionTrigger className="text-lg font-headline">Practice Quiz</AccordionTrigger>
                        <AccordionContent>
                          <InteractiveQuiz questions={explanation.quiz} />
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="exploration">
                        <AccordionTrigger className="text-lg font-headline">Further Exploration</AccordionTrigger>
                        <AccordionContent className="prose prose-sm max-w-none text-foreground">
                          <ReactMarkdown>{explanation.furtherExploration}</ReactMarkdown>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
