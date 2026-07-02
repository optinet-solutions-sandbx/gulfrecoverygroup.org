'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ExternalLink, MessageCircle, ShieldCheck } from 'lucide-react';
import type { Locale } from '@/lib/utils';
import { fontFor } from '@/lib/utils';
import { site } from '@/data/site';
import { content } from '@/data/content';
import { ROUTES, NAV_IDS, hrefFor, altLocaleHref } from '@/data/routes';
import Emblem from './Emblem';

const byId = new Map(ROUTES.map(r => [r.id, r]));

export default function Header({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isRTL = locale === 'ar';
  const t = content[locale];
  const font = fontFor(locale);
  const home = isRTL ? '/' : '/en';

  const navItems = NAV_IDS.map(id => {
    const r = byId.get(id)!;
    return { id, label: r.navLabel![locale], href: hrefFor(id, locale) };
  });

  const curSlug = isRTL ? pathname.replace(/^\//, '') : pathname.replace(/^\/en\/?/, '');
  const altHref = altLocaleHref(decodeURIComponent(curSlug), locale);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  useEffect(() => { setOpen(false); }, [pathname]);

  const isActive = (href: string) =>
    href === home ? pathname === href : pathname.startsWith(href);

  return (
    <>
      <header dir={isRTL ? 'rtl' : 'ltr'} style={{ position: 'sticky', top: 0, zIndex: 50 }}>
        {/* ── official ribbon ── */}
        <div style={{ background: 'var(--navy-deep)', color: '#cdd9e6' }}>
          <div className="wrap" style={{ height: 34, display: 'flex', alignItems: 'center', gap: 9, justifyContent: 'center' }}>
            <ShieldCheck size={13} style={{ color: '#4fd39c', flexShrink: 0 }} />
            <span className="ribbon-text" style={{ fontFamily: font, fontSize: 11.5, letterSpacing: isRTL ? 0 : '0.02em', textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {t.ui.ribbon}
            </span>
          </div>
        </div>

        {/* ── main bar ── */}
        <div style={{
          background: '#ffffff',
          borderBottom: `1px solid var(--line)`,
          boxShadow: scrolled ? '0 2px 14px rgba(15,44,77,0.07)' : 'none',
          transition: 'box-shadow 0.25s',
        }}>
          <div className="wrap" style={{ height: 70, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
            {/* logo */}
            <Link href={home} style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
              <Emblem size={40} />
              <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }} className="logo-text">
                <span style={{ fontFamily: font, fontWeight: 700, fontSize: isRTL ? 14 : 14.5, color: 'var(--navy)' }}>
                  {site.short[locale]}
                </span>
                <span style={{ fontFamily: font, fontWeight: 500, fontSize: 10.5, color: 'var(--slate-soft)', letterSpacing: isRTL ? 0 : '0.03em' }}>
                  {isRTL ? 'مجموعة الخليج' : 'Gulf Recovery Group'}
                </span>
              </span>
            </Link>

            {/* desktop nav */}
            <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Link href={home} style={navLink(isActive(home), font)}>{t.ui.home}</Link>
              {navItems.map(item => (
                <Link key={item.id} href={item.href} style={navLink(isActive(item.href), font)}>
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* right cluster */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
              <Link href={altHref} className="lang-toggle" style={{
                fontFamily: font, fontSize: 12.5, fontWeight: 600, color: 'var(--navy-700)',
                padding: '7px 11px', border: '1px solid var(--line)', borderRadius: 6, whiteSpace: 'nowrap',
              }}>
                {t.ui.langSwitch}
              </Link>

              <a href={site.officialSite} target="_blank" rel="noopener noreferrer" className="cta-official" style={{
                display: 'inline-flex', alignItems: 'center', gap: 7, fontFamily: font, fontSize: 13, fontWeight: 600,
                color: 'var(--navy)', padding: '9px 16px', border: '1.5px solid var(--navy)', borderRadius: 6, whiteSpace: 'nowrap',
              }}>
                {t.ui.officialSite}
                <ExternalLink size={14} />
              </a>

              <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" className="cta-wa" style={{
                display: 'inline-flex', alignItems: 'center', gap: 7, fontFamily: font, fontSize: 13, fontWeight: 600,
                color: '#fff', background: 'var(--official)', padding: '10px 16px', borderRadius: 6, whiteSpace: 'nowrap',
              }}>
                <MessageCircle size={15} />
                {t.ui.whatsapp}
              </a>

              <button onClick={() => setOpen(v => !v)} aria-label="menu" className="hamburger" style={{
                display: 'none', alignItems: 'center', justifyContent: 'center', width: 40, height: 40,
                borderRadius: 6, border: '1px solid var(--line)', background: '#fff', color: 'var(--navy)', cursor: 'pointer',
              }}>
                {open ? <X size={19} /> : <Menu size={19} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <style>{`
        @media (max-width: 1080px) {
          .desktop-nav { display: none !important; }
          .hamburger   { display: flex !important; }
          .cta-official { display: none !important; }
        }
        @media (max-width: 560px) {
          .logo-text   { display: none !important; }
          .cta-wa span { display: none !important; }
          .lang-toggle { display: none !important; }
        }
        @media (max-width: 720px) {
          .ribbon-text { font-size: 10.5px !important; }
        }
      `}</style>

      {/* mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              style={{ position: 'fixed', inset: 0, zIndex: 60, background: 'rgba(10,32,54,0.45)' }} />
            <motion.div
              initial={{ x: isRTL ? '-100%' : '100%' }} animate={{ x: 0 }} exit={{ x: isRTL ? '-100%' : '100%' }}
              transition={{ type: 'spring', stiffness: 340, damping: 34 }}
              dir={isRTL ? 'rtl' : 'ltr'}
              style={{
                position: 'fixed', top: 0, bottom: 0, zIndex: 61, width: 300,
                [isRTL ? 'left' : 'right']: 0, background: '#fff',
                borderInlineStart: '1px solid var(--line)', display: 'flex', flexDirection: 'column',
              }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', height: 66, borderBottom: '1px solid var(--line)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Emblem size={32} />
                  <span style={{ fontFamily: font, fontWeight: 700, fontSize: 14, color: 'var(--navy)' }}>{site.short[locale]}</span>
                </div>
                <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--slate)', cursor: 'pointer' }}>
                  <X size={20} />
                </button>
              </div>
              <nav style={{ flex: 1, overflowY: 'auto', padding: 14 }}>
                {[{ id: 'home', label: t.ui.home, href: home }, ...navItems].map((item, i) => (
                  <motion.div key={item.id} initial={{ opacity: 0, x: isRTL ? -12 : 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
                    <Link href={item.href} style={{
                      display: 'block', padding: '13px 14px', marginBottom: 3, borderRadius: 8,
                      fontFamily: font, fontSize: 15, fontWeight: isActive(item.href) ? 700 : 500,
                      color: isActive(item.href) ? 'var(--official-700)' : 'var(--navy)',
                      background: isActive(item.href) ? 'var(--official-50)' : 'transparent',
                      textAlign: isRTL ? 'right' : 'left',
                    }}>
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div style={{ padding: '16px 16px 24px', borderTop: '1px solid var(--line)', display: 'flex', flexDirection: 'column', gap: 10 }}>
                <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '13px', borderRadius: 7, background: 'var(--official)', color: '#fff', fontFamily: font, fontSize: 14, fontWeight: 600 }}>
                  <MessageCircle size={16} />{t.ui.whatsapp}
                </a>
                <a href={site.officialSite} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px', borderRadius: 7, border: '1.5px solid var(--navy)', color: 'var(--navy)', fontFamily: font, fontSize: 13.5, fontWeight: 600 }}>
                  {t.ui.officialSite}<ExternalLink size={14} />
                </a>
                <Link href={altHref} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '11px', borderRadius: 7, border: '1px solid var(--line)', color: 'var(--navy-700)', fontFamily: font, fontSize: 13, fontWeight: 600 }}>
                  {t.ui.langSwitch}
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function navLink(active: boolean, font: string): React.CSSProperties {
  return {
    position: 'relative',
    fontFamily: font,
    fontSize: 14,
    fontWeight: active ? 700 : 500,
    color: active ? 'var(--official-700)' : 'var(--slate)',
    padding: '10px 12px',
    borderRadius: 6,
    whiteSpace: 'nowrap',
    borderBottom: active ? '2px solid var(--official)' : '2px solid transparent',
  };
}
