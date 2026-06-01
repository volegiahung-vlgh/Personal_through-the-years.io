import FloatingHearts from '@/components/FloatingHearts';
import FoodTimeline from '@/components/FoodTimeline';
import LoveWordsTimeline from '@/components/LoveWordsTimeline';
import MemoriesMap from '@/components/MemoriesMap';
import MemoriesPlaylist from '@/components/MemoriesPlaylist';
import foodData from '@/content/our-memories/food.json';
import loveWordsData from '@/content/our-memories/love-words.json';
import placesData from '@/content/our-memories/places.json';
import playlistData from '@/content/our-memories/playlist.json';
import { getLovePhotos } from '@/lib/photos';

export const metadata = {
  title: 'Kỷ Niệm · Through the Years',
  description: 'Những món ngon, những lời thương, những nơi đã đến và những bản nhạc đã nghe.',
};

export default function OurMemoriesPage() {
  const lovePhotos = getLovePhotos();
  return (
    <div style={{ background: 'var(--bg)' }} className="min-h-screen">
      <FloatingHearts />

      {/* ── Page header ─────────────────────────────────────── */}
      <section className="pt-48 pb-16 text-center px-6">
        <p
          className="font-serif uppercase mb-4"
          style={{ color: 'var(--ink-faint)', letterSpacing: '0.42em', fontSize: '11px' }}
        >
          Góc nhỏ của chúng mình
        </p>

        <div
          className="font-script leading-none mb-3"
          style={{ fontSize: 'clamp(52px, 7vw, 84px)', color: 'var(--terracotta)' }}
        >
          Kỷ Niệm
        </div>

        <h1
          className="font-serif italic font-light"
          style={{
            fontSize: 'clamp(24px, 3.5vw, 46px)',
            color: 'var(--ink)',
            letterSpacing: '-0.01em',
          }}
        >
          những nơi đã đến, những điều đã nghe & những lời thương.
        </h1>

        <div className="ornament-rule mt-8 max-w-xs mx-auto">
          <span
            className="w-[5px] h-[5px] rounded-full inline-block"
            style={{ background: 'var(--terracotta)' }}
          />
        </div>

        <p
          className="font-serif italic mt-8 max-w-xl mx-auto"
          style={{ fontSize: '18px', color: 'var(--ink-soft)', lineHeight: '1.8' }}
        >
          Những tô phở sáng sớm, những chuyến đi xa, những bản nhạc cũ —
          và tất cả những điều anh chưa kịp nói.
        </p>

        {/* Jump anchors */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mt-10">
          {[
            { href: '#ban-do', label: 'Những Nơi Đã Đến' },
            { href: '#nhac', label: 'Âm Nhạc' },
            { href: '#mon-ngon', label: 'Những Món Ngon' },
            { href: '#loi-thuong', label: 'Những Lời Thương' },
          ].map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="font-serif uppercase text-[11px] pb-1"
              style={{ color: 'var(--terracotta-deep)', letterSpacing: '0.35em', borderBottom: '1px solid var(--terracotta)' }}
            >
              {label} ↓
            </a>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════ */}
      {/* ── Section 1 : Bản đồ ──────────────────────────────── */}
      {/* ══════════════════════════════════════════════════════ */}
      <section id="ban-do" className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <SectionTitle eyebrow="Hành trình" title="Những Nơi Đã Đến" />
          <p
            className="font-serif italic text-center mb-12"
            style={{ fontSize: '16px', color: 'var(--ink-soft)', maxWidth: '460px', margin: '12px auto 48px' }}
          >
            Mỗi chuyến đi là một trang mới —
            những nơi bọn mình đã cùng nhau đặt chân đến.
          </p>
          <MemoriesMap places={placesData} />
        </div>
      </section>

      {/* Divider */}
      <Divider />

      {/* ══════════════════════════════════════════════════════ */}
      {/* ── Section 2 : Âm nhạc ─────────────────────────────── */}
      {/* ══════════════════════════════════════════════════════ */}
      <section id="nhac" className="py-20 px-6">
        <div className="max-w-2xl mx-auto">
          <SectionTitle eyebrow="Những bản nhạc" title="Âm Nhạc" />
          <p
            className="font-serif italic text-center mb-12"
            style={{ fontSize: '16px', color: 'var(--ink-soft)', maxWidth: '460px', margin: '12px auto 48px' }}
          >
            Những bài hát đánh dấu từng giai đoạn —
            nghe lại là nhớ ngay.
          </p>
          <MemoriesPlaylist tracks={playlistData} />
        </div>
      </section>

      {/* Divider */}
      <Divider />

      {/* ══════════════════════════════════════════════════════ */}
      {/* ── Section 3 : Những Món Ngon ──────────────────────── */}
      {/* ══════════════════════════════════════════════════════ */}
      <section id="mon-ngon" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionTitle eyebrow="Nhật ký ẩm thực" title="Những Món Ngon" />
          <p
            className="font-serif italic text-center mb-12"
            style={{ fontSize: '16px', color: 'var(--ink-soft)', maxWidth: '480px', margin: '12px auto 48px' }}
          >
            Từ tô phở sáng sớm đến bữa tối kỷ niệm —
            những món ăn cứ thế trở thành ký ức.
          </p>
          <FoodTimeline dishes={foodData} />
        </div>
      </section>

      {/* Divider band */}
      <Divider />

      {/* ══════════════════════════════════════════════════════ */}
      {/* ── Section 4 : Những Lời Thương ────────────────────── */}
      {/* ══════════════════════════════════════════════════════ */}
      <section id="loi-thuong" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <SectionTitle eyebrow="Từ trái tim anh" title="Những Lời Thương" />
          <p
            className="font-serif italic text-center mb-12"
            style={{ fontSize: '16px', color: 'var(--ink-soft)', maxWidth: '480px', margin: '12px auto 48px' }}
          >
            Những điều anh muốn nói với em —
            giữ lại đây, để không bao giờ quên.
          </p>

          {lovePhotos.length > 0 && (
            <div className="mb-12">
              <p className="font-serif uppercase text-center mb-6"
                 style={{ fontSize: '11px', color: 'var(--ink-faint)', letterSpacing: '0.38em' }}>
                Khoảnh khắc
              </p>
              <div className="columns-2 sm:columns-3 gap-4 space-y-4">
                {lovePhotos.map((src, i) => (
                  <div key={i} className="break-inside-avoid overflow-hidden rounded-2xl"
                       style={{ border: '1px solid rgba(155,29,66,0.10)' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt={`Khoảnh khắc ${i + 1}`}
                      loading="lazy"
                      className="w-full h-auto block"
                      style={{ filter: 'sepia(0.08) saturate(0.95)' }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <LoveWordsTimeline words={loveWordsData} />
        </div>
      </section>

      {/* ── Footer ornament ─────────────────────────────────── */}
      <section className="py-24 text-center px-6" style={{ background: 'var(--bg-cream)' }}>
        <div className="font-script mb-4" style={{ fontSize: '52px', color: 'var(--terracotta)' }}>
          Mãi mãi
        </div>
        <p
          className="font-serif italic"
          style={{ fontSize: '18px', color: 'var(--ink-soft)', maxWidth: '380px', margin: '0 auto', lineHeight: '1.8' }}
        >
          Mãi mãi là khoảng thời gian rất dài.
          Nhưng với em, anh muốn thử.
        </p>
        <p className="font-serif mt-5 uppercase" style={{ fontSize: '12px', color: 'var(--ink-faint)', letterSpacing: '0.38em' }}>
          — Gia Hưng ♥ Bích Đào —
        </p>
      </section>
    </div>
  );
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="flex items-center gap-6 mb-4">
      <div style={{ flex: 1, height: '1px', background: 'var(--rule)' }} />
      <div className="text-center shrink-0">
        <p className="font-serif uppercase" style={{ fontSize: '11px', color: 'var(--ink-faint)', letterSpacing: '0.42em' }}>
          {eyebrow}
        </p>
        <div className="font-script mt-1" style={{ fontSize: '42px', color: 'var(--terracotta)', lineHeight: 1.1 }}>
          {title}
        </div>
      </div>
      <div style={{ flex: 1, height: '1px', background: 'var(--rule)' }} />
    </div>
  );
}

function Divider() {
  return (
    <div className="py-14 text-center" style={{ background: 'var(--bg-cream)' }}>
      <span className="font-script" style={{ fontSize: '44px', color: 'var(--terracotta)', opacity: 0.55 }}>
        ✦ &nbsp; ♥ &nbsp; ✦
      </span>
    </div>
  );
}
