'use client';

import { motion } from 'framer-motion';
import { BookOpen, RefreshCw, Compass, Clock } from 'lucide-react';
import Link from 'next/link';
import SubjectCard from '@/components/SubjectCard';
import StreakBadge from '@/components/StreakBadge';
import DailyPlan from '@/components/DailyPlan';
import ProgressRing from '@/components/ProgressRing';
import type { Subject, DailyPlan as DailyPlanType, ProgressStats, ActivityItem } from '@/lib/types';

export default function DashboardClient({
  subjects,
  dailyPlan,
  stats,
  activity,
}: {
  subjects: Subject[];
  dailyPlan: DailyPlanType;
  stats: ProgressStats;
  activity: ActivityItem[];
}) {
  const overallProgress = stats.totalTopics > 0
    ? Math.round((stats.learnedTopics / stats.totalTopics) * 100)
    : 0;

  return (
    <div className="space-y-8">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-text">Welcome back! 👋</h1>
          <p className="text-muted mt-1">Ready to learn something new today?</p>
        </div>
        <StreakBadge days={stats.streakDays} />
      </motion.div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3">
        {[
          { href: '/review', label: 'Start Daily Plan', icon: BookOpen, color: 'bg-accent hover:bg-accent/80' },
          { href: '/review', label: 'Review Due', icon: RefreshCw, color: 'bg-warning/20 hover:bg-warning/30 text-warning' },
          { href: '/subjects', label: 'Explore Subjects', icon: Compass, color: 'bg-accent2/20 hover:bg-accent2/30 text-accent2' },
        ].map(({ href, label, icon: Icon, color }) => (
          <Link
            key={label}
            href={href}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${color} ${
              color.includes('bg-accent ') ? 'text-white' : ''
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Daily Plan */}
        <div className="lg:col-span-1">
          <DailyPlan plan={dailyPlan} />

          {/* Overall Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-border rounded-2xl p-6 mt-6 flex flex-col items-center"
          >
            <h3 className="text-sm text-muted mb-4">Overall Progress</h3>
            <ProgressRing
              progress={overallProgress}
              label={`${stats.learnedTopics} learned`}
              sublabel={`of ${stats.totalTopics}`}
            />
          </motion.div>
        </div>

        {/* Subject Grid */}
        <div className="lg:col-span-2">
          <h2 className="text-lg font-semibold text-text mb-4">Your Subjects</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {subjects.slice(0, 6).map((subject, i) => (
              <SubjectCard key={subject.id} subject={subject} index={i} />
            ))}
          </div>
          <Link
            href="/subjects"
            className="block text-center text-accent hover:text-accent/80 text-sm mt-4 transition-all"
          >
            View all {subjects.length} subjects →
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card border border-border rounded-2xl p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-muted" />
          <h2 className="text-lg font-semibold text-text">Recent Activity</h2>
        </div>
        <div className="space-y-3">
          {activity.map((item) => (
            <div key={item.id} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
              <div>
                <p className="text-text text-sm">{item.topicTitle}</p>
                <p className="text-muted text-xs">{item.subject}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                item.action === 'learned' ? 'bg-success/20 text-success' :
                item.action === 'reviewed' ? 'bg-accent/20 text-accent' :
                'bg-accent2/20 text-accent2'
              }`}>
                {item.action}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
