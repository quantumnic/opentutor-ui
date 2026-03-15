import { NextResponse } from 'next/server';
import { searchTopics } from '@/lib/db';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q') || '';
  const results = searchTopics(query);
  return NextResponse.json(results);
}
