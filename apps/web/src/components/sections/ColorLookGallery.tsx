import { useState } from 'react';

export const DRESS_CODE_PATH = '/images/dress-code';

export const dressCodeColors = [
  {
    slug: 'marron-chocolate',
    name: 'Marrón chocolate',
    color: '#654321',
  },
  {
    slug: 'burdeos',
    name: 'Burdeos',
    color: '#800020',
  },
  {
    slug: 'terracota',
    name: 'Terracota',
    color: '#bc5830',
  },
  {
    slug: 'mostaza',
    name: 'Mostaza',
    color: '#c69138',
  },
  {
    slug: 'camel',
    name: 'Camel',
    color: '#c19a6b',
  },
  {
    slug: 'rosa-empolvado',
    name: 'Rosa empolvado',
    color: '#c6908f',
  },
] as const;

type DressColorSlug = (typeof dressCodeColors)[number]['slug'];
type DressCodeGender = 'woman' | 'man';

function dressCodeImagePath(slug: DressColorSlug, gender: DressCodeGender) {
  return `${DRESS_CODE_PATH}/${slug}/${gender}.png`;
}

export function ColorLookGallery({
  title,
  subtitle,
  gender,
  imageAlt,
  thumbAriaLabel,
}: {
  title: string;
  subtitle: string;
  gender: DressCodeGender;
  imageAlt: (colorName: string) => string;
  thumbAriaLabel: (colorName: string) => string;
}) {
  const [selectedSlug, setSelectedSlug] = useState<DressColorSlug>('burdeos');
  const selected =
    dressCodeColors.find((item) => item.slug === selectedSlug) ?? dressCodeColors[1];

  return (
    <div className="mt-16 border-t border-olive/15 pt-14">
      <div className="mx-auto max-w-2xl text-center">
        <h3 className="font-serif text-3xl font-semibold tracking-wide text-olive sm:text-4xl">
          {title}
        </h3>
        <p className="mt-4 text-center text-xs uppercase tracking-[0.22em] text-olive/55">
          {subtitle}
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-md">
        <figure className="overflow-hidden">
          <img
            key={`${gender}-${selected.slug}`}
            src={dressCodeImagePath(selected.slug, gender)}
            alt={imageAlt(selected.name)}
            className="aspect-[3/4] w-full object-cover object-top"
          />
        </figure>

        <div className="mt-4 grid grid-cols-6 gap-2">
          {dressCodeColors.map(({ slug, name }) => {
            const isSelected = slug === selectedSlug;
            return (
              <button
                key={slug}
                type="button"
                onClick={() => setSelectedSlug(slug)}
                className={`overflow-hidden ring-1 transition ${
                  isSelected
                    ? 'ring-burdeos opacity-100'
                    : 'ring-transparent opacity-55 hover:opacity-100'
                }`}
                aria-label={thumbAriaLabel(name)}
                aria-pressed={isSelected}
              >
                <img
                  src={dressCodeImagePath(slug, gender)}
                  alt=""
                  className="aspect-[3/4] w-full object-cover object-top"
                  loading="lazy"
                  decoding="async"
                />
              </button>
            );
          })}
        </div>

        <div className="mt-5 flex flex-col items-center gap-2 text-center">
          <span
            className="h-9 w-9 rounded-full border border-white shadow-sm"
            style={{ backgroundColor: selected.color }}
            aria-hidden
          />
          <p className="font-serif text-sm font-semibold uppercase tracking-[0.14em] text-olive">
            {selected.name}
          </p>
          <p className="text-xs uppercase tracking-[0.18em] text-olive/55">{selected.color}</p>
        </div>
      </div>
    </div>
  );
}
