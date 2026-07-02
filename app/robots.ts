import type { MetadataRoute } from 'next';
import { site } from '@/data/site';

// Preview posture: block all crawling until the initiative launches.
// At launch, switch `disallow` to '' and add the sitemap back.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', disallow: '/' },
    sitemap: `${site.domain}/sitemap.xml`,
  };
}
