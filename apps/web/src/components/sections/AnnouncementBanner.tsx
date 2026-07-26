import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { getAnnouncements } from '@/lib/api';

export function AnnouncementBanner() {
  const { data } = useQuery({ queryKey: ['announcements'], queryFn: getAnnouncements, refetchInterval: 30_000 });
  const announcement = data?.[0];
  if (!announcement) return null;
  return (
    <motion.div initial={{ y: -32, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-olive text-white">
      <div className="section-shell flex items-center gap-3 py-3 text-sm">
        <Heart className="h-4 w-4 shrink-0 text-terracotta" />
        <p>
          <span className="font-semibold">{announcement.title}:</span> {announcement.body}
        </p>
      </div>
    </motion.div>
  );
}
