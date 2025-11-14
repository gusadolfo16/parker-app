'use server';

import { getPhotosMeta, getUniqueTags, getUniqueRecipes } from '@/photo/db/query';

export const getReportData = async () => {
  const [photosMeta, photosMetaHidden, uniqueTags, uniqueRecipes] = await Promise.all([
    getPhotosMeta(),
    getPhotosMeta({ hidden: 'only' }),
    getUniqueTags(),
    getUniqueRecipes(),
  ]);

  return {
    photosCount: photosMeta.count,
    photosCountHidden: photosMetaHidden.count,
    tagsCount: uniqueTags.length,
    recipesCount: uniqueRecipes.length,
  };
};
