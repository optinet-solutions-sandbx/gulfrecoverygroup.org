import type { Locale } from '@/lib/utils';
import { site } from '@/data/site';

/**
 * Organization schema for the initiative. Typed as a public-interest / NGO
 * awareness body (not a LegalService), which is what the .com carries. This
 * keeps the two entities distinct in structured data.
 */
export default function JsonLd({ locale }: { locale: Locale }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'NGO',
    name: site.name[locale],
    alternateName: locale === 'ar' ? site.name.en : site.name.ar,
    url: locale === 'ar' ? site.domain : `${site.domain}/en`,
    description: site.tagline[locale],
    knowsAbout: locale === 'ar'
      ? ['التوعية المالية', 'الاحتيال في التداول', 'حماية المستثمرين', 'الأمن الرقمي']
      : ['financial literacy', 'trading fraud', 'investor protection', 'digital security'],
    areaServed: ['SA', 'AE', 'QA', 'KW', 'BH', 'OM'],
    sameAs: [site.officialSite],
  };
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
