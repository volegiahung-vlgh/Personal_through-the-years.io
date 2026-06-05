'use client';

import { useState, useRef, useEffect } from 'react';
import type { Moment } from '@/lib/photos';
import MomentGallery from './MomentGallery';

// ── Password cho ảnh riêng tư (đổi cùng với SITE_PASSWORD trong PasswordGate.tsx) ──
const PRIVATE_PASSWORD = '08022021';
// ─────────────────────────────────────────────────────────────────────────────────

interface Props {
  moment: Moment;
}

export default function MomentCard({ moment }: Props) {
  const [open, setOpen] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [pwInput, setPwInput] = useState('');
  const [pwError, setPwError] = useState(false);
  const [shaking, setShaking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showPw) setTimeout(() => inputRef.current?.focus(), 80);
  }, [showPw]);

  const handleClick = () => {
    if (moment.isPrivate && !unlocked) {
      setShowPw(true);
    } else {
      setOpen(true);
    }
  };

  const handlePwSubmit = () => {
    if (pwInput === PRIVATE_PASSWORD) {
      setUnlocked(true);
      setShowPw(false);
      setPwInput('');
      setPwError(false);
      setOpen(true);
    } else {
      setPwError(true);
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
    }
  };

  const closePw = () => {
    setShowPw(false);
    setPwInput('');
    setPwError(false);
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="group relative overflow-hidden rounded-xl text-left w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--terracotta)]"
        style={{ aspectRatio: '4/5', background: 'var(--bg-deep)' }}
      >
        {/* Cover photo */}
        {moment.cover && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={moment.cover}
            alt={moment.name}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            style={{
              filter: moment.isPrivate
                ? 'blur(10px) brightness(0.65) sepia(0.1) saturate(0.9)'
                : 'brightness(0.75) sepia(0.1) saturate(0.9)',
              ...(moment.isPrivate ? { transform: 'scale(1.18)' } : {}),
            }}
          />
        )}

        {/* Gradient bottom */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(20,12,8,0.80) 0%, transparent 55%)' }}
        />

        {/* Hover shimmer */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: 'rgba(184,92,61,0.12)' }}
        />

        {/* Album name & count */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <p className="font-script leading-tight mb-1"
             style={{ fontSize: '22px', color: '#fff' }}>
            {moment.name}
          </p>
          <p className="font-serif italic"
             style={{ color: 'rgba(255,255,255,0.65)', fontSize: '12px' }}>
            {moment.count} khoảnh khắc
          </p>
        </div>

        {/* Top-right icon */}
        <div
          className="absolute top-3 right-3 transition-opacity duration-300"
          style={{
            color: 'rgba(255,255,255,0.9)',
            opacity: moment.isPrivate ? 0.8 : 0.5,
          }}
        >
          {moment.isPrivate ? (
            <svg width="18" height="20" viewBox="0 0 18 20" fill="none" aria-hidden="true">
              <rect x="1" y="8" width="16" height="11" rx="2" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M4 8V5.5a5 5 0 0 1 10 0V8" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
              <circle cx="9" cy="13.5" r="1.5" fill="currentColor"/>
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true" className="group-hover:opacity-100">
              <circle cx="11" cy="11" r="9.5" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M11 7v8M7 11h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          )}
        </div>
      </button>

      {/* ── Password overlay ── */}
      {showPw && (
        <div
          className="fixed inset-0 z-[8500] flex items-center justify-center p-4"
          style={{ background: 'rgba(43,31,23,0.75)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }}
          onClick={closePw}
        >
          <div
            className="relative w-full max-w-sm rounded-2xl overflow-hidden"
            style={{
              background: 'var(--bg-cream)',
              boxShadow: '0 32px 80px rgba(0,0,0,0.45)',
              animation: 'letterReveal 0.4s cubic-bezier(0.16,1,0.3,1) forwards',
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 px-8 py-5"
              style={{ background: 'linear-gradient(135deg, #a82048 0%, #721430 100%)' }}
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                   style={{ border: '1.5px solid rgba(255,255,255,0.7)' }}>
                <svg width="13" height="14" viewBox="0 0 13 14" fill="none" aria-hidden="true">
                  <rect x="2" y="6" width="9" height="7" rx="1.5" stroke="white" strokeWidth="1.3"/>
                  <path d="M4 6V4.5a2.5 2.5 0 0 1 5 0V6" stroke="white" strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="flex flex-col leading-none gap-1">
                <span className="font-script" style={{ fontSize: '24px', color: '#fff', lineHeight: 1 }}>
                  {moment.name}
                </span>
                <span className="font-serif italic" style={{ fontSize: '11px', color: 'rgba(255,220,210,0.72)', letterSpacing: '0.18em' }}>
                  Ảnh riêng tư · nhập mật khẩu để xem
                </span>
              </div>
            </div>

            {/* Body */}
            <div className="px-8 py-8 flex flex-col items-center gap-5">
              <div
                style={{ width: '100%', animation: shaking ? 'pwShake 0.45s ease' : 'none' }}
              >
                <input
                  ref={inputRef}
                  type="password"
                  value={pwInput}
                  onChange={e => { setPwInput(e.target.value); setPwError(false); }}
                  onKeyDown={e => e.key === 'Enter' && handlePwSubmit()}
                  placeholder="Mật khẩu"
                  className="w-full font-serif"
                  style={{
                    fontSize: '15px',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: `1.5px solid ${pwError ? '#c84830' : 'rgba(155,29,66,0.25)'}`,
                    background: pwError ? 'rgba(200,72,48,0.05)' : 'rgba(155,29,66,0.04)',
                    color: 'var(--ink)',
                    outline: 'none',
                    textAlign: 'center',
                    letterSpacing: '0.2em',
                    transition: 'border-color 0.2s',
                  }}
                />
                {pwError && (
                  <p className="font-serif italic text-center mt-2" style={{ fontSize: '12px', color: '#c84830' }}>
                    Mật khẩu chưa đúng ♡
                  </p>
                )}
              </div>

              <button
                onClick={handlePwSubmit}
                className="font-serif uppercase transition-opacity hover:opacity-80"
                style={{
                  padding: '10px 32px',
                  borderRadius: '999px',
                  background: 'linear-gradient(135deg, #a82048, #721430)',
                  color: '#fff',
                  fontSize: '12px',
                  letterSpacing: '0.28em',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 16px rgba(160,32,72,0.35)',
                }}
              >
                Xem ảnh
              </button>
            </div>
          </div>
        </div>
      )}

      {open && <MomentGallery moment={moment} onClose={() => setOpen(false)} />}
    </>
  );
}
