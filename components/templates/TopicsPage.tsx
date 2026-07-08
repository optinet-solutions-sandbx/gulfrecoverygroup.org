'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FileText, ExternalLink, MessageCircle } from 'lucide-react';
import type { Locale } from '@/lib/utils';
import { fontFor } from '@/lib/utils';
import { site } from '@/data/site';
import { content, type TopicsPageContent } from '@/data/content';
import PageHeader from '@/components/PageHeader';

// Reveal on mount so cards are never left invisible below the fold.
const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, ease: 'easeOut' as const, delay: Math.min(delay, 0.4) },
});

export default function TopicsPage({ locale, data }: { locale: Locale; data: TopicsPageContent }) {
  const isRTL = locale === 'ar';
  const font = fontFor(locale);
  const t = content[locale];

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} style={{ fontFamily: font }}>
      <PageHeader locale={locale} title={data.title} lead={data.description} />

      <section style={{ background: '#fff', padding: '68px 0' }}>
        <div className="wrap">
          <div className="grid-2">
            {data.topics.map((topic, i) => {
              const cardStyle = {
                display: 'flex', gap: 18, padding: '26px', background: 'var(--panel)',
                border: '1px solid var(--line)', borderRadius: 12,
                borderInlineStart: '4px solid var(--official)',
              } as const;
              const card = (
                <>
                  <div style={{ flexShrink: 0, width: 44, height: 44, borderRadius: 10, background: '#fff', border: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FileText size={19} style={{ color: 'var(--official)' }} />
                  </div>
                  <div>
                    <h2 style={{ margin: '2px 0 8px', fontSize: 17.5, color: 'var(--navy)' }}>{topic.title}</h2>
                    <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.75, color: 'var(--slate)' }}>{topic.body}</p>
                  </div>
                </>
              );
              return topic.slug ? (
                <motion.div key={topic.title} {...reveal(i * 0.05)}>
                  <Link href={isRTL ? `/${topic.slug}` : `/en/${topic.slug}`} style={{ ...cardStyle, textDecoration: 'none', cursor: 'pointer' }}>
                    {card}
                  </Link>
                </motion.div>
              ) : (
                <motion.article key={topic.title} {...reveal(i * 0.05)} style={cardStyle}>
                  {card}
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* soft professional footer band */}
      <section style={{ background: 'var(--panel-2)', borderTop: '1px solid var(--line)', padding: '56px 0' }}>
        <div className="wrap" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 22 }}>
          <div>
            <h2 style={{ margin: '0 0 8px', fontSize: 20 }}>{t.ui.professionalNote}</h2>
            <p style={{ margin: 0, maxWidth: 520, fontSize: 14.5, lineHeight: 1.7, color: 'var(--slate)' }}>{t.home.ctaBody}</p>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <a href={site.officialSite} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 20px', borderRadius: 8, border: '1.5px solid var(--navy)', color: 'var(--navy)', fontSize: 14, fontWeight: 600 }}>
              {t.ui.officialSite}<ExternalLink size={14} />
            </a>
            <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 20px', borderRadius: 8, background: 'var(--official)', color: '#fff', fontSize: 14, fontWeight: 600 }}>
              <MessageCircle size={15} />{t.ui.whatsapp}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
