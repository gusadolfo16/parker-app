'use client';

import { useSelection } from '@/selection/SelectionContext';
import PhotoGridPage from '@/photo/PhotoGridPage';
import { Photo } from '@/photo';
import { PhotoSetCategories } from '@/category';
import { USER_DEFAULT_SORT_OPTIONS } from '@/app/config';
import AppGrid from '@/components/AppGrid';
import PhotoGridSidebar from '@/photo/PhotoGridSidebar';
import { SortBy } from '@/photo/sort';

export default function HomePageClient({
  photos,
  photosCount,
  photosCountWithExcludes,
  categories,
  sortBy = USER_DEFAULT_SORT_OPTIONS.sortBy,
  sortWithPriority = USER_DEFAULT_SORT_OPTIONS.sortWithPriority,
}: {
  photos: Photo[],
  photosCount: number,
  photosCountWithExcludes: number,
  categories: PhotoSetCategories,
  sortBy?: SortBy
  sortWithPriority?: boolean
}) {
  const {
    selectionMode,
    selectedPhotos,
    togglePhotoSelection,
  } = useSelection();

  return (
    <AppGrid
      contentMain={
        <PhotoGridPage
          photos={photos}
          sortBy={sortBy}
          sortWithPriority={sortWithPriority}
          selectionMode={selectionMode}
          selectedPhotos={selectedPhotos}
          togglePhotoSelection={togglePhotoSelection}
          {...categories}
        />
      }
      contentSide={
        <PhotoGridSidebar {...categories} photosCount={photosCount} />
      }
    />
  );
}
