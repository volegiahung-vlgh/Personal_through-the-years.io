import PhotoGallery from './PhotoGallery';
import MomentCard from './MomentCard';
import type { Moment } from '@/lib/photos';

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
  const sorted = [...entries].sort((a, b) => a.year - b.year);

  const visible = sorted.filter(e =>
    (e.photos?.length ?? 0) > 0 || (e.moments?.length ?? 0) > 0
  );

  return (
    <div className="max-w-5xl mx-auto">
      {visible.map((entry, i) => {
        const hasPhotos  = (entry.photos?.length  ?? 0) > 0;
        const hasMoments = (entry.moments?.length ?? 0) > 0;

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

              {/* Moment cards */}
              {hasMoments && (
                <div>
                  <p className="font-serif uppercase text-[10px] tracking-widest mb-4"
                     style={{ color: 'var(--ink-faint)', letterSpacing: '0.32em' }}>
                    Kỷ niệm
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
                    <p className="font-serif uppercase text-[10px] tracking-widest mb-4"
                       style={{ color: 'var(--ink-faint)', letterSpacing: '0.32em' }}>
                      Hình ảnh
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
