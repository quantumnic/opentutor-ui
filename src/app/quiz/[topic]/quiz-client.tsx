'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, ArrowRight, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import QuizOption from '@/components/QuizOption';
import type { QuizQuestion } from '@/lib/types';

export default function QuizClient({ questions, topicId }: { questions: QuizQuestion[]; topicId: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [fillAnswer, setFillAnswer] = useState('');

  if (questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <p className="text-muted text-lg mb-4">No quiz questions available.</p>
        <Link href="/subjects" className="text-accent hover:underline">← Back to subjects</Link>
      </div>
    );
  }

  const question = questions[currentIndex];
  const isCorrect = question.type === 'fill_blank'
    ? fillAnswer.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim()
    : selected === question.correctAnswer;

  const handleSubmit = () => {
    if (showResult) {
      // Next question
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setSelected(null);
        setShowResult(false);
        setFillAnswer('');
      } else {
        setFinished(true);
      }
    } else {
      setShowResult(true);
      if (isCorrect) setScore(prev => prev + 1);
    }
  };

  if (finished) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="max-w-xl mx-auto text-center py-12">
        {/* Confetti */}
        {percentage >= 70 && (
          <div className="fixed inset-0 pointer-events-none overflow-hidden">
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={i}
                className="absolute animate-confetti"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  fontSize: '24px',
                }}
              >
                {['🎉', '✨', '🌟', '💫', '🎊'][Math.floor(Math.random() * 5)]}
              </div>
            ))}
          </div>
        )}

        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
          <Trophy className="w-16 h-16 text-warning mx-auto mb-4" />
        </motion.div>
        <h1 className="text-3xl font-bold text-text mb-2">Quiz Complete!</h1>
        <p className="text-muted text-lg mb-6">
          You scored <span className="text-accent font-bold">{score}</span> out of <span className="font-bold">{questions.length}</span>
        </p>

        <div className="w-32 h-32 mx-auto mb-8 relative">
          <svg viewBox="0 0 100 100" className="-rotate-90">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#1E1E2E" strokeWidth="8" />
            <motion.circle
              cx="50" cy="50" r="45" fill="none"
              stroke={percentage >= 70 ? '#10B981' : percentage >= 40 ? '#F59E0B' : '#EF4444'}
              strokeWidth="8" strokeLinecap="round"
              strokeDasharray={283}
              initial={{ strokeDashoffset: 283 }}
              animate={{ strokeDashoffset: 283 - (283 * percentage / 100) }}
              transition={{ duration: 1.5 }}
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-text">
            {percentage}%
          </span>
        </div>

        <div className="flex gap-3 justify-center">
          <button
            onClick={() => { setCurrentIndex(0); setScore(0); setFinished(false); setSelected(null); setShowResult(false); setFillAnswer(''); }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-card border border-border text-text hover:bg-border transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            Retry
          </button>
          <Link href="/subjects" className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-white hover:bg-accent/80 transition-all">
            Continue Learning
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-muted text-sm">Question {currentIndex + 1} of {questions.length}</span>
        <span className="text-accent text-sm font-medium">Score: {score}</span>
      </div>
      <div className="w-full bg-border rounded-full h-1.5 mb-8">
        <motion.div
          className="h-full rounded-full bg-accent"
          animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <h2 className="text-xl font-semibold text-text mb-6">{question.question}</h2>

          {question.type === 'multiple_choice' && question.options && (
            <div className="space-y-3">
              {question.options.map((option, i) => (
                <QuizOption
                  key={i}
                  option={option}
                  index={i}
                  selected={selected === option}
                  correct={showResult ? option === question.correctAnswer : null}
                  showResult={showResult}
                  onClick={() => !showResult && setSelected(option)}
                />
              ))}
            </div>
          )}

          {question.type === 'true_false' && (
            <div className="grid grid-cols-2 gap-4">
              {['true', 'false'].map(val => (
                <button
                  key={val}
                  onClick={() => !showResult && setSelected(val)}
                  className={`p-6 rounded-xl border text-lg font-semibold transition-all ${
                    showResult && val === question.correctAnswer
                      ? 'border-success bg-success/10 text-success'
                      : showResult && selected === val && val !== question.correctAnswer
                      ? 'border-red-500 bg-red-500/10 text-red-400'
                      : selected === val
                      ? 'border-accent bg-accent/10 text-accent'
                      : 'border-border bg-card text-text hover:border-accent/50'
                  }`}
                >
                  {val === 'true' ? '✓ True' : '✗ False'}
                </button>
              ))}
            </div>
          )}

          {question.type === 'fill_blank' && (
            <input
              type="text"
              value={fillAnswer}
              onChange={e => setFillAnswer(e.target.value)}
              disabled={showResult}
              placeholder="Type your answer..."
              className={`w-full p-4 rounded-xl border bg-card text-text text-lg outline-none transition-all ${
                showResult && isCorrect ? 'border-success' :
                showResult && !isCorrect ? 'border-red-500' :
                'border-border focus:border-accent'
              }`}
            />
          )}

          {/* Feedback */}
          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-4 p-4 rounded-xl ${
                isCorrect ? 'bg-success/10 border border-success/30' : 'bg-red-500/10 border border-red-500/30'
              }`}
            >
              <p className={`font-semibold ${isCorrect ? 'text-success' : 'text-red-400'}`}>
                {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
              </p>
              <p className="text-muted text-sm mt-1">{question.explanation}</p>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={!showResult && !selected && !fillAnswer.trim()}
        className="w-full mt-6 py-3 rounded-xl bg-accent hover:bg-accent/80 text-white font-medium transition-all disabled:opacity-30"
      >
        {showResult ? (currentIndex < questions.length - 1 ? 'Next Question →' : 'See Results') : 'Check Answer'}
      </button>
    </div>
  );
}
