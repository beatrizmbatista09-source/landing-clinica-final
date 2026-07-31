import { useEffect, useRef, useState } from 'react';
import { Building2, ChevronDown, Check } from 'lucide-react';

interface ClinicOption {
  slug: string;
  name: string;
  city: string;
}

interface ClinicSwitcherProps {
  clinics: ClinicOption[];
  currentSlug: string;
  onSelect: (slug: string) => void;
}

/** A floating dropdown to switch between clinics (template demo tool). */
export function ClinicSwitcher({
  clinics,
  currentSlug,
  onSelect,
}: ClinicSwitcherProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  if (clinics.length <= 1) return null;

  return (
    <div
      ref={ref}
      className="fixed bottom-6 right-6 z-[60]"
    >
      {open && (
        <div className="absolute bottom-full right-0 mb-3 w-64 overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-stone-200">
          <p className="border-b border-stone-100 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-stone-400">
            Trocar de clínica
          </p>
          {clinics.map((c, i) => (
            <button
              key={c.slug}
              onClick={() => {
                onSelect(c.slug);
                setOpen(false);
              }}
              className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors hover:bg-stone-50"
            >
              <div className="flex items-center gap-3">
                <Building2 className="h-4 w-4 text-accent" />
                <div>
                  <p className="text-sm font-medium text-stone-800">
                    Modelo {i + 1}
                  </p>
                </div>
              </div>
              {c.slug === currentSlug && (
                <Check className="h-4 w-4 text-brand" />
              )}
            </button>
          ))}
        </div>
      )}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2.5 rounded-full bg-white px-4 py-3 shadow-lg ring-1 ring-stone-200 transition-all hover:shadow-xl"
      >
        <Building2 className="h-5 w-5 text-brand" />
        <div className="text-left">
          <p className="text-xs font-semibold text-stone-800">
            Modelo {clinics.findIndex((c) => c.slug === currentSlug) + 1}
          </p>
          <p className="text-[10px] text-stone-400">Modelo multi-clínica</p>
        </div>
        <ChevronDown
          className={`h-4 w-4 text-stone-400 transition-transform ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>
    </div>
  );
}
