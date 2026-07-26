import { useState } from 'react';
import { RsvpCodeCheck } from '@/components/sections/RsvpCodeCheck';
import { RsvpForm } from '@/components/sections/RsvpForm';
import { RsvpSuccess } from '@/components/sections/RsvpSuccess';
import { Guest, type Invitation } from '@/lib/api';

export function RsvpPage() {
  const [invitation, setInvitation] = useState<Invitation | null>(null);
  const [guests, setGuests] = useState<Guest[]>([]);

  if (guests.length > 0) {
    return <RsvpSuccess guests={guests} />;
  }

  if (invitation) {
    return <RsvpForm invitation={invitation} onSubmitted={setGuests} />;
  }

  return <RsvpCodeCheck onFound={setInvitation} />;
}
