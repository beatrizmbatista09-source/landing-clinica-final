import { Reveal } from './Reveal';
import { getIcon } from '@/lib/icons';
import type { Feature } from '@/types/clinic';

interface FeaturesProps {
  features: Feature[];
}

export function Features({ features }: FeaturesProps) {
  if (features.length === 0) return null;

  return (
    <section id="porque" className="bg-brand-dark py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-accent">
              Porquê nós
            </p>
            <h2 className="font-serif text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">
              Exigência clínica em cada detalhe.
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => {
            const Icon = getIcon(f.icon);
            return (
              <Reveal key={f.id} delay={i * 80}>
                <div className="text-center sm:text-left">
                  <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15 transition-colors group-hover:bg-accent/20">
                    <Icon className="h-7 w-7 text-accent" />
                  </div>
                  <h3 className="mb-2 font-serif text-xl font-semibold text-white">
                    {f.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/70">
                    {f.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
