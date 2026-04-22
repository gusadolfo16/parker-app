import { getPhotosCached } from '@/photo/cache';
import { SITE_FEEDS_ENABLED } from '@/app/config';
import { formatFeedJson } from '@/feed/json';
import { PROGRAMMATIC_QUERY_OPTIONS } from '@/feed';

// Cache for 7 days (reduced from 1 day to save Vercel ISR Writes)
export const revalidate = 604_800;

export async function GET() {
  if (SITE_FEEDS_ENABLED) {
    const photos = await getPhotosCached(PROGRAMMATIC_QUERY_OPTIONS)
      .catch(() => []);
    return Response.json(formatFeedJson(photos));
  } else {
    return new Response('Feeds disabled', { status: 404 });
  }
}
