export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden py-12"
      style={{ background: 'var(--terracotta-deep)', color: 'var(--bg-cream)' }}
    >
      {/* Subtle texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.3'/></svg>\")",
          opacity: 0.18,
          mixBlendMode: 'overlay',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-12 text-center">
        {/* Ornament */}
        <div
          className="font-script leading-none mb-2"
          style={{ fontSize: '48px', color: 'var(--peach)' }}
        >
          ~ &nbsp;♡&nbsp; ~
        </div>

        {/* Name / title */}
        <div
          className="font-script leading-tight mb-3"
          style={{ fontSize: '40px', color: 'var(--bg-cream)' }}
        >
          Kept
        </div>

        {/* Tagline */}
        <p
          className="font-serif uppercase text-[11px]"
          style={{ color: 'rgba(250,244,236,0.6)', letterSpacing: '0.4em' }}
        >
          a place for the moments worth keeping
        </p>

        {/* Divider */}
        <hr
          className="my-6 border-0 border-t"
          style={{ borderColor: 'rgba(250,244,236,0.15)' }}
        />

        <p
          className="font-serif text-[11px]"
          style={{ color: 'rgba(250,244,236,0.4)', letterSpacing: '0.2em' }}
        >
          &copy; {new Date().getFullYear()} · made with love
        </p>
      </div>
    </footer>
  );
}
