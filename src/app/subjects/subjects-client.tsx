'use client';

import { motion } from 'framer-motion';
import SubjectCard from '@/components/SubjectCard';
import type { Subject } from '@/lib/types';

export default function SubjectsClient({ subjects }: { subjects: Subject[] }) {
  return (
    <div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-3xl font-bold text-text mb-2">Subjects</h1>
        <p className="text-muted mb-8">Explore 13 subjects across science, humanities, and more.</p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {subjects.map((subject, i) => (
          <SubjectCard key={subject.id} subject={subject} index={i} />
        ))}
      </div>
    </div>
  );
}
