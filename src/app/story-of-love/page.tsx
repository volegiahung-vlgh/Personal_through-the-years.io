import StoryPageShell from '@/components/StoryPageShell';
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

  return <StoryPageShell timelineEntries={timelineEntries} quotes={quotes} />;
}
