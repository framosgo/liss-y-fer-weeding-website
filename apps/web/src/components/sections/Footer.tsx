import { Link } from 'react-router-dom';

const footerLinks: [string, string][] = [
  ['/programa', 'Programa'],
  ['/lugar', 'Lugar'],
  ['/dress-code', 'Dress code'],
  ['/rsvp', 'RSVP'],
  ['/regalos', 'Regalos'],
  ['/faq', 'FAQ'],
];

export function Footer() {
  return (
    <footer className="bg-olive text-white">
      <div className="section-shell flex flex-col items-center gap-4 px-6 py-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/85">
          16 · 10 · 2026
        </p>

        <nav
          aria-label="Enlaces del pie"
          className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1"
        >
          {footerLinks.map(([to, label]) => (
            <Link
              key={to}
              to={to}
              className="text-xs font-medium text-white/70 transition hover:text-white"
            >
              {label}
            </Link>
          ))}
        </nav>

        <p className="text-[0.65rem] text-white/40">
          © {new Date().getFullYear()} Liss y Fer. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
