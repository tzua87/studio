import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { SUBJECTS } from '@/lib/data';
import ProgressAnalytics from '@/components/progress-analytics';

export default function DashboardPage() {
  return (
    <div className="p-4 sm:p-6">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold font-headline tracking-tight">Welcome to SHIVA-AI</h1>
        <p className="text-sm sm:text-base text-muted-foreground">Your personalized journey to mastering 9th-grade science and math begins here.</p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold font-headline mb-4">Your Subjects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SUBJECTS.map((subject) => (
            <Link href={`/subjects/${subject.slug}`} key={subject.slug} className="group">
              <Card className="h-full transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 hover:border-primary">
                <CardHeader className="flex-row items-center gap-4 p-4">
                  <div className="p-2 sm:p-3 bg-primary/10 rounded-lg">
                    <subject.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="font-headline text-base sm:text-xl">{subject.name}</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">{subject.description}</CardDescription>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <ProgressAnalytics />
      </section>
    </div>
  );
}
