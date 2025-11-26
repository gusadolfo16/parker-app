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

export const cleanAllUsersAction = async () => {
  const { query } = await import('@/platforms/postgres');

  try {
    // 1. Unlock all photos
    await query(`
      UPDATE photos
      SET locked_by = NULL, locked_at = NULL
      WHERE locked_by IS NOT NULL
    `);

    // 2. Delete all sessions
    await query(`DELETE FROM sessions`);

    // 3. Delete all accounts (Google OAuth)
    await query(`DELETE FROM accounts`);

    // 4. Delete all users except admin
    const adminEmail = process.env.ADMIN_EMAIL;
    if (adminEmail) {
      await query(`
        DELETE FROM users
        WHERE email != $1
      `, [adminEmail]);
    }

    revalidateAdminPaths();
    return { success: true };
  } catch (error) {
    console.error('Error cleaning users:', error);
    return { success: false, error: String(error) };
  }
};
