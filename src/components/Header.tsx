import { useEffect, useState } from 'react';
import { Menu, X, CalendarHeart } from 'lucide-react';
import type { Clinic } from '@/types/clinic';

interface HeaderProps {
  clinic: Clinic;
}

const NAV = [
  { label: 'Tratamentos', href: '#tratamentos' },
  { label: 'Resultados', href: '#resultados' },
  { label: 'Porquê nós', href: '#porque' },
  { label: 'Processo', href: '#processo' },
  { label: 'Testemunhos', href: '#testemunhos' },
  { label: 'FAQ', href: '#faq' },
];

export function Header({ clinic }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const brandText = clinic.name || clinic.tagline;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        {/* Logo / wordmark */}
        <a href="#top" className="flex items-center gap-2.5">
          {clinic.logo_url ? (
            <img
              src={clinic.logo_url}
              alt={clinic.name}
              className="h-9 w-auto"
            />
          ) : brandText ? (
            <span
              className={`flex h-9 items-center text-xl font-serif font-semibold tracking-tight ${
                scrolled ? 'text-brand' : 'text-white'
              }`}
            >
              {brandText}
            </span>
          ) : (
            <CalendarHeart
              className={`h-7 w-7 ${scrolled ? 'text-brand' : 'text-white'}`}
            />
          )}
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors ${
                scrolled
                  ? 'text-stone-600 hover:text-brand'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:brightness-110 hover:shadow-md"
          >
            Marcar
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className={`lg:hidden ${scrolled ? 'text-brand' : 'text-white'}`}
          aria-label="Menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden">
          <div className="bg-white px-5 pb-6 pt-2 shadow-lg">
            <nav className="flex flex-col gap-1">
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-base font-medium text-stone-700 transition-colors hover:bg-stone-50 hover:text-brand"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contacto"
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white"
              >
                Marcar consulta
              </a>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
