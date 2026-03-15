import { searchTopics, getSubjects } from '@/lib/db';
import ExplainClient from './explain-client';

export default function ExplainPage({ params }: { params: { concept: string } }) {
  const conceptName = decodeURIComponent(params.concept).replace(/-/g, ' ');
  const results = searchTopics(conceptName);
  const subjects = getSubjects();
  const topic = results[0] || null;
  const related = results.slice(1, 5);

  return <ExplainClient topic={topic} related={related} subjects={subjects} conceptName={conceptName} />;
}
