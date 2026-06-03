'use client';

import { useEffect, useState } from 'react';

interface Heart {
  id: number;
  x: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
  char: string;
}

const HEART_CHARS = ['♥', '♡', '❤', '💕', '💗', '💓', '💖', '💝'];

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Skip if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const batch: Heart[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: rand(2, 98),
      size: rand(14, 36),
      delay: rand(0, 1),        // tight burst — all appear within 1s
      duration: rand(3.5, 6),
      opacity: rand(0.5, 1),
      char: HEART_CHARS[Math.floor(Math.random() * HEART_CHARS.length)],
    }));
    setHearts(batch);

    const maxLifetime = Math.max(...batch.map(h => h.delay + h.duration)) * 1000 + 300;
    const t = setTimeout(() => setDone(true), maxLifetime);
    return () => clearTimeout(t);
  }, []);

  if (done || hearts.length === 0) return null;

  return (
    <>
      <style>{`
        @keyframes floatHeart {
          0%   { transform: translateY(0) scale(1) rotate(0deg); opacity: var(--ho); }
          30%  { transform: translateY(-30vh) scale(1.1) rotate(-8deg); opacity: var(--ho); }
          70%  { transform: translateY(-70vh) scale(0.9) rotate(6deg); opacity: calc(var(--ho) * 0.6); }
          100% { transform: translateY(-105vh) scale(0.7) rotate(-4deg); opacity: 0; }
        }
        .heart-particle {
          position: fixed;
          bottom: -40px;
          pointer-events: none;
          z-index: 10000;
          animation: floatHeart var(--dur) ease-in var(--delay) forwards;
          font-family: serif;
          line-height: 1;
          user-select: none;
        }
      `}</style>

      {hearts.map(h => (
        <span
          key={h.id}
          className="heart-particle"
          style={{
            left: `${h.x}%`,
            fontSize: `${h.size}px`,
            color: `hsl(${rand(340, 360)}, ${rand(70, 100)}%, ${rand(55, 75)}%)`,
            ['--ho' as string]: h.opacity,
            ['--dur' as string]: `${h.duration}s`,
            ['--delay' as string]: `${h.delay}s`,
          }}
          aria-hidden="true"
        >
          {h.char}
        </span>
      ))}
    </>
  );
}
