import { createFileRoute, Link } from "@tanstack/react-router";
import { staff } from "@/lib/mock-data";
import { SectionEyebrow } from "@/components/shared/SectionEyebrow";
import { Reveal } from "@/components/shared/RevealWrapper";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "The Artists — KULT Salon" },
      { name: "description", content: "Meet the senior artists at KULT — creative directors, stylists and specialists." },
      { property: "og:title", content: "The Artists — KULT Salon" },
      { property: "og:description", content: "Meet the KULT team." },
    ],
  }),
  component: TeamPage,
});

function TeamPage() {
  return (
    <>
      <section className="bg-kult-black py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6">
          <SectionEyebrow>The People</SectionEyebrow>
          <h1 className="mt-4 font-display text-6xl text-kult-white md:text-8xl">The Artists.</h1>
        </div>
      </section>

      <section className="bg-kult-offwhite py-24">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-24 px-6">
          {staff.map((s, i) => {
            const layout = i % 3;
            if (layout === 1) {
              return (
                <Reveal key={s.id}>
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    {[s, staff[(i + 1) % staff.length]].map((p, k) => (
                      <ArtistCard key={`${p.id}-${k}`} p={p} compact />
                    ))}
                  </div>
                </Reveal>
              );
            }
            return (
              <Reveal key={s.id}>
                <div className={`grid grid-cols-1 items-center gap-10 md:grid-cols-2 ${layout === 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
                  <img src={s.photo} alt={s.name} className="aspect-[4/5] w-full object-cover grayscale" loading="lazy" decoding="async" />
                  <div>
                    <h2 className="font-display text-5xl text-kult-black md:text-6xl">{s.name}</h2>
                    <div className="mt-2 font-heading text-xs font-semibold uppercase tracking-[0.25em] text-kult-red">{s.role}</div>
                    <p className="mt-6 max-w-lg text-kult-black">{s.bio}</p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {s.specialisations.map((sp) => (
                        <span key={sp} className="border border-kult-gray/60 px-3 py-1 font-heading text-[10px] font-semibold uppercase tracking-[0.2em] text-kult-gray">
                          {sp}
                        </span>
                      ))}
                    </div>
                    <Link to="/book" className="mt-8 inline-block border border-kult-red px-6 py-3 font-heading text-xs font-semibold uppercase tracking-[0.25em] text-kult-red hover:bg-kult-red hover:text-kult-white">
                      Book with {s.name.split(" ")[0]}
                    </Link>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>
    </>
  );
}

function ArtistCard({ p, compact }: { p: (typeof staff)[number]; compact?: boolean }) {
  return (
    <div className={compact ? "bg-kult-black p-8" : ""}>
      <img src={p.photo} alt={p.name} className="aspect-[4/5] w-full object-cover grayscale" loading="lazy" decoding="async" />
      <h3 className="mt-6 font-display text-3xl text-kult-white">{p.name}</h3>
      <div className="mt-1 font-heading text-[11px] uppercase tracking-[0.25em] text-kult-red">{p.role}</div>
      <p className="mt-3 text-sm text-kult-gray">{p.bio}</p>
      <Link to="/book" className="mt-4 inline-block hover-red-line font-heading text-[11px] font-semibold uppercase tracking-[0.25em] text-kult-red">
        Book with {p.name.split(" ")[0]} →
      </Link>
    </div>
  );
}
