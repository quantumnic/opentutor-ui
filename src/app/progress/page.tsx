import { getProgressStats, getSubjects } from '@/lib/db';
import ProgressClient from './progress-client';

export default function ProgressPage() {
  const stats = getProgressStats();
  const subjects = getSubjects();
  return <ProgressClient stats={stats} subjects={subjects} />;
}
