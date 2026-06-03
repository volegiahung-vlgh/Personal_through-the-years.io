'use client';

import QuoteCard from '@/components/QuoteCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/translations';

export default function AboutPageContent() {
  const { lang } = useLanguage();
  const tr = t(lang).about;

  return (
    <div style={{ background: 'var(--bg)' }} className="min-h-screen">
      {/* ── Page header ─────────────────────────────────────── */}
      <section className="pt-28 md:pt-48 pb-16 text-center px-6">
        <p
          className="font-serif uppercase mb-4"
          style={{ color: 'var(--ink-faint)', letterSpacing: '0.42em', fontSize: '11px' }}
        >
          {tr.eyebrow}
        </p>
        <div
          className="font-script leading-none mb-3"
          style={{ fontSize: '56px', color: 'var(--terracotta)' }}
        >
          {tr.title}
        </div>
        <h1
          className="font-serif italic font-light"
          style={{ fontSize: 'clamp(32px, 4.6vw, 58px)', color: 'var(--ink)' }}
        >
          {tr.subtitle}
        </h1>
        <div className="ornament-rule mt-8 max-w-xs mx-auto">
          <span
            className="w-[5px] h-[5px] rounded-full inline-block"
            style={{ background: 'var(--terracotta)' }}
          />
        </div>
      </section>

      {/* ── Body content ────────────────────────────────────── */}
      <section className="pb-32 px-6">
        <div className="max-w-2xl mx-auto space-y-10">
          <p
            className="font-serif italic leading-relaxed"
            style={{ fontSize: '21px', color: 'var(--ink-soft)', lineHeight: '1.8', whiteSpace: 'pre-line' }}
          >
            {tr.keptDesc}
          </p>

          <hr className="section-divider" />

          <div>
            <h2
              className="font-script mb-4"
              style={{ fontSize: '42px', color: 'var(--terracotta)' }}
            >
              {tr.whyTitle}
            </h2>
            <p
              className="font-serif leading-relaxed"
              style={{ fontSize: '18px', color: 'var(--ink-soft)', lineHeight: '1.8', whiteSpace: 'pre-line' }}
            >
              {tr.whyBody}
            </p>
          </div>

          <QuoteCard
            quote="..."
            author={tr.quoteAuthor}
          />

          <div>
            <h2
              className="font-script mb-4"
              style={{ fontSize: '42px', color: 'var(--terracotta)' }}
            >
              {tr.usTitle}
            </h2>
            <p
              className="font-serif leading-relaxed"
              style={{ fontSize: '18px', color: 'var(--ink-soft)', lineHeight: '1.8', whiteSpace: 'pre-line' }}
            >
              {tr.usBody}
            </p>
          </div>

          <hr className="section-divider" />

          <p
            className="font-serif italic text-center"
            style={{ fontSize: '17px', color: 'var(--ink-faint)' }}
          >
            {tr.footer}
          </p>
        </div>
      </section>
    </div>
  );
}
