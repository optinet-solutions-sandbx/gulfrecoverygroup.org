import type { Metadata } from 'next';
import type { Locale } from '@/lib/utils';
import { hrefFor } from '@/data/routes';

/**
 * Build per-page metadata with correct canonical + hreflang alternates.
 */
export function buildMeta({
  locale, id, title, description,
}: { locale: Locale; id: string; title: string; description: string }): Metadata {
  const arPath = hrefFor(id, 'ar');
  const enPath = hrefFor(id, 'en');
  const self = locale === 'ar' ? arPath : enPath;

  return {
    title,
    description,
    alternates: {
      canonical: self,
      languages: { ar: arPath, en: enPath, 'x-default': arPath },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'ar' ? 'ar_AE' : 'en_US',
      alternateLocale: locale === 'ar' ? 'en_US' : 'ar_AE',
      url: self,
      title,
      description,
    },
  };
}
