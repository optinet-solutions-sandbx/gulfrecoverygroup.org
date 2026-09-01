import type { MetadataRoute } from 'next';
import { site } from '@/data/site';

export const dynamic = 'force-static';

// Launched: allow crawling of the whole public site and point crawlers at the sitemap.
// (Any individual page can still opt out via its own `robots` metadata if ever needed.)
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Cloudflare injects /cdn-cgi/l/email-protection links (email obfuscation) that 404 and
      // waste crawl budget — keep crawlers off Cloudflare's internal paths.
      disallow: '/cdn-cgi/',
    },
    // /sitemap.xml is shadowed on production by a legacy WordPress/Yoast SEO
    // rewrite that still intercepts that exact filename, so crawlers are
    // pointed at /urls.xml instead — same content, unaffected filename.
    sitemap: `${site.domain}/urls.xml`,
    host: site.domain,
  };
}
