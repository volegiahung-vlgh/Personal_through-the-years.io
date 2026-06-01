interface Track {
  id: number;
  title: string;
  artist: string;
  year: number;
  note: string;
}

interface MemoriesPlaylistProps {
  tracks: Track[];
}

const NOTES = ['♩', '♪', '♫', '♬'];

export default function MemoriesPlaylist({ tracks }: MemoriesPlaylistProps) {
  return (
    <div className="space-y-3">
      {tracks.map((track, i) => (
        <div
          key={track.id}
          className="grid grid-cols-[40px_1fr_auto] gap-4 items-center rounded-2xl px-6 py-4"
          style={{
            background: 'var(--bg-cream)',
            border: '1px solid rgba(184,92,61,0.10)',
            boxShadow: '0 1px 8px rgba(43,31,23,0.05)',
          }}
        >
          {/* Musical note */}
          <span
            className="font-serif text-center select-none"
            style={{ fontSize: '22px', color: 'var(--terracotta)', opacity: 0.7 }}
            aria-hidden="true"
          >
            {NOTES[i % NOTES.length]}
          </span>

          {/* Track info */}
          <div>
            <p className="font-script leading-tight" style={{ fontSize: '22px', color: 'var(--terracotta)' }}>
              {track.title}
            </p>
            <p className="font-serif italic text-sm mt-0.5" style={{ color: 'var(--ink-soft)' }}>
              {track.artist}
            </p>
            {track.note && (
              <p className="font-serif italic mt-1.5 leading-relaxed"
                 style={{ fontSize: '14px', color: 'var(--ink-faint)', lineHeight: '1.6' }}>
                {track.note}
              </p>
            )}
          </div>

          {/* Year badge */}
          <span
            className="font-serif font-light shrink-0"
            style={{ fontSize: '13px', color: 'var(--ink-faint)', letterSpacing: '0.05em' }}
          >
            {track.year}
          </span>
        </div>
      ))}

    </div>
  );
}
