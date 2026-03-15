import { getTopicsForSubject, getSubjects } from '@/lib/db';
import LearnClient from './learn-client';

export default function LearnPage({ params }: { params: { subject: string } }) {
  const topics = getTopicsForSubject(params.subject);
  const subjects = getSubjects();
  const subject = subjects.find(s => s.id === params.subject);

  return <LearnClient topics={topics} subject={subject || null} subjectId={params.subject} />;
}
