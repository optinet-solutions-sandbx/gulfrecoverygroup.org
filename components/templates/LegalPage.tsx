import type { Locale } from '@/lib/utils';
import { fontFor } from '@/lib/utils';
import { content, type LegalPageContent } from '@/data/content';
import PageHeader from '@/components/PageHeader';

export default function LegalPage({ locale, data }: { locale: Locale; data: LegalPageContent }) {
  const isRTL = locale === 'ar';
  const font = fontFor(locale);

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} style={{ fontFamily: font }}>
      <PageHeader locale={locale} title={data.title} />
      <section style={{ background: '#fff', padding: '56px 0 72px' }}>
        <div className="wrap" style={{ maxWidth: 800 }}>
          <p style={{ margin: '0 0 40px', fontSize: 13, color: 'var(--slate-soft)', fontWeight: 600 }}>{data.updated}</p>
          {data.sections.map((s, i) => (
            <div key={s.heading} style={{ marginBottom: 32, paddingBottom: 32, borderBottom: i < data.sections.length - 1 ? '1px solid var(--line-soft)' : 'none' }}>
              <h2 style={{ margin: '0 0 12px', fontSize: 19, color: 'var(--navy)' }}>{s.heading}</h2>
              <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.85, color: 'var(--slate)' }}>{s.body}</p>
            </div>
          ))}
          <div style={{ marginTop: 8, padding: '20px 22px', background: 'var(--panel)', borderInlineStart: '4px solid var(--official)', borderRadius: 10 }}>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.75, color: 'var(--slate)' }}>{content[locale].footer.disclaimer}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
