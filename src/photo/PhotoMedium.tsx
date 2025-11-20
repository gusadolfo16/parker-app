'use client';

import {
  Photo,
  altTextForPhoto,
  doesPhotoNeedBlurCompatibility,
} from '.';
import { PhotoSetCategory } from '../category';
import ImageMedium from '@/components/image/ImageMedium';
import { clsx } from 'clsx/lite';
import { pathForPhoto } from '@/app/path';
import { SHOULD_PREFETCH_ALL_LINKS } from '@/app/config';
import { useRef } from 'react';
import useVisible from '@/utility/useVisible';
import LinkWithStatus from '@/components/LinkWithStatus';
import Spinner from '@/components/Spinner';
import PhotoColors from './color/PhotoColors';
import PhotoTags from '@/tag/PhotoTags';
import { sortTagsArray } from '@/tag';

export default function PhotoMedium({
  photo,
  selected,
  priority,
  prefetch = SHOULD_PREFETCH_ALL_LINKS,
  className,
  onVisible,
  debugColor,
  ...categories
}: {
  photo: Photo
  selected?: boolean
  priority?: boolean
  prefetch?: boolean
  className?: string
  onVisible?: () => void
  debugColor?: boolean
} & PhotoSetCategory) {
  const ref = useRef<HTMLAnchorElement>(null);

  useVisible({ ref, onVisible });

  const tags = sortTagsArray(photo.tags);

  return (
    <div className={clsx(
      'group relative',
      className,
    )}>
      <LinkWithStatus
        ref={ref}
        href={pathForPhoto({ photo, ...categories })}
        className={clsx(
          'block',
          'active:brightness-75',
          selected && 'brightness-50',
        )}
        prefetch={prefetch}
      >
        {({ isLoading }) =>
          <div className="w-full h-full relative block">
            {isLoading &&
              <div className={clsx(
                'absolute inset-0 flex items-center justify-center',
                'text-white bg-black/25 backdrop-blur-xs',
                'animate-fade-in',
                'z-10',
              )}>
                <Spinner size={20} color="text" />
              </div>}
            {debugColor && photo.colorData &&
              <div className={clsx(
                'absolute inset-2 z-10',
                'opacity-0 group-hover:opacity-100 transition-opacity',
              )}>
                <PhotoColors
                  className="justify-end"
                  colorData={photo.colorData}
                />
              </div>}
            <ImageMedium
              src={photo.url}
              aspectRatio={photo.aspectRatio}
              blurDataURL={photo.blurData}
              blurCompatibilityMode={doesPhotoNeedBlurCompatibility(photo)}
              className="flex object-cover w-full h-full"
              classNameImage="object-cover w-full h-full"
              alt={altTextForPhoto(photo)}
              priority={priority}
            />
          </div>}
      </LinkWithStatus>
      {tags.length > 0 &&
        <div className={clsx(
          'absolute inset-x-0 bottom-0 z-10',
          'pb-2 pt-8 px-2',
          'bg-gradient-to-t from-black/50 to-transparent',
          'opacity-0 group-hover:opacity-100 transition-opacity',
          'pointer-events-none', // Allow clicks to pass through to photo link
        )}>
          <div className="pointer-events-auto"> {/* Re-enable clicks for tags */}
            <PhotoTags
              tags={tags}
              contrast="high"
              badged
            />
          </div>
        </div>}
    </div>
  );
};
