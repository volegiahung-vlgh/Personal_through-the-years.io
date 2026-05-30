interface Photo {
  src: string;
  alt: string;
  caption?: string;
  orientation?: 'portrait' | 'landscape' | 'square';
}

interface PhotoGalleryProps {
  photos: Photo[];
  className?: string;
}

const aspectMap = {
  portrait:  'aspect-[4/5]',
  landscape: 'aspect-[4/3]',
  square:    'aspect-square',
};

export default function PhotoGallery({ photos, className = '' }: PhotoGalleryProps) {
  if (!photos.length) return null;

  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}
    >
      {photos.map((photo, i) => {
        const aspect = aspectMap[photo.orientation ?? 'portrait'];
        return (
          <figure key={i} className="group relative overflow-hidden rounded-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              className="w-full h-auto block photo-warm transition-transform duration-700 group-hover:scale-105"
              style={{ background: 'var(--bg-deep)' }}
            />

            {photo.caption && (
              <figcaption
                className="mt-2 font-serif italic text-sm text-center"
                style={{ color: 'var(--ink-soft)', fontSize: '14px' }}
              >
                {photo.caption}
              </figcaption>
            )}
          </figure>
        );
      })}
    </div>
  );
}
