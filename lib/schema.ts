import { site } from '@/data/site';
import type { Locale } from '@/lib/utils';

const inLang = (l: Locale) => (l === 'ar' ? 'ar' : 'en');

/** The initiative as publisher/author (matches the NGO Organization node in the layout). */
function org(locale: Locale) {
  return { '@type': 'NGO', name: site.name[locale], url: site.domain };
}

const website = (locale: Locale) => ({ '@type': 'WebSite', name: site.name[locale], url: site.domain });

export interface PageInfo { locale: Locale; title: string; description: string; url: string }

/** Article schema for the awareness articles (rich-result eligible). */
export function articleSchema({ locale, title, description, url }: PageInfo) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    inLanguage: inLang(locale),
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    url,
    author: org(locale),
    publisher: org(locale),
    isAccessibleForFree: true,
  };
}

/** WebPage schema for non-article pages. */
export function webPageSchema({ locale, title, description, url }: PageInfo) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    inLanguage: inLang(locale),
    url,
    isPartOf: website(locale),
    publisher: org(locale),
  };
}

/** BreadcrumbList from an ordered list of { name, url }. */
export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

export const abs = (path: string) => `${site.domain}${path}`;
