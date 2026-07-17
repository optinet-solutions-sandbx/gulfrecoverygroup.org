import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Locale } from '@/lib/utils';
import { fontFor } from '@/lib/utils';
import { content } from '@/data/content';

/** Institutional page banner: breadcrumb + title + optional lead, on a navy field. */
export default function PageHeader({ locale, title, lead }: { locale: Locale; title: string; lead?: string }) {
  const isRTL = locale === 'ar';
  const font = fontFor(locale);
  const home = isRTL ? '/' : '/en';
  const Sep = isRTL ? ChevronLeft : ChevronRight;

  return (
    <section dir={isRTL ? 'rtl' : 'ltr'} style={{ background: 'var(--navy)', color: '#fff', fontFamily: font, position: 'relative', overflow: 'hidden' }}>
      <div aria-hidden style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '56px 56px', maskImage: 'linear-gradient(180deg,#000,transparent)', WebkitMaskImage: 'linear-gradient(180deg,#000,transparent)' }} />
      <div className="wrap" style={{ position: 'relative', padding: '46px 24px 52px' }}>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 12.5, color: '#9fb4c9', marginBottom: 18 }}>
          <Link href={home} prefetch={false} style={{ color: '#9fb4c9' }}>{content[locale].ui.breadcrumbHome}</Link>
          <Sep size={14} style={{ opacity: 0.6 }} aria-hidden />
          <span style={{ color: '#fff' }}>{title}</span>
        </nav>
        <h1 style={{ margin: 0, color: '#fff', fontSize: 'clamp(1.8rem,3.6vw,2.6rem)', lineHeight: 1.25 }}>{title}</h1>
        {lead && <p style={{ margin: '18px 0 0', maxWidth: 720, fontSize: 'clamp(1rem,1.6vw,1.1rem)', lineHeight: 1.8, color: '#cdd9e6' }}>{lead}</p>}
      </div>
    </section>
  );
}
