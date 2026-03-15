import { NextResponse } from 'next/server';
import { getProgressStats } from '@/lib/db';

export async function GET() {
  const stats = getProgressStats();
  return NextResponse.json(stats);
}
