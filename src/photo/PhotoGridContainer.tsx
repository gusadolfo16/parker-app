'use client';

import AppGrid from '@/components/AppGrid';
import PhotoGrid from './PhotoGrid';
import PhotoGridInfinite from './PhotoGridInfinite';
import { clsx } from 'clsx/lite';
import AnimateItems from '@/components/AnimateItems';
import { ComponentProps, useCallback, useState, ReactNode } from 'react';
import { GRID_SPACE_CLASSNAME } from '@/components';
import { SortBy } from './sort';
import { useSelection } from '@/selection/SelectionContext';

export default function PhotoGridContainer({
  cacheKey,
  photos,
  count,
  sortBy,
  sortWithPriority,
  excludeFromFeeds,
  animateOnFirstLoadOnly,
  prioritizeInitialPhotos,
  header,
  sidebar,
  userEmail,
  ...categories
}: {
  cacheKey: string
  count: number
  sortBy?: SortBy
  sortWithPriority?: boolean
  excludeFromFeeds?: boolean
  animateOnFirstLoadOnly?: boolean
  prioritizeInitialPhotos?: boolean
  header?: ReactNode
  sidebar?: ReactNode
  userEmail?: string
} & ComponentProps<typeof PhotoGrid>) {
  const {
    selectionMode,
    selectedPhotos,
    togglePhotoSelection,
  } = useSelection();

  const [
    shouldAnimateDynamicItems,
    setShouldAnimateDynamicItems,
  ] = useState(false);

  const onAnimationComplete = useCallback(() =>
    setShouldAnimateDynamicItems(true), []);

  return (
    <>
      {header &&
        <div className='max-w-[1280px] 3xl:w-[1280px] 3xl:translate-x-[163px] mx-auto mb-6 grid grid-cols-1 md:grid-cols-12 gap-x-4 lg:gap-x-6'>
          <div className='col-span-1 md:col-span-9'>
            <AnimateItems
              type="bottom"
              items={[header]}
              animateOnFirstLoadOnly
            />
          </div>
        </div>
      }
      <AppGrid
        contentMain={<div className={GRID_SPACE_CLASSNAME}>
          <PhotoGrid {...{
            photos,
            ...categories,
            animateOnFirstLoadOnly,
            prioritizeInitialPhotos,
            onAnimationComplete,
            selectionMode,
            selectedPhotos,
            togglePhotoSelection,
            userEmail,
          }} />
          {count > photos.length && (
            <PhotoGridInfinite {...{
              cacheKey,
              initialOffset: photos.length,
              sortBy,
              sortWithPriority,
              excludeFromFeeds,
              ...categories,
              canStart: shouldAnimateDynamicItems,
              animateOnFirstLoadOnly,
            }} />
          )}
        </div>}
        contentSide={sidebar}
      />
    </>
  );
}
