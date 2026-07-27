import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SectionTitle } from '@/components/ui/section-title';
import { getInvitationByCode, type Invitation } from '@/lib/api';

type RsvpCodeCheckProps = {
  onFound: (invitation: Invitation) => void;
};
export function RsvpCodeCheck({ onFound }: RsvpCodeCheckProps) {
  const [code, setCode] = useState('');
  const getInvitation = useMutation({ mutationFn: getInvitationByCode, onSuccess: onFound });
  return (
    <section id="rsvp" className="bg-linen min-h-[calc(100vh-10rem)] py-10">
      <div className="section-shell mx-auto grid w-full max-w-xl gap-5">
        <div>
          <SectionTitle
            eyebrow="RSVP"
            title="Ayudadnos a preparar vuestra bienvenida."
            text="Incluso si no podéis asistir, confírmalo aquí para que nos podamos organizar."
          />
          <Card>
            <Label htmlFor="code">Código de invitación</Label>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <Input
                id="code"
                value={code}
                onChange={(event) => setCode(event.target.value.toUpperCase())}
                placeholder="CASA-GUMIRA"
              />
              <Button
                onClick={() => getInvitation.mutate(code)}
                disabled={getInvitation.isPending}
                className="shrink-0 whitespace-nowrap"
              >
                <LogIn className="h-4 w-4" />
                Buscar invitación
              </Button>
            </div>
            {getInvitation.isError ? (
              <p className="mt-3 text-sm text-terracotta">
                No encontramos ese código. Prueba con GUMIRA-2026.
              </p>
            ) : null}
          </Card>
        </div>
      </div>
    </section>
  );
}
