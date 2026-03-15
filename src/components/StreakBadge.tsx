'use client';

import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';

export default function StreakBadge({ days }: { days: number }) {
  return (
    <motion.div
      className="inline-flex items-center gap-2 bg-warning/10 border border-warning/30 rounded-full px-4 py-2"
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
    >
      <Flame className="w-5 h-5 text-warning" />
      <span className="text-warning font-bold text-lg">{days}</span>
      <span className="text-warning/80 text-sm">day streak</span>
    </motion.div>
  );
}
