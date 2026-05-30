'use client';

import { useState, useEffect, useRef } from 'react';

const START = new Date('2021-02-08T00:00:00');

interface Elapsed {
  years: number;
  months: number;
  days: number;
  totalDays: number;
}

function getElapsed(): Elapsed {
  const ms = Date.now() - START.getTime();
  const totalDays = Math.floor(ms / 86_400_000);

  // Approximate: walk year-by-year to be accurate
  let y = START.getFullYear();
  let m = START.getMonth();
  let d = START.getDate();
  const now = new Date();

  let years = now.getFullYear() - y;
  let months = now.getMonth() - m;
  let days = now.getDate() - d;

  if (days < 0) {
    months -= 1;
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return { years, months, days, totalDays };
}

// Animated number that slides/rolls to new value
function RollingNumber({
  value,
  mounted,
}: {
  value: number;
  mounted: boolean;
}) {
  const str = String(value).padStart(2, '0');
  return (
    <div
      style={{
        overflow: 'hidden',
        lineHeight: 1,
      }}
    >
      <span
        style={{
          display: 'block',
          fontFamily: 'Georgia, "Times New Roman", serif',
          fontSize: 'clamp(52px, 7vw, 88px)',
          color: 'var(--terracotta-deep)',
          fontWeight: 300,
          letterSpacing: '-0.02em',
          transform: mounted ? 'translateY(0)' : 'translateY(60px)',
          opacity: mounted ? 1 : 0,
          transition: 'transform 0.9s cubic-bezier(0.16,1,0.3,1), opacity 0.7s ease',
        }}
      >
        {str}
      </span>
    </div>
  );
}

function Segment({
  value,
  label,
  mounted,
  delay,
}: {
  value: number;
  label: string;
  mounted: boolean;
  delay: number;
}) {
  return (
    <div
      style={{
        textAlign: 'center',
        flex: '1 1 0',
        opacity: mounted ? 1 : 0,
        transform: mounted ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {/* Number */}
      <RollingNumber value={value} mounted={mounted} />

      {/* Divider */}
      <div
        style={{
          width: '32px',
          height: '1px',
          background: 'var(--rule)',
          margin: '10px auto 8px',
        }}
        aria-hidden="true"
      />

      {/* Label */}
      <p
        style={{
          fontFamily: 'Georgia, serif',
          fontSize: '10px',
          letterSpacing: '0.42em',
          color: 'var(--ink-faint)',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </p>
    </div>
  );
}

export default function DayCounterClock() {
  const [elapsed, setElapsed] = useState<Elapsed | null>(null);
  const [mounted, setMounted] = useState(false);
  const [pulse, setPulse] = useState(true);

  useEffect(() => {
    setElapsed(getElapsed());
    // Small delay so the animation plays visibly after hydration
    const mountTimer = setTimeout(() => setMounted(true), 80);

    const tick = setInterval(() => {
      setElapsed(getElapsed());
      setPulse((p) => !p);
    }, 1000);

    return () => {
      clearTimeout(mountTimer);
      clearInterval(tick);
    };
  }, []);

  const e = elapsed ?? { years: 0, months: 0, days: 0, totalDays: 0 };

  return (
    <div style={{ textAlign: 'center', width: '100%', maxWidth: '440px', margin: '0 auto' }}>
      {/* Since label */}
      <p
        style={{
          fontFamily: 'Georgia, serif',
          fontSize: '10px',
          letterSpacing: '0.45em',
          color: 'var(--ink-faint)',
          textTransform: 'uppercase',
          marginBottom: '36px',
          opacity: mounted ? 1 : 0,
          transition: 'opacity 0.5s ease 50ms',
        }}
      >
        Từ 08 · 02 · 2021
      </p>

      {/* Three segments */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '4px',
        }}
      >
        <Segment value={e.years}  label="Năm"   mounted={mounted} delay={0}   />

        {/* Pulsing dot */}
        <div
          aria-hidden="true"
          style={{
            flexShrink: 0,
            width: '28px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            paddingBottom: '28px',
          }}
        >
          {[0, 1].map((i) => (
            <div
              key={i}
              style={{
                width: '5px',
                height: '5px',
                borderRadius: '50%',
                background: 'var(--terracotta)',
                opacity: pulse ? (i === 0 ? 0.9 : 0.3) : (i === 0 ? 0.3 : 0.9),
                transition: 'opacity 0.5s ease',
              }}
            />
          ))}
        </div>

        <Segment value={e.months} label="Tháng" mounted={mounted} delay={120} />

        {/* Pulsing dot */}
        <div
          aria-hidden="true"
          style={{
            flexShrink: 0,
            width: '28px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            paddingBottom: '28px',
          }}
        >
          {[0, 1].map((i) => (
            <div
              key={i}
              style={{
                width: '5px',
                height: '5px',
                borderRadius: '50%',
                background: 'var(--terracotta)',
                opacity: pulse ? (i === 1 ? 0.9 : 0.3) : (i === 1 ? 0.3 : 0.9),
                transition: 'opacity 0.5s ease',
              }}
            />
          ))}
        </div>

        <Segment value={e.days}   label="Ngày"  mounted={mounted} delay={240} />
      </div>

      {/* Total days */}
      <div
        style={{
          marginTop: '28px',
          opacity: mounted ? 1 : 0,
          transition: 'opacity 0.6s ease 400ms',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            background: 'rgba(184,92,61,0.08)',
            border: '1px solid rgba(184,92,61,0.18)',
            borderRadius: '999px',
            padding: '7px 20px',
          }}
        >
          <span
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: '13px',
              fontStyle: 'italic',
              color: 'var(--terracotta-deep)',
            }}
          >
            {e.totalDays.toLocaleString('vi-VN')} ngày bên nhau
          </span>
          <span style={{ color: 'var(--terracotta)', fontSize: '14px' }}>♥</span>
        </div>
      </div>
    </div>
  );
}
