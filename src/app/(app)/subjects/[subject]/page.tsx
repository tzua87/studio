import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SUBJECTS, type Subject } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ArrowRight } from 'lucide-react';

export async function generateStaticParams() {
  return SUBJECTS.map((subject) => ({
    subject: subject.slug,
  }));
}

const getSubject = (slug: string): Subject | undefined => {
  return SUBJECTS.find((s) => s.slug === slug);
};

export default function SubjectPage({ params }: { params: { subject: string } }) {
  const subject = getSubject(params.subject);

  if (!subject) {
    notFound();
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
                        <AccordionContent>{lesson.content}</AccordionContent>
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
    </div>
  );
}
