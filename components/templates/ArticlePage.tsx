import { BookOpenCheck, ListTree, Info, KeyRound, CircleCheckBig, CircleCheck, CircleX } from 'lucide-react';
import type { Locale } from '@/lib/utils';
import { fontFor } from '@/lib/utils';
import { content } from '@/data/content';
import type { Article, ArticleBlock } from '@/data/articles';
import PageHeader from '@/components/PageHeader';

/* Recurring rhetorical closers every guide uses — surfaced as callout cards instead of plain text. */
const NOTE_MARKERS = ['تذكر دائم', 'معلومة مهمة', 'نصيحة مهمة', 'Always remember', 'Important note', 'Important tip'];
const RULE_MARKERS = ['قاعدة ذهبية', 'قاعدة المستثمر الواعي', 'قاعدة بسيطة', 'قاعدة مهمة', 'rule'];
const SUMMARY_MARKERS = ['الخلاصة', 'Conclusion'];

const LABELS = {
  ar: { guide: 'دليل توعوي', toc: 'محتويات الدليل' },
  en: { guide: 'Awareness guide', toc: 'Guide contents' },
} as const;

type CalloutKind = 'note' | 'rule' | 'summary';

function calloutKind(heading: string): CalloutKind | null {
  if (SUMMARY_MARKERS.some(m => heading.includes(m))) return 'summary';
  if (RULE_MARKERS.some(m => heading.includes(m))) return 'rule';
  if (NOTE_MARKERS.some(m => heading.includes(m))) return 'note';
  return null;
}

const CALLOUT_STYLE: Record<CalloutKind, { icon: typeof Info; color: string; bg: string }> = {
  note: { icon: Info, color: 'var(--official)', bg: 'var(--official-50)' },
  rule: { icon: KeyRound, color: 'var(--amber)', bg: '#faf3e7' },
  summary: { icon: CircleCheckBig, color: 'var(--navy)', bg: 'var(--panel)' },
};

type Group =
  | { kind: 'plain'; blocks: ArticleBlock[] }
  | { kind: 'callout'; calloutType: CalloutKind; heading: string; blocks: ArticleBlock[]; id?: string };

function groupBlocks(blocks: ArticleBlock[]): Group[] {
  const groups: Group[] = [];
  let current: Group = { kind: 'plain', blocks: [] };

  for (const b of blocks) {
    if (b.type === 'h2') {
      const kind = calloutKind(b.text);
      if (kind) {
        if (current.blocks.length) groups.push(current);
        current = { kind: 'callout', calloutType: kind, heading: b.text, blocks: [] };
        continue;
      }
      if (current.kind === 'callout') {
        groups.push(current);
        current = { kind: 'plain', blocks: [] };
      }
    }
    if (b.type === 'h3' && current.kind === 'callout') {
      groups.push(current);
      current = { kind: 'plain', blocks: [] };
    }
    current.blocks.push(b);
  }
  if (current.blocks.length) groups.push(current);
  return groups;
}

function PlainList({ items }: { items: string[] }) {
  return (
    <ul style={{ margin: '0 0 20px', padding: 0, listStyle: 'none' }}>
      {items.map((item, j) => (
        <li key={j} style={{
          display: 'flex', gap: 10, fontSize: 15, lineHeight: 1.8, color: 'var(--slate)',
          padding: '8px 0', borderBottom: j < items.length - 1 ? '1px solid var(--line-soft)' : 'none',
        }}>
          <span aria-hidden style={{ flexShrink: 0, width: 6, height: 6, borderRadius: '50%', background: 'var(--official)', marginTop: 8 }} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function ChecklistCard({ items, tone }: { items: string[]; tone: 'official' | 'alert' }) {
  const Icon = tone === 'official' ? CircleCheck : CircleX;
  const color = tone === 'official' ? 'var(--official)' : 'var(--alert)';
  const bg = tone === 'official' ? 'var(--official-50)' : 'var(--alert-50)';
  return (
    <div style={{ background: bg, border: `1px solid ${color}`, borderRadius: 12, padding: '18px 20px', margin: '0 0 22px' }}>
      <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 11 }}>
        {items.map((item, j) => (
          <li key={j} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 15, lineHeight: 1.7, color: 'var(--ink)' }}>
            <Icon size={18} style={{ color, flexShrink: 0, marginTop: 1 }} aria-hidden />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Block({ block, i, id }: { block: ArticleBlock; i: number; id?: string }) {
  switch (block.type) {
    case 'h2':
      return (
        <div key={i} style={{ margin: '46px 0 16px' }}>
          <div className="rule" style={{ marginBottom: 10 }} />
          <h2 id={id} style={{ margin: 0, fontSize: 21, color: 'var(--navy)', scrollMarginTop: 90 }}>{block.text}</h2>
        </div>
      );
    case 'h3':
      return (
        <h3 key={i} style={{
          margin: '30px 0 12px', fontSize: 16.5, color: 'var(--navy-700)',
          paddingInlineStart: 12, borderInlineStart: '3px solid var(--line)',
        }}>{block.text}</h3>
      );
    case 'strong':
      return <p key={i} style={{ margin: '20px 0 4px', fontSize: 15.5, fontWeight: 700, color: 'var(--navy)' }}>{block.text}</p>;
    case 'p':
      return <p key={i} style={{ margin: '0 0 15px', fontSize: 15.5, lineHeight: 1.9, color: 'var(--slate)' }}>{block.text}</p>;
    case 'ul': {
      const stripped = (prefix: RegExp) => block.items.map(s => s.replace(prefix, '').trim());
      if (block.items.every(it => it.trim().startsWith('✅'))) return <ChecklistCard key={i} items={stripped(/^✅\s*/)} tone="official" />;
      if (block.items.every(it => it.trim().startsWith('❌'))) return <ChecklistCard key={i} items={stripped(/^❌\s*/)} tone="alert" />;
      return <PlainList key={i} items={block.items} />;
    }
    case 'table':
      return (
        <div key={i} style={{ overflowX: 'auto', margin: '0 0 24px', border: '1px solid var(--line)', borderRadius: 10 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14.5 }}>
            <thead>
              <tr style={{ background: 'var(--navy)' }}>
                {block.headers.map((h, j) => (
                  <th key={j} style={{ textAlign: 'start', padding: '13px 16px', color: '#fff', fontWeight: 700 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, r) => (
                <tr key={r} style={{ background: r % 2 ? 'var(--panel-2)' : '#fff' }}>
                  {row.map((cell, c) => (
                    <td key={c} style={{ padding: '13px 16px', color: 'var(--slate)', verticalAlign: 'top' }}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}

function Callout({ type, heading, blocks, id }: { type: CalloutKind; heading: string; blocks: ArticleBlock[]; id?: string }) {
  const { icon: Icon, color, bg } = CALLOUT_STYLE[type];
  return (
    <div style={{ background: bg, border: '1px solid var(--line)', borderInlineStart: `4px solid ${color}`, borderRadius: 12, padding: '22px 24px', margin: '40px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
        <Icon size={20} style={{ color, flexShrink: 0 }} aria-hidden />
        <h2 id={id} style={{ margin: 0, fontSize: 17.5, color: 'var(--navy)', scrollMarginTop: 90 }}>{heading}</h2>
      </div>
      {blocks.map((b, i) => <Block key={i} block={b} i={i} />)}
    </div>
  );
}

export default function ArticlePage({ article, locale = 'ar' }: { article: Article; locale?: Locale }) {
  const isRTL = locale === 'ar';
  const font = fontFor(locale);
  const t = LABELS[locale];
  const allBlocks = [...article.intro, ...article.blocks];

  const h2Texts = allBlocks.filter(b => b.type === 'h2').map(b => (b as { text: string }).text);
  const tocItems = h2Texts.map((text, idx) => ({ id: `section-${idx}`, text }));
  let h2Counter = 0;
  const nextH2Id = () => `section-${h2Counter++}`;

  const introGroups = groupBlocks(article.intro);
  const bodyGroups = groupBlocks(article.blocks);

  const renderGroups = (groups: Group[]) => groups.map((g, gi) => {
    if (g.kind === 'callout') {
      return <Callout key={gi} type={g.calloutType} heading={g.heading} blocks={g.blocks} id={nextH2Id()} />;
    }
    return (
      <div key={gi}>
        {g.blocks.map((b, i) => <Block key={i} block={b} i={i} id={b.type === 'h2' ? nextH2Id() : undefined} />)}
      </div>
    );
  });

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} style={{ fontFamily: font }}>
      <PageHeader locale={locale} title={article.title} lead={article.description} />

      <div className="wrap" style={{ padding: '22px 24px 0' }}>
        <div className="kicker">
          <BookOpenCheck size={14} aria-hidden />
          {t.guide}
        </div>
      </div>

      <section style={{ background: '#fff', padding: '20px 0 72px' }}>
        <div className="wrap" style={{ maxWidth: 1040 }}>
          <div className={tocItems.length > 3 ? 'article-layout has-toc' : 'article-layout'}>
            <article style={{ maxWidth: 760 }}>
              {renderGroups(introGroups)}
              {renderGroups(bodyGroups)}
              <div style={{ marginTop: 32, padding: '20px 22px', background: 'var(--panel)', borderInlineStart: '4px solid var(--official)', borderRadius: 10 }}>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.75, color: 'var(--slate)' }}>{content[locale].footer.disclaimer}</p>
              </div>
            </article>

            {tocItems.length > 3 && (
              <aside className="article-toc">
                <div style={{ border: '1px solid var(--line)', borderRadius: 12, padding: '18px 20px', background: 'var(--panel)' }}>
                  <div className="kicker" style={{ marginBottom: 14 }}>
                    <ListTree size={14} aria-hidden />
                    {t.toc}
                  </div>
                  <nav style={{ display: 'flex', flexDirection: 'column' }}>
                    {tocItems.map((item, idx) => (
                      <a key={item.id} href={`#${item.id}`} style={{
                        fontSize: 13.5, lineHeight: 1.6, color: 'var(--slate)',
                        padding: '10px 0', borderTop: idx > 0 ? '1px solid var(--line-soft)' : 'none',
                      }}>
                        {item.text}
                      </a>
                    ))}
                  </nav>
                </div>
              </aside>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
