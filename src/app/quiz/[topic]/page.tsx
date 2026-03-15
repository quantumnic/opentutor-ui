import { getQuizQuestions } from '@/lib/db';
import QuizClient from './quiz-client';

export default function QuizPage({ params }: { params: { topic: string } }) {
  const questions = getQuizQuestions(params.topic);
  return <QuizClient questions={questions} topicId={params.topic} />;
}
