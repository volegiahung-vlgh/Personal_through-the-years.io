interface QuoteCardProps {
  quote: string;
  author?: string;
  className?: string;
}

export default function QuoteCard({ quote, author, className = '' }: QuoteCardProps) {
  return (
    <blockquote
      className={`relative px-10 py-8 ${className}`}
      style={{
        background: 'var(--bg-cream)',
        borderLeft: '3px solid var(--terracotta)',
        boxShadow: '0 4px 24px rgba(43,31,23,0.06)',
      }}
    >
      {/* Opening quotation mark */}
      <span
        className="font-script absolute -top-4 left-6 leading-none select-none"
        style={{ fontSize: '80px', color: 'var(--peach)', lineHeight: 1 }}
        aria-hidden="true"
      >
        &ldquo;
      </span>

      <p
        className="font-serif italic leading-relaxed relative z-10"
        style={{ fontSize: '22px', color: 'var(--ink)', lineHeight: '1.75' }}
      >
        {quote}
      </p>

      {author && (
        <footer className="mt-5 flex items-center gap-3">
          <span
            className="block h-px w-8"
            style={{ background: 'var(--terracotta)' }}
          />
          <cite
            className="font-serif not-italic text-sm tracking-widest uppercase"
            style={{ color: 'var(--ink-soft)', letterSpacing: '0.2em', fontSize: '12px' }}
          >
            {author}
          </cite>
        </footer>
      )}
    </blockquote>
  );
}
