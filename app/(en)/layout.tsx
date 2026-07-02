import type { Metadata, Viewport } from 'next';
import '../globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import { site } from '@/data/site';

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default: `${site.name.en} | Awareness and protection from financial fraud`,
    template: `%s | ${site.short.en}`,
  },
  description: site.tagline.en,
  alternates: {
    canonical: '/en',
    languages: { ar: '/', en: '/en', 'x-default': '/' },
  },
  openGraph: {
    type: 'website',
    siteName: site.name.en,
    locale: 'en_US',
    alternateLocale: 'ar_AE',
    url: '/en',
  },
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

export const viewport: Viewport = {
  themeColor: '#0f2c4d',
  width: 'device-width',
  initialScale: 1,
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" className="h-full">
      <body className="min-h-full flex flex-col antialiased">
        <JsonLd locale="en" />
        <Header locale="en" />
        <main className="flex-1">{children}</main>
        <Footer locale="en" />
      </body>
    </html>
  );
}
