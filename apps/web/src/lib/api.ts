export const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000';

export type Announcement = {
  id: string;
  title: string;
  body: string;
  priority: 'LOW' | 'NORMAL' | 'HIGH';
  publishedAt: string;
};

export type GuestLookup = {
  id: string;
  invitationCode: string;
  primaryName: string;
  partySize: number;
  attendees: { id: string; name: string; meal: string | null; attending: boolean | null }[];
};

export async function getAnnouncements(): Promise<Announcement[]> {
  const response = await fetch(`${API_URL}/announcements`);
  if (!response.ok) throw new Error('Could not load announcements');
  return response.json();
}

export async function lookupGuest(code: string): Promise<GuestLookup> {
  const response = await fetch(`${API_URL}/guests/lookup/${encodeURIComponent(code)}`);
  if (!response.ok) throw new Error('Invitation code not found');
  return response.json();
}

export async function submitRsvp(payload: unknown) {
  const response = await fetch(`${API_URL}/rsvp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!response.ok) throw new Error('Could not submit RSVP');
  return response.json();
}

export async function signGuestbook(payload: unknown) {
  const response = await fetch(`${API_URL}/guestbook`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!response.ok) throw new Error('Could not sign guestbook');
  return response.json();
}
