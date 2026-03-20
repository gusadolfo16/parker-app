/* eslint-disable max-len */
import AppGrid from '@/components/AppGrid';
import PhotoGridSidebar from '@/photo/PhotoGridSidebar';
import { getPhotosMetaCached } from '@/photo/cache';
import { getDataForCategoriesCached } from '@/category/cache';
import { FEED_META_QUERY_OPTIONS } from '@/feed';
import { getAppText } from '@/i18n/state/server';

export default async function ArtistStatementPage() {
  const appText = await getAppText();
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
      contentMain={
        <div className="space-y-6 max-w-2xl mx-auto py-4">
          <h1 className="text-3xl font-bold">{appText.artistStatementPage.title}</h1>

          <div className="space-y-4 text-lg leading-relaxed text-dim">
            <p>{appText.artistStatementPage.p1}</p>
            <p>{appText.artistStatementPage.p2}</p>
            <p>{appText.artistStatementPage.p3}</p>
          </div>

          <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
            <p className="font-medium text-dim">{appText.artistStatementPage.author}</p>
          </div>
        </div>
      }
      contentSide={
        <PhotoGridSidebar
          photosCount={photosCount}
          {...categories}
        />
      }
    />
  );
}
