'use client';

import { motion } from 'framer-motion';
import { Target, Eye, CheckCircle2 } from 'lucide-react';
import type { Locale } from '@/lib/utils';
import { fontFor } from '@/lib/utils';
import { content } from '@/data/content';
import PageHeader from '@/components/PageHeader';

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, ease: 'easeOut' as const, delay },
});

export default function AboutPage({ locale }: { locale: Locale }) {
  const isRTL = locale === 'ar';
  const font = fontFor(locale);
  const a = content[locale].about;

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} style={{ fontFamily: font }}>
      <PageHeader locale={locale} title={a.title} />

      {/* intro */}
      <section style={{ background: '#fff', padding: '64px 0 40px' }}>
        <div className="wrap" style={{ maxWidth: 820 }}>
          <motion.p {...reveal(0)} style={{ margin: 0, fontSize: 'clamp(1.05rem,1.7vw,1.2rem)', lineHeight: 1.95, color: 'var(--ink)' }}>{a.body}</motion.p>
        </div>
      </section>

      {/* mission + vision */}
      <section style={{ background: '#fff', padding: '20px 0 64px' }}>
        <div className="wrap grid-2">
          <motion.div {...reveal(0)} style={{ background: 'var(--navy)', color: '#fff', borderRadius: 14, padding: '32px 30px' }}>
            <div style={{ display: 'inline-flex', width: 46, height: 46, borderRadius: 10, background: 'rgba(79,211,156,0.15)', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
              <Target size={22} style={{ color: '#7fe3b6' }} />
            </div>
            <h2 style={{ margin: '0 0 12px', color: '#fff', fontSize: 20 }}>{isRTL ? 'رسالتنا' : 'Our Mission'}</h2>
            <p style={{ margin: 0, fontSize: 16, lineHeight: 1.8, color: '#cdd9e6' }}>{a.mission}</p>
          </motion.div>
          <motion.div {...reveal(0.1)} style={{ background: 'var(--panel)', border: '1px solid var(--line)', borderRadius: 14, padding: '32px 30px' }}>
            <div style={{ display: 'inline-flex', width: 46, height: 46, borderRadius: 10, background: 'var(--official-50)', border: '1px solid #cbe6d9', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
              <Eye size={22} style={{ color: 'var(--official)' }} />
            </div>
            <h2 style={{ margin: '0 0 12px', fontSize: 20 }}>{isRTL ? 'رؤيتنا' : 'Our Vision'}</h2>
            <p style={{ margin: 0, fontSize: 16, lineHeight: 1.8, color: 'var(--slate)' }}>{a.vision}</p>
          </motion.div>
        </div>
      </section>

      {/* values */}
      <section style={{ background: 'var(--panel-2)', borderTop: '1px solid var(--line)', padding: '64px 0' }}>
        <div className="wrap">
          <motion.div {...reveal(0)} style={{ textAlign: 'center', marginBottom: 36 }}>
            <span className="kicker" style={{ justifyContent: 'center' }}>{isRTL ? 'قيمنا' : 'Our values'}</span>
            <h2 style={{ margin: '12px 0 0', fontSize: 'clamp(1.5rem,2.6vw,2rem)' }}>{isRTL ? 'ما نؤمن به' : 'What we stand for'}</h2>
          </motion.div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
            {a.values.map((v, i) => (
              <motion.span key={v} {...reveal(i * 0.05)} style={{
                display: 'inline-flex', alignItems: 'center', gap: 9, padding: '12px 20px',
                background: '#fff', border: '1px solid var(--line)', borderRadius: 999,
                fontSize: 15, fontWeight: 600, color: 'var(--navy)',
              }}>
                <CheckCircle2 size={17} style={{ color: 'var(--official)' }} />{v}
              </motion.span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
