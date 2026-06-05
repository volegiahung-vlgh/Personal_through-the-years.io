'use client';

import { useState, useEffect, useRef } from 'react';

// ── Thay đổi password tại đây ──────────────────────────────────
const SITE_PASSWORD = '08022021';
// ───────────────────────────────────────────────────────────────

const STORAGE_KEY = 'ttay_site_unlocked';

export default function PasswordGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState<boolean | null>(null);
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const [shaking, setShaking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setUnlocked(localStorage.getItem(STORAGE_KEY) === '1');
  }, []);

  useEffect(() => {
    if (unlocked === false) setTimeout(() => inputRef.current?.focus(), 100);
  }, [unlocked]);

  const submit = () => {
    if (input === SITE_PASSWORD) {
      localStorage.setItem(STORAGE_KEY, '1');
      setUnlocked(true);
    } else {
      setError(true);
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
    }
  };

  // Checking localStorage — render nothing to avoid flash
  if (unlocked === null) return null;

  // Already unlocked
  if (unlocked) return <>{children}</>;

  // Locked — show password gate
  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ background: 'var(--bg)' }}
    >
      {/* Subtle gradient blush accents */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 18% 78%, rgba(184,92,61,0.07) 0%, transparent 55%), radial-gradient(circle at 82% 22%, rgba(155,29,66,0.06) 0%, transparent 55%)',
        }}
        aria-hidden="true"
      />

      <div className="relative flex flex-col items-center gap-8 px-6 w-full max-w-xs">

        {/* Heart ornament */}
        <div aria-hidden="true" style={{ color: 'var(--terracotta)', opacity: 0.38 }}>
          <svg width="40" height="36" viewBox="0 0 40 36" fill="currentColor">
            <path d="M20 35S2 22.5 2 11a10 10 0 0 1 18-6 10 10 0 0 1 18 6C38 22.5 20 35 20 35Z"/>
          </svg>
        </div>

        {/* Site title */}
        <div className="text-center">
          <p
            className="font-script"
            style={{ fontSize: '50px', color: 'var(--terracotta-deep)', lineHeight: 1 }}
          >
            Through the Years
          </p>
          <p
            className="font-serif italic mt-3"
            style={{ fontSize: '13px', color: 'var(--ink-soft)', letterSpacing: '0.16em' }}
          >
            nhật ký tình yêu · riêng tư
          </p>
        </div>

        {/* Rule */}
        <div style={{ width: '36px', height: '1px', background: 'var(--rule)' }} aria-hidden="true" />

        {/* Password input */}
        <div
          className="w-full flex flex-col items-center gap-3"
          style={{ animation: shaking ? 'pwShake 0.45s ease' : 'none' }}
        >
          <input
            ref={inputRef}
            type="password"
            value={input}
            onChange={e => { setInput(e.target.value); setError(false); }}
            onKeyDown={e => e.key === 'Enter' && submit()}
            placeholder="Mật khẩu"
            className="w-full font-serif"
            style={{
              fontSize: '15px',
              padding: '12px 16px',
              borderRadius: '12px',
              border: `1.5px solid ${error ? '#c84830' : 'rgba(155,29,66,0.22)'}`,
              background: error ? 'rgba(200,72,48,0.05)' : 'rgba(155,29,66,0.03)',
              color: 'var(--ink)',
              outline: 'none',
              textAlign: 'center',
              letterSpacing: '0.24em',
              transition: 'border-color 0.2s',
            }}
          />
          {error && (
            <p className="font-serif italic" style={{ fontSize: '12px', color: '#c84830' }}>
              Mật khẩu chưa đúng ♡
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          onClick={submit}
          className="font-serif uppercase transition-opacity hover:opacity-80"
          style={{
            padding: '11px 40px',
            borderRadius: '999px',
            background: 'linear-gradient(135deg, #a82048, #721430)',
            color: '#fff',
            fontSize: '12px',
            letterSpacing: '0.30em',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(160,32,72,0.28)',
          }}
        >
          Bước vào
        </button>
      </div>
    </div>
  );
}
