import { NextResponse } from 'next/server';
import { getReviewItems } from '@/lib/db';

export async function GET() {
  const items = getReviewItems();
  return NextResponse.json(items);
}
