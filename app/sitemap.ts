import type { MetadataRoute } from 'next';
import { site } from '@/data/site';
import { ROUTES, hrefFor } from '@/data/routes';
import { articles } from '@/data/articles';
import { articlesEn } from '@/data/articles.en';

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [
    { url: `${site.domain}/`, changeFrequency: 'monthly', priority: 1 },
    { url: `${site.domain}/en`, changeFrequency: 'monthly', priority: 0.9 },
  ];
  for (const r of ROUTES) {
    entries.push({ url: `${site.domain}${hrefFor(r.id, 'ar')}`, changeFrequency: 'monthly', priority: 0.7 });
    entries.push({ url: `${site.domain}${hrefFor(r.id, 'en')}`, changeFrequency: 'monthly', priority: 0.6 });
  }
  // Awareness articles (the main content library) — the bulk of what should rank.
  for (const slug of Object.keys(articles)) {
    entries.push({ url: `${site.domain}/${slug}`, changeFrequency: 'monthly', priority: 0.6 });
  }
  for (const slug of Object.keys(articlesEn)) {
    entries.push({ url: `${site.domain}/en/${slug}`, changeFrequency: 'monthly', priority: 0.5 });
  }
  return entries;
}
