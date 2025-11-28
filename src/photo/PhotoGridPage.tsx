import { Photo } from '.';
import { PhotoSetCategory } from '../category';
import PhotoMedium from './PhotoMedium';
import { clsx } from 'clsx/lite';
import AnimateItems from '@/components/AnimateItems';
import { GRID_ASPECT_RATIO } from '@/app/config';
import { ReactNode } from 'react';
import { GRID_GAP_CLASSNAME } from '@/components';
import SelectTileOverlay from '@/components/SelectTileOverlay';

export default function PhotoGridPage({
  photos,
  selectedPhoto,
  prioritizeInitialPhotos,
  animate = true,
  canStart,
  animateOnFirstLoadOnly,
  staggerOnFirstLoadOnly = true,
  additionalTile,
  small,
  onLastPhotoVisible,
  onAnimationComplete,
  isGridHighDensity,
  selectionMode,
  selectedPhotos,
  togglePhotoSelection,
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
  onLastPhotoVisible?: () => void
  onAnimationComplete?: () => void
  isGridHighDensity?: boolean
  selectionMode?: boolean
  selectedPhotos?: Photo[]
  togglePhotoSelection?: (photo: Photo) => void
} & PhotoSetCategory) {
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
      items={photos.map((photo, index) => {
        const isSelected = selectedPhotos?.some(p => p.id === photo.id);
        const isLocked = photo.lockedBy != null;
        return <div
          key={photo.id}
          className={clsx(
            'relative overflow-hidden',
            'group',
            isSelected && 'border-4 border-green-500', // Added green border
            isLocked && 'grayscale cursor-not-allowed',
          )}
          style={{
            ...GRID_ASPECT_RATIO !== 0 && {
              aspectRatio: GRID_ASPECT_RATIO,
            },
          }}
        >
          <PhotoMedium
            className={clsx(
              'w-full h-full',
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
              isSelected={isSelected ?? false}
              onSelectChange={() => !isLocked && togglePhotoSelection?.(photo)}
              disabled={isLocked}
            />}
        </div>;
      }).concat(additionalTile ? <>{additionalTile}</> : [])}
      itemKeys={photos.map(photo => photo.id)
        .concat(additionalTile ? ['more'] : [])}
    />
  );
}