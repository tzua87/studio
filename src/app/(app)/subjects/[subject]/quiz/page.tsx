import { notFound } from 'next/navigation';
import { SUBJECTS, QUIZZES } from '@/lib/data';
import QuizComponent from '@/components/quiz-component';

export async function generateStaticParams() {
  return SUBJECTS.map((subject) => ({
    subject: subject.slug,
  }));
}

export default function QuizPage({ params: { subject: subjectSlug } }: { params: { subject: string } }) {
  if (!QUIZZES[subjectSlug]) {
    notFound();
  }

  const subject = SUBJECTS.find(s => s.slug === subjectSlug);

  if (!subject) {
      notFound();
  }

  return (
    <div className="p-2 sm:p-4 md:p-6 flex justify-center items-start min-h-screen">
      <QuizComponent subjectSlug={subjectSlug as 'physics' | 'chemistry' | 'math'} subjectName={subject.name} />
    </div>
  );
}
