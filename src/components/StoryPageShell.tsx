'use client';

import StoryTimeline from '@/components/StoryTimeline';
import QuoteCard from '@/components/QuoteCard';
import FloatingHearts from '@/components/FloatingHearts';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/translations';
import type { Moment } from '@/lib/photos';

interface TimelinePhoto {
  src: string;
  alt: string;
  caption?: string;
}

interface TimelineEntry {
  year: number;
  title?: string;
  note: string;
  photos?: TimelinePhoto[];
  moments?: Moment[];
}

interface QuoteEntry {
  id: number;
  quote: string;
  author: string;
}

interface Props {
  timelineEntries: TimelineEntry[];
  quotes: QuoteEntry[];
}

export default function StoryPageShell({ timelineEntries, quotes }: Props) {
  const { lang } = useLanguage();
  const tr = t(lang).story;

  return (
    <div style={{ background: 'var(--bg)' }} className="min-h-screen">
      <FloatingHearts />

      {/* ── Page header ─────────────────────────────────────── */}
      <section className="pt-48 pb-16 text-center px-6">
        <p
          className="font-serif uppercase mb-4"
          style={{ color: 'var(--ink-faint)', letterSpacing: '0.42em', fontSize: '11px' }}
        >
          {tr.eyebrow}
        </p>
        <div
          className="font-script leading-none mb-3"
          style={{ fontSize: 'clamp(52px, 7vw, 84px)', color: 'var(--terracotta)' }}
        >
          {tr.title}
        </div>
        <h1
          className="font-serif italic font-light"
          style={{
            fontSize: 'clamp(28px, 4vw, 52px)',
            color: 'var(--ink)',
            letterSpacing: '-0.01em',
          }}
        >
          {tr.subtitle}
        </h1>
        <div className="ornament-rule mt-8 max-w-xs mx-auto">
          <span
            className="w-[5px] h-[5px] rounded-full inline-block"
            style={{ background: 'var(--terracotta)' }}
          />
        </div>

        <p
          className="font-serif italic mt-8 max-w-xl mx-auto leading-relaxed"
          style={{ fontSize: '19px', color: 'var(--ink-soft)', lineHeight: '1.75', whiteSpace: 'pre-line' }}
        >
          {tr.teaserBody}
        </p>
      </section>

      {/* ── Timeline ────────────────────────────────────────── */}
      <section className="pb-40 px-6">
        <div className="max-w-5xl mx-auto">
          <StoryTimeline entries={timelineEntries} />
        </div>
      </section>

      {/* ── Quotes interlude ────────────────────────────────── */}
      <section
        className="py-28 px-6"
        style={{ background: 'var(--bg-cream)' }}
      >
        <div className="max-w-3xl mx-auto">
          <p
            className="font-serif uppercase text-center mb-12"
            style={{ color: 'var(--ink-faint)', letterSpacing: '0.42em', fontSize: '11px' }}
          >
            {tr.quotesSection}
          </p>
          <div className="space-y-8">
            {quotes.map(q => (
              <QuoteCard key={q.id} quote={q.quote} author={q.author} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
