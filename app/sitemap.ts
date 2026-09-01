import type { MetadataRoute } from 'next';
import { buildSitemapEntries } from '@/lib/sitemapEntries';

export const dynamic = 'force-static';

// NOTE: this conventional /sitemap.xml is shadowed on production by a legacy
// WordPress/Yoast SEO rewrite rule that still intercepts this exact filename
// (confirmed: the file uploaded here is correct, but the live URL serves
// stale Yoast-generated content instead). The URL actually advertised to
// crawlers is /urls.xml (see app/urls.xml/route.ts and robots.ts) — keep
// this file in sync with it regardless, in case the legacy rewrite is ever
// removed server-side.
export default function sitemap(): MetadataRoute.Sitemap {
  return buildSitemapEntries();
}
