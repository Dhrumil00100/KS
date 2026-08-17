import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ChevronRight, Star, Scissors, Palette, Sparkles, Crown } from "lucide-react";
import { Marquee } from "@/components/shared/Marquee";
import { SectionEyebrow } from "@/components/shared/SectionEyebrow";
import { Reveal, RevealStagger, RevealItem } from "@/components/shared/RevealWrapper";
import { heroLift } from "@/lib/animations";
import { serviceCategories, staff, testimonials, galleryImages } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KULT Salon — Ahmedabad's Premier Unisex Luxury Hair & Beauty" },
      { name: "description", content: "KULT Salon: Unisex luxury salon on Sindhu Bhavan Road, Ahmedabad. Precision haircuts, master balayage, clinical facials & bridal styling." },
      { property: "og:title", content: "KULT Salon — Define Your Look" },
      { property: "og:description", content: "Precision hair, master colour, skin therapies, and bridal beauty in Ahmedabad." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <ServicesGrid />
      <GalleryStrip />
      <TeamPreview />
      <TestimonialsBlock />
      <LoyaltyTeaser />
      <FinalCTA />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-kult-black text-kult-white">
      <div className="container-custom grid min-h-[85vh] grid-cols-1 items-center gap-12 py-12 lg:grid-cols-12 lg:gap-12 lg:py-20">
        {/* Hero Left Content */}
        <div className="relative z-10 lg:col-span-7">
          <motion.div initial="hidden" animate="visible" variants={heroLift}>
            <SectionEyebrow>Est. 2016 · Ahmedabad</SectionEyebrow>
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="visible"
            variants={heroLift}
            transition={{ delay: 0.05 }}
            className="mt-6 font-display fluid-hero text-kult-white"
          >
            DEFINE<br />
            YOUR <span className="text-kult-red">LOOK.</span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={heroLift}
            transition={{ delay: 0.1 }}
            className="mt-6 max-w-xl font-body text-base sm:text-lg leading-relaxed text-neutral-400"
          >
            Ahmedabad&apos;s premier unisex luxury hair &amp; beauty salon. Considered, precise, and tailored specifically to your unique identity.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={heroLift}
            transition={{ delay: 0.15 }}
            className="mt-8 flex flex-col sm:flex-row flex-wrap gap-4"
          >
            <Link
              to="/book"
              className="touch-target flex items-center justify-center border border-kult-red bg-kult-red px-8 py-4 font-heading text-xs font-semibold uppercase tracking-[0.25em] text-kult-white transition-all duration-200 hover:bg-transparent hover:text-kult-white"
            >
              Book Now
            </Link>
            <Link
              to="/services"
              className="touch-target flex items-center justify-center border border-kult-white bg-transparent px-8 py-4 font-heading text-xs font-semibold uppercase tracking-[0.25em] text-kult-white transition-all duration-200 hover:bg-kult-white hover:text-kult-black"
            >
              Our Services
            </Link>
          </motion.div>

          {/* Key Stats */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={heroLift}
            transition={{ delay: 0.25 }}
            className="mt-12 grid grid-cols-3 gap-4 border-t border-white/10 pt-6 max-w-lg"
          >
            {[
              { n: "9+", l: "Years Active" },
              { n: "3.2K+", l: "Clients Served" },
              { n: "5", l: "Industry Awards" },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-display text-3xl sm:text-4xl text-kult-white">{s.n}</div>
                <div className="mt-1 font-heading text-[10px] sm:text-xs uppercase tracking-[0.2em] text-neutral-400">{s.l}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Hero Right Image Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative lg:col-span-5"
        >
          <div className="absolute -inset-3 z-0 border border-kult-red/40 sm:-inset-5" />
          <div className="absolute -bottom-8 -right-4 z-0 hidden font-display text-[140px] leading-none text-kult-red/10 lg:block select-none">
            KULT
          </div>
          <img
            src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=900&fit=crop&auto=format&q=75"
            alt="KULT Salon editorial unisex haircut and hair styling session"
            width={900}
            height={1125}
            fetchPriority="high"
            decoding="async"
            className="relative z-10 aspect-[4/5] w-full object-cover grayscale transition-all duration-500 hover:grayscale-0"
          />
          <div className="absolute right-0 top-0 z-20 h-16 w-1 bg-kult-red" />
        </motion.div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="bg-kult-offwhite section-padding text-kult-black">
      <div className="container-custom">
        {/* Section Header */}
        <Reveal>
          <div className="max-w-4xl">
            <SectionEyebrow>About KULT Salon</SectionEyebrow>
            <h2 className="mt-4 font-display fluid-h2 text-kult-black">
              AHMEDABAD&apos;S PREMIER UNISEX LUXURY HAIR &amp; BEAUTY SALON
            </h2>
          </div>
        </Reveal>

        {/* 2-Column Responsive Body */}
        <Reveal>
          <div className="mt-10 grid grid-cols-1 gap-8 border-t border-kult-black/10 pt-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="font-heading text-lg font-medium leading-relaxed text-neutral-900 sm:text-xl">
                Established in 2016 on Sindhu Bhavan Road, KULT Salon has redefined luxury beauty care in Ahmedabad. We reject cookie-cutter formulas, focusing on precision haircutting, custom balayage placement, and clinical skin rejuvenation.
              </p>
            </div>
            <div className="flex flex-col justify-between space-y-6">
              <p className="font-body text-base leading-relaxed text-neutral-700">
                Our team of senior hair stylists, color masters, and aesthetic specialists use premium international formulations. Whether you seek a bold editorial restyle, signature hair coloring, luxury bridal makeover, or bespoke gel nail art, KULT delivers uncompromising precision.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  to="/services"
                  className="touch-target flex items-center justify-center border border-kult-black bg-kult-black px-6 py-3 font-heading text-xs font-semibold uppercase tracking-[0.2em] text-kult-white transition-all hover:bg-transparent hover:text-kult-black"
                >
                  Explore Services
                </Link>
                <Link
                  to="/book"
                  className="touch-target flex items-center justify-center border border-kult-red bg-transparent px-6 py-3 font-heading text-xs font-semibold uppercase tracking-[0.2em] text-kult-red transition-all hover:bg-kult-red hover:text-kult-white"
                >
                  Book Appointment
                </Link>
              </div>
            </div>
          </div>
        </Reveal>

        {/* 4 Feature Cards */}
        <RevealStagger className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: <Scissors size={28} className="text-kult-red" />,
              title: "Precision Hair Crafting",
              desc: "Bespoke unisex haircuts, editorial hair styling, and restorative hair spa therapies tailored by senior stylists.",
            },
            {
              icon: <Palette size={28} className="text-kult-red" />,
              title: "Master Colour & Balayage",
              desc: "Premium hair colouring, hand-painted balayage highlights, gloss treatments, and advanced colour corrections.",
            },
            {
              icon: <Sparkles size={28} className="text-kult-red" />,
              title: "Advanced Skin Therapies",
              desc: "Rejuvenating clinical facials, customized skin care routines, and restorative cosmetic treatments.",
            },
            {
              icon: <Crown size={28} className="text-kult-red" />,
              title: "Editorial Bridal & Nails",
              desc: "Luxury bridal makeup packages, custom gel nail art, couture styling, and manicure-pedicure rituals.",
            },
          ].map((item, idx) => (
            <RevealItem key={idx}>
              <div className="h-full border border-kult-black/10 bg-white p-8 transition-all duration-300 hover:border-kult-red hover:shadow-lg">
                <div className="mb-6 inline-block bg-kult-offwhite p-3">
                  {item.icon}
                </div>
                <h3 className="font-display text-2xl uppercase tracking-wider text-kult-black">
                  {item.title}
                </h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-neutral-600">
                  {item.desc}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}

function ServicesGrid() {
  return (
    <section className="bg-kult-black section-padding text-kult-white">
      <div className="container-custom">
        <Reveal>
          <SectionEyebrow>Disciplines</SectionEyebrow>
          <h2 className="mt-4 font-display fluid-h2 text-kult-white">
            Four disciplines. One standard.
          </h2>
        </Reveal>

        <RevealStagger className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {serviceCategories.map((c) => (
            <RevealItem key={c.key}>
              <Link
                to="/services"
                className="group relative flex h-full flex-col justify-between border border-white/10 bg-neutral-950 p-8 transition-all duration-300 hover:border-kult-red hover:bg-neutral-900"
              >
                <div>
                  <div className="font-display text-5xl sm:text-6xl text-kult-red">{c.num}</div>
                  <div className="mt-6 font-display text-3xl uppercase tracking-wider text-kult-white">{c.title}</div>
                  <p className="mt-3 font-body text-sm leading-relaxed text-neutral-400">{c.line}</p>
                </div>
                <div className="mt-8 flex items-center gap-2 font-heading text-xs font-semibold uppercase tracking-[0.25em] text-kult-red">
                  Explore <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}

function GalleryStrip() {
  return (
    <section className="bg-kult-black section-padding border-t border-white/10 text-kult-white">
      <div className="container-custom">
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <SectionEyebrow>Recent Work</SectionEyebrow>
              <h2 className="mt-4 font-display fluid-h2 text-kult-white">Gallery Showcase</h2>
            </div>
            <Link
              to="/gallery"
              className="hover-red-line inline-flex items-center gap-2 font-heading text-xs font-semibold uppercase tracking-[0.25em] text-kult-red"
            >
              View Full Gallery →
            </Link>
          </div>
        </Reveal>

        {/* Responsive Grid replacing horizontal scroll */}
        <RevealStagger className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.slice(0, 8).map((g) => (
            <RevealItem key={g.id}>
              <div className="group relative aspect-[4/5] w-full overflow-hidden bg-neutral-900">
                <img
                  src={g.url}
                  alt={`KULT Salon ${g.category} client transformation work`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 p-4 sm:p-6">
                  <span className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-kult-white">
                    {g.category}
                  </span>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}

function TeamPreview() {
  return (
    <section className="bg-kult-offwhite section-padding text-kult-black">
      <div className="container-custom">
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <SectionEyebrow>The People</SectionEyebrow>
              <h2 className="mt-4 font-display fluid-h2 text-kult-black">The Artists.</h2>
            </div>
            <Link
              to="/team"
              className="hover-red-line inline-flex items-center gap-2 font-heading text-xs font-semibold uppercase tracking-[0.25em] text-kult-red"
            >
              Meet The Team →
            </Link>
          </div>
        </Reveal>

        <RevealStagger className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {staff.map((s) => (
            <RevealItem key={s.id}>
              <div className="group border border-kult-black/10 bg-white p-4 transition-all duration-300 hover:border-kult-red hover:shadow-lg">
                <div className="relative overflow-hidden aspect-[4/5] bg-neutral-100">
                  <img
                    src={s.photo}
                    alt={s.name}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 top-0 h-1.5 bg-kult-red opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
                <div className="mt-5 px-2">
                  <h3 className="font-display text-3xl text-kult-black">{s.name}</h3>
                  <p className="mt-1 font-heading text-xs uppercase tracking-[0.2em] text-neutral-500">{s.role}</p>
                  <div className="mt-4 pt-4 border-t border-neutral-100 flex items-center justify-between">
                    <span className="font-body text-xs text-neutral-600">{s.experience} Exp</span>
                    <Link
                      to="/book"
                      className="hover-red-line font-heading text-xs font-bold uppercase tracking-[0.2em] text-kult-red"
                    >
                      Book →
                    </Link>
                  </div>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}

function TestimonialsBlock() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % testimonials.length), 6000);
    return () => clearInterval(id);
  }, []);

  const t = testimonials[i];

  return (
    <section className="relative overflow-hidden bg-kult-black section-padding text-kult-white">
      <div className="pointer-events-none absolute -top-12 left-4 font-display text-[200px] sm:text-[320px] leading-none text-kult-red/10 select-none">
        &ldquo;
      </div>

      <div className="relative container-custom max-w-4xl text-center">
        <Reveal>
          <SectionEyebrow>Client Experience</SectionEyebrow>
        </Reveal>

        <motion.p
          key={t.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-8 font-body text-xl sm:text-2xl md:text-3xl italic leading-relaxed text-kult-white"
        >
          &ldquo;{t.text}&rdquo;
        </motion.p>

        <div className="mt-8 font-heading text-xs font-bold uppercase tracking-[0.3em] text-kult-red">
          {t.name}
        </div>

        <div className="mt-3 flex justify-center gap-1.5 text-kult-red">
          {Array.from({ length: t.rating }).map((_, k) => (
            <Star key={k} size={18} fill="currentColor" />
          ))}
        </div>

        {/* Carousel indicators */}
        <div className="mt-8 flex justify-center gap-3">
          {testimonials.map((_, k) => (
            <button
              key={k}
              type="button"
              onClick={() => setI(k)}
              aria-label={`Show testimonial ${k + 1}`}
              className={`touch-target h-2 rounded-full transition-all duration-300 ${
                k === i ? "w-8 bg-kult-red" : "w-2 bg-neutral-700 hover:bg-neutral-500"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function LoyaltyTeaser() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 text-kult-white">
      {/* Left Block */}
      <div className="bg-kult-red p-8 sm:p-14 lg:p-20 flex flex-col justify-center">
        <SectionEyebrow>
          <span className="text-white">KULT Rewards</span>
        </SectionEyebrow>
        <h3 className="mt-4 font-display fluid-h2 text-white">EARN. REWARD. REPEAT.</h3>
        <p className="mt-6 max-w-md font-body text-base leading-relaxed text-white/90">
          Every visit earns you points toward complimentary services and priority access. Membership is automatic upon your first appointment.
        </p>
        <div className="mt-8">
          <Link
            to="/loyalty"
            className="touch-target inline-flex items-center justify-center border border-white bg-white px-8 py-4 font-heading text-xs font-semibold uppercase tracking-[0.25em] text-kult-red transition-colors hover:bg-kult-black hover:text-white"
          >
            Join The Programme
          </Link>
        </div>
      </div>

      {/* Right Block */}
      <div className="bg-kult-black p-8 sm:p-14 lg:p-20 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-white/10">
        <ol className="space-y-8">
          {[
            { n: "01", l: "Book a Service", d: "Any hair, skin, colour or nail service at KULT." },
            { n: "02", l: "Earn Points", d: "₹100 spent = 1 KULT Reward point earned." },
            { n: "03", l: "Redeem Rewards", d: "Redeem points directly on future appointments." },
          ].map((s) => (
            <li key={s.n} className="flex gap-6">
              <div className="font-display text-4xl sm:text-5xl text-kult-red">{s.n}</div>
              <div>
                <div className="font-heading text-base font-bold uppercase tracking-[0.2em] text-kult-white">{s.l}</div>
                <div className="mt-1 font-body text-sm text-neutral-400">{s.d}</div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="bg-kult-black section-padding text-center border-t border-white/10 text-kult-white">
      <div className="container-custom max-w-3xl">
        <SectionEyebrow>Book Appointment</SectionEyebrow>
        <h2 className="mt-4 font-display fluid-h1 text-kult-white">
          READY FOR YOUR BEST LOOK?
        </h2>
        <p className="mt-4 font-body text-base text-neutral-400 max-w-md mx-auto">
          Reserve your preferred date and senior artist online in less than 60 seconds.
        </p>
        <div className="mt-10 flex justify-center">
          <Link
            to="/book"
            className="touch-target flex w-full sm:w-auto max-w-xs items-center justify-center border border-kult-red bg-kult-red px-10 py-4 font-heading text-xs font-semibold uppercase tracking-[0.25em] text-kult-white transition-all duration-200 hover:bg-transparent hover:text-kult-white"
          >
            Book An Appointment
          </Link>
        </div>
      </div>
    </section>
  );
}
