'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/',               label: 'Home' },
  { href: '/story-of-love', label: 'Our Story' },
  { href: '/about',          label: 'About' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-12 py-6"
      style={{
        background: 'linear-gradient(180deg, rgba(244,235,227,0.95) 0%, rgba(244,235,227,0) 100%)',
        backdropFilter: 'blur(2px)',
        WebkitBackdropFilter: 'blur(2px)',
      }}
    >
      {/* Monogram / logo */}
      <Link
        href="/"
        className="font-script text-[30px] leading-none"
        style={{ color: 'var(--terracotta-deep)' }}
      >
        Kept
      </Link>

      {/* Nav links */}
      <nav className="hidden md:flex gap-7">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="font-serif text-[12px] tracking-wide3 uppercase transition-colors duration-200"
            style={{
              color: pathname === href ? 'var(--terracotta-deep)' : 'var(--ink-soft)',
              letterSpacing: '0.4em',
            }}
          >
            {label}
          </Link>
        ))}
      </nav>

      {/* Right tag */}
      <span
        className="font-serif text-[12px]"
        style={{ color: 'var(--ink-soft)', letterSpacing: '0.4em' }}
      >
        through the years
      </span>
    </header>
  );
}
