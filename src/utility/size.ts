const DEFAULT_ASPECT_RATIO = 3.0 / 2.0;

export const getDimensionsFromSize = (
  size: number,
  aspectRatioRaw?: string | number,
): {
  width: number
  height: number
  aspectRatio: number
} => {
  const aspectRatio = typeof aspectRatioRaw === 'string'
    ? parseFloat(aspectRatioRaw)
    : aspectRatioRaw || DEFAULT_ASPECT_RATIO;

  let width = size;
  let height = size;

  if (aspectRatio > 1) {
    height = size / aspectRatio;
  } else if (aspectRatio < 1) {
    width = size * aspectRatio;
  }
  
  return {
    width: Math.round(width),
    height: Math.round(height),
    aspectRatio,
  };
};

export const formatFileSize = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};
