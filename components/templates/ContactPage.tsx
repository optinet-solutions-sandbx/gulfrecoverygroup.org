'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, MessageCircle, Send, CheckCircle2, Mail, ShieldCheck } from 'lucide-react';
import type { Locale } from '@/lib/utils';
import { fontFor } from '@/lib/utils';
import { site } from '@/data/site';
import { content } from '@/data/content';
import PageHeader from '@/components/PageHeader';

export default function ContactPage({ locale }: { locale: Locale }) {
  const isRTL = locale === 'ar';
  const font = fontFor(locale);
  const c = content[locale].contact;
  const t = content[locale];
  const [sent, setSent] = useState(false);

  const label = (s: string) => (
    <span style={{ display: 'block', marginBottom: 7, fontSize: 13, fontWeight: 600, color: 'var(--navy)' }}>{s}</span>
  );
  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '12px 14px', fontFamily: font, fontSize: 14.5, color: 'var(--ink)',
    background: '#fff', border: '1px solid var(--line)', borderRadius: 8, outline: 'none',
  };

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} style={{ fontFamily: font }}>
      <PageHeader locale={locale} title={c.title} lead={c.description} />

      <section style={{ background: 'var(--panel)', padding: '64px 0' }}>
        <div className="wrap" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 40, alignItems: 'start' }}>
          {/* form */}
          <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 14, padding: 'clamp(24px,4vw,36px)' }}>
            {sent ? (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', padding: '30px 0' }}>
                <CheckCircle2 size={44} style={{ color: 'var(--official)', margin: '0 auto 16px' }} />
                <h2 style={{ margin: '0 0 8px', fontSize: 20 }}>{isRTL ? 'تم استلام رسالتك' : 'Your message was received'}</h2>
                <p style={{ margin: 0, color: 'var(--slate)', fontSize: 14.5, lineHeight: 1.7 }}>
                  {isRTL ? 'شكرًا لتواصلك مع المبادرة، سنعود إليك عند الحاجة.' : 'Thank you for contacting the initiative. We will get back to you if needed.'}
                </p>
              </motion.div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} noValidate>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }} className="cf-row">
                  <div>{label(c.fields.name)}<input required style={inputStyle} type="text" name="name" /></div>
                  <div>{label(c.fields.email)}<input required style={inputStyle} type="email" name="email" /></div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }} className="cf-row">
                  <div>{label(c.fields.phone)}<input style={inputStyle} type="tel" name="phone" /></div>
                  <div>{label(c.fields.subject)}<input style={inputStyle} type="text" name="subject" /></div>
                </div>
                <div style={{ marginBottom: 20 }}>{label(c.fields.message)}<textarea required rows={5} style={{ ...inputStyle, resize: 'vertical' }} name="message" /></div>
                <button type="submit" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '13px 28px', borderRadius: 8, background: 'var(--navy)', color: '#fff', fontFamily: font, fontSize: 15, fontWeight: 600, border: 'none', cursor: 'pointer' }}>
                  <Send size={16} />{c.send}
                </button>
              </form>
            )}
          </div>

          {/* side panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ background: 'var(--navy)', color: '#fff', borderRadius: 14, padding: '28px 26px' }}>
              <ShieldCheck size={24} style={{ color: '#7fe3b6', marginBottom: 14 }} />
              <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.75, color: '#cdd9e6' }}>
                {isRTL
                  ? 'هذا نموذج للاستفسارات العامة حول المبادرة. للحالات التي تتطلب مراجعة متخصصة، تواصل مع الموقع الرسمي.'
                  : 'This form is for general enquiries about the initiative. For cases needing specialist review, reach the official site.'}
              </p>
            </div>
            <a href={`mailto:${site.email}`} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 20px', background: '#fff', border: '1px solid var(--line)', borderRadius: 12 }}>
              <Mail size={19} style={{ color: 'var(--official)' }} />
              <span style={{ fontSize: 14, color: 'var(--navy)', fontWeight: 600, wordBreak: 'break-all' }}>{site.email}</span>
            </a>
            <a href={site.officialSite} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '13px', borderRadius: 8, border: '1.5px solid var(--navy)', color: 'var(--navy)', fontSize: 14, fontWeight: 600 }}>
              {t.ui.officialSite}<ExternalLink size={14} />
            </a>
            <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '13px', borderRadius: 8, background: 'var(--official)', color: '#fff', fontSize: 14, fontWeight: 600 }}>
              <MessageCircle size={15} />{t.ui.whatsapp}
            </a>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 860px) {
          section .wrap[style*="grid"] { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 520px) {
          .cf-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
