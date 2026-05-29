import StoryTimeline from '@/components/StoryTimeline';
import QuoteCard from '@/components/QuoteCard';
import FloatingHearts from '@/components/FloatingHearts';
import quotes from '@/content/story-of-love/quotes.json';
import { getPhotosForYear, getMomentsForYear } from '@/lib/photos';

export const metadata = {
  title: 'Our Story · Through the Years',
  description: 'A year-by-year record of the moments worth keeping.',
};

// ── HOW TO ADD PHOTOS ─────────────────────────────────────────────────────
// Drop photos into the matching year folder and they appear automatically:
//   /public/images/2021/  →  shown under 2021
//   /public/images/2022/  →  shown under 2022
//   ... and so on through 2026
//
// Supported formats: .jpg  .jpeg  .png  .webp  .avif
// ─────────────────────────────────────────────────────────────────────────

const yearMeta: Record<number, { title: string; note: string }> = {
  2021: { title: 'First adventures',  note: 'We learned what it meant to explore — new cities, new foods, new versions of ourselves.' },
  2022: { title: 'Roots & rhythms',   note: 'The year we stopped rushing and started building something that felt like home.' },
  2023: { title: 'Milestones',        note: 'Some years mark themselves clearly. This one did.' },
  2024: { title: 'Still here',        note: 'Quiet days. Long walks. The kind of happiness that does not need a photograph to prove it — but we took some anyway.' },
  2025: { title: 'Onwards',           note: 'Every year adds another layer. This one is still being written.' },
  2026: { title: 'Now',               note: 'The story continues.' },
};

export default function StoryPage() {
  const timelineEntries = Object.entries(yearMeta).map(([yr, meta]) => ({
    year: Number(yr),
    ...meta,
    photos:  getPhotosForYear(Number(yr)),
    moments: getMomentsForYear(Number(yr)),
  }));
  return (
    <div style={{ background: 'var(--bg)' }} className="min-h-screen">
      {/* Hearts burst on page load */}
      <FloatingHearts />

      {/* ── Page header ─────────────────────────────────────── */}
      <section className="pt-48 pb-16 text-center px-6">
        <p
          className="font-serif uppercase mb-4"
          style={{ color: 'var(--ink-faint)', letterSpacing: '0.42em', fontSize: '11px' }}
        >
          A Life, By the Year
        </p>
        <div
          className="font-script leading-none mb-3"
          style={{ fontSize: 'clamp(52px, 7vw, 84px)', color: 'var(--terracotta)' }}
        >
          Our Story
        </div>
        <h1
          className="font-serif italic font-light"
          style={{
            fontSize: 'clamp(28px, 4vw, 52px)',
            color: 'var(--ink)',
            letterSpacing: '-0.01em',
          }}
        >
          through the years.
        </h1>
        <div className="ornament-rule mt-8 max-w-xs mx-auto">
          <span
            className="w-[5px] h-[5px] rounded-full inline-block"
            style={{ background: 'var(--terracotta)' }}
          />
        </div>

        <p
          className="font-serif italic mt-8 max-w-xl mx-auto leading-relaxed"
          style={{ fontSize: '19px', color: 'var(--ink-soft)', lineHeight: '1.75' }}
        >
          Every year a chapter. Every photograph a page.
          A quiet archive of the moments worth keeping.
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
            Lines worth keeping
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
