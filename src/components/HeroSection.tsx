'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface HeroSectionProps {
  photos: string[];
}

export default function HeroSection({ photos }: HeroSectionProps) {
  const [bg, setBg] = useState<string | null>(null);

  useEffect(() => {
    if (photos.length) {
      setBg(photos[Math.floor(Math.random() * photos.length)]);
    }
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center text-center px-6 overflow-hidden">

      {/* Background photo */}
      {bg && (
        <img
          src={bg}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            transform: 'scale(1.05)',
            filter: 'brightness(0.55) saturate(0.85)',
            transition: 'opacity 1s ease',
          }}
        />
      )}

      {/* Fallback when no photo yet */}
      {!bg && (
        <div className="absolute inset-0" style={{ background: 'var(--bg)' }} />
      )}

      {/* Warm gradient overlay — darker at top/bottom, lighter in centre */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(43,31,23,0.15) 0%, rgba(43,31,23,0.55) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative max-w-3xl mx-auto pt-24 pb-20">

        {/* Eyebrow */}
        <p
          className="font-serif uppercase text-[11px] mb-6"
          style={{ color: 'rgba(255,255,255,0.75)', letterSpacing: '0.42em' }}
        >
          A Life, By the Year
        </p>

        {/* Script accent */}
        <div
          className="font-script leading-none mb-4"
          style={{ fontSize: 'clamp(52px, 7vw, 88px)', color: '#e8b89a' }}
        >
          Through
        </div>

        {/* Main heading */}
        <h1
          className="font-serif font-normal italic leading-tight"
          style={{
            fontSize: 'clamp(40px, 5.5vw, 72px)',
            color: '#fff',
            letterSpacing: '-0.01em',
          }}
        >
          the years.
        </h1>

        {/* Ornament rule */}
        <div className="ornament-rule my-8" style={{ '--rule': 'rgba(255,255,255,0.25)' } as React.CSSProperties}>
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: '#e8b89a', display: 'inline-block' }}
          />
        </div>

        {/* Sub-copy */}
        <p
          className="font-serif italic leading-relaxed max-w-xl mx-auto mb-12"
          style={{ fontSize: '20px', color: 'rgba(255,255,255,0.80)', lineHeight: '1.75' }}
        >
          A quiet archive of moments worth keeping — photographs, words,
          and the small details that make up a life.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/story-of-love"
            className="inline-flex items-center gap-3 px-8 py-4 font-serif uppercase text-[12px] border transition-all duration-300"
            style={{ borderColor: 'rgba(255,255,255,0.7)', color: '#fff', letterSpacing: '0.32em' }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.15)';
              (e.currentTarget as HTMLElement).style.borderColor = '#fff';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = 'transparent';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.7)';
            }}
          >
            Our Story
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center gap-3 px-8 py-4 font-serif uppercase text-[12px] border transition-all duration-300"
            style={{ borderColor: '#e8b89a', color: '#e8b89a', letterSpacing: '0.32em' }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(232,184,154,0.15)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = 'transparent';
            }}
          >
            About
          </Link>
        </div>
      </div>
    </section>
  );
}
