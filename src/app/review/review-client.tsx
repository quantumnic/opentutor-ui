'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Flame, PartyPopper } from 'lucide-react';
import Link from 'next/link';
import ReviewCard from '@/components/ReviewCard';
import type { ReviewItem } from '@/lib/types';

export default function ReviewClient({ items }: { items: ReviewItem[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completed, setCompleted] = useState(false);
  const remaining = items.length - currentIndex;

  const handleRate = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCompleted(true);
    }
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <p className="text-4xl mb-4">🎉</p>
        <h2 className="text-2xl font-bold text-text mb-2">All caught up!</h2>
        <p className="text-muted mb-6">No reviews due right now.</p>
        <Link href="/subjects" className="text-accent hover:underline">Explore subjects →</Link>
      </div>
    );
  }

  if (completed) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          <div className="relative">
            <Flame className="w-20 h-20 text-warning" />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="absolute -top-2 -right-2"
            >
              <PartyPopper className="w-8 h-8 text-accent" />
            </motion.div>
          </div>
        </motion.div>
        <h2 className="text-2xl font-bold text-text mt-6 mb-2">Session Complete!</h2>
        <p className="text-muted mb-6">You reviewed {items.length} cards. Great work!</p>
        <Link href="/" className="bg-accent hover:bg-accent/80 text-white px-6 py-2.5 rounded-xl font-medium transition-all">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-text">Spaced Repetition Review</h1>
        <span className="text-muted text-sm bg-card px-3 py-1.5 rounded-full border border-border">
          {remaining} remaining
        </span>
      </div>

      {/* Progress */}
      <div className="w-full bg-border rounded-full h-1.5 mb-8">
        <motion.div
          className="h-full rounded-full bg-accent"
          animate={{ width: `${((currentIndex) / items.length) * 100}%` }}
        />
      </div>

      <ReviewCard item={items[currentIndex]} onRate={handleRate} />
    </div>
  );
}
