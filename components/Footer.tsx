import Link from 'next/link';
import { ExternalLink, MessageCircle } from 'lucide-react';
import type { Locale } from '@/lib/utils';
import { fontFor } from '@/lib/utils';
import { site } from '@/data/site';
import { content } from '@/data/content';
import { ROUTES, hrefFor } from '@/data/routes';
import Emblem from './Emblem';

const byId = new Map(ROUTES.map(r => [r.id, r]));
const FOOTER_LINKS = ['about', 'protection', 'alerts', 'reports', 'resources', 'privacy', 'terms', 'contact'];

// short labels for legal ids that have no navLabel
const legalLabel: Record<string, { ar: string; en: string }> = {
  privacy: { ar: 'سياسة الخصوصية', en: 'Privacy Policy' },
  terms:   { ar: 'شروط الاستخدام', en: 'Terms of Use' },
};

export default function Footer({ locale }: { locale: Locale }) {
  const isRTL = locale === 'ar';
  const t = content[locale];
  const font = fontFor(locale);
  const home = isRTL ? '/' : '/en';

  const labelOf = (id: string) =>
    byId.get(id)?.navLabel?.[locale] ?? legalLabel[id]?.[locale] ?? id;

  return (
    <footer dir={isRTL ? 'rtl' : 'ltr'} style={{ background: 'var(--navy-deep)', color: '#b9c6d6', fontFamily: font }}>
      {/* soft CTA band */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="wrap" style={{ padding: '36px 24px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
          <p style={{ margin: 0, maxWidth: 620, fontSize: 15, lineHeight: 1.7, color: '#d7e1ec' }}>
            {t.footer.ctaLine}
          </p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <a href={site.officialSite} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 18px', borderRadius: 6, border: '1.5px solid rgba(255,255,255,0.35)', color: '#fff', fontSize: 13.5, fontWeight: 600 }}>
              {t.ui.officialSite}<ExternalLink size={14} />
            </a>
            <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 18px', borderRadius: 6, background: 'var(--official)', color: '#fff', fontSize: 13.5, fontWeight: 600 }}>
              <MessageCircle size={15} />{t.ui.whatsapp}
            </a>
          </div>
        </div>
      </div>

      {/* main footer */}
      <div className="wrap" style={{ padding: '48px 24px 36px', display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: 40 }} >
        <div className="foot-brand">
          <Link href={home} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <Emblem size={40} />
            <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.3 }}>
              <span style={{ fontWeight: 700, fontSize: 15, color: '#fff' }}>{site.short[locale]}</span>
              <span style={{ fontSize: 11, color: '#8fa2b6' }}>{isRTL ? 'مجموعة الخليج' : 'Gulf Recovery Group'}</span>
            </span>
          </Link>
          <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.75, color: '#9fb0c2', maxWidth: 380 }}>{t.footer.blurb}</p>
        </div>

        <FooterCol title={t.footer.linksHeading} ids={FOOTER_LINKS.slice(0, 4)} labelOf={labelOf} locale={locale} />
        <FooterCol title={' '} ids={FOOTER_LINKS.slice(4)} labelOf={labelOf} locale={locale} />
      </div>

      {/* disclaimer + rights */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="wrap" style={{ padding: '22px 24px' }}>
          <p style={{ margin: '0 0 14px', fontSize: 12.5, lineHeight: 1.7, color: '#8093a6' }}>{t.footer.disclaimer}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'space-between', fontSize: 12, color: '#71859a' }}>
            <span>© 2026 {site.short[locale]}. {t.footer.rights}</span>
            <span>{site.name[locale]}</span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          footer .wrap[style*="grid"] { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
          .foot-brand { grid-column: 1 / -1; }
        }
        @media (max-width: 480px) {
          footer .wrap[style*="grid"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}

function FooterCol({ title, ids, labelOf, locale }: {
  title: string; ids: string[]; labelOf: (id: string) => string; locale: Locale;
}) {
  return (
    <div>
      <h4 style={{ margin: '4px 0 16px', fontSize: 12, fontWeight: 700, letterSpacing: locale === 'ar' ? 0 : '0.1em', textTransform: locale === 'ar' ? 'none' : 'uppercase', color: '#6f8398' }}>{title}</h4>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 11 }}>
        {ids.map(id => (
          <li key={id}>
            <Link href={hrefFor(id, locale)} style={{ fontSize: 13.5, color: '#aebccb' }}>{labelOf(id)}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
