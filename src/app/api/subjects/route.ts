import { NextResponse } from 'next/server';
import { getSubjects } from '@/lib/db';

export async function GET() {
  const subjects = getSubjects();
  return NextResponse.json(subjects);
}
