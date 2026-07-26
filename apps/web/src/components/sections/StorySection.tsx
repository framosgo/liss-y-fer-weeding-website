import { motion } from 'framer-motion';
import { SectionTitle } from '@/components/ui/section-title';
import { story } from '@/lib/constants';

export function StorySection() {
  return (
    <section className="py-20">
      <div className="section-shell">
        <SectionTitle
          eyebrow="Nuestra historia"
          title="Nuestra línea del tiempo muy resumida."
          text="Recorre algunos momentos que nos trajeron hasta aquí."
        />
        <div className="grid gap-4 md:grid-cols-4">
          {story.map(([year, text], index) => (
            <motion.div
              key={year}
              whileHover={{ y: -8 }}
              className="rounded-lg border border-olive/15 bg-white/70 p-5 shadow-sm dark:bg-white/8"
            >
              <div
                className="aspect-[4/5] rounded-md bg-cover bg-center"
                style={{
                  backgroundImage: `url(https://images.unsplash.com/photo-${['1519741497674-611481863552', '1529634806980-85c3dd6d34ac', '1519225421980-715cb0215aed', '1494955870715-979ca4f13bf0'][index]}?auto=format&fit=crop&w=700&q=80)`,
                }}
              />
              <p className="mt-5 font-serif text-3xl font-semibold text-olive dark:text-white">
                {year}
              </p>
              <p className="mt-2 text-sm leading-6 text-olive/75 dark:text-white/70">{text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
