import PhotoGallery from './PhotoGallery';

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
}

interface StoryTimelineProps {
  entries: TimelineEntry[];
}

export default function StoryTimeline({ entries }: StoryTimelineProps) {
  const sorted = [...entries].sort((a, b) => a.year - b.year);

  return (
    <div className="max-w-5xl mx-auto">
      {sorted.map((entry, i) => (
        <article
          key={entry.year}
          className="grid md:grid-cols-[280px_1fr] gap-14 py-16"
          style={{
            borderTop: i === 0 ? 'none' : '1px solid var(--rule)',
          }}
        >
          {/* Left rail — sticky year label */}
          <aside className="md:sticky md:top-24 self-start">
            {/* Year number */}
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

            {/* Optional script title */}
            {entry.title && (
              <div
                className="font-script mt-2 leading-tight"
                style={{ fontSize: '38px', color: 'var(--terracotta)' }}
              >
                {entry.title}
              </div>
            )}

            {/* Prose note */}
            <p
              className="font-serif italic mt-4 leading-relaxed max-w-xs"
              style={{ fontSize: '17px', color: 'var(--ink-soft)', lineHeight: '1.7' }}
            >
              {entry.note}
            </p>
          </aside>

          {/* Right — photo grid */}
          <div>
            {entry.photos && entry.photos.length > 0 ? (
              <PhotoGallery photos={entry.photos} />
            ) : (
              <div
                className="flex items-center justify-center h-48 font-serif italic text-sm"
                style={{
                  border: '1px dashed var(--line)',
                  color: 'var(--ink-faint)',
                  fontSize: '15px',
                }}
              >
                No photos yet for this year
              </div>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
