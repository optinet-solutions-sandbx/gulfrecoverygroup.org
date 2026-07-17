export type Locale = 'ar' | 'en';

export const isRtl = (locale: Locale) => locale === 'ar';

/** Font family stack for a locale, for inline-style use. Backed by next/font CSS variables. */
export const fontFor = (locale: Locale) =>
  locale === 'ar' ? 'var(--font-ar), sans-serif' : 'var(--font-en), system-ui, sans-serif';
