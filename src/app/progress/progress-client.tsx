'use client';

import { motion } from 'framer-motion';
import { Calendar, BookOpen, Target, Flame } from 'lucide-react';
import ProgressRing from '@/components/ProgressRing';
import StreakBadge from '@/components/StreakBadge';
import type { ProgressStats, Subject } from '@/lib/types';

export default function ProgressClient({ stats, subjects }: { stats: ProgressStats; subjects: Subject[] }) {
  const overallProgress = stats.totalTopics > 0
    ? Math.round((stats.learnedTopics / stats.totalTopics) * 100)
    : 0;

  // Generate heatmap grid (last 12 weeks)
  const heatmapDays: { date: string; count: number }[] = [];
  const today = new Date();
  for (let i = 83; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().split('T')[0];
    heatmapDays.push({ date: key, count: stats.heatmap[key] || 0 });
  }

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-3xl font-bold text-text mb-2">Your Progress</h1>
        <p className="text-muted">Track your learning journey.</p>
      </motion.div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: BookOpen, label: 'Topics Learned', value: stats.learnedTopics, color: 'text-accent' },
          { icon: Target, label: 'Total Topics', value: stats.totalTopics, color: 'text-accent2' },
          { icon: Flame, label: 'Day Streak', value: stats.streakDays, color: 'text-warning' },
          { icon: Calendar, label: 'Today', value: stats.todayLearned, color: 'text-success' },
        ].map(({ icon: Icon, label, value, color }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-card border border-border rounded-2xl p-5"
          >
            <Icon className={`w-5 h-5 ${color} mb-2`} />
            <p className="text-2xl font-bold text-text">{value}</p>
            <p className="text-sm text-muted">{label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Overall ring */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-2xl p-8 flex flex-col items-center"
        >
          <h3 className="text-lg font-semibold text-text mb-6">Overall Progress</h3>
          <ProgressRing progress={overallProgress} size={160} strokeWidth={12} />
          <div className="mt-4 flex items-center gap-4">
            <StreakBadge days={stats.streakDays} />
          </div>
        </motion.div>

        {/* Heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border border-border rounded-2xl p-6"
        >
          <h3 className="text-lg font-semibold text-text mb-4">Activity Heatmap</h3>
          <div className="grid grid-cols-12 gap-1">
            {heatmapDays.map(({ date, count }) => (
              <div
                key={date}
                className="w-full aspect-square rounded-sm"
                title={`${date}: ${count} topics`}
                style={{
                  backgroundColor: count === 0 ? '#1E1E2E'
                    : count <= 2 ? '#7C3AED33'
                    : count <= 4 ? '#7C3AED66'
                    : count <= 6 ? '#7C3AED99'
                    : '#7C3AEDCC',
                }}
              />
            ))}
          </div>
          <div className="flex items-center justify-end gap-2 mt-3">
            <span className="text-xs text-muted">Less</span>
            {[0, 2, 4, 6, 8].map(level => (
              <div
                key={level}
                className="w-3 h-3 rounded-sm"
                style={{
                  backgroundColor: level === 0 ? '#1E1E2E'
                    : level <= 2 ? '#7C3AED33'
                    : level <= 4 ? '#7C3AED66'
                    : level <= 6 ? '#7C3AED99'
                    : '#7C3AEDCC',
                }}
              />
            ))}
            <span className="text-xs text-muted">More</span>
          </div>
        </motion.div>
      </div>

      {/* Subject breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card border border-border rounded-2xl p-6"
      >
        <h3 className="text-lg font-semibold text-text mb-4">Subject Breakdown</h3>
        <div className="space-y-3">
          {subjects.map((subject) => {
            const pct = subject.topicCount > 0 ? Math.round((subject.learnedCount / subject.topicCount) * 100) : 0;
            return (
              <div key={subject.id} className="flex items-center gap-3">
                <span className="text-xl w-8">{subject.icon}</span>
                <span className="text-text text-sm w-40 truncate">{subject.name}</span>
                <div className="flex-1 bg-bg rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: subject.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 1 }}
                  />
                </div>
                <span className="text-xs text-muted w-10 text-right">{pct}%</span>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
