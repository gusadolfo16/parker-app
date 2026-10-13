/**
 * REPAIR low-res images that landed in the PRIVATE R2 bucket with an r2.dev url
 * (the pre-fix bug: re-uploaded/re-created photos were copied to the private
 * `parker` bucket and their `url` was rewritten to the rate-limited r2.dev
 * public domain, instead of staying in `parker-web` behind cdn.pusadolfo.com).
 *
 * For every photo whose `url` is NOT already on the CDN domain, this script:
 *   1. Derives the object key from the stored url.
 *   2. GETs the object bytes from the PRIVATE bucket (where the bug left them).
 *   3. PUTs the same bytes + key into the WEB bucket (`parker-web`).
 *   4. Rewrites the DB `url` to `https://<WEB_PUBLIC_DOMAIN>/<key>` (the CDN).
 *
 * It does NOT touch `url_high_res`, titles, tags, or any other column, and it
 * does NOT delete the private copy (safe; clean up later if desired).
 *
 * SAFETY: dry-run by default. It prints exactly what it WOULD do and changes
 * nothing. Pass `--apply` to actually copy bytes and update the DB.
 *
 * Requires in .env.local (same vars the app uses):
 *   POSTGRES_URL (or whatever src/platforms/postgres reads)
 *   NEXT_PUBLIC_CLOUDFLARE_R2_ACCOUNT_ID
 *   NEXT_PUBLIC_CLOUDFLARE_R2_BUCKET            (private, e.g. parker)
 *   NEXT_PUBLIC_CLOUDFLARE_R2_WEB_BUCKET        (web, e.g. parker-web)
 *   NEXT_PUBLIC_CLOUDFLARE_R2_WEB_PUBLIC_DOMAIN (e.g. cdn.pusadolfo.com)
 *   CLOUDFLARE_R2_ACCESS_KEY / CLOUDFLARE_R2_SECRET_ACCESS_KEY
 *
 * RUN:
 *   pnpm tsx scripts/repair-images.ts            # dry-run (no changes)
 *   pnpm tsx scripts/repair-images.ts --apply    # actually repair
 */

import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';

const loadEnvLocal = () => {
  const envPath = resolve(process.cwd(), '.env.local');
  if (!existsSync(envPath)) { return; }
  for (const rawLine of readFileSync(envPath, 'utf8').split('\n')) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) { continue; }
    const match = line.match(/^([\w.-]+)\s*=\s*(.*)$/);
    if (!match) { continue; }
    const key = match[1];
    let value = match[2].trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith('\'') && value.endsWith('\''))
    ) {
      value = value.slice(1, -1);
    }
    if (process.env[key] === undefined) { process.env[key] = value; }
  }
};

loadEnvLocal();

const APPLY = process.argv.includes('--apply');

const ACCOUNT_ID = process.env.NEXT_PUBLIC_CLOUDFLARE_R2_ACCOUNT_ID ?? '';
const PRIVATE_BUCKET = process.env.NEXT_PUBLIC_CLOUDFLARE_R2_BUCKET ?? '';
const WEB_BUCKET = process.env.NEXT_PUBLIC_CLOUDFLARE_R2_WEB_BUCKET ?? '';
const WEB_DOMAIN = (process.env.NEXT_PUBLIC_CLOUDFLARE_R2_WEB_PUBLIC_DOMAIN ?? '')
  .replace(/^https?:\/\//, '')
  .replace(/\/$/, '');
const ACCESS_KEY = process.env.CLOUDFLARE_R2_ACCESS_KEY ?? '';
const SECRET_KEY = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY ?? '';

const CDN_BASE = WEB_DOMAIN ? `https://${WEB_DOMAIN}` : '';

interface Row {
  id: string
  title: string | null
  url: string
}

// Object key = url pathname without the leading slash.
const keyFromUrl = (url: string): string => {
  try {
    return new URL(url).pathname.replace(/^\//, '');
  } catch {
    return '';
  }
};

const streamToBuffer = async (body: unknown): Promise<Buffer> => {
  // AWS SDK v3 Body can be a web ReadableStream or Node stream; both expose
  // transformToByteArray in recent versions. Fall back to async iteration.
  const anyBody = body as {
    transformToByteArray?: () => Promise<Uint8Array>
    [Symbol.asyncIterator]?: () => AsyncIterator<Uint8Array>
  };
  if (typeof anyBody?.transformToByteArray === 'function') {
    return Buffer.from(await anyBody.transformToByteArray());
  }
  const chunks: Buffer[] = [];
  for await (const chunk of anyBody as AsyncIterable<Uint8Array>) {
    chunks.push(Buffer.from(chunk));
  }
  return Buffer.concat(chunks);
};

async function run() {
  if (!ACCOUNT_ID || !PRIVATE_BUCKET || !WEB_BUCKET || !WEB_DOMAIN) {
    console.error(
      '\nMissing required env vars. Need: ' +
      'NEXT_PUBLIC_CLOUDFLARE_R2_ACCOUNT_ID, ' +
      'NEXT_PUBLIC_CLOUDFLARE_R2_BUCKET, ' +
      'NEXT_PUBLIC_CLOUDFLARE_R2_WEB_BUCKET, ' +
      'NEXT_PUBLIC_CLOUDFLARE_R2_WEB_PUBLIC_DOMAIN.\n',
    );
    process.exit(1);
  }

  const {
    S3Client,
    GetObjectCommand,
    PutObjectCommand,
  } = await import('@aws-sdk/client-s3');
  const { query, sql } = await import('../src/platforms/postgres');

  const s3 = new S3Client({
    region: 'auto',
    endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId: ACCESS_KEY, secretAccessKey: SECRET_KEY },
  });

  // Low-res url not on the CDN domain = needs repair.
  const { rows } = await query<Row>(
    `SELECT id, title, url FROM photos
     WHERE url NOT LIKE $1
     ORDER BY updated_at DESC NULLS LAST`,
    [`%${WEB_DOMAIN}%`],
  );

  console.log(`\n──────── repair-images (${APPLY ? 'APPLY' : 'DRY-RUN'}) ────────`);
  console.log(`private bucket:  ${PRIVATE_BUCKET}`);
  console.log(`web bucket:      ${WEB_BUCKET}`);
  console.log(`cdn base:        ${CDN_BASE}`);
  console.log(`photos to repair: ${rows.length}`);
  console.log('──────────────────────────────────────────\n');

  if (rows.length === 0) {
    console.log('Nothing to repair. All low-res urls already on the CDN.\n');
    process.exit(0);
  }

  let repaired = 0;
  let failed = 0;

  for (const r of rows) {
    const key = keyFromUrl(r.url);
    const newUrl = `${CDN_BASE}/${key}`;
    const label = `${r.id} | ${r.title ?? '(sin título)'}`;

    if (!key) {
      console.log(`  SKIP  ${label} — no se pudo derivar key de: ${r.url}`);
      failed += 1;
      continue;
    }

    if (!APPLY) {
      console.log(`  WOULD ${label}`);
      console.log(`        key: ${key}`);
      console.log(`        ${r.url}  →  ${newUrl}`);
      repaired += 1;
      continue;
    }

    try {
      // 1. GET bytes from the private bucket.
      const got = await s3.send(new GetObjectCommand({
        Bucket: PRIVATE_BUCKET,
        Key: key,
      }));
      const bytes = await streamToBuffer(got.Body);
      const contentType = got.ContentType ?? 'image/jpeg';

      // 2. PUT the same key into the web bucket.
      await s3.send(new PutObjectCommand({
        Bucket: WEB_BUCKET,
        Key: key,
        Body: bytes,
        ContentType: contentType,
      }));

      // 3. Rewrite the DB url to the CDN.
      await sql`UPDATE photos SET url=${newUrl}, updated_at=${(new Date()).toISOString()} WHERE id=${r.id}`;

      console.log(`  OK    ${label} → ${newUrl} (${bytes.length} bytes)`);
      repaired += 1;
    } catch (error) {
      console.log(`  FAIL  ${label} — ${(error as Error).message}`);
      failed += 1;
    }
  }

  console.log(
    `\n${APPLY ? 'repaired' : 'would repair'}: ${repaired}   failed/skipped: ${failed}\n`,
  );
  if (!APPLY) {
    console.log('Dry-run only. Re-run with --apply to make changes.\n');
  }
  process.exit(0);
}

run().catch((error) => {
  console.error('repair-images error:', error);
  process.exit(1);
});
