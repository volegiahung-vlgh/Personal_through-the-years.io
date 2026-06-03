'use client';

import { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/translations';

const START = new Date('2021-02-08T00:00:00');

interface Props {
  photos: string[];
}

interface Elapsed {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  hh: string;
  mm: string;
  ss: string;
}

function getElapsed(): Elapsed {
  const now = new Date();
  const ms = now.getTime() - START.getTime();
  const totalDays = Math.floor(ms / 86_400_000);

  let years  = now.getFullYear() - START.getFullYear();
  let months = now.getMonth()    - START.getMonth();
  let days   = now.getDate()     - START.getDate();

  if (days < 0) {
    months--;
    const prev = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prev.getDate();
  }
  if (months < 0) { years--; months += 12; }

  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  const ss = String(now.getSeconds()).padStart(2, '0');

  return { years, months, days, totalDays, hh, mm, ss };
}

// Single number column
function NumCol({ value, label, mounted, delay }: {
  value: number;
  label: string;
  mounted: boolean;
  delay: number;
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        opacity: mounted ? 1 : 0,
        transform: mounted ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.9s ease ${delay}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif',
          fontSize: 'clamp(110px, 15vw, 210px)',
          fontWeight: 300,
          fontStyle: 'italic',
          color: '#ffffff',
          lineHeight: 0.88,
          letterSpacing: '-0.01em',
          userSelect: 'none',
        }}
      >
        {String(value).padStart(2, '0')}
      </span>
      <span
        style={{
          fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif',
          fontSize: 'clamp(12px, 1.2vw, 15px)',
          fontWeight: 400,
          fontStyle: 'normal',
          color: 'rgba(255,255,255,0.50)',
          letterSpacing: '0.40em',
          textTransform: 'uppercase',
          marginTop: '22px',
        }}
      >
        {label}
      </span>
    </div>
  );
}

export default function DayCounterHero({ photos }: Props) {
  const [elapsed, setElapsed] = useState<Elapsed | null>(null);
  const [mounted, setMounted] = useState(false);
  const [bgLoaded, setBgLoaded] = useState(false);
  const { lang } = useLanguage();
  const tr = t(lang).daycounter;

  // Pick random photo once on mount
  const bgPhoto = useMemo(() => {
    if (!photos.length) return null;
    return photos[Math.floor(Math.random() * photos.length)];
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setElapsed(getElapsed());
    const timer = setTimeout(() => setMounted(true), 100);
    const tick  = setInterval(() => setElapsed(getElapsed()), 1000);

    // Preload bg image
    if (bgPhoto) {
      const img = new Image();
      img.onload = () => setBgLoaded(true);
      img.src = bgPhoto;
    } else {
      setBgLoaded(true);
    }

    return () => { clearTimeout(timer); clearInterval(tick); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const e = elapsed ?? { years: 0, months: 0, days: 0, totalDays: 0, hh: '--', mm: '--', ss: '--' };

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: '#1a1008',
      }}
    >
      {/* ── Background photo ── */}
      {bgPhoto && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${bgPhoto})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(2px) brightness(0.35) saturate(0.7)',
            transform: 'scale(1.06)',
            opacity: bgLoaded ? 1 : 0,
            transition: 'opacity 1.2s ease',
          }}
        />
      )}

      {/* ── Vignette overlay ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at center, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.55) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Content ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 0,
          width: '100%',
          padding: '60px 24px',
        }}
      >
        {/* Name header */}
        <div
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(-16px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
            marginBottom: 'clamp(48px, 7vh, 80px)',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif',
              fontSize: 'clamp(12px, 1.4vw, 16px)',
              fontWeight: 500,
              color: 'rgba(255,255,255,0.80)',
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
            }}
          >
            Gia Hưng
          </span>

          {/* Ampersand heart */}
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path
              d="M9 15S2.5 11 2.5 6.5a3.5 3.5 0 0 1 6.5-1.8A3.5 3.5 0 0 1 15.5 6.5C15.5 11 9 15 9 15Z"
              fill="#b85c3d"
              opacity="0.9"
            />
          </svg>

          <span
            style={{
              fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif',
              fontSize: 'clamp(12px, 1.4vw, 16px)',
              fontWeight: 500,
              color: 'rgba(255,255,255,0.80)',
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
            }}
          >
            Bích Đào
          </span>
        </div>

        {/* ── Counter row ── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            gap: 0,
            width: '100%',
            maxWidth: '900px',
          }}
        >
          <NumCol value={e.years}  label={tr.years}   mounted={mounted} delay={0}   />

          {/* Divider */}
          <div
            aria-hidden="true"
            style={{
              width: '1px',
              height: 'clamp(80px, 11vw, 160px)',
              background: 'rgba(255,255,255,0.18)',
              margin: '0 clamp(24px, 4vw, 64px)',
              alignSelf: 'center',
              marginBottom: '20px',
              opacity: mounted ? 1 : 0,
              transition: 'opacity 0.8s ease 150ms',
            }}
          />

          <NumCol value={e.months} label={tr.months} mounted={mounted} delay={120} />

          {/* Divider */}
          <div
            aria-hidden="true"
            style={{
              width: '1px',
              height: 'clamp(80px, 11vw, 160px)',
              background: 'rgba(255,255,255,0.18)',
              margin: '0 clamp(24px, 4vw, 64px)',
              alignSelf: 'center',
              marginBottom: '20px',
              opacity: mounted ? 1 : 0,
              transition: 'opacity 0.8s ease 250ms',
            }}
          />

          <NumCol value={e.days}   label={tr.days}  mounted={mounted} delay={240} />
        </div>

        {/* ── Total + live clock ── */}
        <div
          style={{
            marginTop: 'clamp(40px, 6vh, 72px)',
            display: 'flex',
            alignItems: 'center',
            gap: '18px',
            opacity: mounted ? 1 : 0,
            transition: 'opacity 0.8s ease 400ms',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif',
              fontSize: 'clamp(15px, 1.8vw, 22px)',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.85)',
              letterSpacing: '0.01em',
            }}
          >
            {e.totalDays.toLocaleString(lang === 'VI' ? 'vi-VN' : 'en-US')} {tr.daysTogether}
          </span>

          <span
            style={{ color: 'rgba(255,255,255,0.28)', fontSize: '18px', fontWeight: 100 }}
            aria-hidden="true"
          >
            ·
          </span>

          <span
            style={{
              fontFamily: '"SF Mono", "Fira Code", "Cascadia Code", monospace',
              fontSize: 'clamp(15px, 1.8vw, 22px)',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.60)',
              letterSpacing: '0.06em',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {e.hh}:{e.mm}:{e.ss}
          </span>
        </div>

        {/* ── Since label ── */}
        <p
          style={{
            marginTop: '20px',
            fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif',
            fontSize: 'clamp(10px, 1vw, 12px)',
            fontWeight: 400,
            color: 'rgba(255,255,255,0.32)',
            letterSpacing: '0.42em',
            textTransform: 'uppercase',
            opacity: mounted ? 1 : 0,
            transition: 'opacity 0.8s ease 500ms',
          }}
        >
          {tr.since}
        </p>
      </div>

      {/* ── Scroll hint ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          opacity: mounted ? 0.4 : 0,
          transition: 'opacity 1s ease 800ms',
        }}
      >
        <div
          style={{
            width: '1px',
            height: '40px',
            background: 'rgba(255,255,255,0.5)',
            animation: 'scrollHint 1.8s ease-in-out infinite',
          }}
        />
      </div>

      <style>{`
        @keyframes scrollHint {
          0%, 100% { opacity: 0.2; transform: scaleY(0.6) translateY(-4px); }
          50%       { opacity: 0.8; transform: scaleY(1)   translateY(4px);  }
        }
      `}</style>
    </section>
  );
}
