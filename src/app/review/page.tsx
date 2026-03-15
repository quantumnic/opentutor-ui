import { getReviewItems } from '@/lib/db';
import ReviewClient from './review-client';

export default function ReviewPage() {
  const items = getReviewItems();
  return <ReviewClient items={items} />;
}
