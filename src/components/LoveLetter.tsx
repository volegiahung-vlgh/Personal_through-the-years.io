'use client';

import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/translations';

// ── Edit your letter here ─────────────────────────────────────
const LETTER_PARAGRAPHS = [
  '...',
];
// ─────────────────────────────────────────────────────────────

const HEARTS = [
  { top: '18%', left: '8%',  size: 18, opacity: 0.55 },
  { top: '72%', left: '5%',  size: 22, opacity: 0.45 },
  { top: '30%', left: '88%', size: 26, opacity: 0.50 },
  { top: '65%', left: '84%', size: 16, opacity: 0.40 },
  { top: '80%', left: '22%', size: 14, opacity: 0.35 },
  { top: '12%', left: '75%', size: 20, opacity: 0.50 },
];

export default function LoveLetter() {
  const [open, setOpen]         = useState(false);
  const [pulse, setPulse]       = useState(false);
  const [atBottom, setAtBottom] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { lang } = useLanguage();
  const tr = t(lang).letter;

  const handleOpen = () => {
    setPulse(true);
    setTimeout(() => { setPulse(false); setOpen(true); }, 380);
  };

  const handleClose = () => setOpen(false);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setAtBottom(el.scrollTop + el.clientHeight >= el.scrollHeight - 12);
  };

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    if (open) {
      const el = scrollRef.current;
      if (el) setAtBottom(el.scrollHeight <= el.clientHeight);
    }
  }, [open]);

  return (
    <>
      {/* ── Closed card ─────────────────────────────────── */}
      <div className="relative flex flex-col items-center">

        {/* Floating hearts */}
        {HEARTS.map((h, i) => (
          <span
            key={i}
            className="absolute pointer-events-none select-none"
            style={{ top: h.top, left: h.left, fontSize: h.size, opacity: h.opacity, color: '#9b1d42' }}
            aria-hidden="true"
          >
            ♥
          </span>
        ))}

        <button
          onClick={handleOpen}
          className="group relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--terracotta)] focus-visible:ring-offset-4 rounded-2xl"
          style={{
            transform: pulse ? 'scale(0.93)' : 'scale(1)',
            transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1)',
          }}
          aria-label="Open love letter"
        >
          {/* Back envelope shadow */}
          <div
            aria-hidden="true"
            className="absolute"
            style={{
              inset: 0,
              background: 'linear-gradient(145deg, #5a0f26, #4a0c20)',
              borderRadius: '12px',
              transform: 'translateY(-8px) translateX(7px)',
              zIndex: 0,
              boxShadow: '0 4px 20px rgba(74,12,32,0.45)',
            }}
          />

          {/* Envelope card */}
          <div
            className="relative z-10 overflow-hidden"
            style={{
              width: '300px',
              height: '200px',
              borderRadius: '12px',
              boxShadow: '0 12px 40px rgba(110,21,48,0.5)',
              transition: 'box-shadow 0.3s ease',
            }}
          >
            {/* Envelope SVG */}
            <svg viewBox="0 0 300 200" width="300" height="200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <defs>
                {/* Envelope body */}
                <linearGradient id="ll-body" x1="0" y1="0" x2="1" y2="1" gradientUnits="objectBoundingBox">
                  <stop offset="0%" stopColor="#a82048"/>
                  <stop offset="100%" stopColor="#721430"/>
                </linearGradient>
                {/* Top flap */}
                <linearGradient id="ll-flap" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
                  <stop offset="0%" stopColor="#6c1128"/>
                  <stop offset="100%" stopColor="#881a34"/>
                </linearGradient>
                {/* Wax — userSpaceOnUse so gradient is consistent across all drip blobs */}
                <radialGradient id="ll-wax" cx="148" cy="103" r="46" gradientUnits="userSpaceOnUse">
                  <stop offset="0%"   stopColor="#e83870"/>
                  <stop offset="28%"  stopColor="#c22248"/>
                  <stop offset="62%"  stopColor="#921630"/>
                  <stop offset="100%" stopColor="#4e0818"/>
                </radialGradient>
                {/* Top-left specular gloss for raised disc */}
                <radialGradient id="ll-gloss" cx="136" cy="97" r="24" gradientUnits="userSpaceOnUse">
                  <stop offset="0%"   stopColor="rgba(255,255,255,0.24)"/>
                  <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
                </radialGradient>
                {/* Drop shadow — applied to the whole seal group = one unified shadow */}
                <filter id="ll-drop" x="-55%" y="-55%" width="210%" height="210%">
                  <feDropShadow dx="1" dy="5" stdDeviation="6" floodColor="#240608" floodOpacity="0.60"/>
                </filter>
              </defs>

              {/* ── Envelope body ── */}
              <rect width="300" height="200" rx="12" fill="url(#ll-body)"/>
              <rect width="300" height="50" rx="12" fill="rgba(255,255,255,0.052)"/>

              {/* Fold creases */}
              <line x1="0"   y1="200" x2="150" y2="118" stroke="rgba(0,0,0,0.22)" strokeWidth="1"/>
              <line x1="300" y1="200" x2="150" y2="118" stroke="rgba(0,0,0,0.22)" strokeWidth="1"/>
              <line x1="0"   y1="0"   x2="150" y2="88"  stroke="rgba(0,0,0,0.12)" strokeWidth="0.7"/>
              <line x1="300" y1="0"   x2="150" y2="88"  stroke="rgba(0,0,0,0.12)" strokeWidth="0.7"/>

              {/* ── Top flap ── */}
              <polygon points="0,0 300,0 150,88" fill="url(#ll-flap)"/>
              <polygon points="0,0 300,0 150,88" fill="rgba(255,255,255,0.035)"/>
              <line x1="0"   y1="0" x2="150" y2="88" stroke="rgba(255,255,255,0.085)" strokeWidth="0.8"/>
              <line x1="300" y1="0" x2="150" y2="88" stroke="rgba(255,255,255,0.085)" strokeWidth="0.8"/>

              {/* ── Wax seal with organic drip blobs ── */}
              {/* filter on <g> = single shadow from the combined silhouette of all shapes */}
              <g filter="url(#ll-drop)">
                {/* Drip blobs — 8 blobs, irregularly spaced, tilted outward from center */}
                <ellipse cx="149" cy="68"  rx="11" ry="14" fill="url(#ll-wax)"/>
                <ellipse cx="181" cy="82"  rx="9"  ry="12" fill="url(#ll-wax)" transform="rotate(-40,181,82)"/>
                <ellipse cx="190" cy="112" rx="13" ry="8"  fill="url(#ll-wax)"/>
                <ellipse cx="176" cy="141" rx="9"  ry="12" fill="url(#ll-wax)" transform="rotate(42,176,141)"/>
                <ellipse cx="150" cy="152" rx="11" ry="14" fill="url(#ll-wax)"/>
                <ellipse cx="120" cy="139" rx="9"  ry="12" fill="url(#ll-wax)" transform="rotate(-42,120,139)"/>
                <ellipse cx="110" cy="109" rx="13" ry="8"  fill="url(#ll-wax)"/>
                <ellipse cx="122" cy="79"  rx="9"  ry="12" fill="url(#ll-wax)" transform="rotate(38,122,79)"/>
                {/* Main disc — fills the gaps, sits on top of all blobs */}
                <circle cx="150" cy="110" r="33" fill="url(#ll-wax)"/>
              </g>

              {/* Specular gloss — top-left highlight on raised disc only */}
              <circle cx="150" cy="110" r="33" fill="url(#ll-gloss)"/>

              {/* Outer decorative rim */}
              <circle cx="150" cy="110" r="31"   fill="none" stroke="rgba(255,218,202,0.44)" strokeWidth="1.4"/>
              {/* Inner rim — stamp border */}
              <circle cx="150" cy="110" r="24"   fill="none" stroke="rgba(255,218,202,0.27)" strokeWidth="0.9"/>

              {/* ── Heart — embossed (lighter stroke = raised wax catching light) ── */}
              <path
                d="M150,124 C149,121 131,113 131,103 a10,10 0 0,1 19,0 a10,10 0 0,1 19,0 C169,113 151,121 150,124z"
                fill="rgba(255,215,195,0.24)"
                stroke="rgba(255,215,195,0.90)"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            {/* Hover indicator — open envelope icon fades in */}
            <div
              className="absolute inset-x-0 bottom-0 flex justify-center pb-[14px] opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0 pointer-events-none"
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(255,255,255,0.13)',
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
                borderRadius: '999px',
                padding: '5px 12px 5px 9px',
              }}>
                {/* Open-envelope icon */}
                <svg width="15" height="12" viewBox="0 0 15 12" fill="none" aria-hidden="true">
                  <rect x="0.75" y="3.25" width="13.5" height="8" rx="1.5" stroke="rgba(255,255,255,0.85)" strokeWidth="1.2"/>
                  <path d="M1 3.75l6.5 4.5 6.5-4.5" stroke="rgba(255,255,255,0.85)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7.5 0l1.8 1.8-1.8 1.8L5.7 1.8z" fill="rgba(232,184,154,0.9)"/>
                </svg>
                <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.85)', fontFamily: 'var(--font-cormorant), Georgia, serif', letterSpacing: '0.28em', textTransform: 'uppercase' }}>
                  {tr.clickToOpen}
                </span>
              </div>
            </div>
          </div>
        </button>

        <p
          className="mt-5 font-serif uppercase text-[12px]"
          style={{ color: 'var(--terracotta-deep)', letterSpacing: '0.38em' }}
        >
          {tr.clickToOpen}
        </p>
      </div>

      {/* ── Open letter overlay ──────────────────────────── */}
      {open && (
        <div
          className="fixed inset-0 z-[8500] flex items-center justify-center p-4 sm:p-10"
          style={{ background: 'rgba(43,31,23,0.70)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }}
          onClick={handleClose}
        >
          <div
            className="relative w-full max-w-xl rounded-2xl overflow-hidden flex flex-col"
            style={{
              background: 'var(--bg-cream)',
              boxShadow: '0 32px 80px rgba(0,0,0,0.45)',
              maxHeight: '88vh',
              animation: 'letterReveal 0.5s cubic-bezier(0.16,1,0.3,1) forwards',
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-8 py-5 shrink-0"
              style={{ background: 'linear-gradient(135deg, #a82048 0%, #721430 100%)' }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                  style={{ border: '1.5px solid rgba(255,255,255,0.7)' }}
                >
                  <svg width="13" height="12" viewBox="0 0 13 12" fill="white" aria-hidden="true">
                    <path d="M6.5 11S1 7.5 1 4a2.9 2.9 0 0 1 5.5-1.3A2.9 2.9 0 0 1 12 4c0 3.5-5.5 7-5.5 7Z"/>
                  </svg>
                </div>
                <span className="font-script leading-none" style={{ fontSize: '30px', color: '#fff' }}>
                  {tr.title}
                </span>
              </div>
              <button
                onClick={handleClose}
                className="flex items-center gap-1 font-serif uppercase text-[11px] tracking-widest transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
                style={{ color: 'rgba(255,255,255,0.80)', letterSpacing: '0.2em' }}
              >
                <span>{tr.close}</span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            {/* Scrollable letter body */}
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="letter-scroll overflow-y-auto flex-1 px-8 sm:px-12"
              style={{
                scrollBehavior: 'smooth',
                paddingTop: '96px',   /* 3 × 32 — anchors grid so first text sits on a rule */
                paddingBottom: '64px',
                backgroundImage: 'repeating-linear-gradient(to bottom, transparent 0px, transparent 31px, rgba(155,29,66,0.08) 31px, rgba(155,29,66,0.08) 32px)',
                backgroundSize: '100% 32px',
                backgroundAttachment: 'local',
              }}
            >
              {/* Top ornament — exactly 32px so first text aligns on the next rule */}
              <div
                className="text-center"
                style={{ height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                aria-hidden="true"
              >
                <span className="font-script" style={{ fontSize: '22px', color: 'var(--terracotta)', opacity: 0.55 }}>
                  ~ ♡ ~
                </span>
              </div>

              {/* Paragraphs — all locked to 32px grid */}
              <div>
                {LETTER_PARAGRAPHS.map((para, i) => (
                  <p
                    key={i}
                    className="font-serif"
                    style={{
                      fontSize: i === 0 ? '19px' : '15.5px',
                      fontStyle: i === 0 ? 'normal' : 'italic',
                      fontWeight: i === 0 ? 500 : 400,
                      lineHeight: '32px',      /* matches the ruled grid exactly */
                      marginBottom: '32px',    /* one blank ruled line between paragraphs */
                      color: i === 0 ? 'var(--terracotta-deep)' : 'var(--ink)',
                      whiteSpace: 'pre-line',
                    }}
                  >
                    {para}
                  </p>
                ))}
              </div>

              {/* Bottom ornament — 32px to stay on grid */}
              <div
                className="text-center"
                style={{ height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                aria-hidden="true"
              >
                <span className="font-script" style={{ fontSize: '28px', color: 'var(--terracotta)', opacity: 0.45 }}>
                  ✦
                </span>
              </div>
            </div>

            {/* Scroll-hint fade — disappears at bottom */}
            <div
              className="absolute bottom-0 left-0 right-0 h-14 pointer-events-none transition-opacity duration-300"
              style={{
                background: 'linear-gradient(to top, var(--bg-cream) 10%, transparent)',
                opacity: atBottom ? 0 : 1,
              }}
              aria-hidden="true"
            />
          </div>
        </div>
      )}
    </>
  );
}
