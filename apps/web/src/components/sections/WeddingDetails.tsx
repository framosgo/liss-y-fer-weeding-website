import { ColorLookGallery, dressCodeColors } from '@/components/sections/ColorLookGallery';
import { SectionTitle } from '@/components/ui/section-title';

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
          title="Elegante, formal y otoñal"
          text="Para nosotros es importante que sigáis nuestra paleta de tonos otoñales, con trajes ligeros y vestidos largos."
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

        <ColorLookGallery
          title="Ejemplos para ellas"
          subtitle="Vestido largo y elegante"
          gender="woman"
          imageAlt={(colorName) => `Ejemplo de vestido largo en ${colorName}`}
          thumbAriaLabel={(colorName) => `Ver vestido en ${colorName}`}
        />

        <ColorLookGallery
          title="Ejemplos para ellos"
          subtitle="Traje ligero y elegante"
          gender="man"
          imageAlt={(colorName) => `Ejemplo de traje en ${colorName}`}
          thumbAriaLabel={(colorName) => `Ver traje en ${colorName}`}
        />

        <p className="mt-16 font-bold uppercase tracking-[0.28em] text-terracotta">IMPORTANTE</p>
        <p className="mt-2 text-base leading-6 text-olive/78">
          Os pedimos que evitéis estos colores y tonos similares:
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
