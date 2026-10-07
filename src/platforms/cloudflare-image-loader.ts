// Custom `next/image` loader that routes low-res grid images through
// Cloudflare Image Resizing (`/cdn-cgi/image/`) served from the public R2
// bucket behind `cdn.pusadolfo.com`, instead of Vercel's optimizer.
//
// SAFE PASSTHROUGH: when `NEXT_PUBLIC_CLOUDFLARE_IMAGE_BASE` is unset, the
// loader returns `src` unchanged, so behavior is identical to today. It runs
// on BOTH server and client, so it relies only on NEXT_PUBLIC_* env, performs
// pure string building, and imports nothing server-only.

interface CloudflareImageLoaderParams {
  src: string
  width: number
  quality?: number
}

const DEFAULT_QUALITY = 60;

const CLOUDFLARE_IMAGE_BASE =
  (process.env.NEXT_PUBLIC_CLOUDFLARE_IMAGE_BASE ?? '')
    // Strip protocol and any trailing slash
    .replace(/^(?:https?:\/\/)?/i, '')
    .replace(/\/+$/, '');

export default function cloudflareImageLoader({
  src,
  width,
  quality,
}: CloudflareImageLoaderParams): string {
  // No base configured → passthrough (identical to current behavior)
  if (!CLOUDFLARE_IMAGE_BASE) { return src; }

  // Leave data URIs and already-transformed URLs untouched
  if (src.startsWith('data:') || src.includes('/cdn-cgi/image/')) {
    return src;
  }

  const q = quality ?? DEFAULT_QUALITY;

  // eslint-disable-next-line max-len
  return `https://${CLOUDFLARE_IMAGE_BASE}/cdn-cgi/image/width=${width},quality=${q},format=auto/${src}`;
}
