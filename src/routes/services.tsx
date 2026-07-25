import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { services } from "@/lib/mock-data";
import { SectionEyebrow } from "@/components/shared/SectionEyebrow";

const CATS = ["all", "hair", "colour", "skin", "nails", "bridal"] as const;
type Cat = (typeof CATS)[number];

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — KULT Salon" },
      { name: "description", content: "Hair, colour, skin, nails and bridal services at KULT. Precision, quality, uncompromising standard." },
      { property: "og:title", content: "Services — KULT Salon" },
      { property: "og:description", content: "Explore the full KULT services menu." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const [cat, setCat] = useState<Cat>("all");
  const filtered = cat === "all" ? services : services.filter((s) => s.category === cat);

  return (
    <>
      <section className="bg-kult-black py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6">
          <SectionEyebrow>Menu</SectionEyebrow>
          <h1 className="mt-4 font-display text-6xl text-kult-white md:text-8xl">Our Services.</h1>
          <p className="mt-6 max-w-lg text-kult-gray">Considered offerings, priced clearly. Every service delivered by senior artists.</p>
        </div>
      </section>

      <section className="bg-kult-offwhite py-16">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="flex flex-wrap gap-8 border-b border-kult-black/10 pb-4">
            {CATS.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`relative pb-2 font-heading text-xs font-semibold uppercase tracking-[0.25em] transition-colors ${cat === c ? "text-kult-black" : "text-kult-gray"}`}
              >
                {c}
                {cat === c && <span className="absolute -bottom-[17px] left-0 h-[2px] w-full bg-kult-red" />}
              </button>
            ))}
          </div>

          <ul className="mt-8">
            {filtered.map((s) => (
              <li key={s.id} className="group border-b border-kult-black/10 transition-colors hover:border-l-2 hover:border-l-kult-red hover:bg-[#F0F0F0]">
                <div className="flex flex-col gap-4 px-4 py-6 md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="font-heading text-lg font-semibold text-kult-black">{s.name}</div>
                    <div className="mt-1 text-sm text-kult-gray">
                      {s.duration} min · <span className="capitalize">{s.category}</span>
                    </div>
                    <p className="mt-2 max-w-xl text-sm text-kult-black/70">{s.description}</p>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="font-display text-3xl text-kult-black">₹{s.price.toLocaleString("en-IN")}</div>
                    <Link to="/book" className="hover-red-line font-heading text-xs font-semibold uppercase tracking-[0.25em] text-kult-red">
                      Book <ChevronRight size={12} className="inline" />
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative overflow-hidden bg-kult-black py-24 md:py-32">
        <img
          src="https://images.unsplash.com/photo-1519735777090-ec97162dc266?w=1600&fit=crop&auto=format&q=70"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        loading="lazy" decoding="async" />
        <div className="relative mx-auto max-w-[1400px] px-6">
          <SectionEyebrow>Bridal</SectionEyebrow>
          <h2 className="mt-4 max-w-2xl font-display text-5xl text-kult-white md:text-6xl">
            The day matters. Every detail does.
          </h2>
          <p className="mt-6 max-w-lg text-kult-gray">
            Full bridal packages including hair, makeup and skin. Trials, on-site service, and family styling available.
          </p>
          <Link to="/book" className="mt-10 inline-block border border-kult-red bg-kult-red px-8 py-4 font-heading text-xs font-semibold uppercase tracking-[0.25em] text-kult-white hover:bg-transparent">
            Enquire now
          </Link>
        </div>
      </section>
    </>
  );
}
