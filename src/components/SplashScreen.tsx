'use client';

import { useEffect, useState } from 'react';

const LINES = [
  'Loading our story ...&nbsp;&nbsp;done',
  'Visualization ...&nbsp;&nbsp;done',
  'Building memories ...&nbsp;&nbsp;done',
];

const LINE_DELAY   = 700;   // ms between each line appearing
const READY_DELAY  = LINE_DELAY * LINES.length + 400;
const BAR_DURATION = 1200;  // ms for progress bar to fill after READY shows
const FADE_DELAY   = READY_DELAY + BAR_DURATION + 600; // when overlay fades out

export default function SplashScreen() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [showReady,    setShowReady]    = useState(false);
  const [barFull,      setBarFull]      = useState(false);
  const [fading,       setFading]       = useState(false);
  const [gone,         setGone]         = useState(false);

  useEffect(() => {
    // Reveal lines one by one
    LINES.forEach((_, i) => {
      setTimeout(() => setVisibleLines(i + 1), LINE_DELAY * (i + 1));
    });

    setTimeout(() => setShowReady(true),  READY_DELAY);
    setTimeout(() => setBarFull(true),    READY_DELAY + 80);
    setTimeout(() => setFading(true),     FADE_DELAY);
    setTimeout(() => setGone(true),       FADE_DELAY + 700);
  }, []);

  if (gone) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{
        background: '#f4ebe3',
        transition: 'opacity 0.7s ease',
        opacity: fading ? 0 : 1,
        pointerEvents: fading ? 'none' : 'all',
      }}
    >
      {/* Card */}
      <div
        className="rounded-2xl px-10 py-9 w-[480px] max-w-[90vw]"
        style={{
          background: '#fff',
          boxShadow: '0 4px 40px rgba(43,31,23,0.10)',
        }}
      >
        {/* INITIALIZING label */}
        <p
          className="uppercase tracking-widest mb-3"
          style={{ fontSize: '11px', color: '#b85c3d', letterSpacing: '0.28em' }}
        >
          Initializing
        </p>

        {/* Title */}
        <h1
          className="font-serif font-semibold mb-6"
          style={{ fontSize: '26px', color: '#2b1f17' }}
        >
          Gia Hưng &amp; Bích Đào
        </h1>

        {/* Lines */}
        <div className="space-y-2" style={{ fontFamily: 'monospace', fontSize: '14px', color: '#6b574a' }}>
          {LINES.map((line, i) => (
            <p
              key={i}
              style={{
                opacity: visibleLines > i ? 1 : 0,
                transform: visibleLines > i ? 'translateY(0)' : 'translateY(6px)',
                transition: 'opacity 0.4s ease, transform 0.4s ease',
              }}
              dangerouslySetInnerHTML={{ __html: line }}
            />
          ))}
        </div>

        {/* Progress bar */}
        {showReady && (
          <div
            className="mt-5 rounded-full overflow-hidden"
            style={{ height: '4px', background: '#ead9c9' }}
          >
            <div
              style={{
                height: '100%',
                width: barFull ? '100%' : '0%',
                background: 'linear-gradient(90deg, #b85c3d, #e8b89a)',
                transition: `width ${BAR_DURATION}ms cubic-bezier(0.4,0,0.2,1)`,
                borderRadius: '9999px',
              }}
            />
          </div>
        )}

        {/* READY */}
        {showReady && (
          <p
            className="mt-4 uppercase tracking-widest"
            style={{ fontSize: '11px', color: '#b85c3d', letterSpacing: '0.28em' }}
          >
            Ready
          </p>
        )}
      </div>
    </div>
  );
}
