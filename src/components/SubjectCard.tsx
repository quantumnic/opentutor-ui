'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import type { Subject } from '@/lib/types';

export default function SubjectCard({ subject, index }: { subject: Subject; index: number }) {
  const progress = subject.topicCount > 0
    ? Math.round((subject.learnedCount / subject.topicCount) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link href={`/learn/${subject.id}`}>
        <div className="group relative bg-card border border-border rounded-2xl p-5 hover:border-accent/50 transition-all duration-300 hover:scale-[1.02] overflow-hidden">
          {/* Glow effect */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl"
            style={{ background: `radial-gradient(circle at 50% 50%, ${subject.color}, transparent 70%)` }}
          />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-3xl">{subject.icon}</span>
              <span className="text-xs text-muted bg-bg/50 px-2 py-1 rounded-full">
                {subject.topicCount} topics
              </span>
            </div>

            <h3 className="text-text font-semibold mb-1">{subject.name}</h3>
            <p className="text-muted text-sm mb-3">
              {subject.learnedCount} of {subject.topicCount} learned
            </p>

            {/* Progress bar */}
            <div className="w-full bg-bg rounded-full h-2 overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: subject.color }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ delay: index * 0.05 + 0.3, duration: 0.8 }}
              />
            </div>
            <span className="text-xs text-muted mt-1 block text-right">{progress}%</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
