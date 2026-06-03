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
                <linearGradient id="ll-body" x1="0" y1="0" x2="1" y2="1" gradientUnits="objectBoundingBox">
                  <stop offset="0%" stopColor="#a82048"/>
                  <stop offset="100%" stopColor="#721430"/>
                </linearGradient>
                <linearGradient id="ll-flap" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
                  <stop offset="0%" stopColor="#7c1630"/>
                  <stop offset="100%" stopColor="#921c3c"/>
                </linearGradient>
                <radialGradient id="ll-seal" cx="45%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#b02848"/>
                  <stop offset="100%" stopColor="#5c1020"/>
                </radialGradient>
              </defs>

              {/* Body */}
              <rect width="300" height="200" rx="12" fill="url(#ll-body)"/>
              {/* Top highlight */}
              <rect width="300" height="70" rx="12" fill="rgba(255,255,255,0.055)"/>

              {/* Fold lines — bottom V */}
              <line x1="0"   y1="200" x2="150" y2="118" stroke="rgba(0,0,0,0.20)" strokeWidth="1"/>
              <line x1="300" y1="200" x2="150" y2="118" stroke="rgba(0,0,0,0.20)" strokeWidth="1"/>
              {/* Fold lines — side diagonals */}
              <line x1="0"   y1="0" x2="150" y2="88" stroke="rgba(0,0,0,0.13)" strokeWidth="0.8"/>
              <line x1="300" y1="0" x2="150" y2="88" stroke="rgba(0,0,0,0.13)" strokeWidth="0.8"/>

              {/* Top flap triangle */}
              <polygon points="0,0 300,0 150,88" fill="url(#ll-flap)"/>
              <polygon points="0,0 300,0 150,88" fill="rgba(255,255,255,0.04)"/>

              {/* Wax seal shadow */}
              <circle cx="152" cy="112" r="36" fill="rgba(0,0,0,0.22)"/>
              {/* Wax seal */}
              <circle cx="150" cy="108" r="36" fill="url(#ll-seal)"/>
              {/* Seal outer rim */}
              <circle cx="150" cy="108" r="36" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5"/>
              {/* Seal inner rim */}
              <circle cx="150" cy="108" r="30" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="0.8"/>

              {/* Botanical — stem */}
              <g stroke="rgba(232,184,154,0.78)" fill="none" strokeLinecap="round">
                <line x1="150" y1="91"  x2="150" y2="125" strokeWidth="1.2"/>
                {/* Left branches */}
                <line x1="150" y1="95"  x2="139" y2="87"  strokeWidth="1.0"/>
                <line x1="150" y1="101" x2="136" y2="96"  strokeWidth="0.9"/>
                <line x1="150" y1="108" x2="135" y2="104" strokeWidth="0.85"/>
                <line x1="150" y1="115" x2="138" y2="111" strokeWidth="0.8"/>
                <line x1="150" y1="121" x2="141" y2="119" strokeWidth="0.7"/>
                {/* Right branches */}
                <line x1="150" y1="95"  x2="161" y2="87"  strokeWidth="1.0"/>
                <line x1="150" y1="101" x2="164" y2="96"  strokeWidth="0.9"/>
                <line x1="150" y1="108" x2="165" y2="104" strokeWidth="0.85"/>
                <line x1="150" y1="115" x2="162" y2="111" strokeWidth="0.8"/>
                <line x1="150" y1="121" x2="159" y2="119" strokeWidth="0.7"/>
              </g>
              {/* Leaf tip dots */}
              <g fill="rgba(232,184,154,0.72)">
                <circle cx="138" cy="87"  r="2.2"/>
                <circle cx="162" cy="87"  r="2.2"/>
                <circle cx="135" cy="96"  r="1.8"/>
                <circle cx="165" cy="96"  r="1.8"/>
                <circle cx="134" cy="104" r="1.6"/>
                <circle cx="166" cy="104" r="1.6"/>
                <circle cx="137" cy="111" r="1.4"/>
                <circle cx="163" cy="111" r="1.4"/>
              </g>
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
