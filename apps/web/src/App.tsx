import { useEffect, useMemo, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CalendarDays,
  ChevronDown,
  Download,
  Heart,
  Hotel,
  LogIn,
  MapPin,
  Menu,
  Moon,
  Music2,
  Plane,
  Send,
  Sun,
  Utensils,
  Wine
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { createCalendarHref, formatCount } from '@/lib/utils';
import { getAnnouncements, lookupGuest, signGuestbook, submitRsvp, type GuestLookup } from '@/lib/api';

const weddingDate = new Date('2027-06-21T17:00:00+02:00');

const story = [
  ['2018', 'A first coffee that became a five-hour walk through Madrid.'],
  ['2020', 'Long-distance letters, shared playlists, and Sunday video dinners.'],
  ['2023', 'A rainy proposal under olive trees in Andalusia.'],
  ['2027', 'The weekend we get to gather everyone we love.']
];

const itinerary = [
  ['17:00', 'Garden ceremony', 'Arrive early for cava and shaded seating.'],
  ['18:00', 'Cocktail hour', 'Live guitar, passed bites, and family portraits.'],
  ['20:00', 'Dinner', 'Seasonal Andalusian menu with paired wines.'],
  ['22:30', 'First dance', 'Courtyard lights, dessert, and a very full dance floor.'],
  ['01:00', 'Late buses', 'Return shuttles to Seville center every 30 minutes.']
];

const rsvpSchema = z.object({
  invitationCode: z.string().min(3),
  guests: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      attending: z.boolean(),
      meal: z.string().min(1),
      allergies: z.string().optional()
    }),
  ),
  songRequest: z.string().optional(),
  note: z.string().optional()
});

type RsvpValues = z.infer<typeof rsvpSchema>;

function useCountdown() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);
  const diff = Math.max(weddingDate.getTime() - now.getTime(), 0);
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60)
  };
}

function Nav({ dark, setDark }: { dark: boolean; setDark: (value: boolean) => void }) {
  const [open, setOpen] = useState(false);
  const links = ['story', 'itinerary', 'venue', 'travel', 'rsvp', 'gallery', 'faq'];
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/20 bg-background/82 backdrop-blur-xl">
      <nav className="section-shell flex h-16 items-center justify-between">
        <a className="font-serif text-2xl font-semibold text-burgundy dark:text-white" href="#top">
          C & M
        </a>
        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <a key={link} className="rounded-full px-4 py-2 text-sm font-semibold capitalize hover:bg-rose/15" href={`#${link}`}>
              {link}
            </a>
          ))}
          <a className="rounded-full px-4 py-2 text-sm font-semibold hover:bg-rose/15" href="/admin">
            Admin
          </a>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" aria-label="Toggle theme" onClick={() => setDark(!dark)}>
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <Button variant="ghost" size="sm" className="md:hidden" aria-label="Open navigation" onClick={() => setOpen(!open)}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="section-shell grid gap-2 pb-4 md:hidden"
          >
            {links.map((link) => (
              <a key={link} className="rounded-md px-3 py-2 text-sm font-semibold capitalize hover:bg-rose/15" href={`#${link}`} onClick={() => setOpen(false)}>
                {link}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function AnnouncementBanner() {
  const { data } = useQuery({ queryKey: ['announcements'], queryFn: getAnnouncements, refetchInterval: 30_000 });
  const announcement = data?.[0];
  if (!announcement) return null;
  return (
    <motion.div initial={{ y: -32, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mt-16 bg-burgundy text-white">
      <div className="section-shell flex items-center gap-3 py-3 text-sm">
        <Heart className="h-4 w-4 shrink-0 text-rose" />
        <p><span className="font-semibold">{announcement.title}:</span> {announcement.body}</p>
      </div>
    </motion.div>
  );
}

function EnvelopeLanding({ opened, setOpened }: { opened: boolean; setOpened: (value: boolean) => void }) {
  return (
    <AnimatePresence>
      {!opened && (
        <motion.section
          id="top"
          className="fixed inset-0 z-[60] grid place-items-center bg-linen px-4"
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.75 }}
        >
          <motion.div initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="max-w-md text-center">
            <button
              className="group relative mx-auto mb-8 block h-56 w-full max-w-sm rounded-lg border border-burgundy/20 bg-[#fff8f6] shadow-bloom"
              onClick={() => setOpened(true)}
              aria-label="Open invitation"
            >
              <motion.span
                className="absolute inset-x-0 top-0 h-28 origin-top rounded-t-lg bg-rose"
                animate={{ rotateX: [0, -20, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                style={{ clipPath: 'polygon(0 0,100% 0,50% 100%)' }}
              />
              <span className="absolute inset-x-0 bottom-8 font-serif text-5xl font-semibold text-burgundy">C & M</span>
              <span className="absolute bottom-5 left-1/2 -translate-x-1/2 text-xs font-bold uppercase tracking-[0.3em] text-olive">Open invitation</span>
            </button>
            <p className="font-serif text-4xl font-semibold text-burgundy">Clara & Mateo</p>
            <p className="mt-3 text-sm font-semibold uppercase tracking-[0.3em] text-olive">June 21, 2027 | Seville</p>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}

function Hero() {
  const countdown = useCountdown();
  return (
    <section className="relative min-h-[92vh] overflow-hidden bg-burgundy pt-28 text-white">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1800&q=80')] bg-cover bg-center opacity-55" />
      <div className="absolute inset-0 bg-gradient-to-b from-burgundy/50 via-burgundy/45 to-burgundy" />
      <div className="section-shell relative grid min-h-[72vh] content-center pb-16">
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-4 text-sm font-bold uppercase tracking-[0.36em] text-rose">
          You are invited
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} className="max-w-4xl font-serif text-6xl font-semibold leading-none sm:text-7xl lg:text-8xl">
          Clara & Mateo
        </motion.h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-white/86">
          A candlelit Andalusian wedding weekend with garden vows, late-night dancing, olive groves, and every person who made our story feel like home.
        </p>
        <div className="mt-10 grid max-w-2xl grid-cols-4 gap-3">
          {Object.entries(countdown).map(([label, value]) => (
            <div key={label} className="rounded-lg border border-white/20 bg-white/12 p-3 text-center backdrop-blur">
              <div className="font-serif text-3xl font-semibold">{formatCount(value)}</div>
              <div className="mt-1 text-xs uppercase tracking-[0.2em] text-white/70">{label}</div>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild size="lg"><a href="#rsvp">RSVP now</a></Button>
          <Button asChild size="lg" variant="outline"><a href={createCalendarHref()} target="_blank" rel="noreferrer"><CalendarDays className="h-4 w-4" /> Add to Calendar</a></Button>
        </div>
      </div>
    </section>
  );
}

function SectionTitle({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="mb-10 max-w-2xl">
      <p className="text-sm font-bold uppercase tracking-[0.28em] text-terracotta">{eyebrow}</p>
      <h2 className="mt-3 font-serif text-4xl font-semibold text-burgundy dark:text-white sm:text-5xl">{title}</h2>
      {text ? <p className="mt-4 text-base leading-7 text-burgundy/72 dark:text-white/72">{text}</p> : null}
    </div>
  );
}

function TimelineSections() {
  return (
    <>
      <section id="story" className="py-20">
        <div className="section-shell">
          <SectionTitle eyebrow="Our story" title="A timeline written in tiny rituals." text="Hover, tap, and wander through the moments that brought us here." />
          <div className="grid gap-4 md:grid-cols-4">
            {story.map(([year, text], index) => (
              <motion.div key={year} whileHover={{ y: -8 }} className="rounded-lg border border-burgundy/10 bg-white/70 p-5 shadow-sm dark:bg-white/8">
                <div className="aspect-[4/5] rounded-md bg-cover bg-center" style={{ backgroundImage: `url(https://images.unsplash.com/photo-${['1519741497674-611481863552','1529634806980-85c3dd6d34ac','1519225421980-715cb0215aed','1494955870715-979ca4f13bf0'][index]}?auto=format&fit=crop&w=700&q=80)` }} />
                <p className="mt-5 font-serif text-3xl font-semibold text-burgundy dark:text-white">{year}</p>
                <p className="mt-2 text-sm leading-6 text-burgundy/70 dark:text-white/70">{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section id="itinerary" className="bg-olive/10 py-20 dark:bg-white/5">
        <div className="section-shell">
          <SectionTitle eyebrow="Wedding day" title="A relaxed, golden-hour rhythm." />
          <div className="relative grid gap-5 before:absolute before:left-5 before:top-3 before:h-[calc(100%-1rem)] before:w-px before:bg-rose/60 md:ml-6">
            {itinerary.map(([time, title, text]) => (
              <motion.div key={time} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative ml-12 rounded-lg bg-white/82 p-5 shadow-sm dark:bg-white/8">
                <span className="absolute -left-[3.1rem] top-5 grid h-10 w-10 place-items-center rounded-full bg-burgundy text-xs font-bold text-white">{time}</span>
                <h3 className="font-serif text-2xl font-semibold">{title}</h3>
                <p className="mt-1 text-sm leading-6 text-burgundy/70 dark:text-white/70">{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function InfoSections() {
  const hotels = ['Hotel Alfonso XIII', 'Triana House', 'Placid Hotel Boutique'];
  const buses = ['15:45 Seville Cathedral pickup', '16:05 Triana bridge pickup', '01:00, 01:30, 02:00 return loops'];
  return (
    <>
      <section id="venue" className="py-20">
        <div className="section-shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <SectionTitle eyebrow="Venue" title="Hacienda La Soledad" text="An olive-grove estate just outside Seville, with ceremony gardens, courtyard dinner, and indoor late-night dancing." />
            <div className="grid gap-3 sm:grid-cols-2">
              <Card><MapPin className="mb-3 h-5 w-5 text-terracotta" /> Carretera A-8028, Seville</Card>
              <Card><Wine className="mb-3 h-5 w-5 text-terracotta" /> Welcome cava from 16:30</Card>
            </div>
          </div>
          <div className="map-frame h-[420px] overflow-hidden rounded-lg shadow-bloom">
            <iframe title="Venue map" loading="lazy" src="https://www.google.com/maps?q=Seville%20Spain&output=embed" />
          </div>
        </div>
      </section>
      <section id="travel" className="bg-burgundy py-20 text-white">
        <div className="section-shell">
          <SectionTitle eyebrow="Travel" title="Stay close, move easily." text="Book near the old town or Triana for the smoothest weekend flow." />
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="bg-white/10 text-white"><Plane className="mb-4 h-6 w-6 text-mustard" /> Fly into Seville Airport, or take the train from Madrid Atocha.</Card>
            <Card className="bg-white/10 text-white"><Hotel className="mb-4 h-6 w-6 text-mustard" /> {hotels.join(', ')} all have room blocks until March 1.</Card>
            <Card className="bg-white/10 text-white"><MapPin className="mb-4 h-6 w-6 text-mustard" /> Taxis and rideshare are reliable, but buses are included for wedding day.</Card>
          </div>
          <div className="mt-8 rounded-lg border border-white/15 bg-white/8 p-5">
            <h3 className="font-serif text-3xl font-semibold">Bus schedule</h3>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {buses.map((bus) => <div key={bus} className="rounded-md bg-white/10 p-4 text-sm">{bus}</div>)}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function RsvpSection() {
  const [guest, setGuest] = useState<GuestLookup | null>(null);
  const [code, setCode] = useState('OLIVE-2027');
  const lookup = useMutation({ mutationFn: lookupGuest, onSuccess: setGuest });
  const rsvp = useMutation({ mutationFn: submitRsvp });
  const form = useForm<RsvpValues>({
    resolver: zodResolver(rsvpSchema),
    values: guest
      ? {
          invitationCode: guest.invitationCode,
          guests: guest.attendees.map((attendee) => ({
            id: attendee.id,
            name: attendee.name,
            attending: attendee.attending ?? true,
            meal: attendee.meal ?? 'Sea bass',
            allergies: ''
          })),
          songRequest: '',
          note: ''
        }
      : undefined
  });
  const { fields } = useFieldArray({ control: form.control, name: 'guests' });

  return (
    <section id="rsvp" className="bg-linen py-20">
      <div className="section-shell grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
        <div>
          <SectionTitle eyebrow="RSVP" title="Tell us how to host you beautifully." text="Use your invitation code to confirm attendance, meals, allergies, and your must-play dance floor song." />
          <Card>
            <Label htmlFor="code">Invitation code</Label>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <Input id="code" value={code} onChange={(event) => setCode(event.target.value.toUpperCase())} />
              <Button onClick={() => lookup.mutate(code)} disabled={lookup.isPending}><LogIn className="h-4 w-4" /> Find invitation</Button>
            </div>
            {lookup.isError ? <p className="mt-3 text-sm text-terracotta">We could not find that code. Try OLIVE-2027.</p> : null}
          </Card>
        </div>
        <Card className="p-6">
          {!guest ? (
            <div className="grid min-h-72 place-items-center text-center">
              <div>
                <Heart className="mx-auto mb-4 h-10 w-10 text-rose" />
                <p className="font-serif text-3xl font-semibold">Your RSVP details will appear here.</p>
              </div>
            </div>
          ) : (
            <form className="grid gap-5" onSubmit={form.handleSubmit((values) => rsvp.mutate(values))}>
              <h3 className="font-serif text-3xl font-semibold">{guest.primaryName} party</h3>
              {fields.map((field, index) => (
                <div key={field.id} className="rounded-lg border border-burgundy/10 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="font-semibold">{field.name}</p>
                    <label className="flex items-center gap-2 text-sm font-semibold">
                      <input type="checkbox" {...form.register(`guests.${index}.attending`)} />
                      Attending
                    </label>
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <label className="grid gap-2 text-sm font-semibold">Meal
                      <select className="h-12 rounded-md border border-burgundy/15 bg-white px-3 dark:bg-burgundy" {...form.register(`guests.${index}.meal`)}>
                        <option>Sea bass</option>
                        <option>Herb roasted chicken</option>
                        <option>Wild mushroom risotto</option>
                        <option>Child meal</option>
                      </select>
                    </label>
                    <label className="grid gap-2 text-sm font-semibold">Allergies
                      <Input placeholder="Nuts, gluten, shellfish..." {...form.register(`guests.${index}.allergies`)} />
                    </label>
                  </div>
                </div>
              ))}
              <label className="grid gap-2 text-sm font-semibold">Song request
                <Input placeholder="The song that gets you dancing" {...form.register('songRequest')} />
              </label>
              <label className="grid gap-2 text-sm font-semibold">Note
                <Textarea placeholder="Anything else we should know?" {...form.register('note')} />
              </label>
              <Button type="submit" disabled={rsvp.isPending}><Send className="h-4 w-4" /> Send RSVP</Button>
              {rsvp.isSuccess ? <p className="text-sm font-semibold text-olive">RSVP received. We cannot wait to celebrate with you.</p> : null}
            </form>
          )}
        </Card>
      </div>
    </section>
  );
}

function GalleryAndDetails() {
  const images = ['1502635385003-ee1e6a1a742d', '1520854221256-17451cc331bf', '1522673607200-164d1b6ce486', '1519225421980-715cb0215aed', '1523438885200-e635ba2c371e', '1529634806980-85c3dd6d34ac'];
  return (
    <>
      <section id="gallery" className="py-20">
        <div className="section-shell">
          <SectionTitle eyebrow="Dress code and photos" title="Garden formal, with color and texture." text="Think linen suits, long dresses, soft florals, olive, rose, burgundy, terracotta, and mustard accents." />
          <div className="mb-8 flex flex-wrap gap-3">
            {['#828256', '#c6908f', '#470d13', '#bc5830', '#c69138'].map((color) => <span key={color} className="h-12 w-12 rounded-full border border-white shadow-sm" style={{ backgroundColor: color }} />)}
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {images.map((image, index) => (
              <motion.div key={image} whileHover={{ scale: 0.985 }} className={index === 0 ? 'col-span-2 row-span-2' : ''}>
                <img className="h-full min-h-44 w-full rounded-lg object-cover" src={`https://images.unsplash.com/photo-${image}?auto=format&fit=crop&w=900&q=80`} alt="Engagement and dress inspiration" loading="lazy" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-rose/15 py-20">
        <div className="section-shell grid gap-6 md:grid-cols-3">
          <Card><Utensils className="mb-4 h-6 w-6 text-terracotta" /><h3 className="font-serif text-2xl">Menu</h3><p className="mt-2 text-sm leading-6">Local produce, vegetarian options, and late-night churros.</p></Card>
          <Card><Music2 className="mb-4 h-6 w-6 text-terracotta" /><h3 className="font-serif text-2xl">Music</h3><p className="mt-2 text-sm leading-6">Flamenco cocktail set, soul dinner playlist, and a DJ after dessert.</p></Card>
          <Card><Download className="mb-4 h-6 w-6 text-terracotta" /><h3 className="font-serif text-2xl">Gifts</h3><p className="mt-2 text-sm leading-6">Your presence is enough. For those asking, our honeymoon fund supports a slow trip through Japan.</p></Card>
        </div>
      </section>
    </>
  );
}

function FaqGuestbook() {
  const guestbook = useMutation({ mutationFn: signGuestbook });
  const form = useForm({ defaultValues: { name: '', message: '' } });
  const faqs = [
    ['Can I bring a plus one?', 'If your invitation includes one, it will appear in your RSVP party.'],
    ['Are children invited?', 'Little ones named on your invitation are warmly included.'],
    ['Will the ceremony be outside?', 'Yes, weather permitting. We have a covered backup space.'],
    ['When should I RSVP?', 'Please reply by April 15, 2027.']
  ];
  return (
    <section id="faq" className="py-20">
      <div className="section-shell grid gap-10 lg:grid-cols-2">
        <div>
          <SectionTitle eyebrow="FAQ" title="Small details, answered." />
          <div className="grid gap-3">
            {faqs.map(([question, answer]) => (
              <details key={question} className="rounded-lg border border-burgundy/10 bg-white/70 p-4 dark:bg-white/8">
                <summary className="flex cursor-pointer list-none items-center justify-between font-semibold">{question}<ChevronDown className="h-4 w-4" /></summary>
                <p className="mt-3 text-sm leading-6 text-burgundy/70 dark:text-white/70">{answer}</p>
              </details>
            ))}
          </div>
        </div>
        <Card className="p-6">
          <SectionTitle eyebrow="Guestbook" title="Leave a note." />
          <form className="grid gap-4" onSubmit={form.handleSubmit((values) => guestbook.mutate(values))}>
            <Input placeholder="Your name" {...form.register('name', { required: true })} />
            <Textarea placeholder="A toast, a memory, or excellent dance floor advice" {...form.register('message', { required: true })} />
            <Button type="submit" disabled={guestbook.isPending}>Sign guestbook</Button>
            {guestbook.isSuccess ? <p className="text-sm font-semibold text-olive">Message saved with love.</p> : null}
          </form>
          <div className="mt-8 border-t border-burgundy/10 pt-6 text-sm leading-7">
            <p><strong>Contact:</strong> wedding@clara-mateo.example</p>
            <p><strong>Planner:</strong> Lucia, +34 600 000 000</p>
          </div>
        </Card>
      </div>
    </section>
  );
}

function HomePage() {
  const [opened, setOpened] = useState(() => localStorage.getItem('invitation-opened') === 'true');
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark');
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);
  useEffect(() => {
    if (opened) localStorage.setItem('invitation-opened', 'true');
  }, [opened]);
  return (
    <>
      <Nav dark={dark} setDark={setDark} />
      <AnnouncementBanner />
      <EnvelopeLanding opened={opened} setOpened={setOpened} />
      <main>
        <Hero />
        <TimelineSections />
        <InfoSections />
        <RsvpSection />
        <GalleryAndDetails />
        <FaqGuestbook />
      </main>
      <footer className="bg-burgundy py-10 text-center text-sm text-white/70">Clara & Mateo | Seville | 21 June 2027</footer>
    </>
  );
}

function AdminPage() {
  const [token, setToken] = useState(localStorage.getItem('admin-token'));
  const stats = useQuery({
    queryKey: ['admin-stats', token],
    enabled: Boolean(token),
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL ?? 'http://localhost:4000'}/admin/stats`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Unauthorized');
      return response.json();
    }
  });
  const login = useMutation({
    mutationFn: async (values: { email: string; password: string }) => {
      const response = await fetch(`${import.meta.env.VITE_API_URL ?? 'http://localhost:4000'}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      });
      if (!response.ok) throw new Error('Login failed');
      return response.json();
    },
    onSuccess: (data) => {
      localStorage.setItem('admin-token', data.accessToken);
      setToken(data.accessToken);
    }
  });
  const loginForm = useForm({ defaultValues: { email: 'admin@boda.local', password: 'change-me' } });
  const cards = useMemo(() => stats.data ? [
    ['Confirmed', stats.data.confirmed],
    ['Pending', stats.data.pending],
    ['Declined', stats.data.declined],
    ['Allergies', stats.data.allergyCount],
    ['Song requests', stats.data.songRequests]
  ] : [], [stats.data]);
  return (
    <main className="min-h-screen bg-linen py-12">
      <div className="section-shell">
        <a href="/" className="text-sm font-semibold text-burgundy">Back to wedding site</a>
        <h1 className="mt-8 font-serif text-5xl font-semibold text-burgundy">Admin dashboard</h1>
        {!token ? (
          <Card className="mt-8 max-w-md">
            <form className="grid gap-4" onSubmit={loginForm.handleSubmit((values) => login.mutate(values))}>
              <Input type="email" {...loginForm.register('email')} />
              <Input type="password" {...loginForm.register('password')} />
              <Button type="submit"><LogIn className="h-4 w-4" /> Sign in</Button>
            </form>
          </Card>
        ) : (
          <div className="mt-8 grid gap-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {cards.map(([label, value]) => (
                <Card key={label as string}><p className="text-sm font-semibold text-olive">{label}</p><p className="mt-2 font-serif text-4xl">{value as number}</p></Card>
              ))}
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              <Card><h2 className="font-serif text-3xl">Meal counts</h2><pre className="mt-4 whitespace-pre-wrap text-sm">{JSON.stringify(stats.data?.mealCounts, null, 2)}</pre></Card>
              <Card><h2 className="font-serif text-3xl">Pending guests</h2><pre className="mt-4 whitespace-pre-wrap text-sm">{JSON.stringify(stats.data?.pendingGuests, null, 2)}</pre></Card>
            </div>
            <Button asChild variant="secondary"><a href={`${import.meta.env.VITE_API_URL ?? 'http://localhost:4000'}/admin/export`}><Download className="h-4 w-4" /> Export RSVPs</a></Button>
          </div>
        )}
      </div>
    </main>
  );
}

export default function App() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </AnimatePresence>
  );
}
