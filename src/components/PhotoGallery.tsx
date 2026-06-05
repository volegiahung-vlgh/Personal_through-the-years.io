'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

// ── Password cho ảnh riêng tư (đổi cùng với SITE_PASSWORD trong PasswordGate.tsx) ──
const PRIVATE_PASSWORD = '08022021';
// ─────────────────────────────────────────────────────────────────────────────────

interface Photo {
  src: string;
  alt: string;
  caption?: string;
  orientation?: 'portrait' | 'landscape' | 'square';
  isPrivate?: boolean;
}

interface PhotoGalleryProps {
  photos: Photo[];
  className?: string;
}

export default function PhotoGallery({ photos, className = '' }: PhotoGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Private photo unlock
  const [unlocked, setUnlocked] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [pendingIndex, setPendingIndex] = useState<number | null>(null);
  const [pwInput, setPwInput] = useState('');
  const [pwError, setPwError] = useState(false);
  const [shaking, setShaking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

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

  useEffect(() => {
    if (showPw) setTimeout(() => inputRef.current?.focus(), 80);
  }, [showPw]);

  const handlePhotoClick = (i: number) => {
    if (photos[i].isPrivate && !unlocked) {
      setPendingIndex(i);
      setShowPw(true);
    } else {
      setLightboxIndex(i);
    }
  };

  const handlePwSubmit = () => {
    if (pwInput === PRIVATE_PASSWORD) {
      setUnlocked(true);
      setShowPw(false);
      setPwInput('');
      setPwError(false);
      if (pendingIndex !== null) {
        setLightboxIndex(pendingIndex);
        setPendingIndex(null);
      }
    } else {
      setPwError(true);
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
    }
  };

  const closePw = () => {
    setShowPw(false);
    setPwInput('');
    setPwError(false);
    setPendingIndex(null);
  };

  if (!photos.length) return null;

  return (
    <>
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}>
        {photos.map((photo, i) => {
          const isBlurred = photo.isPrivate && !unlocked;
          return (
            <figure key={i} className="group relative overflow-hidden rounded-lg cursor-zoom-in">
              <button
                onClick={() => handlePhotoClick(i)}
                className="block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--terracotta)]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  className={`w-full h-auto block photo-warm ${isBlurred ? '' : 'transition-transform duration-700 group-hover:scale-105'}`}
                  style={{
                    background: 'var(--bg-deep)',
                    ...(isBlurred ? {
                      filter: 'blur(9px) sepia(0.12) saturate(0.95)',
                      transform: 'scale(1.1)',
                    } : {}),
                  }}
                />

                {/* Lock badge — visible on blurred photos */}
                {isBlurred && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div style={{
                      background: 'rgba(43,31,23,0.52)',
                      backdropFilter: 'blur(3px)',
                      WebkitBackdropFilter: 'blur(3px)',
                      borderRadius: '999px',
                      padding: '7px 13px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}>
                      <svg width="11" height="13" viewBox="0 0 11 13" fill="none" aria-hidden="true">
                        <rect x="0.75" y="5.25" width="9.5" height="7" rx="1.5" stroke="rgba(255,255,255,0.88)" strokeWidth="1.2"/>
                        <path d="M2.5 5.25V3.5a3 3 0 0 1 6 0v1.75" stroke="rgba(255,255,255,0.88)" strokeWidth="1.2" strokeLinecap="round"/>
                      </svg>
                    </div>
                  </div>
                )}

                {/* Hover overlay */}
                {!isBlurred && (
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-3"
                    style={{ background: 'rgba(43,31,23,0.18)' }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <circle cx="12" cy="12" r="10.5" stroke="white" strokeWidth="1.5"/>
                      <path d="M8 12h8M12 8v8" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                )}
              </button>

              {photo.caption && !isBlurred && (
                <figcaption
                  className="absolute bottom-0 left-0 right-0 px-4 py-3 pointer-events-none"
                  style={{ background: 'linear-gradient(to top, rgba(20,12,8,0.72) 0%, transparent 100%)' }}
                >
                  <p className="font-script leading-tight" style={{ fontSize: '18px', color: '#fff' }}>
                    {photo.caption}
                  </p>
                </figcaption>
              )}
            </figure>
          );
        })}
      </div>

      {/* ── Password overlay ── */}
      {showPw && (
        <div
          className="fixed inset-0 z-[8500] flex items-center justify-center p-4"
          style={{ background: 'rgba(43,31,23,0.75)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }}
          onClick={closePw}
        >
          <div
            className="relative w-full max-w-sm rounded-2xl overflow-hidden"
            style={{
              background: 'var(--bg-cream)',
              boxShadow: '0 32px 80px rgba(0,0,0,0.45)',
              animation: 'letterReveal 0.4s cubic-bezier(0.16,1,0.3,1) forwards',
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 px-8 py-5"
              style={{ background: 'linear-gradient(135deg, #a82048 0%, #721430 100%)' }}
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                   style={{ border: '1.5px solid rgba(255,255,255,0.7)' }}>
                <svg width="13" height="14" viewBox="0 0 13 14" fill="none" aria-hidden="true">
                  <rect x="2" y="6" width="9" height="7" rx="1.5" stroke="white" strokeWidth="1.3"/>
                  <path d="M4 6V4.5a2.5 2.5 0 0 1 5 0V6" stroke="white" strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="flex flex-col leading-none gap-1">
                <span className="font-script" style={{ fontSize: '26px', color: '#fff', lineHeight: 1 }}>
                  Ảnh riêng tư
                </span>
                <span className="font-serif italic" style={{ fontSize: '11px', color: 'rgba(255,220,210,0.72)', letterSpacing: '0.18em' }}>
                  Nhập mật khẩu để xem
                </span>
              </div>
            </div>

            {/* Body */}
            <div className="px-8 py-8 flex flex-col items-center gap-5">
              <div style={{ width: '100%', animation: shaking ? 'pwShake 0.45s ease' : 'none' }}>
                <input
                  ref={inputRef}
                  type="password"
                  value={pwInput}
                  onChange={e => { setPwInput(e.target.value); setPwError(false); }}
                  onKeyDown={e => e.key === 'Enter' && handlePwSubmit()}
                  placeholder="Mật khẩu"
                  className="w-full font-serif"
                  style={{
                    fontSize: '15px',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: `1.5px solid ${pwError ? '#c84830' : 'rgba(155,29,66,0.25)'}`,
                    background: pwError ? 'rgba(200,72,48,0.05)' : 'rgba(155,29,66,0.04)',
                    color: 'var(--ink)',
                    outline: 'none',
                    textAlign: 'center',
                    letterSpacing: '0.2em',
                    transition: 'border-color 0.2s',
                  }}
                />
                {pwError && (
                  <p className="font-serif italic text-center mt-2" style={{ fontSize: '12px', color: '#c84830' }}>
                    Mật khẩu chưa đúng ♡
                  </p>
                )}
              </div>

              <button
                onClick={handlePwSubmit}
                className="font-serif uppercase transition-opacity hover:opacity-80"
                style={{
                  padding: '10px 32px',
                  borderRadius: '999px',
                  background: 'linear-gradient(135deg, #a82048, #721430)',
                  color: '#fff',
                  fontSize: '12px',
                  letterSpacing: '0.28em',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 16px rgba(160,32,72,0.35)',
                }}
              >
                Xem ảnh
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Lightbox ── */}
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

          {photos[lightboxIndex].caption && (
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center px-6">
              <p className="font-script" style={{ fontSize: '22px', color: 'rgba(255,255,255,0.85)' }}>
                {photos[lightboxIndex].caption}
              </p>
            </div>
          )}

          <div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 font-serif italic text-sm"
            style={{ color: 'rgba(255,255,255,0.5)' }}
          >
            {lightboxIndex + 1} / {photos.length}
          </div>

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
