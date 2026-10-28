import { generateOgImageMetaForPhotos } from '@/photo';
import PhotosEmptyState from '@/photo/PhotosEmptyState';
import { Metadata } from 'next/types';
import HomePageClient from '@/app/HomePageClient';
import { getDataForCategoriesCached } from '@/category/cache';
import { getPhotosMetaCached, getPhotosNoStore } from '@/photo/cache';
import { SortProps } from '@/photo/sort';
import { getSortOptionsFromParams } from '@/photo/sort/path';
import { FEED_META_QUERY_OPTIONS, getFeedQueryOptions } from '@/feed';
import { PhotoQueryOptions } from '@/photo/db';
import { getAppText } from '@/i18n/state/server';

// Render dynamically so the initial grid batch reads `locked_by` live from
// the DB on each request (via `getPhotosNoStore`), keeping the auction
// "locked" badge fresh. Metadata/category reads stay cached (they don't
// change on a lock). This does NOT reintroduce ISR writes; cache.ts stays
// `revalidate: false`.
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const getPhotosLive = (options: PhotoQueryOptions) =>
  getPhotosNoStore(getFeedQueryOptions({
    isGrid: true,
    ...options,
  }));

export async function generateMetadata({
  params,
}: SortProps): Promise<Metadata> {
  const sortOptions = await getSortOptionsFromParams(params);
  const photos = await getPhotosLive(sortOptions)
    .catch(() => []);
  return generateOgImageMetaForPhotos(photos);
}

export default async function GridPage({ params }: SortProps) {
  const sortOptions = await getSortOptionsFromParams(params);
  const [
    photos,
    photosCount,
    photosCountWithExcludes,
    categories,
    appText,
  ] = await Promise.all([
    getPhotosLive(sortOptions)
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
          ...sortOptions,
        }}
      />
      : <PhotosEmptyState appText={appText.onboarding} />
  );
}
