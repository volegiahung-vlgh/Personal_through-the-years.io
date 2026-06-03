interface LoveWord {
  id: number;
  text: string;
  from: string;
}

interface LoveWordsTimelineProps {
  words: LoveWord[];
}

export default function LoveWordsTimeline({ words }: LoveWordsTimelineProps) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {words.map(word => (
        <div
          key={word.id}
          className="relative rounded-2xl px-8 py-7 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, var(--bg-blush) 0%, var(--bg-cream) 100%)',
            border: '1px solid rgba(155,29,66,0.12)',
          }}
        >
          {/* Decorative opening quote */}
          <span
            aria-hidden="true"
            className="absolute font-serif select-none pointer-events-none"
            style={{
              top: '-8px',
              left: '20px',
              fontSize: '96px',
              lineHeight: 1,
              color: 'rgba(155,29,66,0.10)',
              fontStyle: 'italic',
            }}
          >
            &ldquo;
          </span>

          {/* Heart accent */}
          <span
            aria-hidden="true"
            className="absolute"
            style={{
              top: '18px',
              right: '22px',
              fontSize: '16px',
              color: 'rgba(155,29,66,0.25)',
            }}
          >
            ♥
          </span>

          {/* Text */}
          <p
            className="font-serif italic relative z-10"
            style={{
              fontSize: '17px',
              color: 'var(--ink)',
              lineHeight: '1.8',
              marginBottom: '20px',
            }}
          >
            {word.text}
          </p>

          {/* Attribution */}
          <div className="flex items-center gap-3">
            <div style={{ height: '1px', width: '28px', background: 'var(--terracotta)', opacity: 0.5 }} />
            <p
              className="font-serif uppercase"
              style={{ fontSize: '11px', color: 'var(--terracotta-deep)', letterSpacing: '0.30em' }}
            >
              {word.from}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
