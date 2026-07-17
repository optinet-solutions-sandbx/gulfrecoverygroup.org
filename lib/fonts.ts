import { IBM_Plex_Sans_Arabic, Public_Sans } from 'next/font/google';

/** Self-hosted, zero-render-blocking fonts (replaces the old Google Fonts CSS @import). */
export const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-ar',
  display: 'swap',
});

export const publicSans = Public_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-en',
  display: 'swap',
});
