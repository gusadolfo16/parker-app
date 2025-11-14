import { Photo, PhotoDateRange } from '@/photo';
import { Camera, createCameraKey } from '.';
import CameraHeader from './CameraHeader';
import PhotoGridContainer from '@/photo/PhotoGridContainer';

export default async function CameraOverview({
  camera,
  photos,
  count,
  dateRange,
  animateOnFirstLoadOnly,
}: {
  camera: Camera,
  photos: Photo[],
  count: number,
  dateRange?: PhotoDateRange,
  animateOnFirstLoadOnly?: boolean,
}) {
  const resolvedHeader = await CameraHeader({
    camera,
    photos,
    count,
    dateRange,
  });

  return (
    <PhotoGridContainer {...{
      cacheKey: `camera-${createCameraKey(camera)}`,
      photos,
      count,
      camera,
      animateOnFirstLoadOnly,
      header: resolvedHeader,
    }} />
  );
}
