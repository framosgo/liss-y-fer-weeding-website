import { ChevronDown, Phone } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { SectionTitle } from '@/components/ui/section-title';

export function FaqGuestbook() {
  const faqs = [
    [
      '¿Puedo llevar acompañante?',
      'Si vuestra invitación incluye acompañante, aparecerá dentro del RSVP.',
    ],
    [
      '¿Están invitados los niños?',
      'Los peques que aparezcan en la invitación están incluidos con mucho cariño.',
    ],
    [
      '¿La ceremonia será al aire libre?',
      'Si el tiempo acompaña, sí. También contamos con un plan cubierto.',
    ],
    [
      '¿Hay hoteles cerca?',
      'Hay hoteles y pequeñas macías cerca de Casa Gumira. Escríbenos si necesitas ayuda.',
    ],
    [
      '¿Hasta cuándo puedo confirmar?',
      'Por favor, confirmad antes del 30 de agosto de 2026. Pasada la fecha lo tomaremos como que no asistiréis.',
    ],
  ];
  return (
    <section id="faq" className="bg-linen py-20">
      <div className="section-shell grid gap-10 lg:grid-cols-2">
        <div>
          <SectionTitle eyebrow="FAQ" title="Dudas pequeñas, respuestas claras." />
          <div className="grid gap-3">
            {faqs.map(([question, answer]) => (
              <details
                key={question}
                className="rounded-lg border border-olive/15 bg-white/70 p-4 dark:bg-white/8"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between font-semibold">
                  {question}
                  <ChevronDown className="h-4 w-4 text-terracotta" />
                </summary>
                <p className="mt-3 text-sm leading-6 text-olive/75 dark:text-white/70">{answer}</p>
              </details>
            ))}
          </div>
        </div>
        <div>
          <SectionTitle eyebrow="" title="O escríbenos por WhatsApp." />

          <div className="grid gap-3 sm:grid-cols-2">
            <Card
              className="flex gap-3 p-4 px-5"
              onClick={() => window.open('https://wa.me/34628819392', '_self')}
            >
              <Phone className="h-5 w-5 text-terracotta" />
              <span className="text-sm">
                <strong>Fer:</strong> +34 628 81 93 92
              </span>
            </Card>
            <Card
              className="flex gap-3 p-4 px-5"
              onClick={() => window.open('https://wa.me/34675514499', '_self')}
            >
              <Phone className="h-5 w-5 text-terracotta" />
              <span className="text-sm">
                <strong>Liss:</strong> +34 675 51 44 99
              </span>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
