import { Reveal } from './Reveal';
import type { Treatment } from '@/types/clinic';

interface TreatmentsProps {
  treatments: Treatment[];
}

export function Treatments({ treatments }: TreatmentsProps) {
  if (treatments.length === 0) return null;

  return (
    <section id="tratamentos" className="bg-stone-50 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-accent">
              Tratamentos
            </p>
            <h2 className="font-serif text-3xl font-semibold text-brand-dark sm:text-4xl lg:text-5xl">
              Protocolos desenhados para o seu rosto, não para uma tabela.
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {treatments.map((t, i) => (
            <Reveal key={t.id} delay={i * 70}>
              <article className="group h-full overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-stone-100 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">
                <div className="aspect-[4/3] overflow-hidden">
                  {t.image_url ? (
                    <img
                      src={t.image_url}
                      alt={t.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-stone-100">
                      <span className="text-stone-300">
                        {t.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="mb-2 font-serif text-xl font-semibold text-brand-dark">
                    {t.name}
                  </h3>
                  <p className="text-sm leading-relaxed text-stone-600">
                    {t.description}
                  </p>
                </div>
              </article>
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