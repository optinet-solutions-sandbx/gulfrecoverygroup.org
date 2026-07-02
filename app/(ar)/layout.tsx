import type { Metadata, Viewport } from 'next';
import '../globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import { site } from '@/data/site';

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default: `${site.name.ar} | التوعية والحماية من الاحتيال المالي`,
    template: `%s | ${site.short.ar}`,
  },
  description: site.tagline.ar,
  alternates: {
    canonical: '/',
    languages: { ar: '/', en: '/en', 'x-default': '/' },
  },
  openGraph: {
    type: 'website',
    siteName: site.name.ar,
    locale: 'ar_AE',
    alternateLocale: 'en_US',
    url: '/',
  },
  // Preview build: keep out of search indexes until launch.
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

export const viewport: Viewport = {
  themeColor: '#0f2c4d',
  width: 'device-width',
  initialScale: 1,
};

export default function ArLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className="h-full">
      <body className="min-h-full flex flex-col antialiased">
        <JsonLd locale="ar" />
        <Header locale="ar" />
        <main className="flex-1">{children}</main>
        <Footer locale="ar" />
      </body>
    </html>
  );
}
