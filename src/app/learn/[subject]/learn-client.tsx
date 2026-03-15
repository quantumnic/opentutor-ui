'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Check, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import type { Topic, Subject } from '@/lib/types';

export default function LearnClient({
  topics,
  subject,
  subjectId,
}: {
  topics: Topic[];
  subject: Subject | null;
  subjectId: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  if (topics.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <p className="text-muted text-lg mb-4">No topics found for this subject.</p>
        <Link href="/subjects" className="text-accent hover:underline">← Back to subjects</Link>
      </div>
    );
  }

  const topic = topics[currentIndex];

  const goNext = () => {
    if (currentIndex < topics.length - 1) {
      setDirection(1);
      setCurrentIndex(prev => prev + 1);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(prev => prev - 1);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Link href="/subjects" className="text-muted hover:text-text transition-all flex items-center gap-1">
          <ChevronLeft className="w-4 h-4" />
          Back
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-2xl">{subject?.icon}</span>
          <span className="text-text font-semibold">{subject?.name || subjectId}</span>
        </div>
        <span className="text-muted text-sm">{currentIndex + 1} / {topics.length}</span>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-border rounded-full h-1.5 mb-8">
        <motion.div
          className="h-full rounded-full bg-accent"
          animate={{ width: `${((currentIndex + 1) / topics.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Topic card */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={topic.id}
          custom={direction}
          initial={{ opacity: 0, x: direction * 200 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -200 }}
          transition={{ duration: 0.3 }}
          className="bg-card border border-border rounded-2xl p-8"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              topic.learned ? 'bg-success/20 text-success' : 'bg-accent/20 text-accent'
            }`}>
              {topic.learned ? 'Learned' : 'New'}
            </span>
            <span className="text-xs text-muted">
              Difficulty: {'⭐'.repeat(topic.difficulty)}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-text mb-4">{topic.title}</h2>
          <p className="text-text/90 leading-relaxed text-lg">{topic.content}</p>
        </motion.div>
      </AnimatePresence>

      {/* Actions */}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={goPrev}
          disabled={currentIndex === 0}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-card border border-border text-muted hover:text-text disabled:opacity-30 transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-success/20 hover:bg-success/30 text-success transition-all font-medium">
            <Check className="w-4 h-4" />
            Got it!
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-warning/20 hover:bg-warning/30 text-warning transition-all font-medium">
            <RotateCcw className="w-4 h-4" />
            Review Later
          </button>
        </div>

        <button
          onClick={goNext}
          disabled={currentIndex === topics.length - 1}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-accent hover:bg-accent/80 text-white disabled:opacity-30 transition-all"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Quiz link */}
      <div className="text-center mt-8">
        <Link
          href={`/quiz/${topic.id}`}
          className="text-accent2 hover:text-accent2/80 text-sm transition-all"
        >
          Take a quiz on this topic →
        </Link>
      </div>
    </div>
  );
}
