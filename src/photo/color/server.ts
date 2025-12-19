import { convertRgbToOklab, parseHex } from 'culori';
import { getNextImageUrlForManipulation } from '@/platforms/next-image';
import {
  AI_CONTENT_GENERATION_ENABLED,
  IS_PREVIEW,
} from '@/app/config';
import { FastAverageColor } from 'fast-average-color';
import { Oklch, PhotoColorData } from './client';
import sharp from 'sharp';
import { extractColors } from 'extract-colors';
import {
  getImageBase64FromUrl,
  getImageBase64FromBuffer,
} from '../server';
import { generateOpenAiImageQuery } from '@/platforms/openai';
import { calculateColorSort } from './sort';

const NULL_RGB = { r: 0, g: 0, b: 0 };

export const convertHexToOklch = (hex: string): Oklch => {
  const rgb = parseHex(hex) ?? NULL_RGB;
  const { a, b, l } = convertRgbToOklab(rgb);
  const c = Math.sqrt(a * a + b * b);
  const _h = Math.atan2(b, a) * (180 / Math.PI);
  const h = _h < 0 ? _h + 360 : _h;
  return {
    l: +(l.toFixed(3)),
    c: +(c.toFixed(3)),
    h: +(h.toFixed(3)),
  };
};

// Convert image url to byte array
const getImageDataFromUrl = async (
  _url: string,
  fileBytes?: ArrayBuffer,
) => {
  const url = getNextImageUrlForManipulation(_url, IS_PREVIEW);
  const imageBuffer = fileBytes
    ? Buffer.from(fileBytes)
    : await fetch(decodeURIComponent(url)).then(res => res.arrayBuffer());
  const image = sharp(imageBuffer);
  const { width, height } = await image.metadata();
  const buffer = await image.ensureAlpha().raw().toBuffer();
  return {
    data: new Uint8ClampedArray(buffer.buffer),
    width,
    height,
  };
};

// algorithm library: fast-average-color
const getAverageColorFromImageUrl = async (
  url: string,
  fileBytes?: ArrayBuffer,
) => {
  const { data } = await getImageDataFromUrl(url, fileBytes);
  const fac = new FastAverageColor();
  const color = fac.prepareResult(fac.getColorFromArray4(data));
  return convertHexToOklch(color.hex);
};

// algorithm library: extract-colors
const getExtractedColorsFromImageUrl = async (
  url: string,
  fileBytes?: ArrayBuffer,
) => {
  const data = await getImageDataFromUrl(url, fileBytes);
  return extractColors(data).then(colors =>
    colors.map(({ hex }) => convertHexToOklch(hex)));
};

const getColorDataFromImageUrl = async (
  url: string,
  isBatch?: boolean,
  fileBytes?: ArrayBuffer,
): Promise<PhotoColorData> => {
  const ai = AI_CONTENT_GENERATION_ENABLED
    ? await getColorFromAI(url, isBatch, fileBytes)
    : undefined;
  const average = await getAverageColorFromImageUrl(url, fileBytes);
  const colors = await getExtractedColorsFromImageUrl(url, fileBytes);
  return {
    ...ai && { ai },
    average,
    colors,
  };
};

export const getColorFieldsForImageUrl = async (
  url: string,
  _colorData?: PhotoColorData,
  isBatch?: boolean,
  fileBytes?: ArrayBuffer,
) => {
  try {
    const colorData = _colorData ??
      await getColorDataFromImageUrl(url, isBatch, fileBytes);
    return {
      colorData,
      colorSort: calculateColorSort(colorData),
    };
  } catch {
    console.log('Error fetching image url data', url);
  }
};

// Used when inserting colors into database
export const getColorFieldsForPhotoDbInsert = async (
  ...args: Parameters<typeof getColorFieldsForImageUrl>
) => {
  const { colorData, ...rest } = await getColorFieldsForImageUrl(...args) ?? {};
  if (colorData !== undefined) {
    return {
      colorData,
      ...rest,
    };
  }
};

// Used when preparing colors for form
export const getColorFieldsForPhotoForm = async (
  ...args: Parameters<typeof getColorFieldsForImageUrl>
) => {
  const { colorSort, ...rest } =
    await getColorFieldsForPhotoDbInsert(...args) ?? {};
  if (colorSort !== undefined) {
    return {
      colorSort: `${colorSort}`,
      ...rest,
    };
  }
};

export const getColorFromAI = async (
  _url: string,
  useBatch?: boolean,
  fileBytes?: ArrayBuffer,
) => {
  const url = getNextImageUrlForManipulation(_url, IS_PREVIEW);
  const image = fileBytes
    ? await getImageBase64FromBuffer(fileBytes)
    : await getImageBase64FromUrl(url);
  const hexColor = await generateOpenAiImageQuery(image, `
    Does this image have a primary subject color?
    If yes, what is the approximate hex color of the subject.
    If not, what is the approximate hex color of the background?
    Respond only with a hex color value:
  `, useBatch);
  const hex = hexColor?.match(/#*([a-f0-9]{6})/i)?.[1];
  if (hex) {
    return convertHexToOklch(`#${hex}`);
  }
};
