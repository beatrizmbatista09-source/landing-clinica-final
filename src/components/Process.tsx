import { Reveal } from './Reveal';
import type { ProcessStep } from '@/types/clinic';

interface ProcessProps {
  steps: ProcessStep[];
}

export function Process({ steps }: ProcessProps) {
  if (steps.length === 0) return null;

  return (
    <section id="processo" className="bg-stone-50 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-accent">
              Processo
            </p>
            <h2 className="font-serif text-3xl font-semibold text-brand-dark sm:text-4xl lg:text-5xl">
              {steps.length} passos até ao seu resultado.
            </h2>
          </div>
        </Reveal>

        <div className="relative grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* connecting line */}
          <div className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent lg:block" />

          {steps.map((step, i) => (
            <Reveal key={step.id} delay={i * 120}>
              <div className="relative text-center lg:text-left">
                <div className="mb-6 flex justify-center lg:justify-start">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white font-serif text-2xl font-semibold text-brand shadow-md ring-1 ring-stone-100">
                    {step.step_number}
                  </span>
                </div>
                <h3 className="mb-2 font-serif text-xl font-semibold text-brand-dark">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-stone-600">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
