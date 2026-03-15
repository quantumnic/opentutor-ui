'use client';

import { motion } from 'framer-motion';
import { BookmarkPlus, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import type { Topic, Subject } from '@/lib/types';

export default function ExplainClient({
  topic,
  related,
  subjects,
  conceptName,
}: {
  topic: Topic | null;
  related: Topic[];
  subjects: Subject[];
  conceptName: string;
}) {
  if (!topic) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <p className="text-muted text-lg mb-4">No explanation found for &quot;{conceptName}&quot;.</p>
        <Link href="/subjects" className="text-accent hover:underline">Browse subjects →</Link>
      </div>
    );
  }

  const subject = subjects.find(s => s.id === topic.subject);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="lg:col-span-2"
        >
          <div className="flex items-center gap-2 mb-4">
            {subject && <span className="text-2xl">{subject.icon}</span>}
            <span className="text-sm text-accent">{subject?.name || topic.subject}</span>
          </div>

          <h1 className="text-3xl font-bold text-text mb-6">{topic.title}</h1>

          <div className="prose prose-invert max-w-none">
            <p className="text-text/90 text-lg leading-relaxed">{topic.content}</p>
          </div>

          <div className="flex gap-3 mt-8">
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent/20 hover:bg-accent/30 text-accent transition-all font-medium">
              <BookmarkPlus className="w-4 h-4" />
              Add to Review
            </button>
            <Link
              href={`/quiz/${topic.id}`}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-card border border-border hover:border-accent/50 text-text transition-all font-medium"
            >
              <ExternalLink className="w-4 h-4" />
              Take Quiz
            </Link>
          </div>
        </motion.div>

        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-card border border-border rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-text mb-3">Related Topics</h3>
            {related.length > 0 ? (
              <div className="space-y-2">
                {related.map(t => (
                  <Link
                    key={t.id}
                    href={`/explain/${encodeURIComponent(t.title.replace(/ /g, '-'))}`}
                    className="block p-3 rounded-xl bg-bg hover:bg-border text-text text-sm transition-all"
                  >
                    {t.title}
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-muted text-sm">No related topics found.</p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
