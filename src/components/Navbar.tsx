'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useLanguage, type Lang } from '@/contexts/LanguageContext';
import { t } from '@/translations';

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { lang, setLang } = useLanguage();

  const tr = t(lang).nav;

  const links = [
    { href: '/',               label: tr.home },
    { href: '/story-of-love', label: tr.ourStory },
    { href: '/our-memories',  label: tr.memories },
    { href: '/about',          label: tr.about },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const heroMode = pathname === '/' && !scrolled;

  function LangToggle({ mobile = false }: { mobile?: boolean }) {
    const langs: Lang[] = ['EN', 'VI'];
    return (
      <div className="flex items-center gap-1">
        {langs.map((l, i) => (
          <span key={l} className="flex items-center gap-1">
            {i > 0 && (
              <span
                style={{
                  color: heroMode && !mobile ? 'rgba(255,255,255,0.25)' : 'var(--ink-faint)',
                  fontSize: '10px',
                }}
                aria-hidden="true"
              >
                /
              </span>
            )}
            <button
              onClick={() => setLang(l)}
              className="font-serif uppercase text-[11px] focus-visible:outline-none focus-visible:ring-2 rounded-sm focus-visible:ring-offset-1"
              style={{
                letterSpacing: '0.28em',
                color: lang === l
                  ? (heroMode && !mobile ? '#fff' : 'var(--terracotta-deep)')
                  : (heroMode && !mobile ? 'rgba(255,255,255,0.45)' : 'var(--ink-faint)'),
                fontWeight: lang === l ? 600 : 400,
                transition: 'color 0.2s ease',
                ['--tw-ring-color' as string]: heroMode && !mobile ? 'rgba(255,255,255,0.7)' : 'var(--terracotta)',
              }}
            >
              {l}
            </button>
          </span>
        ))}
      </div>
    );
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 md:px-12 py-6 transition-all duration-300"
      style={{
        background: heroMode
          ? 'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, transparent 100%)'
          : scrolled
            ? 'rgba(244,235,227,0.97)'
            : 'linear-gradient(180deg, rgba(244,235,227,0.95) 0%, rgba(244,235,227,0) 100%)',
        backdropFilter: scrolled ? 'blur(8px)' : 'blur(2px)',
        WebkitBackdropFilter: scrolled ? 'blur(8px)' : 'blur(2px)',
        boxShadow: scrolled ? '0 1px 0 rgba(43,31,23,0.08)' : 'none',
      }}
    >
      {/* Logo */}
      <Link
        href="/"
        className="font-script text-[30px] leading-none transition-colors duration-300"
        style={{ color: heroMode ? '#e8b89a' : 'var(--terracotta-deep)' }}
      >
        Together
      </Link>

      {/* Desktop nav */}
      <nav className="hidden md:flex gap-7">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="font-serif text-[12px] uppercase transition-colors duration-200 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{
              color: heroMode
                ? pathname === href ? '#fff' : 'rgba(255,255,255,0.75)'
                : pathname === href ? 'var(--terracotta-deep)' : 'var(--ink-soft)',
              letterSpacing: '0.4em',
              ['--tw-ring-color' as string]: heroMode ? 'rgba(255,255,255,0.7)' : 'var(--terracotta)',
            }}
          >
            {label}
          </Link>
        ))}
      </nav>

      {/* EN/VI toggle — desktop only */}
      <div className="hidden md:flex">
        <LangToggle />
      </div>

      {/* Hamburger — mobile only */}
      <button
        className="md:hidden p-2 -mr-2 flex flex-col gap-[5px] rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1"
        onClick={() => setMenuOpen(v => !v)}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        style={{ ['--tw-ring-color' as string]: heroMode ? 'rgba(255,255,255,0.7)' : 'var(--terracotta)' }}
      >
        <span
          className="block w-5 h-[1.5px] origin-center transition-transform duration-200"
          style={{
            background: heroMode ? '#fff' : 'var(--ink)',
            transform: menuOpen ? 'translateY(6.5px) rotate(45deg)' : 'none',
          }}
        />
        <span
          className="block w-5 h-[1.5px] transition-opacity duration-200"
          style={{ background: heroMode ? '#fff' : 'var(--ink)', opacity: menuOpen ? 0 : 1 }}
        />
        <span
          className="block w-5 h-[1.5px] origin-center transition-transform duration-200"
          style={{
            background: heroMode ? '#fff' : 'var(--ink)',
            transform: menuOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
          }}
        />
      </button>

      {/* Mobile drawer */}
      {menuOpen && (
        <div
          className="absolute top-full left-0 right-0 flex flex-col md:hidden"
          style={{
            background: 'rgba(244,235,227,0.98)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderTop: '1px solid var(--rule)',
            boxShadow: '0 8px 24px rgba(43,31,23,0.10)',
          }}
        >
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="px-8 py-5 font-serif text-[12px] uppercase border-b transition-colors duration-200 focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-2"
              style={{
                borderColor: 'var(--rule)',
                color: pathname === href ? 'var(--terracotta-deep)' : 'var(--ink-soft)',
                letterSpacing: '0.4em',
                ['--tw-ring-color' as string]: 'var(--terracotta)',
              }}
            >
              {label}
            </Link>
          ))}
          {/* Language toggle in mobile drawer */}
          <div className="px-8 py-5 flex items-center gap-3">
            <span
              className="font-serif uppercase text-[10px]"
              style={{ color: 'var(--ink-faint)', letterSpacing: '0.3em' }}
            >
              Language
            </span>
            <LangToggle mobile />
          </div>
        </div>
      )}
    </header>
  );
}
