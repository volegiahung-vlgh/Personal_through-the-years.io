'use client';

import { useState, useEffect } from 'react';

const START = new Date('2021-02-08T00:00:00');

function getDays() {
  return Math.floor((Date.now() - START.getTime()) / 86400000);
}

function FlipCard({ char, delay }: { char: string; delay: number }) {
  const [played, setPlayed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setPlayed(true), 120 + delay);
    return () => clearTimeout(t);
  }, [delay]);

  const isSpace = char === ' ';

  return (
    <div
      style={{
        perspective: '500px',
        display: 'inline-block',
        margin: isSpace ? '0 6px' : '0 4px',
      }}
    >
      <div
        style={{
          width: isSpace ? '12px' : '68px',
          height: isSpace ? '0' : '92px',
          position: 'relative',
          transformOrigin: 'center top',
          transform: played ? 'rotateX(0deg)' : 'rotateX(-90deg)',
          transition: `transform 0.55s cubic-bezier(0.34, 1.4, 0.64, 1) ${delay}ms`,
        }}
      >
        {/* Card shadow layer */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '9px',
            background: 'rgba(43,31,23,0.18)',
            transform: 'translateY(5px) translateX(3px)',
            filter: 'blur(4px)',
          }}
        />

        {/* Card body */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '9px',
            background: 'linear-gradient(170deg, #fffaf5 0%, #f0e6d6 100%)',
            boxShadow:
              '0 2px 0 rgba(43,31,23,0.08) inset, 0 -1px 0 rgba(43,31,23,0.06) inset',
            border: '1px solid rgba(43,31,23,0.10)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Crease line */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: '6%',
              right: '6%',
              top: '50%',
              height: '1px',
              background: 'rgba(43,31,23,0.12)',
            }}
          />
          {/* Top half shading */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '50%',
              background: 'linear-gradient(to bottom, rgba(43,31,23,0.05) 0%, transparent 100%)',
              borderRadius: '9px 9px 0 0',
              pointerEvents: 'none',
            }}
          />

          <span
            style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontSize: '54px',
              color: '#2b1f17',
              lineHeight: 1,
              fontWeight: 400,
              userSelect: 'none',
            }}
          >
            {char}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function DayCounterCalendar() {
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    setDays(getDays());
    const id = setInterval(() => setDays(getDays()), 60_000);
    return () => clearInterval(id);
  }, []);

  const chars = days !== null ? String(days).split('') : [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '18px' }}>
      {/* Calendar body */}
      <div
        style={{
          borderRadius: '14px 14px 6px 6px',
          overflow: 'hidden',
          boxShadow: '0 12px 48px rgba(155,29,66,0.28), 0 2px 8px rgba(43,31,23,0.15)',
        }}
      >
        {/* Header strip with rings */}
        <div
          style={{
            background: 'linear-gradient(135deg, #a82048 0%, #7a1530 100%)',
            padding: '0 28px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Ring binders */}
          <div
            style={{
              display: 'flex',
              gap: '48px',
              marginBottom: '-2px',
              position: 'relative',
              zIndex: 2,
            }}
          >
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: '26px',
                  height: '13px',
                  border: '3px solid #d4a060',
                  borderBottom: 'none',
                  borderRadius: '13px 13px 0 0',
                  background: 'linear-gradient(to right, #b87c30 0%, #e8b860 50%, #b87c30 100%)',
                  boxShadow: 'inset 0 -2px 4px rgba(0,0,0,0.25), 0 1px 3px rgba(0,0,0,0.3)',
                }}
              />
            ))}
          </div>

          {/* Month label in header */}
          <p
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: '10px',
              letterSpacing: '0.45em',
              color: 'rgba(255,255,255,0.75)',
              textTransform: 'uppercase',
              padding: '10px 0 8px',
            }}
          >
            Ngày thứ
          </p>
        </div>

        {/* White page area */}
        <div
          style={{
            background: '#faf4ec',
            padding: '22px 32px 26px',
            minWidth: '300px',
            textAlign: 'center',
            position: 'relative',
          }}
        >
          {/* Page lines (ruled paper feel) */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage:
                'repeating-linear-gradient(to bottom, transparent 0px, transparent 30px, rgba(155,29,66,0.06) 30px, rgba(155,29,66,0.06) 31px)',
              pointerEvents: 'none',
            }}
          />

          {/* Flip digits */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              zIndex: 1,
              minHeight: '92px',
            }}
          >
            {days === null ? (
              <span style={{ fontFamily: 'Georgia, serif', fontSize: '54px', color: 'transparent' }}>
                0000
              </span>
            ) : (
              chars.map((c, i) => (
                <FlipCard key={i} char={c} delay={i * 130} />
              ))
            )}
          </div>

          {/* Bottom label */}
          <p
            style={{
              fontFamily: 'Georgia, serif',
              fontStyle: 'italic',
              fontSize: '13px',
              color: '#9b1d42',
              marginTop: '14px',
              letterSpacing: '0.05em',
              position: 'relative',
              zIndex: 1,
            }}
          >
            ngày bên nhau ♥
          </p>
        </div>

        {/* Footer strip */}
        <div
          style={{
            background: 'linear-gradient(135deg, #7a1530 0%, #5a0e22 100%)',
            padding: '7px 28px',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: '10px',
              letterSpacing: '0.38em',
              color: 'rgba(255,255,255,0.60)',
              textTransform: 'uppercase',
            }}
          >
            08 · 02 · 2021
          </p>
        </div>
      </div>

      {/* Sub-label */}
      <p
        style={{
          fontFamily: 'Georgia, serif',
          fontStyle: 'italic',
          fontSize: '13px',
          color: 'var(--ink-faint)',
          letterSpacing: '0.04em',
        }}
      >
        Gia Hưng &amp; Bích Đào
      </p>
    </div>
  );
}
