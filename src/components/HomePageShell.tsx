'use client';

import Link from 'next/link';
import QuoteCard from '@/components/QuoteCard';
import HeroSection from '@/components/HeroSection';
import LoveLetter from '@/components/LoveLetter';
import DayCounterHero from '@/components/DayCounterHero';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/translations';

interface Props {
  allPhotos: string[];
  phuQuyPhotos: string[];
}

export default function HomePageShell({ allPhotos, phuQuyPhotos }: Props) {
  const { lang } = useLanguage();
  const tr = t(lang).home;
  const photos = phuQuyPhotos.length ? phuQuyPhotos : allPhotos;

  return (
    <>
      {/* ── Hero ────────────────────────────────────────────── */}
      <HeroSection photos={photos} />

      {/* ── Day counter (fullscreen) ────────────────────────── */}
      <DayCounterHero photos={photos} />

      {/* ── Love letter ────────────────────────────────────── */}
      <section
        className="py-24 px-6"
        style={{ background: 'var(--bg)' }}
      >
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <p
            className="font-serif uppercase text-center mb-12"
            style={{ color: 'var(--ink-faint)', letterSpacing: '0.42em', fontSize: '11px' }}
          >
            {tr.letterSection}
          </p>
          <div
            className="w-full rounded-3xl py-16 px-6 flex flex-col items-center relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, var(--bg-blush) 0%, var(--bg-blush-soft) 50%, var(--bg-blush) 100%)',
              border: '1px solid rgba(155,29,66,0.12)',
            }}
          >
            <LoveLetter />
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
            {tr.quoteSection}
          </p>
          <QuoteCard
            quote="..."
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
            {tr.begin}
          </div>
          <h2
            className="font-serif italic font-light mb-6"
            style={{ fontSize: 'clamp(28px, 4vw, 52px)', color: 'var(--ink)' }}
          >
            {tr.teaserTitle}
          </h2>
          <p
            className="font-serif italic max-w-lg mx-auto mb-10"
            style={{ fontSize: '18px', color: 'var(--ink-soft)', lineHeight: '1.75', whiteSpace: 'pre-line' }}
          >
            {tr.teaserBody}
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
            {tr.readStory} &rarr;
          </Link>
        </div>
      </section>
    </>
  );
}
