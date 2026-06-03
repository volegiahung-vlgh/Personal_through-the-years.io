'use client';

import { useState, useEffect, useCallback } from 'react';

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
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const next = useCallback(() => {
    setLightboxIndex(i => i === null ? null : (i + 1) % photos.length);
  }, [photos.length]);

  const prev = useCallback(() => {
    setLightboxIndex(i => i === null ? null : (i - 1 + photos.length) % photos.length);
  }, [photos.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape')      setLightboxIndex(null);
      if (e.key === 'ArrowRight')  next();
      if (e.key === 'ArrowLeft')   prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxIndex, next, prev]);

  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [lightboxIndex]);

  if (!photos.length) return null;

  return (
    <>
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}>
        {photos.map((photo, i) => (
          <figure key={i} className="group relative overflow-hidden rounded-lg cursor-zoom-in">
            <button
              onClick={() => setLightboxIndex(i)}
              className="block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--terracotta)]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="w-full h-auto block photo-warm transition-transform duration-700 group-hover:scale-105"
                style={{ background: 'var(--bg-deep)' }}
              />

              {/* Hover overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-3"
                style={{ background: 'rgba(43,31,23,0.18)' }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="12" r="10.5" stroke="white" strokeWidth="1.5"/>
                  <path d="M8 12h8M12 8v8" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
            </button>

            {photo.caption && (
              <figcaption
                className="absolute bottom-0 left-0 right-0 px-4 py-3 pointer-events-none"
                style={{
                  background: 'linear-gradient(to top, rgba(20,12,8,0.72) 0%, transparent 100%)',
                }}
              >
                <p className="font-script leading-tight" style={{ fontSize: '18px', color: '#fff' }}>
                  {photo.caption}
                </p>
              </figcaption>
            )}
          </figure>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[9000] flex items-center justify-center"
          style={{ background: 'rgba(20,12,8,0.96)' }}
          onClick={() => setLightboxIndex(null)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photos[lightboxIndex].src}
            alt={photos[lightboxIndex].alt}
            className="max-h-[88vh] max-w-[88vw] object-contain rounded-sm"
            style={{ boxShadow: '0 24px 80px rgba(0,0,0,0.6)' }}
            onClick={e => e.stopPropagation()}
          />

          {/* Caption */}
          {photos[lightboxIndex].caption && (
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center px-6">
              <p className="font-script" style={{ fontSize: '22px', color: 'rgba(255,255,255,0.85)' }}>
                {photos[lightboxIndex].caption}
              </p>
            </div>
          )}

          {/* Counter */}
          <div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 font-serif italic text-sm"
            style={{ color: 'rgba(255,255,255,0.5)' }}
          >
            {lightboxIndex + 1} / {photos.length}
          </div>

          {/* Prev */}
          {photos.length > 1 && (
            <button
              onClick={e => { e.stopPropagation(); prev(); }}
              aria-label="Previous photo"
              className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full transition-all hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              style={{ background: 'rgba(255,255,255,0.12)', color: '#fff' }}
            >
              <svg width="10" height="18" viewBox="0 0 10 18" fill="none" aria-hidden="true">
                <path d="M9 1L1 9l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}

          {/* Next */}
          {photos.length > 1 && (
            <button
              onClick={e => { e.stopPropagation(); next(); }}
              aria-label="Next photo"
              className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full transition-all hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              style={{ background: 'rgba(255,255,255,0.12)', color: '#fff' }}
            >
              <svg width="10" height="18" viewBox="0 0 10 18" fill="none" aria-hidden="true">
                <path d="M1 1l8 8-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}

          {/* Close */}
          <button
            onClick={() => setLightboxIndex(null)}
            aria-label="Close photo"
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full transition-all hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            style={{ background: 'rgba(255,255,255,0.12)', color: '#fff' }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
