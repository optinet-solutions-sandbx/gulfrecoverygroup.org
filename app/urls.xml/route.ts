import { buildSitemapEntries } from '@/lib/sitemapEntries';

export const dynamic = 'force-static';

// Published at /urls.xml — deliberately not containing "sitemap" anywhere in
// the filename — so it doesn't match any WordPress/Yoast SEO sitemap rewrite
// pattern (sitemap.xml, sitemap_index.xml, *-sitemap*.xml, *-sitemap#.xml)
// still active on production, which shadows /sitemap.xml with stale content.
// robots.ts advertises this URL as the canonical sitemap location.
export async function GET() {
  const entries = buildSitemapEntries();
  const body =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    entries
      .map(
        (e) =>
          `<url>\n<loc>${e.url}</loc>\n<changefreq>${e.changeFrequency}</changefreq>\n<priority>${e.priority}</priority>\n</url>`
      )
      .join('\n') +
    '\n</urlset>\n';

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
