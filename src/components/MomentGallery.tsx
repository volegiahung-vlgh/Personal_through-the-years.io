'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Moment } from '@/lib/photos';

interface Props {
  moment: Moment;
  onClose: () => void;
}

export default function MomentGallery({ moment, onClose }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightboxIndex !== null) setLightboxIndex(null);
        else onClose();
      }
      if (lightboxIndex !== null) {
        if (e.key === 'ArrowRight') next();
        if (e.key === 'ArrowLeft')  prev();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxIndex]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const next = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % moment.photos.length);
  }, [lightboxIndex, moment.photos.length]);

  const prev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + moment.photos.length) % moment.photos.length);
  }, [lightboxIndex, moment.photos.length]);

  return (
    <>
      {/* ── Gallery overlay ── */}
      <div
        className="fixed inset-0 z-[8000] flex flex-col"
        style={{ background: 'var(--bg)' }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-8 py-5 shrink-0"
          style={{ borderBottom: '1px solid var(--rule)' }}
        >
          <div>
            <p className="font-serif uppercase text-[10px] tracking-widest mb-1"
               style={{ color: 'var(--ink-faint)', letterSpacing: '0.3em' }}>
              Kỷ niệm
            </p>
            <h2 className="font-script" style={{ fontSize: '32px', color: 'var(--terracotta)' }}>
              {moment.name}
            </h2>
          </div>
          <div className="flex items-center gap-6">
            <span className="font-serif italic text-sm" style={{ color: 'var(--ink-faint)' }}>
              {moment.count} khoảnh khắc
            </span>
            <button
              onClick={onClose}
              className="flex items-center gap-2 font-serif uppercase text-[11px] tracking-widest transition-opacity hover:opacity-60"
              style={{ color: 'var(--ink-soft)', letterSpacing: '0.2em' }}
            >
              <span>Đóng</span>
              <span style={{ fontSize: '18px', lineHeight: 1 }}>×</span>
            </button>
          </div>
        </div>

        {/* Photo grid */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 max-w-6xl mx-auto">
            {moment.photos.map((src, i) => (
              <button
                key={i}
                onClick={() => setLightboxIndex(i)}
                className="group relative overflow-hidden rounded-lg focus:outline-none"
                style={{ aspectRatio: '1', background: 'var(--bg-deep)' }}
              >
                <img
                  src={src}
                  alt={`${moment.name} ${i + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  style={{ filter: 'sepia(0.08) saturate(0.95)' }}
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                     style={{ background: 'rgba(43,31,23,0.3)' }}>
                  <span style={{ fontSize: '28px', color: '#fff' }}>⊕</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Lightbox ── */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[9000] flex items-center justify-center"
          style={{ background: 'rgba(20,12,8,0.96)' }}
          onClick={() => setLightboxIndex(null)}
        >
          {/* Image */}
          <img
            src={moment.photos[lightboxIndex]}
            alt={`${moment.name} ${lightboxIndex + 1}`}
            className="max-h-[88vh] max-w-[88vw] object-contain rounded-sm"
            style={{ boxShadow: '0 24px 80px rgba(0,0,0,0.6)' }}
            onClick={e => e.stopPropagation()}
          />

          {/* Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-serif italic text-sm"
               style={{ color: 'rgba(255,255,255,0.5)' }}>
            {lightboxIndex + 1} / {moment.photos.length}
          </div>

          {/* Prev */}
          {moment.photos.length > 1 && (
            <button
              onClick={e => { e.stopPropagation(); prev(); }}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full transition-all hover:opacity-80"
              style={{ background: 'rgba(255,255,255,0.12)', color: '#fff', fontSize: '22px' }}
            >
              ‹
            </button>
          )}

          {/* Next */}
          {moment.photos.length > 1 && (
            <button
              onClick={e => { e.stopPropagation(); next(); }}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full transition-all hover:opacity-80"
              style={{ background: 'rgba(255,255,255,0.12)', color: '#fff', fontSize: '22px' }}
            >
              ›
            </button>
          )}

          {/* Close */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full transition-all hover:opacity-70"
            style={{ background: 'rgba(255,255,255,0.12)', color: '#fff', fontSize: '20px' }}
          >
            ×
          </button>
        </div>
      )}
    </>
  );
}
