export function SectionTitle({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="mb-10 max-w-2xl">
      <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#800020]/90">{eyebrow}</p>
      <h2 className="mt-3 font-serif text-4xl font-semibold text-olive dark:text-white sm:text-5xl">
        {title}
      </h2>
      {text ? (
        <p className="mt-4 text-base leading-7 text-olive/78 dark:text-white/72">{text}</p>
      ) : null}
    </div>
  );
}
