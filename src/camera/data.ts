import { cameraFromPhoto, formatCameraParams } from '.';
import {
  getPhotosCached,
  getPhotosMetaCached,
} from '@/photo/cache';

export const getPhotosCameraDataCached = async (
  make: string,
  model: string,
  limit: number,
) => {
  const camera = formatCameraParams({ make, model });
  return Promise.all([
    getPhotosCached({ camera, limit }),
    getPhotosMetaCached({ camera }),
  ])
    .then(([photos, meta]) => [
      photos,
      meta,
      photos.length > 0 ? cameraFromPhoto(photos[0], camera) : camera,
    ] as const);
};
