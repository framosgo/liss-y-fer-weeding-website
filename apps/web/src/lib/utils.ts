import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createCalendarHref() {
  const dates = '20261016T150000Z/20261017T010000Z';
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: 'Boda de Liss y Fer',
    dates,
    details: 'Ceremonia, cena, baile y autobuses de regreso. Confirmad asistencia con vuestro código de invitación.',
    location: 'Casa Gumira, Barcelona'
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function formatCount(value: number) {
  return value.toString().padStart(2, '0');
}
