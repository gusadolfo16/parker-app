import AppGrid from '@/components/AppGrid';
import PhotoGridSidebar from '@/photo/PhotoGridSidebar';
import { getPhotosMetaCached } from '@/photo/cache';
import { getDataForCategoriesCached } from '@/category/cache';
import { FEED_META_QUERY_OPTIONS } from '@/feed';
import ArtistStatementClient from './ArtistStatementClient';

export default async function ArtistStatementPage() {
  const [
    photosCount,
    categories,
  ] = await Promise.all([
    getPhotosMetaCached(FEED_META_QUERY_OPTIONS)
      .then(({ count }) => count)
      .catch(() => 0),
    getDataForCategoriesCached()
      .catch(() => ({}) as any),
  ]);

  return (
    <AppGrid
      contentMain={<ArtistStatementClient />}
      contentSide={
        <PhotoGridSidebar
          photosCount={photosCount}
          {...categories}
        />
      }
    />
  );
}
