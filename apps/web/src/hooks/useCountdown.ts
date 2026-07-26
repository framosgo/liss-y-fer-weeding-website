import { useEffect, useState } from 'react';
import { weddingDate } from '@/lib/constants';

export function useCountdown() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);
  const diff = Math.max(weddingDate.getTime() - now.getTime(), 0);
  return {
    días: Math.floor(diff / 86_400_000),
    horas: Math.floor((diff / 3_600_000) % 24),
    minutos: Math.floor((diff / 60_000) % 60),
    segundos: Math.floor((diff / 1000) % 60),
  };
}
