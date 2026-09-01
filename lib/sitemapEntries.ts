import { site } from '@/data/site';
import { ROUTES, hrefFor } from '@/data/routes';
import { articles } from '@/data/articles';
import { articlesEn } from '@/data/articles.en';

export type SitemapEntry = {
  url: string;
  changeFrequency: 'monthly';
  priority: number;
};

/**
 * Absolute canonical URL for one sitemap entry.
 *
 * Next.js does NOT normalise the `url` field of MetadataRoute.Sitemap, so two
 * things `trailingSlash: true` gives us everywhere else have to be done by hand
 * here. Skipping either one makes every <loc> disagree with the page's own
 * <link rel="canonical">, which Ahrefs reports as "3XX redirect in sitemap"
 * plus "Non-canonical page in sitemap":
 *
 *  1. Trailing slash — without it Apache's DirectorySlash 301s the URL, because
 *     `output: "export"` writes each page as <slug>/index.html.
 *  2. Percent-encoding — the Arabic slugs in data/routes.ts and data/articles.ts
 *     are stored raw, but generateMetadata's canonical is percent-encoded. A raw
 *     UTF-8 <loc> is therefore a different URL than the canonical it should match.
 *
 * encodeURI (not encodeURIComponent) is correct: it leaves `:` and `/` intact so
 * the origin and path separators survive, and the slugs contain no reserved chars.
 */
function loc(path: string): string {
  const withSlash = path.endsWith('/') ? path : `${path}/`;
  return encodeURI(`${site.domain}${withSlash}`);
}

export function buildSitemapEntries(): SitemapEntry[] {
  const entries: SitemapEntry[] = [
    { url: loc('/'), changeFrequency: 'monthly', priority: 1 },
    { url: loc('/en'), changeFrequency: 'monthly', priority: 0.9 },
  ];
  for (const r of ROUTES) {
    entries.push({ url: loc(hrefFor(r.id, 'ar')), changeFrequency: 'monthly', priority: 0.7 });
    entries.push({ url: loc(hrefFor(r.id, 'en')), changeFrequency: 'monthly', priority: 0.6 });
  }
  // Awareness articles (the main content library) — the bulk of what should rank.
  for (const slug of Object.keys(articles)) {
    entries.push({ url: loc(`/${slug}`), changeFrequency: 'monthly', priority: 0.6 });
  }
  for (const slug of Object.keys(articlesEn)) {
    entries.push({ url: loc(`/en/${slug}`), changeFrequency: 'monthly', priority: 0.5 });
  }
  return entries;
}
