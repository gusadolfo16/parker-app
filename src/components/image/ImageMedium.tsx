import { IMAGE_QUALITY } from '@/app/config';
import { IMAGE_WIDTH_MEDIUM, CustomImageProps } from '.';
import ImageWithFallback from './ImageWithFallback';

export default function ImageMedium(props: CustomImageProps) {
  const {
    aspectRatio,
    blurCompatibilityMode,
    ...rest
  } = props;

  return (
    <ImageWithFallback {...{
      ...rest,
      blurCompatibilityLevel: blurCompatibilityMode ? 'low' : 'none',
      width: IMAGE_WIDTH_MEDIUM,
      height: Math.round(IMAGE_WIDTH_MEDIUM / aspectRatio),
      quality: IMAGE_QUALITY,
    }} />
  );
};
