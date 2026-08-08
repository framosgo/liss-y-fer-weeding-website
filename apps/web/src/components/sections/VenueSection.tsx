import { MapPin, Clock5, Bed } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { SectionTitle } from '@/components/ui/section-title';

export function VenueSection() {
  return (
    <section className="bg-linen min-h-[calc(100dvh-4rem)] py-10 grid gap-10">
      <div className="section-shell grid gap-8">
        <div>
          <SectionTitle
            eyebrow="Lugar"
            title="Casa Gumira"
            text="Un espacio con encanto, pensado para una ceremonia íntima, una cena cuidada y una fiesta muy nuestra."
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <Card
              className="flex gap-3 items-center bg-white/70"
              onClick={() =>
                window.open('https://www.google.com/maps?q=Casa%20Gumira%20Barcelona', '_self')
              }
            >
              <MapPin className="h-5 w-5 shrink-0 text-terracotta" />
              <span className="text-sm">Casa Gumira, Montmajor, Barcelona</span>
            </Card>
            <Card
              className="flex gap-3 items-center bg-white/70"
              onClick={() => window.open('/alojamientos.pdf', '_self', 'noopener,noreferrer')}
            >
              <Bed className="h-5 w-5 shrink-0 text-terracotta" />
              <span className="text-sm">Alojamientos cercanos recomendados</span>
            </Card>
          </div>
        </div>
        <div>
          <p className="font-bold uppercase tracking-[0.28em] text-terracotta">IMPORTANTE</p>
          <p className="mt-2 mb-8 text-base leading-6 text-olive/78">
            Casa Gumira está a aproximadamente 1 hora y 30 minutos del centro de Barcelona en coche,
            por lo que os recomendamos planificar el desplazamiento con antelación.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <Card className="flex gap-3 items-center bg-white/70">
              <Clock5 className="h-5 w-5 shrink-0 text-terracotta" />
              <span className="text-sm">El evento empieza a las 15:30h en punto.</span>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
