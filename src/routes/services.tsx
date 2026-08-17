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
      { title: "Services Menu — KULT Salon Ahmedabad" },
      { name: "description", content: "Explore KULT Salon's complete services menu: precision haircuts, master balayage, clinical skin facials, gel nails, and editorial bridal packages." },
      { property: "og:title", content: "Services Menu — KULT Salon" },
      { property: "og:description", content: "Considered offerings, priced clearly. Delivered by senior artists in Ahmedabad." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const [cat, setCat] = useState<Cat>("all");
  const filtered = cat === "all" ? services : services.filter((s) => s.category === cat);

  return (
    <>
      {/* Header Banner */}
      <section className="bg-kult-black section-padding text-kult-white">
        <div className="container-custom">
          <SectionEyebrow>Services Menu</SectionEyebrow>
          <h1 className="mt-4 font-display fluid-h1 text-kult-white">Our Services.</h1>
          <p className="mt-4 max-w-xl font-body text-base text-neutral-400">
            Considered offerings, transparently priced. Every treatment delivered by senior stylists and beauty specialists using premium formulations.
          </p>
        </div>
      </section>

      {/* Main Category Filter & Listing */}
      <section className="bg-kult-offwhite section-padding text-kult-black">
        <div className="container-custom">
          {/* Touch-friendly Category Filter Pills */}
          <div className="flex flex-wrap gap-3 border-b border-neutral-300 pb-6" role="tablist" aria-label="Service categories">
            {CATS.map((c) => (
              <button
                key={c}
                type="button"
                role="tab"
                aria-selected={cat === c}
                onClick={() => setCat(c)}
                className={`touch-target px-5 py-2.5 font-heading text-xs font-bold uppercase tracking-[0.2em] transition-all rounded-none ${
                  cat === c
                    ? "bg-kult-black text-kult-white shadow-sm"
                    : "bg-white border border-neutral-300 text-neutral-700 hover:border-kult-black hover:text-kult-black"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Service Items Grid / List */}
          <ul className="mt-8 divide-y divide-neutral-200">
            {filtered.map((s) => (
              <li
                key={s.id}
                className="group bg-white border-l-4 border-l-transparent p-6 sm:p-8 transition-all duration-200 hover:border-l-kult-red hover:shadow-md mb-4"
              >
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-kult-red">
                        {s.category}
                      </span>
                      <span className="text-xs text-neutral-400">•</span>
                      <span className="font-body text-xs text-neutral-500">{s.duration} min</span>
                    </div>
                    <h3 className="font-heading text-xl font-bold text-kult-black">{s.name}</h3>
                    <p className="max-w-2xl font-body text-sm leading-relaxed text-neutral-600">
                      {s.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-6 md:flex-col md:items-end md:justify-center border-t border-neutral-100 pt-4 md:border-t-0 md:pt-0">
                    <div className="font-display text-3xl sm:text-4xl text-kult-black">
                      ₹{s.price.toLocaleString("en-IN")}
                    </div>
                    <Link
                      to="/book"
                      className="touch-target inline-flex items-center justify-center border border-kult-red bg-kult-red px-6 py-2.5 font-heading text-xs font-semibold uppercase tracking-[0.2em] text-kult-white transition-all hover:bg-kult-black hover:border-kult-black"
                    >
                      Book <ChevronRight size={14} className="ml-1" />
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Bridal Banner */}
      <section className="relative overflow-hidden bg-kult-black section-padding text-kult-white">
        <img
          src="https://images.unsplash.com/photo-1519735777090-ec97162dc266?w=1600&fit=crop&auto=format&q=70"
          alt="KULT Bridal styling preparation"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover opacity-30 select-none"
        />
        <div className="relative container-custom max-w-3xl">
          <SectionEyebrow>Bridal Services</SectionEyebrow>
          <h2 className="mt-4 font-display fluid-h2 text-kult-white">
            THE DAY MATTERS. EVERY DETAIL DOES.
          </h2>
          <p className="mt-4 font-body text-base text-neutral-300 leading-relaxed max-w-xl">
            Bespoke bridal packages including trial sessions, hair styling, couture makeup, and skin preparation for the entire wedding party.
          </p>
          <div className="mt-8">
            <Link
              to="/book"
              className="touch-target inline-flex items-center justify-center border border-kult-red bg-kult-red px-8 py-4 font-heading text-xs font-semibold uppercase tracking-[0.25em] text-kult-white transition-all hover:bg-transparent"
            >
              Enquire Bridal Package
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
