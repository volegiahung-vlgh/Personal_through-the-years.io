import FloatingHearts from '@/components/FloatingHearts';
import FoodTimeline from '@/components/FoodTimeline';
import LoveWordsTimeline from '@/components/LoveWordsTimeline';
import foodData from '@/content/our-memories/food.json';
import loveWordsData from '@/content/our-memories/love-words.json';

export const metadata = {
  title: 'Kỷ Niệm · Through the Years',
  description: 'Những món ngon bọn mình đã ăn và những lời thương gửi trao.',
};

export default function OurMemoriesPage() {
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
          những món ngon & những lời thương.
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
          Những tô phở sáng sớm, những tách cà phê chiều muộn,
          và tất cả những điều anh chưa kịp nói — đều được giữ lại ở đây.
        </p>

        {/* Jump anchors */}
        <div className="flex items-center justify-center gap-6 mt-10">
          <a
            href="#mon-ngon"
            className="font-serif uppercase text-[11px] pb-1"
            style={{ color: 'var(--terracotta-deep)', letterSpacing: '0.35em', borderBottom: '1px solid var(--terracotta)' }}
          >
            Những Món Ngon ↓
          </a>
          <span style={{ color: 'var(--ink-faint)' }}>·</span>
          <a
            href="#loi-thuong"
            className="font-serif uppercase text-[11px] pb-1"
            style={{ color: 'var(--terracotta-deep)', letterSpacing: '0.35em', borderBottom: '1px solid var(--terracotta)' }}
          >
            Những Lời Thương ↓
          </a>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════ */}
      {/* ── Section 1 : Những Món Ngon ──────────────────────── */}
      {/* ══════════════════════════════════════════════════════ */}
      <section id="mon-ngon" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">

          {/* Section title */}
          <div className="flex items-center gap-6 mb-4">
            <div style={{ flex: 1, height: '1px', background: 'var(--rule)' }} />
            <div className="text-center shrink-0">
              <p className="font-serif uppercase" style={{ fontSize: '11px', color: 'var(--ink-faint)', letterSpacing: '0.42em' }}>
                Nhật ký ẩm thực
              </p>
              <div className="font-script mt-1" style={{ fontSize: '42px', color: 'var(--terracotta)', lineHeight: 1.1 }}>
                Những Món Ngon
              </div>
            </div>
            <div style={{ flex: 1, height: '1px', background: 'var(--rule)' }} />
          </div>

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
      <div className="py-14 text-center" style={{ background: 'var(--bg-cream)' }}>
        <span className="font-script" style={{ fontSize: '44px', color: 'var(--terracotta)', opacity: 0.55 }}>
          ✦ &nbsp; ♥ &nbsp; ✦
        </span>
      </div>

      {/* ══════════════════════════════════════════════════════ */}
      {/* ── Section 2 : Những Lời Thương ────────────────────── */}
      {/* ══════════════════════════════════════════════════════ */}
      <section id="loi-thuong" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">

          {/* Section title */}
          <div className="flex items-center gap-6 mb-4">
            <div style={{ flex: 1, height: '1px', background: 'var(--rule)' }} />
            <div className="text-center shrink-0">
              <p className="font-serif uppercase" style={{ fontSize: '11px', color: 'var(--ink-faint)', letterSpacing: '0.42em' }}>
                Từ trái tim anh
              </p>
              <div className="font-script mt-1" style={{ fontSize: '42px', color: 'var(--terracotta)', lineHeight: 1.1 }}>
                Những Lời Thương
              </div>
            </div>
            <div style={{ flex: 1, height: '1px', background: 'var(--rule)' }} />
          </div>

          <p
            className="font-serif italic text-center mb-12"
            style={{ fontSize: '16px', color: 'var(--ink-soft)', maxWidth: '480px', margin: '12px auto 48px' }}
          >
            Những điều anh muốn nói với em —
            giữ lại đây, để không bao giờ quên.
          </p>

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
