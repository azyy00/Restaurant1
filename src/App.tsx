/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useMotionValueEvent,
  useInView,
  animate,
} from 'motion/react';
import {
  MapPin, Clock, Star, Menu as MenuIcon, X, ArrowUpRight, ArrowRight,
  Facebook, Instagram, Send, CheckCircle2, Flame, Navigation, Mail,
  User, MessageSquare, MessageCircle,
} from 'lucide-react';
import { menuItems, reviews } from './data';

// Adelpha's orders happen over Messenger. TODO: swap for the cafe's real page handle.
const FB_URL = 'https://www.facebook.com/adelphasburgerandcafe';
const MAP_QUERY = '13.699061478263891,123.48976055863386';

// Branded placeholder shown until a real local photo exists at the expected path.
const IMG_FALLBACK =
  'data:image/svg+xml,' +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300'>" +
      "<rect width='400' height='300' fill='#2D1800'/>" +
      "<text x='200' y='140' fill='#E8821A' font-family='Outfit, sans-serif' font-weight='800' font-size='30' text-anchor='middle'>Adelpha&#39;s</text>" +
      "<text x='200' y='173' fill='#FDF6EE' fill-opacity='0.45' font-family='Outfit, sans-serif' font-size='13' letter-spacing='3' text-anchor='middle'>PHOTO COMING SOON</text>" +
      '</svg>',
  );

function onImgError(e: React.SyntheticEvent<HTMLImageElement>) {
  const img = e.currentTarget;
  if (img.dataset.fallback) return; // guard against loops
  img.dataset.fallback = '1';
  img.src = IMG_FALLBACK;
}

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Menu', href: '#menu' },
  { label: 'Story', href: '#story' },
  { label: 'Visit', href: '#visit' },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export default function App() {
  const reduce = useReducedMotion();
  const [activeTab, setActiveTab] = useState('All');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Nav reacts to scroll for a weightier, premium feel once you leave the hero.
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 24));

  // Hero parallax.
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const burgerY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 90]);

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(menuItems.map((i) => i.category)))],
    [],
  );

  const filteredMenu =
    activeTab === 'All' ? menuItems : menuItems.filter((i) => i.category === activeTab);

  const reveal = (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: '-80px' },
          transition: { duration: 0.7, ease: EASE, delay },
        };

  // Staggered headline reveal.
  const headline = reduce
    ? {}
    : {
        initial: 'hidden',
        animate: 'show',
        variants: { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } },
      };
  const lineV = reduce
    ? {}
    : { variants: { hidden: { opacity: 0, y: 26 }, show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } } } };

  return (
    <div className="font-body bg-charcoal text-cream-warm min-h-screen antialiased">
      {/* ───────────────────────── NAV ───────────────────────── */}
      <nav
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ${
          scrolled
            ? 'border-white/10 bg-charcoal/95 shadow-xl shadow-black/40 backdrop-blur-xl'
            : 'border-transparent bg-charcoal/40 backdrop-blur-md'
        }`}
      >
        <div className="container-custom flex h-16 items-center justify-between md:h-[72px]">
          <a href="#home" className="flex items-baseline gap-0.5 font-sans font-black tracking-tighter">
            <span className="text-2xl text-orange-accent md:text-[26px]">Adel</span>
            <span className="text-2xl text-cream-warm md:text-[26px]">pha&rsquo;s</span>
          </a>

          <div className="hidden items-center gap-10 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative text-sm font-semibold text-cream-warm/70 transition-colors hover:text-cream-warm"
              >
                {link.label}
                <span className="absolute -bottom-1.5 left-0 h-0.5 w-0 bg-orange-accent transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Magnetic
              href={FB_URL}
              target="_blank"
              rel="noreferrer"
              reduce={!!reduce}
              className="hidden items-center gap-2 rounded-full bg-orange-accent px-6 py-2.5 text-sm font-bold text-charcoal shadow-lg shadow-orange-accent/25 transition-colors hover:bg-orange-light sm:flex"
            >
              Order on Messenger
              <ArrowUpRight size={16} strokeWidth={2.5} />
            </Magnetic>
            <button
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="p-2 text-cream-warm transition-colors hover:text-orange-accent lg:hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={26} /> : <MenuIcon size={26} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="overflow-hidden border-t border-white/5 bg-charcoal lg:hidden"
            >
              <div className="container-custom flex flex-col gap-1 py-4">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-xl px-3 py-3 text-lg font-bold text-cream-warm/80 transition-colors hover:bg-white/5 hover:text-orange-accent"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href={FB_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-orange-accent px-6 py-3.5 font-bold text-charcoal"
                >
                  Order on Messenger <ArrowUpRight size={18} strokeWidth={2.5} />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ───────────────────────── HERO ───────────────────────── */}
      <section ref={heroRef} id="home" className="relative overflow-hidden pt-16 md:pt-[72px]">
        <motion.div
          style={reduce ? undefined : { y: glowY }}
          className="pointer-events-none absolute inset-0 z-0"
        >
          <div className="absolute -top-32 right-[-10%] h-[520px] w-[520px] rounded-full bg-orange-accent/20 blur-[130px]" />
          <div className="absolute bottom-[-20%] left-[-10%] h-[420px] w-[420px] rounded-full bg-brown-light/60 blur-[120px]" />
        </motion.div>

        <div className="container-custom relative z-10 grid min-h-[calc(100dvh-72px)] items-center gap-8 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6 lg:py-0">
          {/* copy */}
          <div className="order-2 text-center lg:order-1 lg:text-left">
            <motion.p
              {...(reduce ? {} : { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, ease: EASE } })}
              className="mb-5 text-xs font-bold uppercase tracking-[0.35em] text-orange-accent"
            >
              Homegrown in Goa &middot; Since 2023
            </motion.p>

            <motion.h1
              {...headline}
              className="font-sans text-5xl font-black leading-[0.95] tracking-tighter text-cream-warm sm:text-6xl lg:text-7xl xl:text-8xl"
            >
              <motion.span {...lineV} className="block">Smash burgers</motion.span>
              <motion.span {...lineV} className="block">
                worth the <span className="italic text-orange-accent">trip.</span>
              </motion.span>
            </motion.h1>

            <motion.p
              {...(reduce ? {} : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, ease: EASE, delay: 0.35 } })}
              className="mx-auto mt-6 max-w-md text-base leading-relaxed text-cream-warm/60 lg:mx-0 lg:text-lg"
            >
              Fresh-beef burgers and brewed-daily coffee. Affordable premium comfort food,
              made fresh behind Jollibee in Goa.
            </motion.p>

            <motion.div
              {...(reduce ? {} : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, ease: EASE, delay: 0.5 } })}
              className="mt-9 flex flex-col items-center gap-4 sm:flex-row lg:items-start"
            >
              <Magnetic
                href="#menu"
                reduce={!!reduce}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-orange-accent px-8 py-4 font-bold text-charcoal shadow-xl shadow-orange-accent/30 transition-colors hover:bg-orange-light sm:w-auto"
              >
                See the Menu <ArrowRight size={18} strokeWidth={2.5} />
              </Magnetic>
              <a
                href="#visit"
                className="flex w-full items-center justify-center gap-2 rounded-full border border-white/15 px-8 py-4 font-bold text-cream-warm transition-all hover:border-orange-accent/60 hover:text-orange-accent active:translate-y-px sm:w-auto"
              >
                <Navigation size={18} /> Get Directions
              </a>
            </motion.div>
          </div>

          {/* burger */}
          <div className="relative order-1 flex justify-center lg:order-2">
            <motion.div
              {...(reduce
                ? {}
                : { initial: { opacity: 0, scale: 0.85 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 1, ease: EASE, delay: 0.1 } })}
              className="relative w-[280px] sm:w-[360px] lg:w-[460px]"
            >
              <motion.div style={reduce ? undefined : { y: burgerY }} className="relative">
                <div className={reduce ? '' : 'floating'}>
                  <img
                    src="https://www.pngall.com/wp-content/uploads/2016/05/Burger-Free-PNG-Image.png"
                    alt="Adelpha's signature smash burger"
                    className="w-full drop-shadow-[0_30px_60px_rgba(232,130,26,0.35)]"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <motion.div
                  {...(reduce
                    ? {}
                    : { initial: { scale: 0, rotate: -18 }, animate: { scale: 1, rotate: 10 }, transition: { delay: 0.7, type: 'spring', stiffness: 180 } })}
                  className="absolute -right-2 top-2 flex h-24 w-24 flex-col items-center justify-center rounded-full bg-cream-warm text-charcoal shadow-2xl sm:h-28 sm:w-28"
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider">From</span>
                  <span className="font-sans text-3xl font-black leading-none sm:text-4xl">&#8369;69</span>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─────────────────────── STAT STRIP ─────────────────────── */}
      <section className="border-y border-white/5 bg-brown-dark/40">
        <div className="container-custom grid grid-cols-2 divide-x divide-white/5 md:grid-cols-4">
          {[
            { node: <CountUp to={4.8} decimals={1} reduce={!!reduce} />, l: 'From 42 local reviews' },
            { node: <CountUp to={100} suffix="%" reduce={!!reduce} />, l: 'Fresh beef, daily' },
            { node: <CountUp to={menuItems.length} reduce={!!reduce} />, l: 'Dishes on the menu' },
            { node: '9-7', l: 'Open every day' },
          ].map((s, i) => (
            <motion.div key={s.l} {...reveal(i * 0.05)} className="px-4 py-8 text-center md:py-10">
              <div className="font-sans text-3xl font-black text-orange-accent md:text-4xl">{s.node}</div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-cream-warm/45">{s.l}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ───────────────────────── MENU ───────────────────────── */}
      <section id="menu" className="relative py-24 md:py-32">
        <div className="container-custom">
          <motion.div {...reveal()} className="mb-12 text-center md:mb-16">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-orange-accent">The Menu</p>
            <h2 className="font-sans text-4xl font-black tracking-tighter text-cream-warm md:text-6xl">
              Best &amp; delicious
            </h2>
          </motion.div>

          <div className="mb-12 flex snap-x gap-3 overflow-x-auto pb-2 md:mb-16 md:flex-wrap md:justify-center [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {categories.map((category) => {
              const active = activeTab === category;
              return (
                <button
                  key={category}
                  onClick={() => setActiveTab(category)}
                  className={`relative shrink-0 snap-start rounded-full px-5 py-2.5 text-sm font-bold transition-colors ${
                    active ? 'text-charcoal' : 'text-cream-warm/60 hover:text-cream-warm'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="menuTabPill"
                      className="absolute inset-0 rounded-full bg-orange-accent"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{category}</span>
                </button>
              );
            })}
          </div>

          <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filteredMenu.map((item) => (
                <MenuCard key={item.id} item={item} reduce={!!reduce} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ───────────────────────── STORY ───────────────────────── */}
      <section id="story" className="relative py-24 md:py-32">
        <div className="container-custom grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <motion.div {...reveal()} className="relative">
            <div className="overflow-hidden rounded-[36px] border border-white/10">
              <img
                src="/story.jpg"
                alt="The Adelpha's team behind the counter"
                onError={onImgError}
                className="aspect-[4/5] w-full object-cover grayscale transition-all duration-700 hover:grayscale-0 hover:scale-[1.03]"
              />
            </div>
            <div className="absolute -bottom-6 -right-4 rounded-3xl bg-orange-accent px-7 py-5 text-charcoal shadow-2xl">
              <div className="font-sans text-3xl font-black leading-none">&#8369;99</div>
              <div className="text-[11px] font-bold uppercase tracking-wide">Signature deal</div>
            </div>
          </motion.div>

          <motion.div {...reveal(0.1)} className="space-y-6">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-orange-accent">Our Story</p>
            <h2 className="font-sans text-4xl font-black leading-tight tracking-tighter text-cream-warm md:text-5xl">
              Homegrown passion,
              <br /> bold flavor.
            </h2>
            <p className="max-w-[52ch] text-lg leading-relaxed text-cream-warm/60">
              Tucked behind Jollibee on San Isidro St, Adelpha&rsquo;s Burger And Cafe is more than a
              burger joint. It&rsquo;s a neighborhood cafe where premium smash burgers meet a proper
              cup of coffee, at prices that make sense.
            </p>
            <div className="grid grid-cols-2 gap-6 border-t border-white/10 pt-8">
              <div>
                <div className="font-sans text-2xl font-black text-cream-warm">Pure fresh beef</div>
                <p className="mt-1 text-sm text-cream-warm/50">Never frozen, ground in-house.</p>
              </div>
              <div>
                <div className="font-sans text-2xl font-black text-cream-warm">Brewed daily</div>
                <p className="mt-1 text-sm text-cream-warm/50">Coffee, milk tea and frappes.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─────────────────────── BRAND MARQUEE ─────────────────────── */}
      <BrandMarquee reduce={!!reduce} />

      {/* ─────────────────────── REVIEWS ─────────────────────── */}
      <section className="relative bg-brown-dark/40 py-24 md:py-32">
        <div className="container-custom grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <motion.div {...reveal()} className="text-center lg:text-left">
            <h2 className="font-sans text-4xl font-black leading-tight tracking-tighter text-cream-warm md:text-5xl">
              Loved across Camarines.
            </h2>
            <div className="mt-8 inline-flex items-center gap-5 rounded-3xl border border-white/10 bg-charcoal/60 px-8 py-6">
              <div className="font-sans text-5xl font-black text-cream-warm">4.8</div>
              <div className="text-left">
                <div className="flex gap-1 text-orange-accent">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-cream-warm/45">
                  Based on 42 reviews
                </p>
              </div>
            </div>
          </motion.div>

          <div className="grid gap-5">
            {reviews.map((r, i) => (
              <motion.figure
                key={r.id}
                {...reveal(i * 0.08)}
                className="rounded-3xl border border-white/5 bg-charcoal/60 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-orange-accent/30"
              >
                <div className="mb-4 flex gap-1 text-orange-accent">
                  {Array.from({ length: r.rating }).map((_, s) => (
                    <Star key={s} size={14} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <blockquote className="text-lg font-medium leading-relaxed text-cream-warm/90">
                  &ldquo;{r.text}&rdquo;
                </blockquote>
                <figcaption className="mt-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-accent font-sans font-black text-charcoal">
                      {r.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-cream-warm">{r.name}</div>
                      <div className="text-[11px] font-semibold uppercase tracking-wide text-orange-accent">
                        Verified guest
                      </div>
                    </div>
                  </div>
                  {r.date && <span className="text-[11px] text-cream-warm/35">{r.date}</span>}
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────── VISIT ───────────────────────── */}
      <section id="visit" className="relative py-24 md:py-32">
        <div className="container-custom">
          <motion.div {...reveal()} className="mb-14 text-center md:mb-16">
            <h2 className="font-sans text-4xl font-black tracking-tighter text-cream-warm md:text-6xl">
              Come say hi.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-cream-warm/55">
              Behind Jollibee on San Isidro St, Goa. Open daily, 9 AM to 7 PM.
            </p>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr]">
            <motion.div {...reveal()} className="space-y-6">
              {[
                { icon: MapPin, t: 'Location', d: 'San Isidro St, Goa, Camarines Sur (back of Jollibee)' },
                { icon: Clock, t: 'Hours', d: 'Monday to Sunday, 9:00 AM to 7:00 PM' },
                { icon: MessageCircle, t: 'Orders', d: 'Message us on Facebook to reserve or pre-order' },
              ].map((c) => (
                <div key={c.t} className="flex items-start gap-4 rounded-2xl border border-white/5 bg-brown-dark/40 p-5 transition-colors hover:border-orange-accent/20">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-accent/15 text-orange-accent">
                    <c.icon size={22} />
                  </div>
                  <div>
                    <div className="font-bold text-cream-warm">{c.t}</div>
                    <p className="mt-0.5 text-sm leading-relaxed text-cream-warm/55">{c.d}</p>
                  </div>
                </div>
              ))}

              <div className="relative h-64 overflow-hidden rounded-3xl border border-white/10">
                <iframe
                  title="Adelpha's location on the map"
                  src={`https://maps.google.com/maps?q=${MAP_QUERY}&hl=en&z=17&output=embed`}
                  className="h-full w-full border-0 grayscale transition-all duration-700 hover:grayscale-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`}
                  target="_blank"
                  rel="noreferrer"
                  className="absolute bottom-4 left-4 flex items-center gap-2 rounded-xl border border-white/10 bg-charcoal/90 px-4 py-2.5 text-sm font-semibold text-cream-warm backdrop-blur-md transition-colors hover:text-orange-accent"
                >
                  <Navigation size={15} className="text-orange-accent" /> Open in Google Maps
                </a>
              </div>
            </motion.div>

            <motion.div {...reveal(0.1)}>
              <ContactForm reduce={!!reduce} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ───────────────────────── FOOTER ───────────────────────── */}
      <footer className="border-t border-white/5 bg-brown-dark/40 pt-16">
        <div className="container-custom">
          <div className="grid gap-10 pb-14 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-5">
              <div className="flex items-baseline gap-0.5 font-sans font-black tracking-tighter">
                <span className="text-2xl text-orange-accent">Adel</span>
                <span className="text-2xl text-cream-warm">pha&rsquo;s</span>
              </div>
              <p className="max-w-xs text-sm leading-relaxed text-cream-warm/50">
                Your homegrown cafe and burger joint in Goa, Camarines Sur. Premium quality,
                honest prices, since 2023.
              </p>
              <div className="flex gap-3">
                {[Facebook, Instagram].map((Icon, i) => (
                  <a
                    key={i}
                    href={FB_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-cream-warm/60 transition-all hover:bg-orange-accent hover:text-charcoal"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            <div className="lg:mx-auto">
              <h3 className="mb-6 font-sans text-sm font-bold uppercase tracking-wider text-cream-warm">Explore</h3>
              <ul className="space-y-3 text-sm font-semibold text-cream-warm/55">
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="transition-colors hover:text-orange-accent">{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:mx-auto">
              <h3 className="mb-6 font-sans text-sm font-bold uppercase tracking-wider text-cream-warm">Popular</h3>
              <ul className="space-y-3 text-sm font-semibold text-cream-warm/55">
                {menuItems.filter((i) => i.bestseller).slice(0, 4).map((i) => (
                  <li key={i.id}>
                    <a href="#menu" className="transition-colors hover:text-orange-accent">{i.name}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-6 font-sans text-sm font-bold uppercase tracking-wider text-cream-warm">Find us</h3>
              <ul className="space-y-4 text-sm text-cream-warm/55">
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="mt-0.5 shrink-0 text-orange-accent" />
                  San Isidro St, Goa, Camarines Sur (back of Jollibee)
                </li>
                <li className="flex items-center gap-3">
                  <Clock size={18} className="shrink-0 text-orange-accent" />
                  Daily, 9 AM to 7 PM
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-4 border-t border-white/5 py-8 text-xs text-cream-warm/40 md:flex-row">
            <p>&copy; {new Date().getFullYear()} Adelpha&rsquo;s Burger And Cafe. All rights reserved.</p>
            <p>Designed and developed by Anthony Azuela</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ──────────────────────── MAGNETIC BUTTON ──────────────────────── */
function Magnetic({
  children,
  className,
  href,
  reduce,
  target,
  rel,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  href: string;
  reduce: boolean;
  target?: string;
  rel?: string;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 });

  function onMove(e: React.MouseEvent<HTMLAnchorElement>) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.28);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.28);
  }
  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileTap={reduce ? undefined : { scale: 0.96 }}
      style={reduce ? undefined : { x: sx, y: sy }}
      className={className}
    >
      {children}
    </motion.a>
  );
}

/* ──────────────────────── MENU CARD (cursor spotlight) ──────────────────────── */
function MenuCard({
  item,
  reduce,
}: {
  item: (typeof menuItems)[number];
  reduce: boolean;
}) {
  const glowRef = useRef<HTMLDivElement>(null);

  function onMove(e: React.MouseEvent<HTMLElement>) {
    if (!glowRef.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    glowRef.current.style.background = `radial-gradient(240px circle at ${e.clientX - r.left}px ${
      e.clientY - r.top
    }px, rgba(232,130,26,0.16), transparent 65%)`;
  }

  return (
    <motion.article
      layout
      initial={reduce ? false : { opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={reduce ? undefined : { opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.35, ease: EASE }}
      onMouseMove={reduce ? undefined : onMove}
      className="group relative flex flex-col overflow-hidden rounded-[28px] border border-white/5 bg-brown-dark/50 transition-all duration-300 hover:-translate-y-1.5 hover:border-orange-accent/25"
    >
      <div
        ref={glowRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <div className="relative aspect-[4/3] overflow-hidden bg-charcoal">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          onError={onImgError}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {item.bestseller && (
          <span className="absolute left-4 top-4 z-20 flex items-center gap-1.5 rounded-full bg-orange-accent px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-charcoal shadow-lg">
            <Flame size={13} strokeWidth={2.5} /> Bestseller
          </span>
        )}
      </div>

      <div className="relative z-20 flex flex-1 flex-col p-6">
        <div className="mb-2 flex items-start justify-between gap-3">
          <h3 className="font-sans text-xl font-black leading-tight text-cream-warm">{item.name}</h3>
          <span className="shrink-0 font-sans text-xl font-black text-orange-accent">&#8369;{item.price}</span>
        </div>
        <p className="mb-6 line-clamp-2 text-sm leading-relaxed text-cream-warm/55">{item.description}</p>
        <a
          href={FB_URL}
          target="_blank"
          rel="noreferrer"
          className="mt-auto flex items-center justify-center gap-2 rounded-full border border-white/10 py-3 text-sm font-bold text-cream-warm transition-all hover:border-transparent hover:bg-orange-accent hover:text-charcoal active:translate-y-px"
        >
          Order this <ArrowUpRight size={16} strokeWidth={2.5} />
        </a>
      </div>
    </motion.article>
  );
}

/* ──────────────────────── COUNT-UP STAT ──────────────────────── */
function CountUp({
  to,
  decimals = 0,
  suffix = '',
  reduce,
}: {
  to: number;
  decimals?: number;
  suffix?: string;
  reduce: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [val, setVal] = useState(reduce ? to : 0);

  useEffect(() => {
    if (reduce) {
      setVal(to);
      return;
    }
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.3,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setVal(v),
    });
    return () => controls.stop();
  }, [inView, to, reduce]);

  return (
    <span ref={ref}>
      {val.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/* ──────────────────────── BRAND MARQUEE ──────────────────────── */
function BrandMarquee({ reduce }: { reduce: boolean }) {
  const items = ['100% Fresh Beef', 'Brewed Daily', 'Behind Jollibee', 'Homegrown in Goa', 'Affordable Premium', 'Since 2023'];
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-white/5 bg-brown-dark/30 py-5">
      <motion.div
        className="flex w-max items-center gap-10 whitespace-nowrap"
        animate={reduce ? undefined : { x: ['0%', '-50%'] }}
        transition={reduce ? undefined : { duration: 26, ease: 'linear', repeat: Infinity }}
      >
        {row.map((t, i) => (
          <span
            key={i}
            className="flex items-center gap-10 text-sm font-bold uppercase tracking-[0.25em] text-cream-warm/30"
          >
            {t}
            <Flame size={13} className="text-orange-accent/60" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ──────────────────────── CONTACT FORM ──────────────────────── */
function ContactForm({ reduce }: { reduce: boolean }) {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <motion.div
        initial={reduce ? false : { opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex h-full min-h-[420px] flex-col items-center justify-center rounded-[32px] border border-orange-accent/20 bg-brown-dark/50 p-10 text-center"
      >
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-orange-accent/15 text-orange-accent">
          <CheckCircle2 size={32} />
        </div>
        <h3 className="font-sans text-2xl font-black text-cream-warm">Message sent!</h3>
        <p className="mt-2 max-w-xs text-sm text-cream-warm/55">
          Salamat! We usually reply within 1 to 2 hours. For faster orders, reach us on Messenger.
        </p>
        <button
          onClick={() => setSent(false)}
          className="mt-6 rounded-full border border-white/15 px-6 py-2.5 text-sm font-bold text-cream-warm transition-colors hover:border-orange-accent/60 hover:text-orange-accent"
        >
          Send another
        </button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="rounded-[32px] border border-white/5 bg-brown-dark/50 p-7 md:p-9"
    >
      <div className="space-y-5">
        <Field id="name" label="Full name" icon={User}>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Juan dela Cruz"
            className="w-full rounded-xl border border-white/10 bg-charcoal/60 py-3.5 pl-11 pr-4 text-cream-warm placeholder:text-cream-warm/35 focus:border-orange-accent focus:outline-none"
          />
        </Field>
        <Field id="email" label="Email address" icon={Mail}>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className="w-full rounded-xl border border-white/10 bg-charcoal/60 py-3.5 pl-11 pr-4 text-cream-warm placeholder:text-cream-warm/35 focus:border-orange-accent focus:outline-none"
          />
        </Field>
        <Field id="message" label="Message" icon={MessageSquare} align="top">
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            placeholder="Tell us what you're craving..."
            className="w-full resize-none rounded-xl border border-white/10 bg-charcoal/60 py-3.5 pl-11 pr-4 text-cream-warm placeholder:text-cream-warm/35 focus:border-orange-accent focus:outline-none"
          />
        </Field>
      </div>

      <button
        type="submit"
        className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-orange-accent py-4 font-bold text-charcoal shadow-lg shadow-orange-accent/20 transition-all hover:bg-orange-light active:translate-y-px"
      >
        Send Message <Send size={18} />
      </button>
      <p className="mt-4 text-center text-xs text-cream-warm/40">
        We&rsquo;ll never share your details. Prefer chat? Message us on Facebook.
      </p>
    </form>
  );
}

function Field({
  id,
  label,
  icon: Icon,
  align = 'center',
  children,
}: {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  align?: 'center' | 'top';
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-semibold text-cream-warm/80">
        {label}
      </label>
      <div className="relative">
        <span
          className={`pointer-events-none absolute left-4 text-cream-warm/40 ${
            align === 'top' ? 'top-4' : 'top-1/2 -translate-y-1/2'
          }`}
        >
          <Icon size={17} />
        </span>
        {children}
      </div>
    </div>
  );
}
