import { NextResponse } from 'next/server';
import { getDailyPlan } from '@/lib/db';

export async function GET() {
  const plan = getDailyPlan();
  return NextResponse.json(plan);
}
