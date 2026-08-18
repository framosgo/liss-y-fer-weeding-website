import { ColorLookGallery, dressCodeColors } from '@/components/sections/ColorLookGallery';
import { SectionTitle } from '@/components/ui/section-title';

export function WeddingDetails() {
  return (
    <section className="bg-linen min-h-[calc(100dvh-10rem)] py-10">
      <div className="section-shell">
        <SectionTitle
          eyebrow="Código de vestimenta"
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
      </div>
    </section>
  );
}
