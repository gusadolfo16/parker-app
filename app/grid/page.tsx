import { generateOgImageMetaForPhotos } from '@/photo';
import PhotosEmptyState from '@/photo/PhotosEmptyState';
import { Metadata } from 'next/types';
import { getDataForCategoriesCached } from '@/category/cache';
import { getPhotosMetaCached, getPhotosNoStore } from '@/photo/cache';
import { FEED_META_QUERY_OPTIONS, getFeedQueryOptions } from '@/feed';
import { getAppText } from '@/i18n/state/server';
import HomePageClient from '@/app/HomePageClient';

// Render dynamically so the initial grid batch reads `locked_by` live from
// the DB on each request (via `getPhotosNoStore`), keeping the auction
// "locked" badge fresh. Metadata/category reads stay cached (they don't
// change on a lock). This does NOT reintroduce ISR writes; cache.ts stays
// `revalidate: false`.
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const getPhotosLive = () => getPhotosNoStore(getFeedQueryOptions({
  isGrid: true,
}));

export async function generateMetadata(): Promise<Metadata> {
  const photos = await getPhotosLive()
    .catch(() => []);
  return generateOgImageMetaForPhotos(photos);
}

export default async function GridPage() {
  const [
    photos,
    photosCount,
    photosCountWithExcludes,
    categories,
    appText,
  ] = await Promise.all([
    getPhotosLive()
      .catch(() => []),
    getPhotosMetaCached(FEED_META_QUERY_OPTIONS)
      .then(({ count }) => count)
      .catch(() => 0),
    getPhotosMetaCached()
      .then(({ count }) => count)
      .catch(() => 0),
    getDataForCategoriesCached(),
    getAppText(),
  ]);

  return (
    photos.length > 0
      ? <HomePageClient
        {...{
          photos,
          photosCount,
          _photosCountWithExcludes: photosCountWithExcludes,
          categories,
        }}
      />
      : <PhotosEmptyState appText={appText.onboarding} />
  );
}
