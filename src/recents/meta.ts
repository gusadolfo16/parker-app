import { Photo } from '@/photo';
import { AppTextState } from '@/i18n/state';
import {
  absolutePathForRecents,
  absolutePathForRecentsImage,
}
  from '@/app/path';

export const generateMetaForRecents = (
  _photos: Photo[],
  appText: AppTextState,
) => {
  const title = appText.category.recentTitle;
  // const description = descriptionForPhotoSet(
  //   photos,
  //   appText,
  //   undefined,
  //   undefined,
  //   count,
  // );
  const description = '';
  const url = absolutePathForRecents();
  const images = absolutePathForRecentsImage();

  return {
    title,
    description,
    url,
    images,
  };
};
