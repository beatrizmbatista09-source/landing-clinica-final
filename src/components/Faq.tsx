import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { Reveal } from './Reveal';
import type { Faq } from '@/types/clinic';

interface FaqProps {
  faqs: Faq[];
}

export function Faq({ faqs }: FaqProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  if (faqs.length === 0) return null;

  return (
    <section id="faq" className="bg-stone-50 py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <Reveal>
          <div className="mb-16 text-center">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-accent">
              FAQ
            </p>
            <h2 className="font-serif text-3xl font-semibold text-brand-dark sm:text-4xl lg:text-5xl">
              Perguntas frequentes.
            </h2>
          </div>
        </Reveal>

        <Reveal>
          <div className="divide-y divide-stone-200 rounded-2xl bg-white shadow-sm ring-1 ring-stone-100">
            {faqs.map((faq, i) => {
              const isOpen = openIdx === i;
              return (
                <div key={faq.id}>
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-stone-50"
                    aria-expanded={isOpen}
                  >
                    <span className="font-medium text-brand-dark">
                      {faq.question}
                    </span>
                    <span className="flex-shrink-0 text-accent">
                      {isOpen ? (
                        <Minus className="h-5 w-5" />
                      ) : (
                        <Plus className="h-5 w-5" />
                      )}
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ${
                      isOpen
                        ? 'grid-rows-[1fr] opacity-100'
                        : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-5 text-sm leading-relaxed text-stone-600">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
