<a
              href="#contacto"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:brightness-110 hover:shadow-xl"
            >
              Marcar consulta de avaliação
            </a>
import type { Clinic } from '@/types/clinic';

interface FooterProps {
  clinic: Clinic;
}

const NAV = [
  { label: 'Tratamentos', href: '#tratamentos' },
  { label: 'Resultados', href: '#resultados' },
  { label: 'Porquê nós', href: '#porque' },
  { label: 'Processo', href: '#processo' },
  { label: 'FAQ', href: '#faq' },
];

export function Footer({ clinic }: FooterProps) {
  const brandText = clinic.name || clinic.tagline;
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-dark text-white">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          {/* Brand */}
          <div>
            {brandText && (
              <h3 className="mb-3 font-serif text-2xl font-semibold">
                {brandText}
              </h3>
            )}
            <p className="text-sm text-white/60">
  Esta landing page é um modelo de apresentação. Todos os conteúdos, imagens e informações serão personalizados de acordo com a identidade e necessidades da clínica.
</p>
          </div>

          {/* Nav */}
          <div className="md:text-right">
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-accent">
              Navegação
            </h4>
            <ul className="space-y-2">
              {NAV.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center text-xs text-white/40">
          &copy; {year} {brandText || 'Clínica'}. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
