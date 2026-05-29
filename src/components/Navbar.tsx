'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const links = [
  { href: '/',               label: 'Home' },
  { href: '/story-of-love', label: 'Our Story' },
  { href: '/about',          label: 'About' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const heroMode = pathname === '/' && !scrolled;

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
        Kept
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

      {/* Right tag — desktop only */}
      <span
        className="hidden md:block font-serif text-[12px] transition-colors duration-300"
        style={{
          color: heroMode ? 'rgba(255,255,255,0.55)' : 'var(--ink-soft)',
          letterSpacing: '0.4em',
        }}
      >
        through the years
      </span>

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
        </div>
      )}
    </header>
  );
}
