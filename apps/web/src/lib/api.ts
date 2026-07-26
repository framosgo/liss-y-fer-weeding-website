export const API_URL = import.meta.env.VITE_API_URL ?? `http://${window.location.hostname}:4000`;

export type Announcement = {
  id: string;
  title: string;
  body: string;
  priority: 'LOW' | 'NORMAL' | 'HIGH';
  publishedAt: string;
};

export type Guest = {
  id: string;
  name: string;
  attending: boolean | null;
};

export type Invitation = {
  id: string;
  invitationCode: string;
  primaryName: string;
  partySize: number;
  guests: Guest[];
};

export async function getAnnouncements(): Promise<Announcement[]> {
  const response = await fetch(`${API_URL}/announcements`);
  if (!response.ok) throw new Error('No se pudieron cargar los anuncios');
  return response.json();
}

export async function getInvitationByCode(code: string): Promise<Invitation> {
  const response = await fetch(`${API_URL}/invitations/${encodeURIComponent(code)}`);
  if (!response.ok) throw new Error('Código de invitación no encontrado');
  return response.json();
}

export async function submitRsvp(payload: unknown) {
  const response = await fetch(`${API_URL}/rsvp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!response.ok) throw new Error('No se pudo enviar el RSVP');
  return response.json();
}

export async function signGuestbook(payload: unknown) {
  const response = await fetch(`${API_URL}/guestbook`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!response.ok) throw new Error('No se pudo firmar el libro de firmas');
  return response.json();
}
