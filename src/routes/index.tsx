import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ChevronRight, Star } from "lucide-react";
import { Marquee } from "@/components/shared/Marquee";
import { SectionEyebrow } from "@/components/shared/SectionEyebrow";
import { Reveal, RevealStagger, RevealItem } from "@/components/shared/RevealWrapper";
import { heroLift } from "@/lib/animations";
import { serviceCategories, staff, testimonials, galleryImages } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KULT Salon — Define Your Look" },
      { name: "description", content: "Premium hair, colour, skin, nails and bridal at KULT. Beauty with an edge." },
      { property: "og:title", content: "KULT Salon — Define Your Look" },
      { property: "og:description", content: "Premium hair, colour, skin, nails and bridal at KULT." },
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
    <section className="relative overflow-hidden bg-kult-black">
      <div className="mx-auto grid min-h-[92vh] w-full max-w-[1400px] grid-cols-1 items-center gap-10 px-6 pt-20 pb-24 md:grid-cols-12 md:gap-8">
        <div className="relative z-10 md:col-span-7">
          <motion.div initial="hidden" animate="visible" variants={heroLift} className="flex items-center gap-4">
            <div className="h-[2px] w-12 bg-kult-red" />
            <SectionEyebrow>Est. 2016 · Mumbai</SectionEyebrow>
          </motion.div>
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={heroLift}
            transition={{ delay: 0.05 }}
            className="mt-8 font-display text-[64px] leading-[0.9] text-kult-white md:text-[128px]"
          >
            DEFINE<br />
            YOUR <span className="text-kult-red">LOOK.</span>
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={heroLift}
            transition={{ delay: 0.1 }}
            className="mt-8 max-w-md font-body text-lg text-kult-gray"
          >
            Premium hair &amp; beauty for the discerning. Considered, precise, unmistakably you.
          </motion.p>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={heroLift}
            transition={{ delay: 0.15 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link to="/book" className="border border-kult-red bg-kult-red px-8 py-4 font-heading text-xs font-semibold uppercase tracking-[0.25em] text-kult-white transition-colors duration-150 hover:bg-kult-black">
              Book Now
            </Link>
            <Link to="/services" className="border border-kult-white bg-transparent px-8 py-4 font-heading text-xs font-semibold uppercase tracking-[0.25em] text-kult-white transition-colors duration-150 hover:bg-kult-white hover:text-kult-black">
              Our Services
            </Link>
          </motion.div>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={heroLift}
            transition={{ delay: 0.25 }}
            className="mt-16 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-8"
          >
            {[
              { n: "9+", l: "Years" },
              { n: "3.2K+", l: "Clients" },
              { n: "5", l: "Awards" },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-display text-3xl text-kult-white md:text-4xl">{s.n}</div>
                <div className="mt-1 font-heading text-[10px] uppercase tracking-[0.25em] text-kult-gray">{s.l}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative md:col-span-5"
        >
          <div className="absolute -inset-4 z-0 border border-kult-red/40 md:-inset-6" />
          <div className="absolute -bottom-6 -right-4 z-0 hidden font-display text-[180px] leading-none text-kult-red/10 md:block">
            KULT
          </div>
          <img
            src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=900&fit=crop&auto=format&q=75"
            alt="Editorial salon portrait"
            width={900}
            height={1125}
            fetchPriority="high"
            decoding="async"
            className="relative z-10 aspect-[4/5] w-full object-cover grayscale"
          />

          <div className="absolute right-0 top-0 z-20 h-16 w-1 bg-kult-red" />
        </motion.div>
      </div>

      <div className="absolute bottom-6 right-6 z-10 hidden flex-col items-center gap-2 md:flex">
        <div className="h-10 w-[2px] bg-kult-red" />
        <div className="font-heading text-[10px] uppercase tracking-[0.3em] text-kult-white">Scroll</div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="bg-kult-offwhite py-24 md:py-32">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-14 px-6 md:grid-cols-2 md:items-center">
        <Reveal>
          <img
            src="https://images.unsplash.com/photo-1560066984-138daaa0a5b2?w=800&fit=crop&auto=format&q=70"
            alt="Editorial portrait"
            className="h-[600px] w-full object-cover grayscale"
          loading="lazy" decoding="async" />
        </Reveal>
        <Reveal>
          <SectionEyebrow>Our Philosophy</SectionEyebrow>
          <h2 className="mt-4 font-display text-5xl leading-[1] text-kult-black md:text-6xl">
            Beauty with an edge.
          </h2>
          <p className="mt-6 max-w-lg text-kult-black">
            KULT is a house built on point of view. We don't chase trends. We shape looks that make sense on you — considered, precise, and worth keeping.
          </p>
          <p className="mt-4 max-w-lg text-kult-black">
            Every chair, every service, every artist here works to a single standard: we're only good if you look like the best version of yourself walking out.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-4">
            {[
              { n: "9+", l: "Years" },
              { n: "3,200+", l: "Clients" },
              { n: "5", l: "Awards" },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-display text-4xl text-kult-red md:text-5xl">{s.n}</div>
                <div className="mt-1 font-heading text-[11px] uppercase tracking-[0.2em] text-kult-gray">{s.l}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ServicesGrid() {
  return (
    <section className="bg-kult-black py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6">
        <Reveal>
          <SectionEyebrow>What we do</SectionEyebrow>
          <h2 className="mt-4 max-w-2xl font-display text-5xl text-kult-white md:text-6xl">
            Four disciplines. One standard.
          </h2>
        </Reveal>
        <RevealStagger className="mt-14 grid grid-cols-1 gap-[1px] bg-white/10 md:grid-cols-4">
          {serviceCategories.map((c) => (
            <RevealItem key={c.key}>
              <Link
                to="/services"
                className="group relative flex h-full flex-col justify-between bg-kult-black p-8 transition-all duration-200 hover:bg-[#111] hover:border-l-2 hover:border-l-kult-red"
              >
                <div>
                  <div className="font-display text-6xl text-kult-red">{c.num}</div>
                  <div className="mt-8 font-display text-3xl uppercase tracking-wide text-kult-white">{c.title}</div>
                  <p className="mt-3 text-sm text-kult-gray">{c.line}</p>
                </div>
                <div className="mt-10 flex items-center gap-2 font-heading text-xs font-semibold uppercase tracking-[0.25em] text-kult-red">
                  Explore <ChevronRight size={14} />
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
    <section className="bg-kult-black py-20">
      <div className="mx-auto max-w-[1400px] px-6">
        <Reveal>
          <SectionEyebrow>Gallery</SectionEyebrow>
          <h2 className="mt-4 font-display text-4xl text-kult-white md:text-5xl">Recent work</h2>
        </Reveal>
      </div>
      <div className="mt-10 overflow-x-auto">
        <div className="flex">
          {galleryImages.slice(0, 8).map((g) => (
            <div key={g.id} className="group relative h-[440px] w-[360px] flex-shrink-0 overflow-hidden">
              <img src={g.url} alt={`KULT Salon ${g.category} work sample`} className="h-full w-full object-cover" loading="lazy" decoding="async" />
              <div className="absolute inset-0 flex items-end bg-kult-red/0 opacity-0 transition-all duration-200 group-hover:bg-kult-red/70 group-hover:opacity-100">
                <div className="p-6 font-heading text-xs font-semibold uppercase tracking-[0.25em] text-kult-white">{g.category}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-10 text-center">
        <Link to="/gallery" className="hover-red-line font-heading text-xs font-semibold uppercase tracking-[0.3em] text-kult-white">
          View gallery →
        </Link>
      </div>
    </section>
  );
}

function TeamPreview() {
  return (
    <section className="bg-kult-offwhite py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6">
        <Reveal>
          <SectionEyebrow>The People</SectionEyebrow>
          <h2 className="mt-4 font-display text-5xl text-kult-black md:text-6xl">The Artists.</h2>
        </Reveal>
        <RevealStagger className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          {staff.map((s) => (
            <RevealItem key={s.id}>
              <div className="group">
                <div className="relative overflow-hidden">
                  <img src={s.photo} alt={s.name} className="aspect-[4/5] w-full object-cover grayscale transition-all duration-300 group-hover:grayscale-0" loading="lazy" decoding="async" />
                  <div className="absolute inset-x-0 top-0 h-2 bg-kult-red opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                </div>
                <div className="mt-5 font-display text-3xl text-kult-black">{s.name}</div>
                <div className="mt-1 font-heading text-[11px] uppercase tracking-[0.25em] text-kult-gray">{s.role}</div>
                <Link to="/book" className="mt-4 inline-block hover-red-line font-heading text-[11px] font-semibold uppercase tracking-[0.25em] text-kult-red">
                  Book →
                </Link>
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
    <section className="relative overflow-hidden bg-kult-black py-24 md:py-32">
      <div className="pointer-events-none absolute -top-16 left-6 font-display text-[280px] leading-none text-kult-red opacity-90 md:text-[420px]">
        &ldquo;
      </div>
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <motion.p
          key={t.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="font-body text-2xl italic leading-relaxed text-kult-white md:text-3xl"
        >
          {t.text}
        </motion.p>
        <div className="mt-8 font-heading text-xs uppercase tracking-[0.3em] text-kult-gray">{t.name}</div>
        <div className="mt-3 flex justify-center gap-1 text-kult-red">
          {Array.from({ length: t.rating }).map((_, k) => (
            <Star key={k} size={16} fill="currentColor" />
          ))}
        </div>
        <div className="mt-8 flex justify-center gap-3">
          {testimonials.map((_, k) => (
            <button
              key={k}
              onClick={() => setI(k)}
              className={`h-[2px] w-8 transition-colors ${k === i ? "bg-kult-red" : "bg-kult-gray/50"}`}
              aria-label={`Testimonial ${k + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function LoyaltyTeaser() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2">
      <div className="bg-kult-red p-12 md:p-20">
        <SectionEyebrow>
          <span className="text-kult-white/90">KULT Rewards</span>
        </SectionEyebrow>
        <h3 className="mt-4 font-display text-5xl text-kult-white md:text-6xl">EARN. REWARD. REPEAT.</h3>
        <p className="mt-6 max-w-md text-kult-white/90">
          Every visit earns you points toward complimentary services and priority access. Membership is automatic.
        </p>
        <Link to="/loyalty" className="mt-8 inline-block border border-kult-white bg-kult-white px-6 py-3 font-heading text-xs font-semibold uppercase tracking-[0.25em] text-kult-red hover:bg-transparent hover:text-kult-white">
          Join the programme
        </Link>
      </div>
      <div className="bg-kult-black p-12 md:p-20">
        <ol className="space-y-8">
          {[
            { n: "01", l: "Book a service", d: "Any service, any time." },
            { n: "02", l: "Earn points", d: "₹100 spent = 1 point." },
            { n: "03", l: "Redeem rewards", d: "100 points = ₹50 off." },
          ].map((s) => (
            <li key={s.n} className="flex gap-6">
              <div className="font-display text-4xl text-kult-red">{s.n}</div>
              <div>
                <div className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-kult-white">{s.l}</div>
                <div className="mt-1 text-sm text-kult-gray">{s.d}</div>
              </div>
            </li>
          ))}
        </ol>
        <Link to="/loyalty" className="mt-10 inline-block border border-kult-red bg-kult-red px-6 py-3 font-heading text-xs font-semibold uppercase tracking-[0.25em] text-kult-white hover:bg-kult-black">
          Join the programme
        </Link>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="bg-kult-black py-28 text-center">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="font-display text-5xl leading-tight text-kult-white md:text-[72px]">
          READY FOR YOUR BEST LOOK?
        </h2>
        <Link
          to="/book"
          className="mt-10 inline-block w-full max-w-[320px] border border-kult-red bg-kult-red px-8 py-4 font-heading text-xs font-semibold uppercase tracking-[0.25em] text-kult-white transition-colors hover:bg-kult-black"
        >
          Book an appointment
        </Link>
      </div>
    </section>
  );
}
