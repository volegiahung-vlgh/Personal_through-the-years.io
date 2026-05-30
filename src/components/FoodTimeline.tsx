'use client';

interface Dish {
  id: number;
  emoji: string;
  photo: string | null;
  name: string;
  place: string;
  note: string;
}

interface FoodTimelineProps {
  dishes: Dish[];
}

export default function FoodTimeline({ dishes }: FoodTimelineProps) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {dishes.map(dish => (
        <div
          key={dish.id}
          className="group flex flex-col rounded-2xl overflow-hidden food-card"
          style={{
            background: 'var(--bg-cream)',
            border: '1px solid rgba(155,29,66,0.10)',
            boxShadow: '0 2px 12px rgba(43,31,23,0.06)',
          }}
        >
          {/* Photo or emoji banner */}
          {dish.photo ? (
            <div style={{ height: '160px', overflow: 'hidden', borderBottom: '1px solid rgba(155,29,66,0.08)' }}>
              <img
                src={`/images/food/${dish.photo}`}
                alt={dish.name}
                loading="lazy"
                className="w-full h-full object-cover"
                style={{ filter: 'sepia(0.08) saturate(0.95)' }}
              />
            </div>
          ) : (
            <div
              className="flex items-center justify-center"
              style={{
                height: '80px',
                background: 'linear-gradient(135deg, #fce8ee 0%, #faf0f4 100%)',
                borderBottom: '1px solid rgba(155,29,66,0.08)',
                fontSize: '36px',
              }}
            >
              {dish.emoji}
            </div>
          )}

          {/* Content */}
          <div className="flex flex-col flex-1 p-5">
            <p
              className="font-script leading-tight mb-1"
              style={{ fontSize: '22px', color: 'var(--terracotta-deep)' }}
            >
              {dish.name}
            </p>

            <p
              className="font-serif uppercase mb-3"
              style={{ fontSize: '10px', color: 'var(--ink-faint)', letterSpacing: '0.28em' }}
            >
              {dish.place}
            </p>

            <p
              className="font-serif italic flex-1"
              style={{ fontSize: '14px', color: 'var(--ink-soft)', lineHeight: '1.65' }}
            >
              {dish.note}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
