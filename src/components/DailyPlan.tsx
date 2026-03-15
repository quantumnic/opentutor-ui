'use client';

import { motion } from 'framer-motion';
import { BookOpen, RefreshCw, Sparkles } from 'lucide-react';
import Link from 'next/link';
import type { DailyPlan as DailyPlanType } from '@/lib/types';

export default function DailyPlan({ plan }: { plan: DailyPlanType }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-2xl p-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-accent" />
        <h2 className="text-lg font-semibold text-text">Today&apos;s Plan</h2>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-bg rounded-xl p-4">
          <RefreshCw className="w-5 h-5 text-warning mb-2" />
          <p className="text-2xl font-bold text-text">{plan.reviewsDue}</p>
          <p className="text-sm text-muted">Reviews due</p>
        </div>
        <div className="bg-bg rounded-xl p-4">
          <BookOpen className="w-5 h-5 text-accent2 mb-2" />
          <p className="text-2xl font-bold text-text">{plan.newTopics}</p>
          <p className="text-sm text-muted">New topics</p>
        </div>
      </div>

      <div className="flex gap-2">
        <Link
          href="/review"
          className="flex-1 bg-accent hover:bg-accent/80 text-white text-center py-2.5 rounded-xl text-sm font-medium transition-all"
        >
          Start Reviews
        </Link>
        <Link
          href="/subjects"
          className="flex-1 bg-bg hover:bg-border text-text text-center py-2.5 rounded-xl text-sm font-medium transition-all border border-border"
        >
          Explore
        </Link>
      </div>
    </motion.div>
  );
}
