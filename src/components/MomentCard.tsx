'use client';

import { useState } from 'react';
import type { Moment } from '@/lib/photos';
import MomentGallery from './MomentGallery';

interface Props {
  moment: Moment;
}

export default function MomentCard({ moment }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group relative overflow-hidden rounded-xl text-left w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--terracotta)]"
        style={{ aspectRatio: '4/5', background: 'var(--bg-deep)' }}
      >
        {/* Cover photo */}
        {moment.cover && (
          <img
            src={moment.cover}
            alt={moment.name}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            style={{ filter: 'brightness(0.75) sepia(0.1) saturate(0.9)' }}
          />
        )}

        {/* Gradient bottom */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(20,12,8,0.75) 0%, transparent 55%)' }}
        />

        {/* Hover shimmer */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: 'rgba(184,92,61,0.12)' }}
        />

        {/* Text */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <p className="font-script leading-tight mb-1"
             style={{ fontSize: '22px', color: '#fff' }}>
            {moment.name}
          </p>
          <p className="font-serif italic text-xs"
             style={{ color: 'rgba(255,255,255,0.65)', fontSize: '12px' }}>
            {moment.count} khoảnh khắc
          </p>
        </div>

        {/* Top-right icon */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
             style={{ color: 'rgba(255,255,255,0.9)' }}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            <circle cx="11" cy="11" r="9.5" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M11 7v8M7 11h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
      </button>

      {open && <MomentGallery moment={moment} onClose={() => setOpen(false)} />}
    </>
  );
}
