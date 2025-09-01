'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { QUIZZES } from '@/lib/data';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, Award, RotateCw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuizComponentProps {
  subjectSlug: 'physics' | 'chemistry' | 'math';
  subjectName: string;
}

export default function QuizComponent({ subjectSlug, subjectName }: QuizComponentProps) {
  const quiz = useMemo(() => QUIZZES[subjectSlug], [subjectSlug]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [quizFinished, setQuizFinished] = useState(false);

  const score = useMemo(() => {
    if (!quizFinished) return 0;
    return quiz.questions.reduce((acc, question, index) => {
      return selectedAnswers[index] === question.answer ? acc + 1 : acc;
    }, 0);
  }, [quizFinished, selectedAnswers, quiz.questions]);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizFinished(true);
    }
  };
  
  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswers({ ...selectedAnswers, [currentQuestionIndex]: answer });
  };

  const handleRestart = () => {
      setCurrentQuestionIndex(0);
      setSelectedAnswers({});
      setQuizFinished(false);
  }

  if (quizFinished) {
    const percentage = Math.round((score / quiz.questions.length) * 100);
    return (
      <Card className="w-full max-w-2xl text-center shadow-lg">
        <CardHeader>
          <div className="mx-auto bg-accent/20 p-4 rounded-full w-fit mb-4">
            <Award className="w-12 h-12 text-accent" />
          </div>
          <CardTitle className="font-headline text-2xl">Quiz Complete!</CardTitle>
          <CardDescription>You finished the {subjectName} quiz.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">
            {score} / {quiz.questions.length}
          </p>
          <p className="text-lg text-muted-foreground mb-4">That's {percentage}%!</p>
          <div className="space-y-4 text-left">
            {quiz.questions.map((q, i) => (
                <div key={i} className={cn("p-3 rounded-md flex items-start gap-4", selectedAnswers[i] === q.answer ? "bg-green-100" : "bg-red-100")}>
                    {selectedAnswers[i] === q.answer ? <CheckCircle className="w-5 h-5 text-green-600 mt-1 shrink-0"/> : <XCircle className="w-5 h-5 text-red-600 mt-1 shrink-0"/>}
                    <div>
                        <p className="font-semibold">{q.question}</p>
                        <p className="text-sm">Your answer: {selectedAnswers[i] || "Not answered"}</p>
                        <p className="text-sm font-medium">Correct answer: {q.answer}</p>
                    </div>
                </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          <Button onClick={handleRestart} variant="outline"><RotateCw className="mr-2 h-4 w-4"/> Try Again</Button>
          <Button asChild><Link href="/dashboard">Back to Dashboard</Link></Button>
        </CardFooter>
      </Card>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  return (
    <Card className="w-full max-w-2xl shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">{quiz.title}</CardTitle>
        <CardDescription>Question {currentQuestionIndex + 1} of {quiz.questions.length}</CardDescription>
        <Progress value={progress} className="mt-2" />
      </CardHeader>
      <CardContent>
        <p className="font-semibold text-lg mb-6">{currentQuestion.question}</p>
        <RadioGroup onValueChange={handleAnswerSelect} value={selectedAnswers[currentQuestionIndex]}>
          {currentQuestion.options.map((option: string) => (
            <div key={option} className="flex items-center space-x-2 p-3 border rounded-md has-[:checked]:bg-primary/10 has-[:checked]:border-primary transition-colors">
              <RadioGroupItem value={option} id={option} />
              <Label htmlFor={option} className="text-base flex-1 cursor-pointer">{option}</Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter>
        <Button onClick={handleNextQuestion} disabled={!selectedAnswers[currentQuestionIndex]} className="ml-auto">
          {currentQuestionIndex < quiz.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
        </Button>
      </CardFooter>
    </Card>
  );
}
