'use client';

import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/translations';

// ── Password (đổi chuỗi này thành password bạn muốn) ──────────
const LETTER_PASSWORD = '0123456789';
// ─────────────────────────────────────────────────────────────

// ── Edit your letter here ─────────────────────────────────────
const LETTER_DATE = 'TP. Hồ Chí Minh, 05 · 06 · 2026';

const LETTER_PARAGRAPHS = [
  'Gửi em,',
  'Anh không giỏi viết mấy thứ này, em biết mà. Nhưng có vài điều anh muốn để lại đây, để khi nào em muốn đọc cũng thấy.',
  'Thật ra lúc đầu anh đổ em trước. Cứ thấy em là trong đầu nghĩ đến, rồi tự nhiên thành ra cứ muốn ở gần, muốn theo em. Anh không tính toán gì nhiều đâu — chỉ là đi theo cái cảm giác đó thôi và cũng từ đó mối tình nên duyên và nó dẫn chúng ta đến tận đây lúc này.',
  'Mình không có kỷ niệm gì kiểu để kể cho người ta nghe rồi trầm trồ. Anh nghĩ mãi cũng không ra "khoảnh khắc lớn" nào. Cái anh nhớ là những thứ nhỏ: người này làm cái này cái kia thì người kia ngồi cạnh và ngược lại, ngày trôi qua bình thường vậy thôi. Mà lạ, mấy ngày bình thường đó lại là thứ anh thấy yên bình nhất.',
  'Cơ mà cũng không vì vậy mà thời gian trôi qua cũng chỉ toàn là yên bình, cũng có những ngày mệt mỏi, có lúc giận nhau, có lúc anh làm em buồn mà chính anh cũng chẳng biết sửa sao cho đúng. Nhưng mà nói chung là anh chẳng hề ghét gì việc đó vì anh hiểu rằng mọi hờn giận đều đến từ những kỳ vọng ta ghép cho nhau.',
  'Anh không hứa sẽ làm em vui mỗi ngày, anh cũng không biết mình làm được hay không. Vì cuộc sống có lúc vui có lúc buồn mà. Nhưng anh vẫn ở đây, kể cả những ngày khó. Em mệt thì có anh, anh mệt thì anh tin có em.',
  'Sắp tới mình về chung một nhà. Anh hơi lo thật. Nhưng lo cùng em thì anh thấy ổn.',
  'Cảm ơn em đã để anh đi cùng.',
  'Yêu em,\nVõ Lê Gia Hưng',
];
// ─────────────────────────────────────────────────────────────

const HEARTS = [
  { top: '18%', left: '8%',  size: 18, opacity: 0.55 },
  { top: '72%', left: '5%',  size: 22, opacity: 0.45 },
  { top: '30%', left: '88%', size: 26, opacity: 0.50 },
  { top: '65%', left: '84%', size: 16, opacity: 0.40 },
  { top: '80%', left: '22%', size: 14, opacity: 0.35 },
  { top: '12%', left: '75%', size: 20, opacity: 0.50 },
];

export default function LoveLetter() {
  const [open, setOpen]           = useState(false);
  const [pulse, setPulse]         = useState(false);
  const [atBottom, setAtBottom]   = useState(false);
  const [unlocked, setUnlocked]   = useState(false);
  const [showPw, setShowPw]       = useState(false);
  const [pwInput, setPwInput]     = useState('');
  const [pwError, setPwError]     = useState(false);
  const [shaking, setShaking]     = useState(false);
  const scrollRef  = useRef<HTMLDivElement>(null);
  const inputRef   = useRef<HTMLInputElement>(null);
  const { lang } = useLanguage();
  const tr = t(lang).letter;

  const handleOpen = () => {
    setPulse(true);
    setTimeout(() => {
      setPulse(false);
      if (unlocked) {
        setOpen(true);
      } else {
        setShowPw(true);
      }
    }, 380);
  };

  const handlePwSubmit = () => {
    if (pwInput === LETTER_PASSWORD) {
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

  const handleClose = () => setOpen(false);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setAtBottom(el.scrollTop + el.clientHeight >= el.scrollHeight - 12);
  };

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    if (open) {
      const el = scrollRef.current;
      if (el) setAtBottom(el.scrollHeight <= el.clientHeight);
    }
  }, [open]);

  useEffect(() => {
    if (showPw) setTimeout(() => inputRef.current?.focus(), 80);
  }, [showPw]);

  return (
    <>
      {/* ── Closed card ─────────────────────────────────── */}
      <div className="relative flex flex-col items-center">

        {/* Floating hearts */}
        {HEARTS.map((h, i) => (
          <span
            key={i}
            className="absolute pointer-events-none select-none"
            style={{ top: h.top, left: h.left, fontSize: h.size, opacity: h.opacity, color: '#9b1d42' }}
            aria-hidden="true"
          >
            ♥
          </span>
        ))}

        <button
          onClick={handleOpen}
          className="group relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--terracotta)] focus-visible:ring-offset-4 rounded-2xl"
          style={{
            transform: pulse ? 'scale(0.93)' : 'scale(1)',
            transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1)',
          }}
          aria-label="Open love letter"
        >
          {/* Back envelope shadow */}
          <div
            aria-hidden="true"
            className="absolute"
            style={{
              inset: 0,
              background: 'linear-gradient(145deg, #c07888, #a05868)',
              borderRadius: '12px',
              transform: 'translateY(-8px) translateX(7px)',
              zIndex: 0,
              boxShadow: '0 4px 20px rgba(160,70,90,0.40)',
            }}
          />

          {/* Envelope card */}
          <div
            className="relative z-10 overflow-hidden"
            style={{
              width: '300px',
              height: '200px',
              borderRadius: '12px',
              boxShadow: '0 12px 40px rgba(160,60,80,0.38)',
              transition: 'box-shadow 0.3s ease',
            }}
          >
            {/* Envelope SVG */}
            <svg viewBox="0 0 300 200" width="300" height="200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <defs>
                {/* Gem heart — pearl/crystal gradient */}
                <linearGradient id="ll-gem" x1="0.15" y1="0" x2="0.85" y2="1">
                  <stop offset="0%"   stopColor="#ffffff"/>
                  <stop offset="25%"  stopColor="#fff4f0"/>
                  <stop offset="58%"  stopColor="#ffd0c4"/>
                  <stop offset="100%" stopColor="#f4a090"/>
                </linearGradient>
              </defs>

              {/* ── Envelope body (solid) ── */}
              <rect width="300" height="200" rx="10" fill="#d47890"/>
              {/* Coral border */}
              <rect x="1.5" y="1.5" width="297" height="197" rx="9"
                    fill="none" stroke="#c84830" strokeWidth="3.5"/>

              {/* Fold crease lines */}
              <line x1="0"   y1="200" x2="150" y2="118" stroke="rgba(140,40,40,0.22)" strokeWidth="1"/>
              <line x1="300" y1="200" x2="150" y2="118" stroke="rgba(140,40,40,0.22)" strokeWidth="1"/>
              <line x1="0"   y1="0"   x2="150" y2="88"  stroke="rgba(0,0,0,0.07)"     strokeWidth="0.6"/>
              <line x1="300" y1="0"   x2="150" y2="88"  stroke="rgba(0,0,0,0.07)"     strokeWidth="0.6"/>

              {/* ── Top flap (solid, lighter pink) ── */}
              {/* Flap depth shadow */}
              <polygon points="0,0 300,0 150,91" fill="rgba(160,50,60,0.18)"/>
              {/* Flap fill */}
              <polygon points="0,0 300,0 150,88" fill="#f0b8c4"/>
              {/* Inner fold (lighter inner triangle for depth) */}
              <polygon points="18,0 282,0 150,74" fill="rgba(255,255,255,0.10)"/>
              {/* Flap V-edge */}
              <polyline points="0,0 150,88 300,0" fill="none" stroke="#c84830" strokeWidth="1.6"/>

              {/* ── Crystal gem heart at fold point ── */}
              {/* Soft drop shadow */}
              <path
                d="M150,117 C149,114 135,108 135,99 a8,8 0 0,1 15,0 a8,8 0 0,1 15,0 C165,108 151,114 150,117z"
                fill="rgba(180,50,50,0.28)" transform="translate(2,3)"/>
              {/* Crystal fill */}
              <path
                d="M150,117 C149,114 135,108 135,99 a8,8 0 0,1 15,0 a8,8 0 0,1 15,0 C165,108 151,114 150,117z"
                fill="url(#ll-gem)"/>
              {/* Heart outline */}
              <path
                d="M150,117 C149,114 135,108 135,99 a8,8 0 0,1 15,0 a8,8 0 0,1 15,0 C165,108 151,114 150,117z"
                fill="none" stroke="#c84830" strokeWidth="1.8"
                strokeLinecap="round" strokeLinejoin="round"/>

              {/* Facet lines (diamond-cut look) */}
              <line x1="150" y1="117" x2="150" y2="99.5" stroke="rgba(255,255,255,0.65)" strokeWidth="0.7"/>
              <line x1="150" y1="117" x2="135" y2="99.5" stroke="rgba(255,255,255,0.52)" strokeWidth="0.65"/>
              <line x1="150" y1="117" x2="165" y2="99.5" stroke="rgba(255,255,255,0.52)" strokeWidth="0.65"/>
              <line x1="135" y1="99.5" x2="165" y2="99.5" stroke="rgba(255,255,255,0.48)" strokeWidth="0.60"/>
              <line x1="135" y1="99.5" x2="143" y2="92"   stroke="rgba(255,255,255,0.42)" strokeWidth="0.55"/>
              <line x1="150" y1="99.5" x2="143" y2="92"   stroke="rgba(255,255,255,0.38)" strokeWidth="0.50"/>
              <line x1="165" y1="99.5" x2="157" y2="92"   stroke="rgba(255,255,255,0.42)" strokeWidth="0.55"/>
              <line x1="150" y1="99.5" x2="157" y2="92"   stroke="rgba(255,255,255,0.38)" strokeWidth="0.50"/>

              {/* Specular highlights */}
              <ellipse cx="142" cy="95" rx="5"   ry="3.2" fill="rgba(255,255,255,0.88)" transform="rotate(-22,142,95)"/>
              <ellipse cx="156" cy="92.5" rx="2.5" ry="1.5" fill="rgba(255,255,255,0.72)"/>
            </svg>

            {/* Hover indicator */}
            <div
              className="absolute inset-x-0 bottom-0 flex justify-center pb-[14px] opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0 pointer-events-none"
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(180,50,60,0.72)',
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
                borderRadius: '999px',
                padding: '5px 12px 5px 9px',
              }}>
                <svg width="15" height="12" viewBox="0 0 15 12" fill="none" aria-hidden="true">
                  <rect x="0.75" y="3.25" width="13.5" height="8" rx="1.5" stroke="rgba(255,255,255,0.90)" strokeWidth="1.2"/>
                  <path d="M1 3.75l6.5 4.5 6.5-4.5" stroke="rgba(255,255,255,0.90)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.92)', fontFamily: 'var(--font-cormorant), Georgia, serif', letterSpacing: '0.28em', textTransform: 'uppercase' }}>
                  {tr.clickToOpen}
                </span>
              </div>
            </div>
          </div>
        </button>

        <p
          className="mt-5 font-serif uppercase text-[12px]"
          style={{ color: 'var(--terracotta-deep)', letterSpacing: '0.38em' }}
        >
          {tr.clickToOpen}
        </p>
      </div>

      {/* ── Password overlay ────────────────────────────── */}
      {showPw && (
        <div
          className="fixed inset-0 z-[8500] flex items-center justify-center p-4"
          style={{ background: 'rgba(43,31,23,0.75)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }}
          onClick={() => { setShowPw(false); setPwInput(''); setPwError(false); }}
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
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                style={{ border: '1.5px solid rgba(255,255,255,0.7)' }}
              >
                <svg width="13" height="14" viewBox="0 0 13 14" fill="white" aria-hidden="true">
                  <rect x="2" y="6" width="9" height="7" rx="1.5" stroke="white" strokeWidth="1.3" fill="none"/>
                  <path d="M4 6V4.5a2.5 2.5 0 0 1 5 0V6" stroke="white" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="flex flex-col leading-none gap-1">
                <span className="font-script" style={{ fontSize: '26px', color: '#fff', lineHeight: 1 }}>
                  Lá thư riêng
                </span>
                <span className="font-serif italic" style={{ fontSize: '11px', color: 'rgba(255,220,210,0.72)', letterSpacing: '0.18em' }}>
                  Gửi · Bích Đào
                </span>
              </div>
            </div>

            {/* Body */}
            <div className="px-8 py-8 flex flex-col items-center gap-5">
              <p className="font-serif italic text-center" style={{ fontSize: '14px', color: 'var(--ink-soft)', lineHeight: '1.7' }}>
                Lá thư này chỉ dành cho một người.<br />Nhập mật khẩu để mở.
              </p>

              {/* Input + shake */}
              <div
                style={{
                  width: '100%',
                  animation: shaking ? 'pwShake 0.45s ease' : 'none',
                }}
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
                    transition: 'border-color 0.2s',
                    textAlign: 'center',
                    letterSpacing: '0.2em',
                  }}
                />
                {pwError && (
                  <p className="font-serif italic text-center mt-2" style={{ fontSize: '12px', color: '#c84830' }}>
                    Mật khẩu không đúng rồi ♡
                  </p>
                )}
              </div>

              <button
                onClick={handlePwSubmit}
                className="font-serif uppercase"
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
                  transition: 'opacity 0.2s',
                }}
              >
                Mở thư
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Open letter overlay ──────────────────────────── */}
      {open && (
        <div
          className="fixed inset-0 z-[8500] flex items-center justify-center p-4 sm:p-10"
          style={{ background: 'rgba(43,31,23,0.70)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }}
          onClick={handleClose}
        >
          <div
            className="relative w-full max-w-xl rounded-2xl overflow-hidden flex flex-col"
            style={{
              background: 'var(--bg-cream)',
              boxShadow: '0 32px 80px rgba(0,0,0,0.45)',
              maxHeight: '88vh',
              animation: 'letterReveal 0.5s cubic-bezier(0.16,1,0.3,1) forwards',
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-8 py-5 shrink-0"
              style={{ background: 'linear-gradient(135deg, #a82048 0%, #721430 100%)' }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                  style={{ border: '1.5px solid rgba(255,255,255,0.7)' }}
                >
                  <svg width="13" height="12" viewBox="0 0 13 12" fill="white" aria-hidden="true">
                    <path d="M6.5 11S1 7.5 1 4a2.9 2.9 0 0 1 5.5-1.3A2.9 2.9 0 0 1 12 4c0 3.5-5.5 7-5.5 7Z"/>
                  </svg>
                </div>
                <div className="flex flex-col leading-none gap-1">
                  <span className="font-script" style={{ fontSize: '30px', color: '#fff', lineHeight: 1 }}>
                    {tr.title}
                  </span>
                  <span
                    className="font-serif italic"
                    style={{ fontSize: '11px', color: 'rgba(255,220,210,0.72)', letterSpacing: '0.18em' }}
                  >
                    Gửi · Bích Đào
                  </span>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="flex items-center gap-1 font-serif uppercase text-[11px] tracking-widest transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
                style={{ color: 'rgba(255,255,255,0.80)', letterSpacing: '0.2em' }}
              >
                <span>{tr.close}</span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            {/* Scrollable letter body */}
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="letter-scroll overflow-y-auto flex-1 px-8 sm:px-12"
              style={{
                scrollBehavior: 'smooth',
                paddingTop: '32px',
                paddingBottom: '32px',
                backgroundImage: 'repeating-linear-gradient(to bottom, transparent 0px, transparent 31px, rgba(155,29,66,0.08) 31px, rgba(155,29,66,0.08) 32px)',
                backgroundSize: '100% 32px',
                backgroundAttachment: 'local',
              }}
            >
              {/* Top ornament — exactly 32px so first text aligns on the next rule */}
              <div
                className="text-center"
                style={{ height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                aria-hidden="true"
              >
                <span className="font-script" style={{ fontSize: '22px', color: 'var(--terracotta)', opacity: 0.55 }}>
                  ~ ♡ ~
                </span>
              </div>

              {/* Paragraphs — all locked to 32px grid */}
              <div>
                {/* Date — top right, classic letter format */}
                <p
                  className="font-serif italic"
                  style={{
                    fontSize: '13px',
                    lineHeight: '32px',
                    marginBottom: '32px',
                    textAlign: 'right',
                    color: 'var(--ink-faint)',
                    letterSpacing: '0.04em',
                  }}
                >
                  {LETTER_DATE}
                </p>

                {LETTER_PARAGRAPHS.map((para, i) => {
                  const isFirst = i === 0;
                  const isLast  = i === LETTER_PARAGRAPHS.length - 1;
                  return (
                    <p
                      key={i}
                      className="font-serif"
                      style={{
                        fontSize:     isFirst ? '19px' : '15.5px',
                        fontStyle:    'italic',
                        fontWeight:   isFirst ? 500 : 400,
                        lineHeight:   '32px',
                        marginBottom: '32px',
                        color:        isFirst ? 'var(--terracotta-deep)' : 'var(--ink)',
                        whiteSpace:   'pre-line',
                        textAlign:    isLast ? 'right' : 'left',
                      }}
                    >
                      {para}
                    </p>
                  );
                })}
              </div>

            </div>

            {/* Scroll-hint fade — disappears at bottom */}
            <div
              className="absolute bottom-0 left-0 right-0 h-14 pointer-events-none transition-opacity duration-300"
              style={{
                background: 'linear-gradient(to top, var(--bg-cream) 10%, transparent)',
                opacity: atBottom ? 0 : 1,
              }}
              aria-hidden="true"
            />
          </div>
        </div>
      )}
    </>
  );
}
