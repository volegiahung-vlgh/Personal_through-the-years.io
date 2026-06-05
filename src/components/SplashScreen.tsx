'use client';

import { useEffect, useState, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/translations';

interface SplashScreenProps {
  photos: string[];
}

const LINE_COUNT = 3;

const LINE_DELAY    = 700;
const LINE_FILL_MS  = 550;
const READY_DELAY   = LINE_DELAY * LINE_COUNT + LINE_FILL_MS + 400;
const BAR_DURATION  = 1200;
const FADE_DELAY    = READY_DELAY + BAR_DURATION + 600;

// Each line's mini progress bar
function LineItem({ text, visible }: { text: string; visible: boolean }) {
  const [filled, setFilled] = useState(false);
  const triggered = useRef(false);

  useEffect(() => {
    if (visible && !triggered.current) {
      triggered.current = true;
      // Small delay so the line fades in first, then bar starts
      const t = setTimeout(() => setFilled(true), 120);
      return () => clearTimeout(t);
    }
  }, [visible]);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(6px)',
        transition: 'opacity 0.35s ease, transform 0.35s ease',
        fontFamily: 'monospace',
        fontSize: '13px',
        color: 'rgba(255,255,255,0.70)',
      }}
    >
      {/* Label */}
      <span style={{ flex: '0 0 auto', minWidth: '150px' }}>{text}</span>

      {/* Mini battery / progress bar */}
      <div
        style={{
          flex: '1',
          height: '6px',
          borderRadius: '3px',
          background: 'rgba(255,255,255,0.10)',
          border: '1px solid rgba(255,255,255,0.14)',
          overflow: 'hidden',
          maxWidth: '120px',
        }}
      >
        <div
          style={{
            height: '100%',
            width: filled ? '100%' : '0%',
            background: 'linear-gradient(90deg, #b85c3d 0%, #e8b89a 100%)',
            borderRadius: '3px',
            transition: `width ${LINE_FILL_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`,
          }}
        />
      </div>

      {/* Percentage */}
      <span
        style={{
          minWidth: '36px',
          color: filled ? '#e8b89a' : 'rgba(255,255,255,0.25)',
          transition: 'color 0.3s ease',
          fontSize: '12px',
        }}
      >
        {filled ? '100%' : '  0%'}
      </span>
    </div>
  );
}

export default function SplashScreen({ photos }: SplashScreenProps) {
  // 'loading' = pre-hydration (SSR), 'show' = first visit, 'gone' = already seen
  const [phase,        setPhase]        = useState<'loading' | 'show' | 'gone'>('loading');
  const [bg,           setBg]           = useState<string | null>(null);
  const [visibleLines, setVisibleLines] = useState(0);
  const [showReady,    setShowReady]    = useState(false);
  const [barFull,      setBarFull]      = useState(false);
  const [showPrompt,   setShowPrompt]   = useState(false);
  const [fading,       setFading]       = useState(false);
  const { lang } = useLanguage();
  const tr = t(lang).splash;

  const dismissTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setPhase('show');

    if (photos.length) {
      setBg(photos[Math.floor(Math.random() * photos.length)]);
    }

    const timers: ReturnType<typeof setTimeout>[] = [];

    Array.from({ length: LINE_COUNT }).forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleLines(i + 1), LINE_DELAY * (i + 1)));
    });
    timers.push(setTimeout(() => setShowReady(true), READY_DELAY));
    timers.push(setTimeout(() => setBarFull(true),   READY_DELAY + 80));
    timers.push(setTimeout(() => setShowPrompt(true), READY_DELAY + 80 + BAR_DURATION + 200));

    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    return () => { if (dismissTimerRef.current) clearTimeout(dismissTimerRef.current); };
  }, []);

  const handleDismiss = () => {
    if (!showPrompt) return;
    setFading(true);
    dismissTimerRef.current = setTimeout(() => setPhase('gone'), 700);
  };

  if (phase !== 'show') return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{
        transition: 'opacity 0.7s ease',
        opacity: fading ? 0 : 1,
        pointerEvents: fading ? 'none' : 'all',
        cursor: showPrompt ? 'pointer' : 'default',
      }}
      onClick={handleDismiss}
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
          overflow: 'hidden',
          isolation: 'isolate',
        }}
      >
        <p
          className="uppercase tracking-widest mb-3"
          style={{ fontSize: '11px', color: '#e8b89a', letterSpacing: '0.28em' }}
        >
          {tr.initializing}
        </p>

        <h1
          className="font-serif font-semibold mb-6"
          style={{ fontSize: '26px', color: '#fff' }}
        >
          Gia Hưng &amp; Bích Đào
        </h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {tr.lines.map((text, i) => (
            <LineItem key={i} text={text} visible={visibleLines > i} />
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
            {tr.ready}
          </p>
        )}
      </div>

      {/* Click-to-continue prompt */}
      <div
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          opacity: showPrompt ? 1 : 0,
          transition: 'opacity 0.6s ease',
          pointerEvents: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <p
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: '12px',
            fontStyle: 'italic',
            color: 'rgba(255,255,255,0.55)',
            letterSpacing: '0.12em',
            whiteSpace: 'nowrap',
            animation: showPrompt ? 'promptPulse 2s ease-in-out infinite' : 'none',
          }}
        >
          {tr.clickToContinue}
        </p>
        <div
          style={{
            width: '1px',
            height: '28px',
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.45), transparent)',
            animation: showPrompt ? 'promptLine 2s ease-in-out infinite' : 'none',
          }}
        />
      </div>

      <style>{`
        @keyframes promptPulse {
          0%, 100% { opacity: 0.45; }
          50%       { opacity: 0.85; }
        }
        @keyframes promptLine {
          0%, 100% { opacity: 0.3; transform: scaleY(0.7); }
          50%       { opacity: 0.7; transform: scaleY(1);   }
        }
      `}</style>
    </div>
  );
}
