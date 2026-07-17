'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ExternalLink, MessageCircle, ShieldCheck } from 'lucide-react';
import type { Locale } from '@/lib/utils';
import { fontFor } from '@/lib/utils';
import { site } from '@/data/site';
import { content } from '@/data/content';
import { ROUTES, NAV_IDS, hrefFor, altLocaleHref, routeBySlug, norm } from '@/data/routes';
import { ARTICLE_SECTION } from '@/data/articles';
import { ARTICLE_SECTION_EN } from '@/data/articles.en';
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

  // Match by route id, not by href string — pathname vs. hrefFor() can disagree on
  // percent-encoding for Arabic slugs, so string comparison silently never matches.
  const currentRouteId = routeBySlug(curSlug, locale)?.id;
  const activeArticleSection = isRTL ? ARTICLE_SECTION[norm(curSlug)] : ARTICLE_SECTION_EN[norm(curSlug)];
  const activeId = currentRouteId ?? activeArticleSection;
  const isHome = pathname === home;

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  useEffect(() => { setOpen(false); }, [pathname]);

  const isActive = (id: string) => (id === 'home' ? isHome : id === activeId);
  const drawerOffscreen = isRTL ? 'translateX(-100%)' : 'translateX(100%)';

  return (
    <>
      <header dir={isRTL ? 'rtl' : 'ltr'} style={{ position: 'sticky', top: 0, zIndex: 50 }}>
        {/* ── official ribbon ── */}
        <div style={{ background: 'var(--navy-deep)', color: '#cdd9e6' }}>
          <div className="wrap" style={{ height: 34, display: 'flex', alignItems: 'center', gap: 9, justifyContent: 'center' }}>
            <ShieldCheck size={13} style={{ color: '#4fd39c', flexShrink: 0 }} aria-hidden />
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
          <div style={{ maxWidth: 1260, width: '100%', margin: '0 auto', paddingInline: 24, height: 70, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
            {/* logo */}
            <Link href={home} style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
              <Emblem size={40} />
              <span style={{ fontFamily: font, fontWeight: 700, fontSize: isRTL ? 14 : 14.5, color: 'var(--navy)' }} className="logo-text">
                {site.short[locale]}
              </span>
            </Link>

            {/* desktop nav */}
            <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Link href={home} style={navLink(isActive('home'), font)}>{t.ui.home}</Link>
              {navItems.map(item => (
                <Link key={item.id} href={item.href} style={navLink(isActive(item.id), font)}>
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
                color: 'var(--navy)', padding: '9px 15px', border: '1.5px solid var(--navy)', borderRadius: 6, whiteSpace: 'nowrap',
              }}>
                {isRTL ? t.ui.officialSite : 'Official site'}
                <ExternalLink size={14} aria-hidden />
              </a>

              <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" className="cta-wa" style={{
                display: 'inline-flex', alignItems: 'center', gap: 7, fontFamily: font, fontSize: 13, fontWeight: 600,
                color: '#fff', background: 'var(--official)', padding: '10px 15px', borderRadius: 6, whiteSpace: 'nowrap',
              }}>
                <MessageCircle size={15} aria-hidden />
                <span className="wa-label">{isRTL ? t.ui.whatsapp : 'WhatsApp'}</span>
              </a>

              <button
                onClick={() => setOpen(v => !v)}
                aria-label={open ? (isRTL ? 'إغلاق القائمة' : 'Close menu') : (isRTL ? 'فتح القائمة' : 'Open menu')}
                aria-expanded={open}
                aria-controls="mobile-drawer"
                type="button"
                className="hamburger"
                style={{
                  display: 'none', alignItems: 'center', justifyContent: 'center', width: 40, height: 40,
                  borderRadius: 6, border: '1px solid var(--line)', background: '#fff', color: 'var(--navy)', cursor: 'pointer',
                }}>
                {open ? <X size={19} aria-hidden /> : <Menu size={19} aria-hidden />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <style>{`
        @media (max-width: 1260px) {
          .desktop-nav  { display: none !important; }
          .hamburger    { display: flex !important; }
          .cta-official { display: none !important; }
        }
        @media (max-width: 560px) {
          .logo-text   { display: none !important; }
          .wa-label    { display: none !important; }
          .lang-toggle { display: none !important; }
        }
        @media (max-width: 720px) {
          .ribbon-text { font-size: 10.5px !important; }
        }
        .mobile-overlay {
          position: fixed; inset: 0; z-index: 60; background: rgba(10,32,54,0.45);
          opacity: 0; pointer-events: none; transition: opacity 0.25s ease;
        }
        .mobile-overlay.open { opacity: 1; pointer-events: auto; }
        .mobile-drawer {
          transition: transform 0.3s cubic-bezier(0.32,0.72,0,1);
        }
      `}</style>

      {/* mobile drawer */}
      <div className={`mobile-overlay${open ? ' open' : ''}`} onClick={() => setOpen(false)} aria-hidden="true" />
      <div
        id="mobile-drawer"
        className="mobile-drawer"
        dir={isRTL ? 'rtl' : 'ltr'}
        aria-hidden={!open}
        style={{
          position: 'fixed', top: 0, bottom: 0, zIndex: 61, width: 300,
          [isRTL ? 'left' : 'right']: 0, background: '#fff',
          borderInlineStart: '1px solid var(--line)', display: 'flex', flexDirection: 'column',
          transform: open ? 'translateX(0)' : drawerOffscreen,
        }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', height: 66, borderBottom: '1px solid var(--line)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Emblem size={32} />
            <span style={{ fontFamily: font, fontWeight: 700, fontSize: 14, color: 'var(--navy)' }}>{site.short[locale]}</span>
          </div>
          <button onClick={() => setOpen(false)} type="button" aria-label={isRTL ? 'إغلاق القائمة' : 'Close menu'} tabIndex={open ? 0 : -1} style={{ background: 'none', border: 'none', color: 'var(--slate)', cursor: 'pointer' }}>
            <X size={20} aria-hidden />
          </button>
        </div>
        <nav style={{ flex: 1, overflowY: 'auto', padding: 14 }}>
          {[{ id: 'home', label: t.ui.home, href: home }, ...navItems].map((item) => (
            <Link key={item.id} href={item.href} tabIndex={open ? 0 : -1} style={{
              display: 'block', padding: '13px 14px', marginBottom: 3, borderRadius: 8,
              fontFamily: font, fontSize: 15, fontWeight: isActive(item.id) ? 700 : 500,
              color: isActive(item.id) ? 'var(--official-700)' : 'var(--navy)',
              background: isActive(item.id) ? 'var(--official-50)' : 'transparent',
              textAlign: isRTL ? 'right' : 'left',
            }}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div style={{ padding: '16px 16px 24px', borderTop: '1px solid var(--line)', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" tabIndex={open ? 0 : -1} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '13px', borderRadius: 7, background: 'var(--official)', color: '#fff', fontFamily: font, fontSize: 14, fontWeight: 600 }}>
            <MessageCircle size={16} aria-hidden />{t.ui.whatsapp}
          </a>
          <a href={site.officialSite} target="_blank" rel="noopener noreferrer" tabIndex={open ? 0 : -1} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px', borderRadius: 7, border: '1.5px solid var(--navy)', color: 'var(--navy)', fontFamily: font, fontSize: 13.5, fontWeight: 600 }}>
            {t.ui.officialSite}<ExternalLink size={14} aria-hidden />
          </a>
          <Link href={altHref} tabIndex={open ? 0 : -1} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '11px', borderRadius: 7, border: '1px solid var(--line)', color: 'var(--navy-700)', fontFamily: font, fontSize: 13, fontWeight: 600 }}>
            {t.ui.langSwitch}
          </Link>
        </div>
      </div>
    </>
  );
}

function navLink(active: boolean, font: string): React.CSSProperties {
  return {
    position: 'relative',
    fontFamily: font,
    fontSize: 13.5,
    fontWeight: active ? 700 : 500,
    color: active ? 'var(--official-700)' : 'var(--slate)',
    padding: '10px 10px',
    borderRadius: 6,
    whiteSpace: 'nowrap',
    borderBottom: active ? '2px solid var(--official)' : '2px solid transparent',
  };
}
