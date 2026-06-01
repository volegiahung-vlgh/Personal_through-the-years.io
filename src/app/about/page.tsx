import QuoteCard from '@/components/QuoteCard';

export const metadata = {
  title: 'About · Through the Years',
  description: 'A little about this archive and the people behind it.',
};

export default function AboutPage() {
  return (
    <div style={{ background: 'var(--bg)' }} className="min-h-screen">
      {/* ── Page header ─────────────────────────────────────── */}
      <section className="pt-48 pb-16 text-center px-6">
        <p
          className="font-serif uppercase mb-4"
          style={{ color: 'var(--ink-faint)', letterSpacing: '0.42em', fontSize: '11px' }}
        >
          The archive
        </p>
        <div
          className="font-script leading-none mb-3"
          style={{ fontSize: '56px', color: 'var(--terracotta)' }}
        >
          About
        </div>
        <h1
          className="font-serif italic font-light"
          style={{ fontSize: 'clamp(32px, 4.6vw, 58px)', color: 'var(--ink)' }}
        >
          this little corner.
        </h1>
        <div className="ornament-rule mt-8 max-w-xs mx-auto">
          <span
            className="w-[5px] h-[5px] rounded-full inline-block"
            style={{ background: 'var(--terracotta)' }}
          />
        </div>
      </section>

      {/* ── Body content ────────────────────────────────────── */}
      <section className="pb-32 px-6">
        <div className="max-w-2xl mx-auto space-y-10">
          <p
            className="font-serif italic leading-relaxed"
            style={{ fontSize: '21px', color: 'var(--ink-soft)', lineHeight: '1.8' }}
          >
            <em>Kept</em> is a personal memory archive — a quiet place to collect the years as they pass.
            No algorithm, no feed, no performance. Just photographs, words, and the honest record
            of an ordinary life lived with intention.
          </p>

          <hr className="section-divider" />

          <div>
            <h2
              className="font-script mb-4"
              style={{ fontSize: '42px', color: 'var(--terracotta)' }}
            >
              Why
            </h2>
            <p
              className="font-serif leading-relaxed"
              style={{ fontSize: '18px', color: 'var(--ink-soft)', lineHeight: '1.8' }}
            >
              Because the years have a way of blurring together. Because we forget the small
              details — what the light looked like that afternoon, what song was playing, what we
              said to each other when nobody else was listening. This site exists to slow that
              forgetting down.
            </p>
          </div>

          <QuoteCard
            quote="The present moment always will have been."
            author="a reason to keep records"
          />

          <div>
            <h2
              className="font-script mb-4"
              style={{ fontSize: '42px', color: 'var(--terracotta)' }}
            >
              Chúng mình
            </h2>
            <p
              className="font-serif leading-relaxed"
              style={{ fontSize: '18px', color: 'var(--ink-soft)', lineHeight: '1.8' }}
            >
              Gia Hưng & Bích Đào — hai người bắt đầu từ những chuyến đi ngắn,
              những bữa ăn muộn, và rất nhiều tiếng cười. Trang này là nơi lưu lại
              tất cả những điều nhỏ nhặt mà thời gian hay làm mờ đi.
            </p>
          </div>

          <hr className="section-divider" />

          <p
            className="font-serif italic text-center"
            style={{ fontSize: '17px', color: 'var(--ink-faint)' }}
          >
            Built with love, kept with care.
          </p>
        </div>
      </section>
    </div>
  );
}
