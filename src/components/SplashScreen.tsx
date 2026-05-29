'use client';

import { useEffect, useState } from 'react';

interface SplashScreenProps {
  photos: string[];
}

const LINES = [
  { text: 'Loading our story', status: 'done' },
  { text: 'Visualization',     status: 'done' },
  { text: 'Building memories', status: 'done' },
];

const LINE_DELAY   = 700;
const READY_DELAY  = LINE_DELAY * LINES.length + 400;
const BAR_DURATION = 1200;
const FADE_DELAY   = READY_DELAY + BAR_DURATION + 600;

export default function SplashScreen({ photos }: SplashScreenProps) {
  const [bg,           setBg]          = useState<string | null>(null);
  const [visibleLines, setVisibleLines] = useState(0);
  const [showReady,    setShowReady]    = useState(false);
  const [barFull,      setBarFull]      = useState(false);
  const [fading,       setFading]       = useState(false);
  const [gone,         setGone]         = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('splashed') === '1') {
      setGone(true);
      return;
    }

    if (photos.length) {
      setBg(photos[Math.floor(Math.random() * photos.length)]);
    }

    LINES.forEach((_, i) => {
      setTimeout(() => setVisibleLines(i + 1), LINE_DELAY * (i + 1));
    });
    setTimeout(() => setShowReady(true),  READY_DELAY);
    setTimeout(() => setBarFull(true),    READY_DELAY + 80);
    setTimeout(() => setFading(true),     FADE_DELAY);
    setTimeout(() => {
      setGone(true);
      sessionStorage.setItem('splashed', '1');
    }, FADE_DELAY + 700);
  }, []);

  if (gone) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{
        transition: 'opacity 0.7s ease',
        opacity: fading ? 0 : 1,
        pointerEvents: fading ? 'none' : 'all',
      }}
    >
      {bg && (
        <img
          src={bg}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'blur(12px) brightness(0.45) saturate(0.8)', transform: 'scale(1.08)' }}
        />
      )}

      {!bg && <div className="absolute inset-0" style={{ background: '#2b1f17' }} />}

      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)' }}
      />

      <div
        className="relative rounded-2xl px-10 py-9 w-[480px] max-w-[90vw]"
        style={{
          background: 'rgba(255,255,255,0.10)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.18)',
          boxShadow: '0 8px 48px rgba(0,0,0,0.35)',
        }}
      >
        <p
          className="uppercase tracking-widest mb-3"
          style={{ fontSize: '11px', color: '#e8b89a', letterSpacing: '0.28em' }}
        >
          Initializing
        </p>

        <h1
          className="font-serif font-semibold mb-6"
          style={{ fontSize: '26px', color: '#fff' }}
        >
          Gia Hưng &amp; Bích Đào
        </h1>

        <div className="space-y-2" style={{ fontFamily: 'monospace', fontSize: '14px', color: 'rgba(255,255,255,0.75)' }}>
          {LINES.map((line, i) => (
            <p
              key={i}
              style={{
                opacity: visibleLines > i ? 1 : 0,
                transform: visibleLines > i ? 'translateY(0)' : 'translateY(6px)',
                transition: 'opacity 0.4s ease, transform 0.4s ease',
              }}
            >
              {line.text}&nbsp;&nbsp;<span style={{ color: '#e8b89a' }}>{line.status}</span>
            </p>
          ))}
        </div>

        {showReady && (
          <div
            className="mt-5 rounded-full overflow-hidden"
            style={{ height: '3px', background: 'rgba(255,255,255,0.15)' }}
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

        {showReady && (
          <p
            className="mt-4 uppercase tracking-widest"
            style={{ fontSize: '11px', color: '#e8b89a', letterSpacing: '0.28em' }}
          >
            Ready
          </p>
        )}
      </div>
    </div>
  );
}
