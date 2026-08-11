import { Link } from 'react-router-dom';
import { Heart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Guest } from '@/lib/api';

type RsvpSuccessProps = {
  guests: Guest[];
};
export function RsvpSuccess({ guests }: RsvpSuccessProps) {
  const isOnlyOneGuest = guests.length === 1;
  const guestsAttending = guests.filter((guest) => guest.attending);
  return (
    <section id="rsvp" className="bg-linen py-10 min-h-[calc(100vh-10rem)]">
      <div className="section-shell">
        <Card className="mx-auto max-w-2xl p-8 text-center">
          <Heart className="mx-auto mb-4 h-10 w-10 text-terracotta" />
          <h3 className="font-serif text-3xl font-semibold text-olive">¡Gracias por confirmar!</h3>
          {guestsAttending.length > 0 ? (
            <>
              <p className="mt-3 text-base leading-7 text-olive/78">
                Tenemos muchísimas ganas de celebrarlo{' '}
                {guestsAttending.length === 1
                  ? `contigo ${guestsAttending?.[0]?.name}`
                  : 'con vosotros'}
                .
              </p>
              <Button asChild className="mt-6">
                <Link to="/dress-code">
                  <Star className="h-4 w-4" />
                  Ver el código de vestimenta
                </Link>
              </Button>
            </>
          ) : (
            <p className="mt-3 text-base leading-7 text-olive/78">
              Sentimos mucho que finalmente no {isOnlyOneGuest ? 'puedas' : 'podáis'} acompañarnos
              en nuestro día tan especial. Nos habría encantado compartirlo con vosotros, pero
              esperamos que podamos vernos pronto y celebrarlo juntos en otra ocasión 🤍
            </p>
          )}
        </Card>
      </div>
    </section>
  );
}
