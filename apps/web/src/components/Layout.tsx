import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Nav } from '@/components/sections/Nav';

export function Layout() {
  const location = useLocation();
  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <div className="flex flex-1 flex-col pt-16">
        <AnimatePresence mode="wait">
          <motion.main
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="flex-1"
          >
            <Outlet />
          </motion.main>
        </AnimatePresence>
      </div>
      <footer className="bg-[#6A6256] py-10 text-center text-sm text-white/75">
        Liss y Fer | Casa Gumira | 16 octubre 2026
      </footer>
    </div>
  );
}
