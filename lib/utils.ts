export type Locale = 'ar' | 'en';

export const isRtl = (locale: Locale) => locale === 'ar';

/** Font family stack for a locale, for inline-style use. */
export const fontFor = (locale: Locale) =>
  locale === 'ar' ? "'IBM Plex Sans Arabic', sans-serif" : "'Public Sans', system-ui, sans-serif";
