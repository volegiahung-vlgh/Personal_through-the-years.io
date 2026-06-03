'use client';

import FloatingHearts from '@/components/FloatingHearts';
import FoodTimeline from '@/components/FoodTimeline';
import LoveWordsTimeline from '@/components/LoveWordsTimeline';
import MemoriesMap from '@/components/MemoriesMap';
import MemoriesPlaylist from '@/components/MemoriesPlaylist';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/translations';

const SECTION_IDS = { places: 'ban-do', music: 'nhac', food: 'mon-ngon', words: 'loi-thuong' } as const;
const SECTION_ID_LIST = [SECTION_IDS.places, SECTION_IDS.music, SECTION_IDS.food, SECTION_IDS.words] as const;

interface Place   { id: number; name: string; region: string; year: number; emoji: string; note: string }
interface Track   { id: number; title: string; artist: string; year: number; note: string }
interface Dish    { id: number; emoji: string; photo: string | null; name: string; place: string; note: string }
interface LoveWord { id: number; text: string; from: string }

interface Props {
  foodData: Dish[];
  loveWordsData: LoveWord[];
  placesData: Place[];
  playlistData: Track[];
  lovePhotos: string[];
}

export default function MemoriesPageShell({
  foodData,
  loveWordsData,
  placesData,
  playlistData,
  lovePhotos,
}: Props) {
  const { lang } = useLanguage();
  const tr = t(lang).memories;

  return (
    <div style={{ background: 'var(--bg)' }} className="min-h-screen">
      <FloatingHearts />

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
          style={{ fontSize: 'clamp(52px, 7vw, 84px)', color: 'var(--terracotta)' }}
        >
          {tr.title}
        </div>

        <h1
          className="font-serif italic font-light"
          style={{
            fontSize: 'clamp(24px, 3.5vw, 46px)',
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
          className="font-serif italic mt-8 max-w-xl mx-auto"
          style={{ fontSize: '18px', color: 'var(--ink-soft)', lineHeight: '1.8', whiteSpace: 'pre-line' }}
        >
          {tr.teaser}
        </p>

        {/* Jump anchors */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mt-10">
          {tr.anchors.map(({ label }, i) => (
            <a
              key={SECTION_ID_LIST[i]}
              href={`#${SECTION_ID_LIST[i]}`}
              className="font-serif uppercase text-[11px] pb-1"
              style={{ color: 'var(--terracotta-deep)', letterSpacing: '0.35em', borderBottom: '1px solid var(--terracotta)' }}
            >
              {label} ↓
            </a>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════ */}
      {/* ── Section 1 : Map ─────────────────────────────────── */}
      {/* ══════════════════════════════════════════════════════ */}
      <section id={SECTION_IDS.places} className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <SectionTitle eyebrow={tr.placesEyebrow} title={tr.placesTitle} />
          <p
            className="font-serif italic text-center mb-12"
            style={{ fontSize: '16px', color: 'var(--ink-soft)', maxWidth: '460px', margin: '12px auto 48px', whiteSpace: 'pre-line' }}
          >
            {tr.placesDesc}
          </p>
          <MemoriesMap places={placesData} />
        </div>
      </section>

      <Divider />

      {/* ══════════════════════════════════════════════════════ */}
      {/* ── Section 2 : Music ───────────────────────────────── */}
      {/* ══════════════════════════════════════════════════════ */}
      <section id={SECTION_IDS.music} className="py-20 px-6">
        <div className="max-w-2xl mx-auto">
          <SectionTitle eyebrow={tr.musicEyebrow} title={tr.musicTitle} />
          <p
            className="font-serif italic text-center mb-12"
            style={{ fontSize: '16px', color: 'var(--ink-soft)', maxWidth: '460px', margin: '12px auto 48px', whiteSpace: 'pre-line' }}
          >
            {tr.musicDesc}
          </p>
          <MemoriesPlaylist tracks={playlistData} />
        </div>
      </section>

      <Divider />

      {/* ══════════════════════════════════════════════════════ */}
      {/* ── Section 3 : Food ────────────────────────────────── */}
      {/* ══════════════════════════════════════════════════════ */}
      <section id={SECTION_IDS.food} className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionTitle eyebrow={tr.foodEyebrow} title={tr.foodTitle} />
          <p
            className="font-serif italic text-center mb-12"
            style={{ fontSize: '16px', color: 'var(--ink-soft)', maxWidth: '480px', margin: '12px auto 48px', whiteSpace: 'pre-line' }}
          >
            {tr.foodDesc}
          </p>
          <FoodTimeline dishes={foodData} />
        </div>
      </section>

      <Divider />

      {/* ══════════════════════════════════════════════════════ */}
      {/* ── Section 4 : Love Words ──────────────────────────── */}
      {/* ══════════════════════════════════════════════════════ */}
      <section id={SECTION_IDS.words} className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <SectionTitle eyebrow={tr.wordsEyebrow} title={tr.wordsTitle} />
          <p
            className="font-serif italic text-center mb-12"
            style={{ fontSize: '16px', color: 'var(--ink-soft)', maxWidth: '480px', margin: '12px auto 48px', whiteSpace: 'pre-line' }}
          >
            {tr.wordsDesc}
          </p>

          {lovePhotos.length > 0 && (
            <div className="mb-12">
              <p className="font-serif uppercase text-center mb-6"
                 style={{ fontSize: '11px', color: 'var(--ink-faint)', letterSpacing: '0.38em' }}>
                {tr.momentsLabel}
              </p>
              <div className="columns-2 sm:columns-3 gap-4 space-y-4">
                {lovePhotos.map((src, i) => (
                  <div key={i} className="break-inside-avoid overflow-hidden rounded-2xl"
                       style={{ border: '1px solid rgba(155,29,66,0.10)' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt={`${tr.momentsLabel} ${i + 1}`}
                      loading="lazy"
                      className="w-full h-auto block"
                      style={{ filter: 'sepia(0.08) saturate(0.95)' }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <LoveWordsTimeline words={loveWordsData} />
        </div>
      </section>

      {/* ── Footer ornament ─────────────────────────────────── */}
      <section className="py-24 text-center px-6" style={{ background: 'var(--bg-cream)' }}>
        <div className="font-script mb-4" style={{ fontSize: '52px', color: 'var(--terracotta)' }}>
          {tr.forever}
        </div>
        <p
          className="font-serif italic"
          style={{ fontSize: '18px', color: 'var(--ink-soft)', maxWidth: '380px', margin: '0 auto', lineHeight: '1.8' }}
        >
          {tr.closing}
        </p>
        <p className="font-serif mt-5 uppercase" style={{ fontSize: '12px', color: 'var(--ink-faint)', letterSpacing: '0.38em' }}>
          {tr.closingLine}
        </p>
      </section>
    </div>
  );
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="flex items-center gap-6 mb-4">
      <div style={{ flex: 1, height: '1px', background: 'var(--rule)' }} />
      <div className="text-center shrink-0">
        <p className="font-serif uppercase" style={{ fontSize: '11px', color: 'var(--ink-faint)', letterSpacing: '0.42em' }}>
          {eyebrow}
        </p>
        <div className="font-script mt-1" style={{ fontSize: '42px', color: 'var(--terracotta)', lineHeight: 1.1 }}>
          {title}
        </div>
      </div>
      <div style={{ flex: 1, height: '1px', background: 'var(--rule)' }} />
    </div>
  );
}

function Divider() {
  return (
    <div className="py-14 text-center" style={{ background: 'var(--bg-cream)' }}>
      <span className="font-script" style={{ fontSize: '44px', color: 'var(--terracotta)', opacity: 0.55 }}>
        ✦ &nbsp; ♥ &nbsp; ✦
      </span>
    </div>
  );
}
