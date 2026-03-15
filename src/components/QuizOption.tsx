'use client';

import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

interface QuizOptionProps {
  option: string;
  index: number;
  selected: boolean;
  correct: boolean | null;
  showResult: boolean;
  onClick: () => void;
}

export default function QuizOption({ option, index, selected, correct, showResult, onClick }: QuizOptionProps) {
  const letters = ['A', 'B', 'C', 'D'];

  let borderColor = 'border-border hover:border-accent/50';
  let bgColor = 'bg-card';
  if (showResult && selected && correct) {
    borderColor = 'border-success';
    bgColor = 'bg-success/10';
  } else if (showResult && selected && !correct) {
    borderColor = 'border-red-500';
    bgColor = 'bg-red-500/10';
  } else if (showResult && correct) {
    borderColor = 'border-success/50';
    bgColor = 'bg-success/5';
  } else if (selected) {
    borderColor = 'border-accent';
    bgColor = 'bg-accent/10';
  }

  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={onClick}
      disabled={showResult}
      className={`w-full flex items-center gap-4 p-4 rounded-xl border ${borderColor} ${bgColor} transition-all text-left`}
    >
      <span className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
        selected ? 'bg-accent text-white' : 'bg-bg text-muted'
      }`}>
        {letters[index]}
      </span>
      <span className="text-text flex-1">{option}</span>
      {showResult && selected && (
        correct
          ? <Check className="w-5 h-5 text-success" />
          : <X className="w-5 h-5 text-red-500" />
      )}
    </motion.button>
  );
}
