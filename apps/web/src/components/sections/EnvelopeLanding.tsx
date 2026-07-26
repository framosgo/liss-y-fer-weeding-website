import { AnimatePresence, motion } from 'framer-motion';

export function EnvelopeLanding({
  opened,
  setOpened,
}: {
  opened: boolean;
  setOpened: (value: boolean) => void;
}) {
  return (
    <AnimatePresence>
      {!opened && (
        <motion.section
          id="top"
          className="fixed inset-0 z-[60] grid place-items-center bg-linen px-4"
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.75 }}
        >
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="max-w-md text-center"
          >
            <button
              className="group relative mx-auto mb-8 block h-56 w-full max-w-sm rounded-lg border border-olive/20 bg-[#fff8f6] shadow-bloom"
              onClick={() => setOpened(true)}
              aria-label="Abrir invitación"
            >
              <motion.span
                className="absolute inset-x-0 top-0 h-28 origin-top rounded-t-lg bg-olive"
                animate={{ rotateX: [0, -20, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                style={{ clipPath: 'polygon(0 0,100% 0,50% 100%)' }}
              />
              <span className="absolute inset-x-0 bottom-8 font-serif text-5xl font-semibold text-olive">
                L & F
              </span>
              <span className="absolute bottom-5 left-1/2 -translate-x-1/2 text-xs font-bold uppercase tracking-[0.3em] text-olive">
                Abrir invitación
              </span>
            </button>
            <p className="font-serif text-4xl font-semibold text-olive">Lissette y Fernando</p>
            <p className="mt-3 text-sm font-semibold uppercase tracking-[0.3em] text-olive">
              16 octubre 2026 | Barcelona
            </p>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
