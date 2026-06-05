'use client';

import PhotoGallery from './PhotoGallery';
import MomentCard from './MomentCard';
import type { Moment } from '@/lib/types';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/translations';

interface TimelinePhoto {
  src: string;
  alt: string;
  caption?: string;
  orientation?: 'portrait' | 'landscape' | 'square';
}

interface TimelineEntry {
  year: number;
  title?: string;
  note: string;
  photos?: TimelinePhoto[];
  moments?: Moment[];
}

interface StoryTimelineProps {
  entries: TimelineEntry[];
}

export default function StoryTimeline({ entries }: StoryTimelineProps) {
  const { lang } = useLanguage();
  const tr = t(lang).timeline;
  const sorted = [...entries].sort((a, b) => b.year - a.year);

  return (
    <div className="max-w-5xl mx-auto">
      {sorted.map((entry, i) => {
        const hasPhotos  = (entry.photos?.length  ?? 0) > 0;
        const hasMoments = (entry.moments?.length ?? 0) > 0;
        const isEmpty    = !hasPhotos && !hasMoments;

        return (
          <article
            key={entry.year}
            className="grid md:grid-cols-[280px_1fr] gap-14 py-16"
            style={{ borderTop: i === 0 ? 'none' : '1px solid var(--rule)' }}
          >
            {/* ── Left rail ── */}
            <aside className="md:sticky md:top-24 self-start">
              <div
                className="font-serif font-light leading-none"
                style={{
                  fontSize: 'clamp(64px, 8vw, 108px)',
                  letterSpacing: '-0.02em',
                  color: 'var(--terracotta-deep)',
                  lineHeight: 0.9,
                }}
              >
                {entry.year}
              </div>

              {entry.title && (
                <div
                  className="font-script mt-2 leading-tight"
                  style={{ fontSize: '38px', color: 'var(--terracotta)' }}
                >
                  {entry.title}
                </div>
              )}

              <p
                className="font-serif italic mt-4 leading-relaxed max-w-xs"
                style={{ fontSize: '17px', color: 'var(--ink-soft)', lineHeight: '1.7' }}
              >
                {entry.note}
              </p>
            </aside>

            {/* ── Right content ── */}
            <div className="space-y-10">

              {/* Placeholder for years with no photos yet */}
              {isEmpty && (
                <div
                  className="flex items-center gap-4 py-8 px-6 rounded-xl"
                  style={{ border: '1px dashed var(--rule)', color: 'var(--ink-faint)' }}
                >
                  <span style={{ fontSize: '20px', opacity: 0.45 }}>✦</span>
                  <p className="font-serif italic" style={{ fontSize: '16px', lineHeight: '1.7' }}>
                    {tr.emptyPlaceholder}
                  </p>
                </div>
              )}

              {/* Moment cards */}
              {hasMoments && (
                <div>
                  <p className="font-serif uppercase text-[12px] tracking-widest mb-4"
                     style={{ color: 'var(--ink-faint)', letterSpacing: '0.32em' }}>
                    {tr.moments}
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {entry.moments!.map(m => (
                      <MomentCard key={m.slug} moment={m} />
                    ))}
                  </div>
                </div>
              )}

              {/* Divider between moments and loose photos */}
              {hasMoments && hasPhotos && (
                <hr style={{ border: 'none', borderTop: '1px solid var(--rule)' }} />
              )}

              {/* Loose photos */}
              {hasPhotos && (
                <div>
                  {hasMoments && (
                    <p className="font-serif uppercase text-[12px] tracking-widest mb-4"
                       style={{ color: 'var(--ink-faint)', letterSpacing: '0.32em' }}>
                      {tr.photos}
                    </p>
                  )}
                  <PhotoGallery photos={entry.photos!} />
                </div>
              )}

            </div>
          </article>
        );
      })}
    </div>
  );
}
