import AppGrid from '@/components/AppGrid';
import PhotoGridSidebar from '@/photo/PhotoGridSidebar';
import { getPhotosMetaCached } from '@/photo/cache';
import { getDataForCategoriesCached } from '@/category/cache';
import { FEED_META_QUERY_OPTIONS } from '@/feed';
import UserGuideClient from './UserGuideClient';

export default async function UserGuidePage() {
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
      contentMain={<UserGuideClient />}
      contentSide={
        <PhotoGridSidebar
          photosCount={photosCount}
          {...categories}
        />
      }
    />
  );
}
