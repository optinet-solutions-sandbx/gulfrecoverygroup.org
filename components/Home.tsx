'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ShieldCheck, AlertTriangle, Smartphone, FileBarChart2, BookOpen, Users,
  ExternalLink, MessageCircle, ArrowRight, ArrowLeft, FileText, CircleAlert,
  BadgeCheck, Stethoscope,
} from 'lucide-react';
import type { Locale } from '@/lib/utils';
import { fontFor } from '@/lib/utils';
import { site } from '@/data/site';
import { content } from '@/data/content';
import { hrefFor } from '@/data/routes';

// Reveal on mount (not on scroll): guarantees content is always visible, even
// far below the fold, instead of being held at opacity:0 until intersection.
const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' as const, delay: Math.min(delay, 0.5) },
});

const AXIS_ICONS = [ShieldCheck, AlertTriangle, Smartphone, FileBarChart2, BookOpen, Users];

export default function Home({ locale }: { locale: Locale }) {
  const isRTL = locale === 'ar';
  const t = content[locale];
  const font = fontFor(locale);
  const Fwd = isRTL ? ArrowLeft : ArrowRight;

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} style={{ fontFamily: font, color: 'var(--ink)' }}>

      {/* ══════════════ HERO ══════════════ */}
      <section style={{ position: 'relative', background: 'linear-gradient(180deg,#ffffff 0%, var(--panel) 100%)', borderBottom: '1px solid var(--line)', overflow: 'hidden' }}>
        {/* faint institutional grid motif */}
        <div aria-hidden style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(var(--line-soft) 1px, transparent 1px), linear-gradient(to right, var(--line-soft) 1px, transparent 1px)', backgroundSize: '64px 64px', opacity: 0.5, maskImage: 'radial-gradient(circle at 50% 0%, #000 30%, transparent 75%)', WebkitMaskImage: 'radial-gradient(circle at 50% 0%, #000 30%, transparent 75%)' }} />
        <div className="wrap" style={{ position: 'relative', padding: '72px 24px 84px', maxWidth: 900, textAlign: 'center' }}>
          <motion.span {...reveal(0)} className="kicker" style={{ justifyContent: 'center' }}>
            <ShieldCheck size={15} />
            {isRTL ? 'مبادرة توعوية مستقلة' : 'An independent awareness initiative'}
          </motion.span>
          <motion.h1 {...reveal(0.08)} style={{ margin: '18px auto 0', fontSize: 'clamp(2rem, 4.6vw, 3.3rem)', lineHeight: 1.2, maxWidth: 800, color: 'var(--navy)' }}>
            {t.home.heroTitle}
          </motion.h1>
          <motion.p {...reveal(0.16)} style={{ margin: '22px auto 0', maxWidth: 660, fontSize: 'clamp(1rem,1.6vw,1.12rem)', lineHeight: 1.85, color: 'var(--slate)' }}>
            {t.home.heroLead}
          </motion.p>
          <motion.div {...reveal(0.24)} style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center', marginTop: 32 }}>
            <a href="#about" style={btnPrimary(font)}>
              {t.ui.explore}<Fwd size={17} />
            </a>
            <a href={site.officialSite} target="_blank" rel="noopener noreferrer" style={btnOutline(font)}>
              {t.ui.officialSite}<ExternalLink size={15} />
            </a>
          </motion.div>

          {/* principle strip (not commercial stats) */}
          <motion.div {...reveal(0.34)} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10, marginTop: 44 }}>
            {(isRTL ? ['التوعية', 'الوقاية', 'حماية الجمهور'] : ['Awareness', 'Prevention', 'Public protection']).map(p => (
              <span key={p} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 16px', background: '#fff', border: '1px solid var(--line)', borderRadius: 999, fontSize: 13, fontWeight: 600, color: 'var(--navy-700)' }}>
                <BadgeCheck size={14} style={{ color: 'var(--official)' }} />{p}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════ 1 · ABOUT ══════════════ */}
      <section id="about" style={{ background: '#fff', padding: '80px 0' }}>
        <div className="wrap" style={{ display: 'grid', gridTemplateColumns: '1.35fr 1fr', gap: 56, alignItems: 'center' }}>
          <motion.div {...reveal(0)} className="about-text">
            <span className="kicker"><span style={{ width: 22, height: 2, background: 'var(--official)' }} />{isRTL ? 'من نحن' : 'Who we are'}</span>
            <h2 style={{ margin: '14px 0 18px', fontSize: 'clamp(1.6rem,3vw,2.2rem)' }}>{t.home.aboutTitle}</h2>
            <p style={{ margin: 0, fontSize: 16, lineHeight: 1.9, color: 'var(--slate)' }}>{t.home.aboutBody}</p>
          </motion.div>
          <motion.div {...reveal(0.12)} style={{ background: 'var(--navy)', borderRadius: 14, padding: '32px 30px', color: '#fff', position: 'relative', overflow: 'hidden' }}>
            <div aria-hidden style={{ position: 'absolute', insetInlineEnd: -30, top: -30, opacity: 0.12 }}><ShieldCheck size={160} color="#fff" /></div>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 700, letterSpacing: isRTL ? 0 : '0.12em', textTransform: isRTL ? 'none' : 'uppercase', color: '#7fe3b6' }}>{isRTL ? 'رسالتنا' : 'Our mission'}</p>
            <p style={{ margin: '14px 0 0', fontSize: 18, lineHeight: 1.7, fontWeight: 500, position: 'relative' }}>{t.about.mission}</p>
          </motion.div>
        </div>
      </section>

      {/* ══════════════ 2 · AXES ══════════════ */}
      <section style={{ background: 'var(--panel)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', padding: '80px 0' }}>
        <div className="wrap">
          <motion.div {...reveal(0)} style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 44px' }}>
            <h2 style={{ margin: '0 0 12px', fontSize: 'clamp(1.6rem,3vw,2.2rem)' }}>{t.home.axesTitle}</h2>
            <p style={{ margin: 0, color: 'var(--slate)', fontSize: 15.5, lineHeight: 1.75 }}>{t.home.axesLead}</p>
          </motion.div>
          <div className="grid-3">
            {t.home.axes.map((c, i) => {
              const Icon = AXIS_ICONS[i] ?? ShieldCheck;
              return (
                <motion.div key={c.title} {...reveal(i * 0.06)} style={cardStyle()}>
                  <div style={iconBox()}><Icon size={20} style={{ color: 'var(--official)' }} /></div>
                  <h3 style={{ margin: '0 0 8px', fontSize: 17 }}>{c.title}</h3>
                  <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: 'var(--slate)' }}>{c.body}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════ 3 · RISKS ══════════════ */}
      <section style={{ background: '#fff', padding: '80px 0' }}>
        <div className="wrap">
          <motion.div {...reveal(0)} style={{ marginBottom: 36 }}>
            <span className="kicker" style={{ color: 'var(--amber)' }}><AlertTriangle size={15} />{isRTL ? 'كن على حذر' : 'Stay alert'}</span>
            <h2 style={{ margin: '12px 0 0', fontSize: 'clamp(1.6rem,3vw,2.2rem)' }}>{t.home.risksTitle}</h2>
          </motion.div>
          <div className="grid-3">
            {t.home.risks.map((r, i) => (
              <motion.div key={r} {...reveal(i * 0.05)} style={{
                display: 'flex', alignItems: 'center', gap: 14, padding: '18px 20px',
                background: 'var(--alert-50)', border: '1px solid #f0d3cf',
                borderInlineStart: '4px solid var(--alert)', borderRadius: 10,
              }}>
                <CircleAlert size={20} style={{ color: 'var(--alert)', flexShrink: 0 }} />
                <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--navy)' }}>{r}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ 4 · MESSAGE ══════════════ */}
      <section style={{ background: 'var(--navy-deep)', color: '#fff', padding: '84px 0' }}>
        <div className="wrap" style={{ maxWidth: 820, textAlign: 'center' }}>
          <motion.div {...reveal(0)}>
            <div style={{ display: 'inline-flex', width: 56, height: 56, borderRadius: '50%', background: 'rgba(79,211,156,0.14)', alignItems: 'center', justifyContent: 'center', marginBottom: 22 }}>
              <ShieldCheck size={26} style={{ color: '#4fd39c' }} />
            </div>
            <h2 style={{ margin: '0 0 20px', color: '#fff', fontSize: 'clamp(1.5rem,2.8vw,2rem)' }}>{t.home.messageTitle}</h2>
            <p style={{ margin: 0, fontSize: 'clamp(1.1rem,2vw,1.35rem)', lineHeight: 1.85, color: '#cdd9e6', fontWeight: 400 }}>{t.home.messageBody}</p>
          </motion.div>
        </div>
      </section>

      {/* ══════════════ 5 · STEPS ══════════════ */}
      <section style={{ background: '#fff', padding: '80px 0' }}>
        <div className="wrap">
          <motion.div {...reveal(0)} style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 48px' }}>
            <h2 style={{ margin: '0 0 12px', fontSize: 'clamp(1.6rem,3vw,2.2rem)' }}>{t.home.stepsTitle}</h2>
            <p style={{ margin: 0, color: 'var(--slate)', fontSize: 15.5, lineHeight: 1.75 }}>{t.home.stepsLead}</p>
          </motion.div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {t.home.steps.map((s, i) => (
              <motion.div key={s.title} {...reveal(i * 0.06)} style={{
                display: 'flex', gap: 20, alignItems: 'flex-start',
                padding: '20px 0', borderBottom: i < t.home.steps.length - 1 ? '1px solid var(--line-soft)' : 'none',
              }}>
                <div style={{ flexShrink: 0, width: 44, height: 44, borderRadius: 10, background: 'var(--official-50)', border: '1px solid #cbe6d9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 800, color: 'var(--official-700)' }}>
                  {isRTL ? toArabicDigit(i + 1) : i + 1}
                </div>
                <div>
                  <h3 style={{ margin: '2px 0 5px', fontSize: 16.5 }}>{s.title}</h3>
                  <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.7, color: 'var(--slate)' }}>{s.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ 6 · REPORTS ══════════════ */}
      <section style={{ background: 'var(--panel)', borderTop: '1px solid var(--line)', padding: '80px 0' }}>
        <div className="wrap">
          <motion.div {...reveal(0)} style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, marginBottom: 36 }}>
            <div>
              <span className="kicker"><FileBarChart2 size={15} />{isRTL ? 'محتوى توعوي' : 'Awareness content'}</span>
              <h2 style={{ margin: '12px 0 0', fontSize: 'clamp(1.6rem,3vw,2.2rem)' }}>{t.home.reportsTitle}</h2>
            </div>
            <Link href={hrefFor('reports', locale)} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 14, fontWeight: 600, color: 'var(--official-700)' }}>
              {isRTL ? 'كل التقارير' : 'All reports'}<Fwd size={15} />
            </Link>
          </motion.div>
          <div className="grid-3">
            {t.home.reports.map((r, i) => (
              <motion.div key={r} {...reveal(i * 0.05)}>
                <Link href={hrefFor(i % 2 === 0 ? 'reports' : 'alerts', locale)} style={{ display: 'block', background: '#fff', border: '1px solid var(--line)', borderRadius: 12, padding: '24px', height: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                    <FileText size={18} style={{ color: 'var(--navy-500)' }} />
                    <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: isRTL ? 0 : '0.1em', textTransform: isRTL ? 'none' : 'uppercase', color: 'var(--slate-soft)' }}>{isRTL ? 'تقرير توعوي' : 'Awareness brief'}</span>
                  </div>
                  <h3 style={{ margin: '0 0 14px', fontSize: 16.5, lineHeight: 1.5 }}>{r}</h3>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13.5, fontWeight: 600, color: 'var(--official-700)' }}>
                    {isRTL ? 'اقرأ المزيد' : 'Read more'}<Fwd size={13} />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ 7 · PROFESSIONAL CTA ══════════════ */}
      <section style={{ background: '#fff', padding: '76px 0' }}>
        <div className="wrap">
          <motion.div {...reveal(0)} style={{ background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy-700) 100%)', borderRadius: 16, padding: 'clamp(32px,5vw,52px)', color: '#fff', textAlign: 'center' }}>
            <Stethoscope size={30} style={{ color: '#7fe3b6', margin: '0 auto 18px' }} />
            <h2 style={{ margin: '0 0 16px', color: '#fff', fontSize: 'clamp(1.5rem,2.8vw,2rem)' }}>{t.home.ctaTitle}</h2>
            <p style={{ margin: '0 auto 30px', maxWidth: 620, fontSize: 16, lineHeight: 1.8, color: '#cdd9e6' }}>{t.home.ctaBody}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
              <a href={site.officialSite} target="_blank" rel="noopener noreferrer" style={{ ...btnPrimary(font), background: '#fff', color: 'var(--navy)' }}>
                {t.ui.officialSite}<ExternalLink size={15} />
              </a>
              <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 24px', borderRadius: 8, background: 'var(--official)', color: '#fff', fontFamily: font, fontSize: 15, fontWeight: 600 }}>
                <MessageCircle size={16} />{t.ui.whatsapp}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <style>{`
        @media (max-width: 860px) {
          .about-text + div { order: -1; }
          #about .wrap { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </div>
  );
}

/* ── style atoms ── */
function btnPrimary(font: string): React.CSSProperties {
  return { display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 26px', borderRadius: 8, background: 'var(--navy)', color: '#fff', fontFamily: font, fontSize: 15, fontWeight: 600 };
}
function btnOutline(font: string): React.CSSProperties {
  return { display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 24px', borderRadius: 8, background: '#fff', color: 'var(--navy)', border: '1.5px solid var(--navy)', fontFamily: font, fontSize: 15, fontWeight: 600 };
}
function cardStyle(): React.CSSProperties {
  return { background: '#fff', border: '1px solid var(--line)', borderRadius: 12, padding: '28px 24px', height: '100%' };
}
function iconBox(): React.CSSProperties {
  return { width: 46, height: 46, borderRadius: 10, background: 'var(--official-50)', border: '1px solid #cbe6d9', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 };
}

function toArabicDigit(n: number): string {
  return String(n).replace(/[0-9]/g, d => '٠١٢٣٤٥٦٧٨٩'[+d]);
}
