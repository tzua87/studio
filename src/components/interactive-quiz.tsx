
'use client';

import { useState } from 'react';
import type { QuizQuestion } from '@/ai/flows/ai-concept-explanation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Info, Lightbulb, RotateCw, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

interface InteractiveQuizProps {
  questions: QuizQuestion[];
}

export function InteractiveQuiz({ questions }: InteractiveQuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionSelect = (option: string) => {
    if (selectedOption) return; // Already answered

    const correct = option === currentQuestion.answer;
    setSelectedOption(option);
    setIsCorrect(correct);
    if (!correct) {
      setShowExplanation(true);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      resetState();
    } else {
      // Handle quiz completion if needed, for now just restart
      handleRestart();
    }
  };
  
  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    resetState();
  };

  const resetState = () => {
    setSelectedOption(null);
    setIsCorrect(null);
    setShowExplanation(false);
  };

  if (!questions || questions.length === 0) {
    return <p>No quiz questions available.</p>;
  }

  return (
    <div className="w-full">
        <p className="font-semibold text-lg mb-4">{currentQuestionIndex + 1}. {currentQuestion.question}</p>
        
        <div className="space-y-3 mb-6">
            {currentQuestion.options.map(option => {
                const isSelected = selectedOption === option;
                const isAnswer = currentQuestion.answer === option;

                const getOptionClass = () => {
                    if (!selectedOption) return "bg-background hover:bg-muted/50 cursor-pointer";
                    if (isSelected && !isAnswer) return "bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-700 text-red-800 dark:text-red-200";
                    if (isAnswer) return "bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700 text-green-800 dark:text-green-200";
                    return "border-border";
                }

                return (
                    <button
                        key={option}
                        onClick={() => handleOptionSelect(option)}
                        disabled={!!selectedOption}
                        className={cn(
                            "w-full text-left flex items-center space-x-3 p-3 border rounded-md transition-colors",
                            getOptionClass()
                        )}
                    >
                        <span className="text-base flex-1">{option}</span>
                        {selectedOption && isAnswer && <Check className="w-5 h-5 text-green-600" />}
                        {selectedOption && isSelected && !isAnswer && <X className="w-5 h-5 text-red-600" />}
                    </button>
                )
            })}
        </div>
        
        {showExplanation && (
            <Alert variant="destructive" className="mb-6 bg-red-50 dark:bg-red-900/20">
              <Lightbulb className="h-4 w-4" />
              <AlertTitle>Explanation</AlertTitle>
              <AlertDescription>{currentQuestion.explanation}</AlertDescription>
            </Alert>
        )}

        {isCorrect === true && (
             <Alert variant="default" className="mb-6 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700">
              <Check className="h-4 w-4 text-green-600" />
              <AlertTitle className="text-green-700 dark:text-green-300">Correct!</AlertTitle>
              <AlertDescription className="text-green-700 dark:text-green-400">{currentQuestion.explanation}</AlertDescription>
            </Alert>
        )}

        <div className="flex justify-end gap-2">
            {currentQuestionIndex > 0 && (
                <Button onClick={handleRestart} variant="outline">
                    <RotateCw className="mr-2 h-4 w-4" /> Restart
                </Button>
            )}
            <Button onClick={handleNext} disabled={!selectedOption}>
                {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
            </Button>
        </div>
    </div>
  );
}
