import { Star, Quote } from 'lucide-react';
import { Reveal } from './Reveal';
import type { Testimonial } from '@/types/clinic';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  if (testimonials.length === 0) return null;

  return (
    <section id="testemunhos" className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-accent">
              Testemunhos
            </p>
            <h2 className="font-serif text-3xl font-semibold text-brand-dark sm:text-4xl lg:text-5xl">
              Quem confia, volta.
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.id} delay={i * 100}>
              <figure className="flex h-full flex-col rounded-2xl bg-stone-50 p-8 ring-1 ring-stone-100 transition-shadow hover:shadow-md">
                <Quote className="mb-4 h-8 w-8 text-accent/40" />
                <blockquote className="mb-6 flex-1 text-stone-700">
                  <p className="leading-relaxed">{t.quote}</p>
                </blockquote>
                <div className="mb-4 flex">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star
                      key={j}
                      className="h-4 w-4 fill-accent text-accent"
                    />
                  ))}
                </div>
                <figcaption className="flex items-center gap-3">
                  {t.avatar_url ? (
                    <img
                      src={t.avatar_url}
                      alt={t.name}
                      className="h-12 w-12 rounded-full object-cover ring-2 ring-accent/30"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand text-sm font-semibold text-white">
                      {t.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-brand-dark">{t.name}</p>
                    <p className="text-sm text-stone-500">{t.location}</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
<a
              href="#contacto"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:brightness-110 hover:shadow-xl"
            >
              Marcar consulta de avaliação
            </a>