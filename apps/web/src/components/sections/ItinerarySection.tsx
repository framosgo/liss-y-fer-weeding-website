import { motion } from 'framer-motion';
import { SectionTitle } from '@/components/ui/section-title';
import { itinerary } from '@/lib/constants';

export function ItinerarySection() {
  return (
    <>
      <section className="bg-linen py-20 dark:bg-white/5">
        <div className="section-shell">
          <SectionTitle eyebrow="El gran día" title="Así viviremos el día de nuestra boda" />
          <div className="relative grid gap-5 before:absolute before:left-5 before:top-3 before:h-[calc(100%-1rem)] before:w-px before:bg-olive/55 md:ml-6">
            {itinerary.map(([time, title, text]) => (
              <motion.div
                key={time}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative ml-12 rounded-lg bg-white/82 p-5 shadow-sm dark:bg-white/8"
              >
                <span className="absolute -left-[3.1rem] top-5 grid h-10 w-10 place-items-center rounded-full bg-[#800020]/90 text-xs font-bold text-white">
                  {time}
                </span>
                <h3 className="font-serif text-2xl font-bold">{title}</h3>
                <p className="mt-1 text-sm leading-6 text-olive/75 dark:text-white/70">{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
