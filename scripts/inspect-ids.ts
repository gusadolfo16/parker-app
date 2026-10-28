/**
 * READ-ONLY: inspect specific photo ids (and all untitled rows).
 * Does NOT modify anything.
 * RUN: pnpm tsx scripts/inspect-ids.ts
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

const IDS = [
  'pTGZ2xpi', 'Koo4C58Z', 'B7912y1c', 'srkd2SgS', 'ia7nrfEd',
  '6Evgw8Zj', 'HVQvGWGD', 'prB5PwsR', '823dNL2G', 'uVRL9j2j',
];

interface Row {
  id: string
  title: string | null
  caption: string | null
  semantic_description: string | null
  tags: string[] | null
  url: string
  url_high_res: string | null
}

async function run() {
  const { query } = await import('../src/platforms/postgres');

  const CDN = 'cdn.pusadolfo.com';
  const fmt = (r: Row) => {
    const low = r.url.includes(CDN) ? 'cdn' : (r.url.includes('r2.dev') ? 'R2.DEV' : 'otro');
    const hi = !r.url_high_res ? 'FALTA' : (r.url_high_res.includes('r2.dev') ? 'r2.dev' : (r.url_high_res.includes(CDN) ? 'cdn' : 'otro'));
    console.log(`\n  id:        ${r.id}`);
    console.log(`  title:     ${r.title === null ? '*** NULL ***' : (r.title || '(vacío)')}`);
    console.log(`  caption:   ${r.caption ?? '(ninguno)'}`);
    console.log(`  tags:      ${r.tags?.join(', ') ?? '(ninguno)'}`);
    console.log(`  low-res:   ${low}`);
    console.log(`  high-res:  ${hi}`);
  };

  console.log('════════ IDs que mencionaste (editados) ════════');
  const placeholders = IDS.map((_, i) => `$${i + 1}`).join(', ');
  const { rows } = await query<Row>(
    `SELECT id, title, caption, semantic_description, tags, url, url_high_res
     FROM photos WHERE id IN (${placeholders})`,
    IDS,
  );
  for (const id of IDS) {
    const r = rows.find(x => x.id === id);
    if (r) { fmt(r); } else { console.log(`\n  id: ${id}  → NO EXISTE (¿borrada?)`); }
  }

  console.log('\n\n════════ TODAS las filas sin título (NULL o vacío) ════════');
  const { rows: untitled } = await query<Row>(
    `SELECT id, title, caption, semantic_description, tags, url, url_high_res
     FROM photos WHERE title IS NULL OR title = ''`,
  );
  console.log(`(${untitled.length} filas sin título)`);
  for (const r of untitled) { fmt(r); }

  process.exit(0);
}
run().catch(e => { console.error(e); process.exit(1); });
