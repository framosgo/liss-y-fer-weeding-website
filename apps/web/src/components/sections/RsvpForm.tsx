import { useMutation } from '@tanstack/react-query';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Bus, Music, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Guest, submitRsvp, type Invitation } from '@/lib/api';
import { SectionTitle } from '../ui/section-title';
import { Textarea } from '../ui/textarea';

const rsvpSchema = z.object({
  invitationCode: z.string().min(3),
  guests: z.array(
    z
      .object({
        id: z.string(),
        name: z.string(),
        attending: z.boolean(),
        hasAllergies: z.boolean(),
        allergies: z.string().optional(),
      })
      .superRefine((guest, ctx) => {
        if (guest.hasAllergies && !guest.allergies?.trim()) {
          ctx.addIssue({
            code: 'custom',
            message: 'Indícanos tus restricciones alimentarias',
            path: ['allergies'],
          });
        }
      }),
  ),
  songRequest: z.string().optional(),
  requiresBus: z.boolean(),
  note: z.string().optional(),
});

type RsvpValues = z.infer<typeof rsvpSchema>;

type RsvpFormProps = {
  invitation: Invitation;
  onSubmitted: (guests: Guest[]) => void;
};
export function RsvpForm({ invitation, onSubmitted }: RsvpFormProps) {
  const rsvp = useMutation({ mutationFn: submitRsvp });
  const form = useForm<RsvpValues>({
    resolver: zodResolver(rsvpSchema),
    mode: 'onChange',
    values: {
      invitationCode: invitation.invitationCode,
      guests: invitation.guests.map((guest) => ({
        id: guest.id,
        name: guest.name,
        attending: guest.attending ?? false,
        hasAllergies: false,
        allergies: '',
      })),
      songRequest: '',
      requiresBus: false,
      note: '',
    },
  });
  const { fields } = useFieldArray({ control: form.control, name: 'guests' });
  const { isValid, errors } = form.formState;

  const onSubmit = (values: RsvpValues) => {
    const anyAttending = values.guests.some((guest) => guest.attending);
    rsvp.mutate(
      {
        invitationCode: values.invitationCode.trim(),
        note: values.note?.trim() || undefined,
        requiresBus: anyAttending ? values.requiresBus : false,
        songRequest: anyAttending ? values.songRequest?.trim() || '' : '',
        guests: values.guests.map(({ hasAllergies, allergies, ...guest }) => ({
          ...guest,
          allergies: hasAllergies ? allergies?.trim() || '' : '',
        })),
      },
      {
        onSuccess: () => onSubmitted(values.guests),
      },
    );
  };

  const isOnlyOneGuest = invitation.guests.length === 1;
  const anyAttending = form.watch('guests')?.some((guest) => guest.attending);
  const isOnlyOneGuestAttending =
    form.watch('guests')?.filter((guest) => guest.attending).length === 1;

  return (
    <section id="rsvp" className="bg-linen min-h-[calc(100vh-10rem)] py-10">
      <div className="section-shell mx-auto grid w-full max-w-xl gap-5">
        <SectionTitle
          eyebrow={`Invitación de ${invitation.primaryName}`}
          title={isOnlyOneGuest ? 'Confírmanos tu asistencia' : 'Confirmadnos vuestras asistencias'}
        />
        <form className="grid gap-5" onSubmit={form.handleSubmit(onSubmit)}>
          {fields.map((field, index) => (
            <div key={field.id} className="rounded-lg border border-olive/15 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="font-semibold text-lg">{field.name}</p>
              </div>

              <div className="mt-4">
                <fieldset className="flex items-center justify-between gap-3">
                  <legend className="sr-only">¿Asistirás?</legend>
                  <span className="text-sm font-semibold">¿Asistirás?</span>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 text-sm font-semibold">
                      <input
                        type="radio"
                        name={`guests.${index}.attending`}
                        checked={form.watch(`guests.${index}.attending`) === true}
                        onChange={() =>
                          form.setValue(`guests.${index}.attending`, true, {
                            shouldDirty: true,
                            shouldValidate: true,
                          })
                        }
                      />
                      Sí
                    </label>
                    <label className="flex items-center gap-2 text-sm font-semibold">
                      <input
                        type="radio"
                        name={`guests.${index}.attending`}
                        checked={form.watch(`guests.${index}.attending`) === false}
                        onChange={() => {
                          form.setValue(`guests.${index}.attending`, false, {
                            shouldDirty: true,
                          });
                          form.setValue(`guests.${index}.hasAllergies`, false, {
                            shouldDirty: true,
                          });
                          form.setValue(`guests.${index}.allergies`, '', { shouldDirty: true });
                          form.clearErrors(`guests.${index}.allergies`);
                          void form.trigger();
                        }}
                      />
                      No
                    </label>
                  </div>
                </fieldset>
              </div>
              {form.watch(`guests.${index}.attending`) ? (
                <div className="mt-4 grid gap-2">
                  <fieldset className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-2 whitespace-nowrap text-sm font-semibold">
                      ¿Restricciones alimentarias?
                    </span>
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2 text-sm font-semibold">
                        <input
                          type="radio"
                          name={`guests.${index}.hasAllergies`}
                          checked={form.watch(`guests.${index}.hasAllergies`) === true}
                          onChange={() => {
                            form.setValue(`guests.${index}.hasAllergies`, true, {
                              shouldDirty: true,
                            });
                            if (!form.getValues(`guests.${index}.allergies`)?.trim()) {
                              form.setError(`guests.${index}.allergies`, {
                                type: 'custom',
                                message: 'Indícanos tus restricciones alimentarias',
                              });
                            } else {
                              void form.trigger(`guests.${index}`);
                            }
                          }}
                        />
                        Sí
                      </label>
                      <label className="flex items-center gap-2 text-sm font-semibold">
                        <input
                          type="radio"
                          name={`guests.${index}.hasAllergies`}
                          checked={form.watch(`guests.${index}.hasAllergies`) === false}
                          onChange={() => {
                            form.setValue(`guests.${index}.hasAllergies`, false, {
                              shouldDirty: true,
                            });
                            form.setValue(`guests.${index}.allergies`, '', {
                              shouldDirty: true,
                            });
                            form.clearErrors(`guests.${index}.allergies`);
                            void form.trigger();
                          }}
                        />
                        No
                      </label>
                    </div>
                  </fieldset>
                  {form.watch(`guests.${index}.hasAllergies`) ? (
                    <div className="grid gap-1">
                      <Textarea
                        placeholder="Vegetariano, celiaquía, alergia a ..."
                        {...form.register(`guests.${index}.allergies`)}
                      />
                      {errors.guests?.[index]?.allergies ? (
                        <p className="text-sm text-terracotta">
                          {errors.guests[index].allergies.message}
                        </p>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          ))}
          {anyAttending ? (
            <>
              <label className="grid gap-2 text-sm font-semibold">
                <span className="flex items-center gap-2 whitespace-nowrap text-sm font-semibold">
                  <Music className="h-4 w-4 shrink-0 text-terracotta" />
                  {isOnlyOneGuest
                    ? 'La canción que te saca a bailar:'
                    : 'La canción que os saca a bailar:'}
                </span>
                <Input
                  placeholder="Escribe el título y el artista"
                  {...form.register('songRequest')}
                />
              </label>

              <div className="grid gap-2">
                <fieldset className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-2 whitespace-nowrap text-sm font-semibold">
                    <Bus className="h-4 w-4 shrink-0 text-terracotta" />
                    {isOnlyOneGuestAttending
                      ? '¿Necesitas que te llevemos?'
                      : '¿Necesitáis que os llevemos?'}
                  </span>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 text-sm font-semibold">
                      <input
                        type="radio"
                        name="requiresBus"
                        checked={form.watch('requiresBus') === true}
                        onChange={() =>
                          form.setValue('requiresBus', true, {
                            shouldDirty: true,
                            shouldValidate: true,
                          })
                        }
                      />
                      Sí
                    </label>
                    <label className="flex items-center gap-2 text-sm font-semibold">
                      <input
                        type="radio"
                        name="requiresBus"
                        checked={form.watch('requiresBus') === false}
                        onChange={() =>
                          form.setValue('requiresBus', false, {
                            shouldDirty: true,
                            shouldValidate: true,
                          })
                        }
                      />
                      No
                    </label>
                  </div>
                </fieldset>
                {form.watch('requiresBus') ? (
                  <p className="text-sm leading-6 text-olive/70 dark:text-white/65">
                    Aún estamos considerando contratar un bus para movilizaros desde Plaza Catalunya
                    a Casa Gumira ida y vuelta, pero por ahora puedes decirnos si necesitas que te
                    llevemos.
                  </p>
                ) : null}
              </div>
            </>
          ) : null}
          <Button type="submit" disabled={rsvp.isPending || !isValid} className="mt-2.5">
            <Send className="h-4 w-4" /> Enviar RSVP
          </Button>
        </form>
      </div>
    </section>
  );
}
