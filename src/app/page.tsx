import { getSubjects, getDailyPlan, getProgressStats, getRecentActivity } from '@/lib/db';
import DashboardClient from './dashboard-client';

export default function Dashboard() {
  const subjects = getSubjects();
  const dailyPlan = getDailyPlan();
  const stats = getProgressStats();
  const activity = getRecentActivity();

  return <DashboardClient subjects={subjects} dailyPlan={dailyPlan} stats={stats} activity={activity} />;
}
