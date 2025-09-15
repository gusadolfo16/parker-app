import { Metadata } from 'next/types';
import { CameraProps, formatCameraParams } from '@/camera';
import { generateMetaForCamera } from '@/camera/meta';
import { INFINITE_SCROLL_GRID_INITIAL } from '@/photo';
import { getPhotosCameraDataCached } from '@/camera/data';
import CameraOverview from '@/camera/CameraOverview';
import { cache } from 'react';
import { getUniqueCameras } from '@/photo/db/query';
import { staticallyGenerateCategoryIfConfigured } from '@/app/static';
import { getAppText } from '@/i18n/state/server';
import { redirect } from 'next/navigation';
import { PATH_ROOT } from '@/app/path';

const getPhotosCameraDataCachedCached = cache((
  make: string,
  model: string,
) => getPhotosCameraDataCached(
  make,
  model,
  INFINITE_SCROLL_GRID_INITIAL,
));

// export const generateStaticParams = staticallyGenerateCategoryIfConfigured(
//   'cameras',
//   'page',
//   getUniqueCameras,
//   cameras => cameras.map(({ camera }) => formatCameraParams(camera)),
// );

export async function generateMetadata({
  params,
}: CameraProps): Promise<Metadata> {
  const { make, model } = await params;

  const [
    photos,
    { count, dateRange },
    camera,
  ] = await getPhotosCameraDataCachedCached(make, model);

  if (photos.length === 0) {
    return {};
  }

  const appText = await getAppText();

  if (photos.length === 0) {
    return {};
  }

  const {
    url,
    title,
    description,
    images,
  } = generateMetaForCamera(camera, photos, appText, count, dateRange);

  return {
    title,
    openGraph: {
      title,
      description,
      images,
      url,
    },
    twitter: {
      images,
      description,
      card: 'summary_large_image',
    },
    description,
  };
}

export default async function CameraPage({
  params,
}: CameraProps) {
  const { make, model } = await params;

  const [
    photos,
    { count, dateRange },
    camera,
  ] = await getPhotosCameraDataCachedCached(make, model);

  if (photos.length === 0) {
    redirect(PATH_ROOT);
  }

  if (photos.length === 0) {
    return null; // Temporarily return null if no photos
  }

  return (
    <CameraOverview {...{ camera, photos, count, dateRange }} />
  );
}
