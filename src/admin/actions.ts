'use server';


/* eslint-disable max-len */

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
import { revalidateAdminPaths, revalidateAllKeysAndPaths, revalidatePhotosKey } from '@/photo/cache';
import { revalidatePath } from 'next/cache';
import {
  getStoragePhotoUrls,
  getStorageUploadUrls,
  testStorageConnection,
  deleteFile,
} from '@/platforms/storage';
import { runAuthenticatedAdminServerAction } from '@/auth/server';

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
  // Solo revalidar fotos + galería pública —
  // limpiar selecciones no modifica cámaras, tags, films, etc.
  revalidatePhotosKey();
  revalidatePath('/', 'page');
  revalidatePath('/grid', 'page');
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
  _photoIds: string[],
  _photoIdsToResign: string[],
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
    await query('DELETE FROM sessions');

    // 3. Delete all accounts (Google OAuth)
    await query('DELETE FROM accounts');

    // 4. Delete all users except admin
    const adminEmail = process.env.ADMIN_EMAIL;
    if (adminEmail) {
      await query(`
        DELETE FROM users
        WHERE email != $1
      `, [adminEmail]);
    }

    revalidatePhotosKey();
    revalidatePath('/', 'page');
    revalidatePath('/grid', 'page');
    return { success: true };
  } catch (error) {
    console.error('Error cleaning users:', error);
    return { success: false, error: String(error) };
  }
};

export const cleanAllPhotosDbAction = async () =>
  runAuthenticatedAdminServerAction(async () => {
    try {
      const { query } = await import('@/platforms/postgres');
      await query('DELETE FROM photos');
      revalidateAllKeysAndPaths();
      return { success: true };
    } catch (error) {
      console.error('Error cleaning DB photos:', error);
      return { success: false, error: String(error) };
    }
  });

export const cleanAllR2FilesAction = async () =>
  runAuthenticatedAdminServerAction(async () => {
    try {
      const { cloudflareR2List, cloudflareR2Delete: _1 } =
        await import('@/platforms/storage/cloudflare-r2');
      const { vercelBlobList, vercelBlobDelete: _2 } =
        await import('@/platforms/storage/vercel-blob');

      const [r2Files, vercelFiles] = await Promise.all([
        cloudflareR2List('photo-'),
        vercelBlobList('photo-'),
        cloudflareR2List('upload-'),
        vercelBlobList('upload-'),
      ]);
      
      // Flatten and filter for unique keys
      const filesToDelete = Array.from(new Set([
        ...r2Files.map(f => f.url),
        ...vercelFiles.map(f => f.url),
      ]));

      await Promise.all(filesToDelete.map(async url => {
        try {
          await deleteFile(url);
          console.log(`Successfully deleted file: ${url}`);
        } catch (deleteError) {
          console.error(`Failed to delete file ${url}:`, deleteError);
          throw deleteError; // Re-throw to ensure the action catches the overall failure
        }
      }));
      revalidateAllKeysAndPaths();
      return { success: true };
    } catch (error) {
      console.error('Error cleaning R2/Blob files:', error);
      return { success: false, error: String(error) };
    }
  });
