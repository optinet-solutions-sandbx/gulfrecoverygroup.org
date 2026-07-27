import { articles } from '@/data/articles';
import { articlesEn } from '@/data/articles.en';
import type { Locale } from '@/lib/utils';

// articles.ts and articles.en.ts define the SAME topics in the SAME order (both start with
// guaranteedProfitRisk, …), so the article at index i in one locale is the translation of the
// article at index i in the other. That lets us emit correct per-article hreflang alternates.
const AR_SLUGS = Object.keys(articles);
const EN_SLUGS = Object.keys(articlesEn);

/** The equivalent article slug in the other locale, or undefined if unpaired. */
export function articleAltSlug(slug: string, locale: Locale): string | undefined {
  const [from, to] = locale === 'ar' ? [AR_SLUGS, EN_SLUGS] : [EN_SLUGS, AR_SLUGS];
  const i = from.indexOf(slug);
  return i >= 0 ? to[i] : undefined;
}

/** hreflang `languages` map (+ x-default) for an article, paired across locales. */
export function articleLanguages(slug: string, locale: Locale): Record<string, string> {
  const alt = articleAltSlug(slug, locale);
  const arSlug = locale === 'ar' ? slug : alt;
  const enSlug = locale === 'en' ? slug : alt;
  const languages: Record<string, string> = {};
  if (arSlug) {
    languages.ar = `/${arSlug}`;
    languages['x-default'] = `/${arSlug}`;
  }
  if (enSlug) languages.en = `/en/${enSlug}`;
  return languages;
}
