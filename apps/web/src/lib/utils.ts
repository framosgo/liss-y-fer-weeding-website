import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createCalendarHref() {
  const dates = '20270621T170000Z/20270622T020000Z';
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: 'Clara & Mateo Wedding',
    dates,
    details: 'Ceremony, dinner, dancing, and late-night buses. RSVP with your invitation code.',
    location: 'Hacienda La Soledad, Seville, Spain'
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function formatCount(value: number) {
  return value.toString().padStart(2, '0');
}
