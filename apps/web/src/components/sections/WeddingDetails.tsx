import { SectionTitle } from '@/components/ui/section-title';

const dressCodeColors = [
  '#654321', // Marrón chocolate
  '#800020', // Burdeos
  '#bc5830', // Terracota
  '#c69138', // Mostaza
  '#c19a6b', // Camel
  '#c6908f', // Rosa empolvado
];

const forbiddenDressCodeColors = [
  '#ffffff', // Blanco
  '#000000', // Negro
  '#3d4a21', // Verde oliva
  '#002b55', // Azul marino oscuro
];

export function WeddingDetails() {
  return (
    <section className="bg-linen min-h-[calc(100dvh-4rem)] py-10">
      <div className="section-shell">
        <SectionTitle
          eyebrow="Dress code"
          title="Inspirado en la naturaleza y el otoño."
          text="Es muy importante para nosotros y nos haría muchísima ilusión que nos acompañarais con trajes ligeros, vestidos largos y un estilo inspirado en los colores del otoño como marron chocolate, burdeos, terracota, mostaza, camel y rosa empolvado."
        />
        <div className="mb-8 flex flex-wrap gap-3">
          {dressCodeColors.map((color) => (
            <span
              key={color}
              className="h-12 w-12 rounded-full border border-white shadow-sm"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>

        <p className="mt-12 font-bold uppercase tracking-[0.28em] text-terracotta">IMPORTANTE</p>
        <p className="mt-2 text-base leading-6 text-olive/78">
          Os pedimos que evitéis los colores y tonos similares al blanco, negro, verde oliva y azul
          marino.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          {forbiddenDressCodeColors.map((color) => (
            <span
              key={color}
              className="h-12 w-12 rounded-full border border-white shadow-sm"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
