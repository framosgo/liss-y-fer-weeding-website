import { Banknote, Copy, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SectionTitle } from '@/components/ui/section-title';

const IBAN = 'ES35 1563 2626 3132 6339 6067';
const ACCOUNT_HOLDER = 'Fernando y Lissette';

export function GiftsSection() {
  const copyIban = () => {
    void navigator.clipboard.writeText(IBAN.replaceAll(' ', ''));
  };

  return (
    <section className="bg-linen py-10">
      <div className="section-shell mx-auto grid w-full max-w-2xl gap-8">
        <SectionTitle
          eyebrow="Regalos"
          title="Lo más importante es que estéis ahí"
          text="Lo más importante para nosotros es compartir este día con vosotros.
Si además queréis tener un detalle, cualquier contribución para nuestra luna de miel y para comenzar esta nueva etapa juntos será recibida con muchísimo cariño y nos acompañará en uno de los viajes más especiales de nuestra vida."
        />

        <div className="grid gap-4">
          <Card className="flex items-start gap-3 bg-white/70">
            <Mail size={24} className="mt-0.5 shrink-0 text-olive" aria-hidden />
            <div className="grid min-w-0 gap-2">
              <h3 className="font-serif text-2xl font-bold text-olive dark:text-white">
                El día de la boda
              </h3>
              <p className="text-sm leading-6 text-olive/75 dark:text-white/70">
                Si preferís entregarnos vuestro detalle en persona, encontraréis una urna preparada
                durante la celebración para depositar vuestro sobre.
              </p>
            </div>
          </Card>
          <Card className="grid gap-4 bg-white/70">
            <div className="flex items-start gap-3">
              <Banknote size={24} className="mt-0.5 shrink-0 text-olive" aria-hidden />
              <div className="grid min-w-0 gap-2">
                <h3 className="font-serif text-2xl font-bold text-olive dark:text-white">
                  Transferencia bancaria
                </h3>
                <p className="text-sm leading-6 text-olive/75 dark:text-white/70">
                  Si os resulta más cómodo, también podéis hacernos llegar vuestro detalle mediante
                  transferencia bancaria. Os agradecemos de corazón vuestra generosidad y, sobre
                  todo, el cariño de acompañarnos en este momento tan importante para nosotros.
                </p>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em]">Titular</p>
                  <p className="mt-1 text-sm font-semibold text-olive dark:text-white">
                    {ACCOUNT_HOLDER}
                  </p>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em]">IBAN</p>
                  <p className="mt-1 font-mono text-sm font-semibold tracking-wide text-olive dark:text-white">
                    {IBAN}
                  </p>
                  <Button type="button" size="sm" className="mt-4" onClick={copyIban}>
                    <Copy className="h-4 w-4" />
                    Copiar IBAN
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
