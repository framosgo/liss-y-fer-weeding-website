import { Hotel, MapPin, Plane } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { SectionTitle } from '@/components/ui/section-title';

export function TravelSection() {
  const hotels = ['Hotel Neri', 'The Hoxton Poblenou', 'Hotel Brummell'];
  const buses = ['15:45 Recogida en Plaça de Catalunya', '16:10 Recogida en Sants', '01:00, 01:45 y 02:30 regresos a Barcelona'];
  return (
    <section className="bg-olive py-20 text-white">
      <div className="section-shell">
        <SectionTitle eyebrow="Viaje" title="Llegar fácil, celebrar sin prisas." text="Os recomendamos alojaros en Barcelona ciudad para aprovechar mejor el fin de semana y los traslados." />
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="bg-white/10 text-white"><Plane className="mb-4 h-6 w-6 text-mustard" /> Podréis llegar al aeropuerto de Barcelona-El Prat o en tren a Sants.</Card>
          <Card className="bg-white/10 text-white"><Hotel className="mb-4 h-6 w-6 text-mustard" /> {hotels.join(', ')} son opciones cómodas para el fin de semana.</Card>
          <Card className="bg-white/10 text-white"><MapPin className="mb-4 h-6 w-6 text-mustard" /> Habrá autobuses el día de la boda para facilitar los traslados.</Card>
        </div>
        <div className="mt-8 rounded-lg border border-white/15 bg-white/8 p-5">
          <h3 className="font-serif text-3xl font-semibold">Horarios de autobús</h3>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {buses.map((bus) => <div key={bus} className="rounded-md bg-white/10 p-4 text-sm">{bus}</div>)}
          </div>
        </div>
      </div>
    </section>
  );
}
