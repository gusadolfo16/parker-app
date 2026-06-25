import { Photo } from '@/photo';
import { ImageResponse } from 'next/og';
import { JSX } from 'react';



const isNextImageReadyBasedOnPhotos = async (
  photos: Photo[],
): Promise<boolean> =>
  photos.length > 0;

export const safePhotoImageResponse = async (
  photos: Photo[],
  jsx: (isNextImageReady: boolean) => JSX.Element,
  options: ConstructorParameters<typeof ImageResponse>[1],
) => {
  // Make sure next/image can be reached from absolute urls,
  // which may not exist on first pre-render
  const isNextImageReady = await isNextImageReadyBasedOnPhotos(photos);

  return new ImageResponse(
    jsx(isNextImageReady),
    options,
  );
};
