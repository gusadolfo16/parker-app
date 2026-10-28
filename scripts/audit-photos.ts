/**
 * READ-ONLY audit of photo rows: flags anomalies after the recent edits.
 * Does NOT modify anything.
 *
 * Flags, per photo:
 *   - missing/empty title
 *   - low-res `url` NOT on cdn.pusadolfo.com (e.g. still r2.dev or blob)
 *   - missing `url_high_res`
 *   - high-res on the rate-limited r2.dev domain
 *
 * RUN: pnpm tsx scripts/audit-photos.ts
 */
import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';

const loadEnvLocal = () => {
  const p = resolve(process.cwd(), '.env.local');
  if (!existsSync(p)) { return; }
  for (const raw of readFileSync(p, 'utf8').split('\n')) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) { continue; }
    const m = line.match(/^([\w.-]+)\s*=\s*(.*)$/);
    if (!m) { continue; }
    let v = m[2].trim();
    if ((v.startsWith('"') && v.endsWith('"')) ||
        (v.startsWith('\'') && v.endsWith('\''))) { v = v.slice(1, -1); }
    if (process.env[m[1]] === undefined) { process.env[m[1]] = v; }
  }
};
loadEnvLocal();

interface Row {
  id: string
  title: string | null
  url: string
  url_high_res: string | null
  updated_at: string | null
}

async function run() {
  const { query } = await import('../src/platforms/postgres');
  const { rows } = await query<Row>(
    `SELECT id, title, url, url_high_res, updated_at
     FROM photos ORDER BY updated_at DESC NULLS LAST`,
  );

  const CDN = 'cdn.pusadolfo.com';
  const flagged = rows.filter(r =>
    !r.title ||
    r.title.trim() === '' ||
    !r.url.includes(CDN) ||
    !r.url_high_res ||
    (r.url_high_res && r.url_high_res.includes('r2.dev')),
  );

  console.log(`\ntotal photos: ${rows.length}`);
  console.log(`flagged (anomalías): ${flagged.length}\n`);
  console.log('id | title | lowResOnCdn | hasHighRes | highResDomain | updated');
  console.log('─'.repeat(90));
  for (const r of flagged) {
    const lowOnCdn = r.url.includes(CDN) ? 'cdn✓' : (r.url.includes('r2.dev') ? 'r2.dev✗' : 'otro✗');
    const hr = !r.url_high_res ? 'FALTA' :
      r.url_high_res.includes('r2.dev') ? 'r2.dev' :
      r.url_high_res.includes(CDN) ? 'cdn' : 'otro';
    console.log(
      `${r.id} | ${(r.title ?? '(sin título)').slice(0,20).padEnd(20)} | ` +
      `${lowOnCdn.padEnd(7)} | ${(r.url_high_res?'sí':'no').padEnd(3)} | ` +
      `${hr.padEnd(7)} | ${r.updated_at ?? ''}`,
    );
  }
  console.log('');
  process.exit(0);
}
run().catch(e => { console.error(e); process.exit(1); });
