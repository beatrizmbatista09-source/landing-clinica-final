import { Star, ArrowDown } from 'lucide-react';
import type { Clinic } from '@/types/clinic';

interface HeroProps {
  clinic: Clinic;
}

export function Hero({ clinic }: HeroProps) {
  return (
    <section id="top" className="relative min-h-screen overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        {clinic.hero_image_url && (
          <img
            src={clinic.hero_image_url}
            alt=""
            className="h-full w-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/70 via-brand-dark/50 to-brand-dark/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-5 pt-24 pb-16 lg:px-8">
        <div className="max-w-2xl">
          {/* Tagline */}
          <p className="mb-5 animate-fade-in text-sm font-medium uppercase tracking-[0.2em] text-accent">
            {clinic.tagline}
          </p>

          {/* Title */}
          <h1 className="mb-6 animate-fade-up font-serif text-4xl font-semibold leading-[1.1] text-white sm:text-5xl lg:text-6xl">
            {clinic.hero_title}
          </h1>

          {/* Subtitle */}
          <p className="mb-10 max-w-xl animate-fade-up text-lg leading-relaxed text-white/85 [animation-delay:150ms]">
            {clinic.hero_subtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-col gap-4 sm:flex-row [animation-delay:300ms] animate-fade-up">
            <a
              href="#contacto"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:brightness-110 hover:shadow-xl"
            >
              Marcar consulta de avaliação
            </a>
            <a
              href="#tratamentos"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-8 py-4 text-base font-medium text-white backdrop-blur-sm transition-all hover:bg-white/10"
            >
              Ver tratamentos
            </a>
          </div>

          {/* Stats */}
          <div className="mt-16 flex flex-wrap gap-x-12 gap-y-6 [animation-delay:450ms] animate-fade-up">
            <div className="flex items-center gap-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-accent text-accent"
                  />
                ))}
              </div>
              <div>
                <p className="text-2xl font-serif font-semibold text-white">
                  {clinic.rating}
                </p>
                <p className="text-xs text-white/70">Avaliação média</p>
              </div>
            </div>

            <div>
              <p className="text-2xl font-serif font-semibold text-white">
                {clinic.patients_count}
              </p>
              <p className="text-xs text-white/70">Pacientes acompanhados</p>
            </div>

            <div>
              <p className="text-2xl font-serif font-semibold text-white">
                {clinic.reviews_count}
              </p>
              <p className="text-xs text-white/70">{clinic.reviews_label}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in [animation-delay:700ms]">
        <ArrowDown className="h-5 w-5 animate-bounce text-white/60" />
      </div>
    </section>
  );
}
