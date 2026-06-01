interface Place {
  id: number;
  name: string;
  region: string;
  year: number;
  emoji: string;
  note: string;
}

interface MemoriesMapProps {
  places: Place[];
}

export default function MemoriesMap({ places }: MemoriesMapProps) {
  const sorted = [...places].sort((a, b) => a.year - b.year);

  return (
    <div className="space-y-4">
      {sorted.map((place, i) => (
        <div
          key={place.id}
          className="grid sm:grid-cols-[auto_1fr] gap-4 items-start rounded-2xl px-6 py-5"
          style={{
            background: 'var(--bg-cream)',
            border: '1px solid rgba(184,92,61,0.12)',
            boxShadow: '0 2px 12px rgba(43,31,23,0.05)',
          }}
        >
          {/* Pin number */}
          <div
            className="flex items-center justify-center shrink-0 rounded-full font-serif font-light"
            style={{
              width: '44px',
              height: '44px',
              background: 'var(--terracotta)',
              color: '#fff',
              fontSize: '18px',
              letterSpacing: '-0.02em',
            }}
          >
            {i + 1}
          </div>

          {/* Content */}
          <div>
            <div className="flex items-baseline gap-3 flex-wrap">
              <span className="font-script" style={{ fontSize: '26px', color: 'var(--terracotta)', lineHeight: 1.1 }}>
                {place.name}
              </span>
              <span className="font-serif italic text-sm" style={{ color: 'var(--ink-faint)' }}>
                {place.region}
              </span>
              <span
                className="font-serif uppercase text-[10px] tracking-widest px-2 py-0.5 rounded-full"
                style={{
                  background: 'rgba(184,92,61,0.1)',
                  color: 'var(--terracotta-deep)',
                  letterSpacing: '0.22em',
                }}
              >
                {place.year}
              </span>
            </div>
            <p className="font-serif italic mt-2 leading-relaxed"
               style={{ fontSize: '16px', color: 'var(--ink-soft)', lineHeight: '1.7' }}>
              {place.note}
            </p>
          </div>

          {/* Emoji */}
          <div
            className="hidden sm:flex items-center justify-center sm:col-start-1 sm:row-start-1 sm:hidden"
            aria-hidden="true"
          />
        </div>
      ))}

      {/* Add-more hint */}
      <p
        className="font-serif italic text-center pt-2"
        style={{ fontSize: '13px', color: 'var(--ink-faint)', letterSpacing: '0.02em' }}
      >
        Thêm địa điểm mới trong{' '}
        <code
          className="font-mono not-italic px-1 rounded"
          style={{ fontSize: '12px', background: 'rgba(43,31,23,0.07)' }}
        >
          src/content/our-memories/places.json
        </code>
      </p>
    </div>
  );
}
