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

export default function PhotoGallery({ photos, className = '' }: PhotoGalleryProps) {
  if (!photos.length) return null;

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}>
      {photos.map((photo, i) => (
        <figure key={i} className="group relative overflow-hidden rounded-lg">
          {/* Photo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photo.src}
            alt={photo.alt}
            loading="lazy"
            className="w-full h-auto block photo-warm transition-transform duration-700 group-hover:scale-105"
            style={{ background: 'var(--bg-deep)' }}
          />

          {/* Caption overlay — only shown when caption exists */}
          {photo.caption && (
            <figcaption
              className="absolute bottom-0 left-0 right-0 px-4 py-3"
              style={{
                background: 'linear-gradient(to top, rgba(20,12,8,0.72) 0%, transparent 100%)',
              }}
            >
              <p
                className="font-script leading-tight"
                style={{ fontSize: '18px', color: '#fff' }}
              >
                {photo.caption}
              </p>
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}
