'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { ReviewItem } from '@/lib/types';

export default function ReviewCard({
  item,
  onRate,
}: {
  item: ReviewItem;
  onRate: (rating: 'again' | 'hard' | 'good' | 'easy') => void;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="w-full max-w-2xl mx-auto perspective-1000">
      <motion.div
        className="relative w-full min-h-[320px] cursor-pointer"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
        onClick={() => !flipped && setFlipped(true)}
      >
        {/* Front */}
        <div
          className="absolute inset-0 bg-card border border-border rounded-2xl p-8 flex flex-col items-center justify-center backface-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <span className="text-xs text-accent mb-4 uppercase tracking-wider">{item.subject}</span>
          <p className="text-xl text-text text-center leading-relaxed">{item.question}</p>
          <p className="text-muted text-sm mt-6">Click to reveal answer</p>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 bg-card border border-accent/30 rounded-2xl p-8 flex flex-col items-center justify-center backface-hidden"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <span className="text-xs text-accent2 mb-4 uppercase tracking-wider">Answer</span>
          <p className="text-xl text-text text-center leading-relaxed mb-4">{item.answer}</p>
          <p className="text-sm text-muted text-center">{item.explanation}</p>

          <div className="flex gap-3 mt-8">
            {[
              { key: 'again' as const, label: '🔴 Again', color: 'bg-red-500/20 hover:bg-red-500/30 text-red-400' },
              { key: 'hard' as const, label: '🟡 Hard', color: 'bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400' },
              { key: 'good' as const, label: '🟢 Good', color: 'bg-green-500/20 hover:bg-green-500/30 text-green-400' },
              { key: 'easy' as const, label: '🔵 Easy', color: 'bg-blue-500/20 hover:bg-blue-500/30 text-blue-400' },
            ].map(({ key, label, color }) => (
              <button
                key={key}
                onClick={(e) => {
                  e.stopPropagation();
                  onRate(key);
                  setFlipped(false);
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${color}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
