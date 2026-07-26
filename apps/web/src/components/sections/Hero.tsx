import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useCountdown } from '@/hooks/useCountdown';
import { formatCount } from '@/lib/utils';

export function Hero() {
  const countdown = useCountdown();
  return (
    <section className="bg-linen px-6 py-12 text-olive dark:bg-olive dark:text-white sm:py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto flex max-w-2xl flex-col items-center text-center"
      >
        <img
          src="/chibi-us.png"
          alt="Liss y Fer"
          className="mb-8 h-52 w-auto object-contain opacity-75 sm:h-52"
        />
        <h1 className="font-serif text-6xl font-semibold leading-none sm:text-7xl lg:text-8xl dark:text-[#800020]/90">
          Liss &amp; Fer
        </h1>
        <div className="mt-6 flex w-full max-w-xs items-center gap-3" aria-hidden>
          <span className="h-px flex-1 bg-[#800020]/40" />

          <p className="text-sm uppercase tracking-[0.3em] font-bold text-[#800020]/70 dark:text-[#800020]/70">
            16 · 10 · 2026
          </p>
          <span className="h-px flex-1 bg-[#800020]/40" />
        </div>
        <p className="mt-2 text-base dark:text-white/60">Casa Gumira — Barcelona</p>
        <div className="mt-12 flex items-center justify-center gap-8">
          {Object.entries(countdown).map(([label, value]) => (
            <div key={label} className="text-center">
              <div className="font-serif text-3xl font-semibold tabular-nums sm:text-4xl">
                {formatCount(value)}
              </div>
              <div className="mt-1 text-[0.65rem] uppercase tracking-[0.25em] text-olive/55 dark:text-white/50">
                {label}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <Button asChild size="lg" className="bg-[#800020]/90 dark:bg-terracotta dark:text-white">
            <Link to="/rsvp">Confirmar asistencia</Link>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
