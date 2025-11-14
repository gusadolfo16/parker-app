'use server';

import {
  getPhotos,
  getPhotosInNeedOfUpdate,
  getPhotosMeta,
  getUniqueCameras,
  getUniqueLenses,
  unlockAllPhotos,
  getPhoto,
} from '@/photo/db/query';
import { UPDATED_BEFORE_01 } from '@/photo/update';
import { revalidateAdminPaths, revalidateAllKeysAndPaths } from '@/photo/cache';
import {
  getStoragePhotoUrls,
  getStorageUploadUrls,
  testStorageConnection,
  deleteFile,
} from '@/platforms/storage';

export const getAdminDataAction = async () => {
  const [
    photos,
    photosTop,
    photosUpdated,
    cameras,
    lenses,
    { count, dateRange },
  ] = await Promise.all([
    getPhotos({ hidden: 'include' }),
    getPhotos({ sortWithPriority: true }),
    getPhotosInNeedOfUpdate(UPDATED_BEFORE_01.toISOString()),
    getUniqueCameras(),
    getUniqueLenses(),
    getPhotosMeta(),
  ]);

  return {
    photos,
    photosTop,
    photosUpdated,
    childPhotos: [],
    cameras,
    lenses,
    count,
    dateRange,
  };
};

export type AdminData = Awaited<ReturnType<typeof getAdminDataAction>>;

export const clearAllSelectionsAction = async () => {
  await unlockAllPhotos();
  revalidateAdminPaths();
};

export const revalidateAdminPathAction = async () => {
  revalidateAdminPaths();
};

export const testConnectionsAction = async () => {
  const storageError = await testStorageConnection();
  return {
    storageError,
  };
};

export const getSignedStorageUrlsAction = async (
  photoIds: string[],
  photoIdsToResign: string[],
) => {
  const [
    urlsUpload,
    urlsResign,
  ] = await Promise.all([
    getStorageUploadUrls(),
    getStoragePhotoUrls(),
  ]);
  return {
    urlsUpload,
    urlsResign,
  };
};

export const deleteStoragePhotosAction = async (photoIds: string[]) => {
  for (const photoId of photoIds) {
    const photo = await getPhoto(photoId);
    if (photo) {
      await deleteFile(photo.url);
    }
  }
  revalidateAllKeysAndPaths();
};
