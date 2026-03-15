import { NextResponse } from 'next/server';
import { getQuizQuestions } from '@/lib/db';

export async function GET(_req: Request, { params }: { params: { topic: string } }) {
  const questions = getQuizQuestions(params.topic);
  return NextResponse.json(questions);
}
