'use client';

import { useState, useMemo } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Button } from '@/components/ui/button';
import { Skeleton } from './ui/skeleton';
import { Lightbulb } from 'lucide-react';
import { getRecommendationsAction } from '@/app/actions/get-recommendations';

const initialChartData = [
  { subject: 'Physics', score: 70 },
  { subject: 'Chemistry', score: 50 },
  { subject: 'Math', score: 90 },
];

const chartConfig = {
  score: {
    label: 'Score',
    color: 'hsl(var(--primary))',
  },
};

export default function ProgressAnalytics() {
  const [chartData] = useState(initialChartData);
  const [recommendation, setRecommendation] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const formattedPerformanceData = useMemo(() => {
    return chartData.map(item => `${item.subject}: ${item.score}%`).join(', ');
  }, [chartData]);

  const handleGetRecommendations = async () => {
    setIsLoading(true);
    setRecommendation('');
    const result = await getRecommendationsAction(formattedPerformanceData);
    setRecommendation(result);
    setIsLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Progress Analytics</CardTitle>
        <CardDescription>Here is a summary of your recent quiz performance.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="subject" tickLine={false} tickMargin={10} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} tickMargin={10} unit="%" />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Bar dataKey="score" fill="var(--color-score)" radius={8} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-4">
        <Button onClick={handleGetRecommendations} disabled={isLoading}>
          {isLoading ? 'Generating...' : 'Get Personalized Recommendations'}
        </Button>
        {isLoading && (
          <div className="flex flex-col space-y-2 w-full">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        )}
        {recommendation && (
          <Card className="w-full bg-primary/10 border-primary/20">
            <CardHeader className="flex-row items-start gap-4">
                <Lightbulb className="w-5 h-5 mt-1 text-primary"/>
                <div>
                    <CardTitle className="text-base font-semibold text-primary font-headline">Your Study Plan</CardTitle>
                    <CardDescription className="text-primary/80">{recommendation}</CardDescription>
                </div>
            </CardHeader>
          </Card>
        )}
      </CardFooter>
    </Card>
  );
}
