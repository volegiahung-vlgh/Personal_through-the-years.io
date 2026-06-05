interface Track {
  id: number;
  title: string;
  artist: string;
  year: number;
  note: string;
  youtubeId?: string;
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
            <div className="flex items-center gap-2">
              <p className="font-script leading-tight" style={{ fontSize: '22px', color: 'var(--terracotta)' }}>
                {track.title}
              </p>
              {track.youtubeId && (
                <a
                  href={`https://www.youtube.com/watch?v=${track.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Nghe ${track.title} trên YouTube`}
                  style={{ color: 'var(--terracotta)', opacity: 0.5, lineHeight: 1 }}
                  className="transition-opacity hover:opacity-100"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              )}
            </div>
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
