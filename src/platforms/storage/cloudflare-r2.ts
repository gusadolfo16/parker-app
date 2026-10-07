import {
  S3Client,
  ListObjectsCommand,
  PutObjectCommand,
  DeleteObjectCommand,
  CopyObjectCommand,
} from '@aws-sdk/client-s3';
import type { StorageListResponse } from '.';
import { generateStorageId } from '@/utility/nanoid';
import { removeUrlProtocol } from '@/utility/url';
import { formatBytesToMB } from '@/utility/number';

// Existing (private) bucket, e.g. `parker` — high-res originals
const CLOUDFLARE_R2_BUCKET =
  process.env.NEXT_PUBLIC_CLOUDFLARE_R2_BUCKET ?? '';
const CLOUDFLARE_R2_ACCOUNT_ID =
  process.env.NEXT_PUBLIC_CLOUDFLARE_R2_ACCOUNT_ID ?? '';
const CLOUDFLARE_R2_PUBLIC_DOMAIN =
  removeUrlProtocol(process.env.NEXT_PUBLIC_CLOUDFLARE_R2_PUBLIC_DOMAIN) ?? '';
const CLOUDFLARE_R2_ACCESS_KEY =
  process.env.CLOUDFLARE_R2_ACCESS_KEY ?? '';
const CLOUDFLARE_R2_SECRET_ACCESS_KEY =
  process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY ?? '';

// Web (public, low-res) bucket, e.g. `parker-web`, served behind a custom
// domain such as `cdn.pusadolfo.com`. Reuses the SAME account id + access key
// + secret as the private bucket (R2 credentials are account-wide). When these
// vars are unset, every helper falls back to the private bucket, so behavior
// is identical to the single-bucket setup.
const CLOUDFLARE_R2_WEB_BUCKET =
  process.env.NEXT_PUBLIC_CLOUDFLARE_R2_WEB_BUCKET ?? '';
const CLOUDFLARE_R2_WEB_PUBLIC_DOMAIN =
  removeUrlProtocol(
    process.env.NEXT_PUBLIC_CLOUDFLARE_R2_WEB_PUBLIC_DOMAIN) ?? '';

const CLOUDFLARE_R2_ENDPOINT = CLOUDFLARE_R2_ACCOUNT_ID
  ? `https://${CLOUDFLARE_R2_ACCOUNT_ID}.r2.cloudflarestorage.com`
  : undefined;

export const CLOUDFLARE_R2_BASE_URL_PUBLIC = CLOUDFLARE_R2_PUBLIC_DOMAIN
  ? `https://${CLOUDFLARE_R2_PUBLIC_DOMAIN}`
  : undefined;
export const CLOUDFLARE_R2_BASE_URL_PRIVATE =
  CLOUDFLARE_R2_ENDPOINT && CLOUDFLARE_R2_BUCKET
    ? `${CLOUDFLARE_R2_ENDPOINT}/${CLOUDFLARE_R2_BUCKET}`
    : undefined;

// Public base URL for the web bucket (served via the custom CDN domain)
export const CLOUDFLARE_R2_WEB_BASE_URL_PUBLIC = CLOUDFLARE_R2_WEB_PUBLIC_DOMAIN
  ? `https://${CLOUDFLARE_R2_WEB_PUBLIC_DOMAIN}`
  : undefined;

// Whether the separate web bucket is configured. When false, callers that
// request the web bucket transparently fall back to the private bucket.
export const HAS_CLOUDFLARE_R2_WEB_BUCKET = Boolean(CLOUDFLARE_R2_WEB_BUCKET);

// A storage bucket target: either the existing private bucket or the web one
export type CloudflareR2Bucket = 'private' | 'web';

// Resolve the actual R2 bucket name for a target, defaulting to private and
// falling back to private when the web bucket is not configured.
const bucketNameForTarget = (target: CloudflareR2Bucket = 'private') =>
  target === 'web' && CLOUDFLARE_R2_WEB_BUCKET
    ? CLOUDFLARE_R2_WEB_BUCKET
    : CLOUDFLARE_R2_BUCKET;

export const cloudflareR2Client = () => new S3Client({
  region: 'auto',
  endpoint: CLOUDFLARE_R2_ENDPOINT,
  credentials: {
    accessKeyId: CLOUDFLARE_R2_ACCESS_KEY,
    secretAccessKey: CLOUDFLARE_R2_SECRET_ACCESS_KEY,
  },
});

const urlForKey = (
  key?: string,
  isPublic = true,
  target: CloudflareR2Bucket = 'private',
) => {
  if (target === 'web' && CLOUDFLARE_R2_WEB_BASE_URL_PUBLIC) {
    return `${CLOUDFLARE_R2_WEB_BASE_URL_PUBLIC}/${key}`;
  }
  return isPublic
    ? `${CLOUDFLARE_R2_BASE_URL_PUBLIC}/${key}`
    : `${CLOUDFLARE_R2_BASE_URL_PRIVATE}/${key}`;
};

export const isUrlFromCloudflareR2 = (url?: string) => Boolean((
  CLOUDFLARE_R2_BASE_URL_PRIVATE &&
  url?.startsWith(CLOUDFLARE_R2_BASE_URL_PRIVATE)
) || (
  CLOUDFLARE_R2_BASE_URL_PUBLIC &&
  url?.startsWith(CLOUDFLARE_R2_BASE_URL_PUBLIC)
) || (
  CLOUDFLARE_R2_WEB_BASE_URL_PUBLIC &&
  url?.startsWith(CLOUDFLARE_R2_WEB_BASE_URL_PUBLIC)
));

// Whether a URL belongs specifically to the web (public, low-res) bucket
export const isUrlFromCloudflareR2Web = (url?: string) => Boolean(
  CLOUDFLARE_R2_WEB_BASE_URL_PUBLIC &&
  url?.startsWith(CLOUDFLARE_R2_WEB_BASE_URL_PUBLIC),
);

export const cloudflareR2PutObjectCommandForKey = (
  Key: string,
  target: CloudflareR2Bucket = 'private',
) => new PutObjectCommand({ Bucket: bucketNameForTarget(target), Key });

export const cloudflareR2Put = async (
  file: Buffer,
  fileName: string,
  target: CloudflareR2Bucket = 'private',
): Promise<string> =>
  cloudflareR2Client().send(new PutObjectCommand({
    Bucket: bucketNameForTarget(target),
    Key: fileName,
    Body: file,
  }))
    .then(() => urlForKey(fileName, true, target));

export const cloudflareR2Copy = async (
  fileNameSource: string,
  fileNameDestination: string,
  addRandomSuffix?: boolean,
  target: CloudflareR2Bucket = 'private',
) => {
  const name = fileNameSource.split('.')[0];
  const extension = fileNameSource.split('.')[1];
  const Key = addRandomSuffix
    ? `${name}-${generateStorageId()}.${extension}`
    : fileNameDestination;
  const Bucket = bucketNameForTarget(target);
  return cloudflareR2Client().send(new CopyObjectCommand({
    Bucket,
    CopySource: `${Bucket}/${fileNameSource}`,
    Key,
  }))
    .then(() => urlForKey(fileNameDestination, true, target));
};

export const cloudflareR2List = async (
  Prefix: string,
  target: CloudflareR2Bucket = 'private',
): Promise<StorageListResponse> =>
  cloudflareR2Client().send(new ListObjectsCommand({
    Bucket: bucketNameForTarget(target),
    Prefix,
  }))
    .then((data) => data.Contents?.map(({ Key, LastModified, Size }) => ({
      url: urlForKey(Key, true, target),
      fileName: Key ?? '',
      uploadedAt: LastModified,
      size: Size ? formatBytesToMB(Size) : undefined,
    })) ?? []);

export const cloudflareR2Delete = async (
  Key: string,
  target: CloudflareR2Bucket = 'private',
) => {
  cloudflareR2Client().send(new DeleteObjectCommand({
    Bucket: bucketNameForTarget(target),
    Key,
  }));
};
