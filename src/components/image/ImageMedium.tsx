import { IMAGE_WIDTH_MEDIUM, CustomImageProps } from '.';
import { clsx } from 'clsx/lite';

export default function ImageMedium(props: CustomImageProps) {
  const {
    aspectRatio,
    blurCompatibilityMode,
    className,
    classNameImage,
    src,
    alt,
    blurDataURL,
    priority,
    ...rest
  } = props;

  // Convert src to string - handle both string and StaticImport types
  const srcString = typeof src === 'string' ? src : (src as any).src || String(src);

  return (
    <div className={clsx('relative', className)}>
      <img
        src={srcString}
        alt={alt}
        className={clsx(classNameImage || 'object-cover w-full h-full')}
        loading={priority ? 'eager' : 'lazy'}
        onContextMenu={(e) => e.preventDefault()}
        draggable={false}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
    </div>
  );
};
