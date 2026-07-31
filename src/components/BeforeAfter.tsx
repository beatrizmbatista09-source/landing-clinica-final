import { useCallback, useEffect, useRef, useState } from 'react';
import { Reveal } from './Reveal';
import type { BeforeAfter as BeforeAfterType } from '@/types/clinic';

interface BeforeAfterProps {
  items: BeforeAfterType[];
}

interface SliderCardProps {
  beforeUrl: string;
  afterUrl: string;
}

/** A draggable before/after comparison slider. */
function SliderCard({ beforeUrl, afterUrl }: SliderCardProps) {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, pct)));
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!dragging.current) return;
      const clientX =
        e instanceof TouchEvent ? e.touches[0]?.clientX : (e as MouseEvent).clientX;
      if (clientX !== undefined) updateFromClientX(clientX);
    };
    const onUp = () => {
      dragging.current = false;
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onMove);
    window.addEventListener('touchend', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onUp);
    };
  }, [updateFromClientX]);

  return (
    <div
      ref={containerRef}
      className="relative aspect-[4/5] cursor-ew-resize select-none overflow-hidden rounded-2xl shadow-md ring-1 ring-stone-100"
      onMouseDown={(e) => {
        dragging.current = true;
        updateFromClientX(e.clientX);
      }}
      onTouchStart={(e) => {
        dragging.current = true;
        updateFromClientX(e.touches[0].clientX);
      }}
    >
      {/* After (full) */}
      <img
        src={afterUrl}
        alt="Depois"
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
        draggable={false}
      />
      {/* Before (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${pos}%` }}
      >
        <img
          src={beforeUrl}
          alt="Antes"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ width: containerRef.current?.offsetWidth ?? '100%' }}
          loading="lazy"
          draggable={false}
        />
      </div>

      {/* Labels */}
      <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-black/50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
        Antes
      </span>
      <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-accent/80 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
        Depois
      </span>

      {/* Divider handle */}
      <div
        className="absolute inset-y-0 z-10 w-0.5 bg-white shadow-md"
        style={{ left: `${pos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg ring-1 ring-stone-200">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-brand">
            <path d="M8 7l-5 5 5 5M16 7l5 5-5 5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export function BeforeAfter({ items }: BeforeAfterProps) {
  if (items.length === 0) return null;

  return (
    <section id="resultados" className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-accent">
              Antes &amp; Depois
            </p>
            <h2 className="font-serif text-3xl font-semibold text-brand-dark sm:text-4xl lg:text-5xl">
              Resultados discretos. Diferença evidente.
            </h2>
            <p className="mt-4 text-stone-500">
              Arraste para comparar o antes e o depois.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => {
            const before = item.before_image_url ?? item.image_url;
            const after = item.after_image_url ?? item.image_url;
            if (!before || !after) return null;
            return (
              <Reveal key={item.id} delay={i * 100}>
                <SliderCard beforeUrl={before} afterUrl={after} />
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
