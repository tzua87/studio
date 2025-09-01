import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { SUBJECTS } from '@/lib/data';
import ProgressAnalytics from '@/components/progress-analytics';

export default function DashboardPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-headline tracking-tight">Welcome to NexusLearn</h1>
        <p className="text-muted-foreground">Your personalized journey to mastering 9th-grade science and math begins here.</p>
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold font-headline mb-4">Your Subjects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SUBJECTS.map((subject) => (
            <Link href={`/subjects/${subject.slug}`} key={subject.slug} className="group">
              <Card className="h-full transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 hover:border-primary">
                <CardHeader className="flex-row items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <subject.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="font-headline">{subject.name}</CardTitle>
                    <CardDescription>{subject.description}</CardDescription>
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
