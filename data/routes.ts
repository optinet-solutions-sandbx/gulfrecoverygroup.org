import type { Locale } from '@/lib/utils';

/**
 * Single source of truth for the published page set and its per-locale slugs.
 * `id` is the stable internal key. `ar` uses Arabic-script slugs; `en` uses
 * latin slugs under the /en prefix. Nav taxonomy here is intentionally NOT
 * the taxonomy of any other satellite (awareness sections, not services).
 */
export interface Route {
  id: string;
  en: string;
  ar: string;
  kind?: 'topics' | 'about' | 'contact' | 'legal';
  navLabel?: { ar: string; en: string };
}

export const ROUTES: Route[] = [
  { id: 'about',       kind: 'about',   en: 'about-initiative',   ar: 'عن-المبادرة',
    navLabel: { ar: 'عن المبادرة',       en: 'About the Initiative' } },
  { id: 'protection',  kind: 'topics',  en: 'investor-protection', ar: 'حماية-المستثمرين',
    navLabel: { ar: 'حماية المستثمرين',  en: 'Investor Protection' } },
  { id: 'alerts',      kind: 'topics',  en: 'alerts-warnings',    ar: 'بلاغات-وتحذيرات',
    navLabel: { ar: 'بلاغات وتحذيرات',   en: 'Alerts & Warnings' } },
  { id: 'reports',     kind: 'topics',  en: 'awareness-reports',  ar: 'تقارير-توعوية',
    navLabel: { ar: 'تقارير توعوية',     en: 'Awareness Reports' } },
  { id: 'resources',   kind: 'topics',  en: 'public-resources',   ar: 'موارد-للجمهور',
    navLabel: { ar: 'موارد للجمهور',     en: 'Public Resources' } },
  { id: 'contact',     kind: 'contact', en: 'contact',            ar: 'تواصل-معنا',
    navLabel: { ar: 'تواصل معنا',        en: 'Contact' } },

  // footer-only legal
  { id: 'privacy', kind: 'legal', en: 'privacy-policy',    ar: 'سياسة-الخصوصية' },
  { id: 'terms',   kind: 'legal', en: 'terms-of-use',      ar: 'شروط-الاستخدام' },
];

// primary nav order (home is prepended in the header)
export const NAV_IDS = ['about', 'protection', 'alerts', 'reports', 'resources', 'contact'] as const;

const norm = (s: string) => {
  try { return decodeURIComponent(s).normalize('NFC'); } catch { return s.normalize('NFC'); }
};

const byId = new Map(ROUTES.map(r => [r.id, r]));
const byEn = new Map(ROUTES.map(r => [norm(r.en), r]));
const byAr = new Map(ROUTES.map(r => [norm(r.ar), r]));

export function hrefFor(id: string, locale: Locale): string {
  if (id === 'home') return locale === 'ar' ? '/' : '/en';
  const r = byId.get(id);
  if (!r) return locale === 'ar' ? '/' : '/en';
  return locale === 'ar' ? `/${r.ar}` : `/en/${r.en}`;
}

export function routeBySlug(slug: string, locale: Locale): Route | undefined {
  return (locale === 'ar' ? byAr : byEn).get(norm(slug));
}

/** The equivalent page in the other locale, for the language switcher. */
export function altLocaleHref(currentSlug: string, fromLocale: Locale): string {
  const to: Locale = fromLocale === 'ar' ? 'en' : 'ar';
  const r = routeBySlug(currentSlug, fromLocale);
  if (!r) return to === 'ar' ? '/' : '/en';
  return hrefFor(r.id, to);
}
