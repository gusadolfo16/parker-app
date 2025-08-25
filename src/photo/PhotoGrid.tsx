'use client';

import { Photo } from '.';
import { PhotoSetCategory } from '../category';
import PhotoMedium from './PhotoMedium';
import { clsx } from 'clsx/lite';
import AnimateItems from '@/components/AnimateItems';
import { GRID_ASPECT_RATIO } from '@/app/config';
import { useAppState } from '@/app/AppState';
import { useSelection } from '@/selection/SelectionContext';
import SelectTileOverlay from '@/components/SelectTileOverlay';
import { ReactNode } from 'react';
import { GRID_GAP_CLASSNAME } from '@/components';

export default function PhotoGrid({
  photos,
  selectedPhoto,
  prioritizeInitialPhotos,
  animate = true,
  canStart,
  animateOnFirstLoadOnly,
  staggerOnFirstLoadOnly = true,
  additionalTile,
  small,
  canSelect,
  onLastPhotoVisible,
  onAnimationComplete,
  ...categories
}: {
  photos: Photo[]
  selectedPhoto?: Photo
  prioritizeInitialPhotos?: boolean
  animate?: boolean
  canStart?: boolean
  animateOnFirstLoadOnly?: boolean
  staggerOnFirstLoadOnly?: boolean
  additionalTile?: ReactNode
  small?: boolean
  canSelect?: boolean
  onLastPhotoVisible?: () => void
  onAnimationComplete?: () => void
} & PhotoSetCategory) {
  const {
    isUserSignedIn,
    isGridHighDensity,
  } = useAppState();

  const {
    selectionMode,
    selectedPhotos,
    togglePhotoSelection,
  } = useSelection();

  return (
    <AnimateItems
      className={clsx(
        'grid',
        GRID_GAP_CLASSNAME,
        small
          ? 'grid-cols-3 xs:grid-cols-6'
          : isGridHighDensity
            ? 'grid-cols-2 xs:grid-cols-4 lg:grid-cols-6'
            : 'grid-cols-2 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4',
        'items-center',
      )}
      type={animate === false ? 'none' : undefined}
      canStart={canStart}
      duration={0.7}
      staggerDelay={0.04}
      distanceOffset={40}
      animateOnFirstLoadOnly={animateOnFirstLoadOnly}
      staggerOnFirstLoadOnly={staggerOnFirstLoadOnly}
      onAnimationComplete={onAnimationComplete}
      items={photos.map((photo, index) =>{
        const isSelected = selectedPhotos.some(p => p.id === photo.id);
        return <div
          key={photo.id}
          className={clsx(
            'flex relative overflow-hidden',
            'group',
            isSelected && 'border-4 border-green-500', // Added green border
          )}
          style={{
            ...GRID_ASPECT_RATIO !== 0 && {
              aspectRatio: GRID_ASPECT_RATIO,
            },
          }}
        >
          <PhotoMedium
            className={clsx(
              'flex w-full h-full',
              // Prevent photo navigation when selecting
              selectionMode && 'pointer-events-none',
            )}
            {...{
              photo,
              ...categories,
              selected: photo.id === selectedPhoto?.id,
              priority: prioritizeInitialPhotos ? index < 6 : undefined,
              onVisible: index === photos.length - 1
                ? onLastPhotoVisible
                : undefined,
            }}
          />
          {selectionMode &&
            <SelectTileOverlay
              isSelected={isSelected}
              onSelectChange={() => togglePhotoSelection(photo)}
            />}
        </div>;
      }).concat(additionalTile ? <>{additionalTile}</> : [])}
      itemKeys={photos.map(photo => photo.id)
        .concat(additionalTile ? ['more'] : [])}
    />
  );
};
