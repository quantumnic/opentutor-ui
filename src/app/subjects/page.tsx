import { getSubjects } from '@/lib/db';
import SubjectsClient from './subjects-client';

export default function SubjectsPage() {
  const subjects = getSubjects();
  return <SubjectsClient subjects={subjects} />;
}
