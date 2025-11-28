'use client';

import { Photo } from '.';
import { PhotoSetCategory } from '../category';
import PhotoMedium from './PhotoMedium';
import { clsx } from 'clsx/lite';
import { GRID_ASPECT_RATIO } from '@/app/config';
import SelectTileOverlay from '@/components/SelectTileOverlay';
import { ReactNode } from 'react';

export default function PhotoGrid({
  photos,
  small,
  isGridHighDensity,
  selectionMode,
  selectedPhotos,
  togglePhotoSelection,
  prioritizeInitialPhotos,
  additionalTile,
  ...categories
}: {
  photos: Photo[],
  small?: boolean,
  isGridHighDensity?: boolean,
  selectionMode?: boolean,
  selectedPhotos?: Photo[],
  togglePhotoSelection?: (photo: Photo) => void,
  prioritizeInitialPhotos?: boolean,
  additionalTile?: ReactNode,
} & PhotoSetCategory) {
  return (
    <div className={clsx(
      'grid',
      small
        ? 'grid-cols-3 xs:grid-cols-6'
        : isGridHighDensity
          ? 'grid-cols-2 xs:grid-cols-4 lg:grid-cols-6'
          : 'grid-cols-2 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4',
      'items-center',
      'gap-1'
    )}>
      {photos.map((photo, index) => {
        const isSelected = selectedPhotos?.some(p => p.id === photo.id);
        const isLocked = photo.lockedBy != null;
        return <div
          key={photo.id}
          className={clsx(
            'relative overflow-hidden',
            'group',
            isSelected && 'border-4 border-green-500',
            isLocked && 'grayscale cursor-not-allowed',
          )}
          style={{
            ...GRID_ASPECT_RATIO !== 0 && {
              aspectRatio: GRID_ASPECT_RATIO,
            },
          }}
        >
          <PhotoMedium
            className="w-full h-full"
            photo={photo}
            priority={prioritizeInitialPhotos ? index < 6 : undefined}
            {...categories}
          />
          {selectionMode &&
            <SelectTileOverlay
              isSelected={isSelected ?? false}
              onSelectChange={() => !isLocked && togglePhotoSelection?.(photo)}
              disabled={isLocked}
            />}
        </div>;
      })}
      {additionalTile}
    </div>
  );
}