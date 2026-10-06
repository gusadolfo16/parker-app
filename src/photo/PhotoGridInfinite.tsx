'use client';

/* eslint-disable max-len */

import { INFINITE_SCROLL_GRID_MULTIPLE } from '.';
import InfinitePhotoScroll from './InfinitePhotoScroll';
import PhotoGrid from './PhotoGrid';
import { ComponentProps } from 'react';
import { SortBy } from './sort';
import { useSelection } from '@/selection/SelectionContext';

export default function PhotoGridInfinite({
  cacheKey,
  initialOffset,
  sortBy,
  sortWithPriority,
  excludeFromFeeds,
  useCachedPhotos,
  canStart,
  animateOnFirstLoadOnly,
  ...categories
}: {
  cacheKey: string
  initialOffset: number
  sortBy?: SortBy
  sortWithPriority?: boolean
  excludeFromFeeds?: boolean
  useCachedPhotos?: boolean
  canStart?: boolean
  animateOnFirstLoadOnly?: boolean
} & Omit<ComponentProps<typeof PhotoGrid>, 'photos' | 'selectionMode' | 'selectedPhotos' | 'togglePhotoSelection'>) {
  const {
    selectionMode,
    selectedPhotos,
    togglePhotoSelection,
  } = useSelection();

  return (
    <InfinitePhotoScroll
      cacheKey={cacheKey}
      initialOffset={initialOffset}
      itemsPerPage={INFINITE_SCROLL_GRID_MULTIPLE}
      sortBy={sortBy}
      sortWithPriority={sortWithPriority}
      excludeFromFeeds={excludeFromFeeds}
      {...useCachedPhotos !== undefined && { useCachedPhotos }}
      {...categories}
    >
      {({ photos, onLastPhotoVisible }) =>
        <PhotoGrid {...{
          photos,
          ...categories,
          canStart,
          onLastPhotoVisible,
          animateOnFirstLoadOnly,
          selectionMode,
          selectedPhotos,
          togglePhotoSelection,
        }} />}
    </InfinitePhotoScroll>
  );
}
