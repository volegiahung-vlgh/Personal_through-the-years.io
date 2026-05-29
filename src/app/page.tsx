'use client';

import Link from 'next/link';
import QuoteCard from '@/components/QuoteCard';

export default function HomePage() {
  return (
    <>
      {/* ── Hero ────────────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex items-center justify-center text-center px-6"
        style={{ background: 'var(--bg)' }}
      >
        <div className="max-w-3xl mx-auto pt-24 pb-20">
          {/* Eyebrow */}
          <p
            className="font-serif uppercase tracking-widest2 text-[11px] mb-6"
            style={{ color: 'var(--ink-soft)', letterSpacing: '0.42em' }}
          >
            A Life, By the Year
          </p>

          {/* Script accent */}
          <div
            className="font-script leading-none mb-4"
            style={{ fontSize: 'clamp(52px, 7vw, 88px)', color: 'var(--terracotta)' }}
          >
            Through
          </div>

          {/* Main heading */}
          <h1
            className="font-serif font-normal italic leading-tight"
            style={{
              fontSize: 'clamp(40px, 5.5vw, 72px)',
              color: 'var(--ink)',
              letterSpacing: '-0.01em',
            }}
          >
            the years.
          </h1>

          {/* Ornament rule */}
          <div className="ornament-rule my-8">
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: 'var(--terracotta)', display: 'inline-block' }}
            />
          </div>

          {/* Sub-copy */}
          <p
            className="font-serif italic leading-relaxed max-w-xl mx-auto mb-12"
            style={{ fontSize: '20px', color: 'var(--ink-soft)', lineHeight: '1.75' }}
          >
            A quiet archive of moments worth keeping — photographs, words,
            and the small details that make up a life.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/story-of-love"
              className="inline-flex items-center gap-3 px-8 py-4 font-serif uppercase text-[12px] border transition-all duration-200"
              style={{
                borderColor: 'var(--ink)',
                color: 'var(--ink)',
                letterSpacing: '0.32em',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = 'var(--ink)';
                (e.currentTarget as HTMLElement).style.color = 'var(--bg)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = 'transparent';
                (e.currentTarget as HTMLElement).style.color = 'var(--ink)';
              }}
            >
              Our Story
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-3 px-8 py-4 font-serif uppercase text-[12px] border transition-all duration-200"
              style={{
                borderColor: 'var(--ink-soft)',
                color: 'var(--ink-soft)',
                letterSpacing: '0.32em',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.color = 'var(--terracotta-deep)';
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--terracotta)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.color = 'var(--ink-soft)';
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--ink-soft)';
              }}
            >
              About
            </Link>
          </div>
        </div>
      </section>

      {/* ── Featured quote ─────────────────────────────────── */}
      <section
        className="py-28 px-6"
        style={{ background: 'var(--bg-cream)' }}
      >
        <div className="max-w-2xl mx-auto">
          <p
            className="font-serif uppercase text-center mb-10"
            style={{ color: 'var(--ink-faint)', letterSpacing: '0.42em', fontSize: '11px' }}
          >
            A favourite line
          </p>
          <QuoteCard
            quote="In the middle of difficulty lies opportunity — and in the middle of ordinary days lies a love that defies description."
            author="kept, with love"
          />
        </div>
      </section>

      {/* ── Teaser strip ───────────────────────────────────── */}
      <section className="py-28 px-6" style={{ background: 'var(--bg)' }}>
        <div className="max-w-5xl mx-auto text-center">
          <div
            className="font-script mb-4"
            style={{ fontSize: '48px', color: 'var(--terracotta)' }}
          >
            Begin
          </div>
          <h2
            className="font-serif italic font-light mb-6"
            style={{ fontSize: 'clamp(28px, 4vw, 52px)', color: 'var(--ink)' }}
          >
            The story unfolds, year by year.
          </h2>
          <p
            className="font-serif italic max-w-lg mx-auto mb-10"
            style={{ fontSize: '18px', color: 'var(--ink-soft)', lineHeight: '1.75' }}
          >
            Every year a chapter. Every photograph a page.
            Step inside and read the whole story.
          </p>
          <Link
            href="/story-of-love"
            className="inline-flex items-center gap-2 font-serif uppercase text-[12px] pb-1"
            style={{
              color: 'var(--terracotta-deep)',
              letterSpacing: '0.3em',
              borderBottom: '1px solid var(--terracotta)',
            }}
          >
            Read our story &rarr;
          </Link>
        </div>
      </section>
    </>
  );
}
