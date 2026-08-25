// Post-build gate: asserts out/sitemap.xml matches the canonical URL contract.
// Optionally pass a crawl dump to diff <loc> against real canonical tags:
//   node scripts/verify-sitemap.mjs [path/to/crawl.json]
// where crawl.json is an array of objects each having a `canonical` string.
import { readFileSync } from 'fs';

const xml = readFileSync(new URL('../out/sitemap.xml', import.meta.url), 'utf8');
const locs = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);

const fail = [];
if (locs.length !== 58) fail.push(`expected 58 <loc> entries, got ${locs.length}`);
if (new Set(locs).size !== locs.length) fail.push('duplicate <loc> entries');

for (const l of locs) {
  if (!l.endsWith('/')) fail.push(`missing trailing slash: ${l}`);
  if (!/^[\x21-\x7E]+$/.test(l)) fail.push(`not percent-encoded ASCII: ${l}`);
  if (!l.startsWith('https://gulfrecoverygroup.org/')) fail.push(`wrong origin: ${l}`);
  if (l.slice(8).includes('//')) fail.push(`double slash in path: ${l}`);
}

const crawlPath = process.argv[2];
if (crawlPath) {
  const canon = new Set(JSON.parse(readFileSync(crawlPath, 'utf8')).map((r) => r.canonical));
  for (const l of locs) {
    if (!canon.has(l)) fail.push(`<loc> has no matching live canonical: ${l}`);
  }
  console.log(`compared against ${canon.size} live canonical tags`);
}

if (fail.length) {
  console.error(`FAIL (${fail.length}):`);
  for (const f of fail) console.error('  -', f);
  process.exit(1);
}
console.log(`PASS — ${locs.length} canonical <loc> entries`);
