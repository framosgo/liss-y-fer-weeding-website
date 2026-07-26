import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { NavLink, Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const links: [string, string][] = [
  ['/programa', 'Programa'],
  ['/lugar', 'Lugar'],
  ['/dress-code', 'Dress code'],
  ['/rsvp', 'RSVP'],
  ['/regalos', 'Regalos'],
  ['/faq', 'FAQ'],
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [open]);

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-50 border-b border-white/20 bg-background/82 backdrop-blur-xl"
    >
      <nav className="section-shell flex h-16 items-center justify-between">
        <Link
          className="font-serif text-2xl font-semibold text-[#800020]/90 dark:text-white"
          to="/"
          onClick={() => setOpen(false)}
        >
          L & F
        </Link>
        <div className="hidden items-center gap-1 md:flex">
          {links.map(([to, label]) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  'rounded-full px-4 py-2 text-sm font-semibold hover:bg-olive/10',
                  isActive && 'bg-olive/10 text-olive dark:text-white',
                )
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            aria-label={open ? 'Cerrar navegación' : 'Abrir navegación'}
            aria-expanded={open}
            onClick={() => setOpen((prev) => !prev)}
          >
            <Menu className="h-5 w-5 text-[#800020]/90" />
          </Button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="section-shell grid gap-2 pb-4 md:hidden"
          >
            {links.map(([to, label]) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  cn(
                    'rounded-md px-3 py-2 text-sm font-semibold hover:bg-olive/10',
                    isActive && 'bg-olive/10 text-olive dark:text-white',
                  )
                }
                onClick={() => setOpen(false)}
              >
                {label}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
