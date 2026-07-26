import { SectionTitle } from '@/components/ui/section-title';

const dressCodeColors = [
  { name: 'Marrón chocolate', color: '#654321' },
  { name: 'Burdeos', color: '#800020' },
  { name: 'Terracota', color: '#bc5830' },
  { name: 'Mostaza', color: '#c69138' },
  { name: 'Camel', color: '#c19a6b' },
  { name: 'Rosa empolvado', color: '#c6908f' },
];

const forbiddenDressCodeColors = [
  { name: 'Blanco', color: '#ffffff' },
  { name: 'Verde oliva', color: '#556B2F' },
  { name: 'Gris', color: '#6B6B6B' },
];

export function WeddingDetails() {
  return (
    <section className="bg-linen min-h-[calc(100dvh-10rem)] py-10">
      <div className="section-shell">
        <SectionTitle
          eyebrow="Dress code"
          title="Inspirado en la naturaleza y el otoño."
          text="Es muy importante para nosotros y nos haría muchísima ilusión que nos acompañarais con trajes ligeros, vestidos largos y un estilo inspirado en los colores del otoño."
        />
        <div className="mb-8 flex flex-wrap justify-center gap-5 sm:justify-start">
          {dressCodeColors.map(({ name, color }) => (
            <div key={name} className="flex w-24 flex-col items-center gap-2">
              <span
                className="h-12 w-12 rounded-full border border-white shadow-sm"
                style={{ backgroundColor: color }}
              />
              <span className="text-center text-sm leading-tight text-olive">{name}</span>
            </div>
          ))}
        </div>

        <p className="mt-12 font-bold uppercase tracking-[0.28em] text-terracotta">IMPORTANTE</p>
        <p className="mt-2 text-base leading-6 text-olive/78">
          Os pedimos que evitéis los colores y tonos similares a los siguientes:
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-5 sm:justify-start">
          {forbiddenDressCodeColors.map(({ name, color }) => (
            <div key={name} className="flex w-24 flex-col items-center gap-2">
              <span
                className="h-12 w-12 rounded-full border border-olive/20 shadow-sm"
                style={{ backgroundColor: color }}
              />
              <span className="text-center text-sm leading-tight text-olive">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
