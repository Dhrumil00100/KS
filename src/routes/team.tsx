import { createFileRoute, Link } from "@tanstack/react-router";
import { staff } from "@/lib/mock-data";
import { SectionEyebrow } from "@/components/shared/SectionEyebrow";
import { Reveal } from "@/components/shared/RevealWrapper";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "The Artists — KULT Salon Ahmedabad" },
      { name: "description", content: "Meet the senior artists, creative directors, master colourists, and hair stylists at KULT Salon Ahmedabad." },
      { property: "og:title", content: "The Artists — KULT Salon" },
      { property: "og:description", content: "Meet Ahmedabad's top hair and beauty specialists." },
    ],
  }),
  component: TeamPage,
});

function TeamPage() {
  return (
    <>
      <section className="bg-kult-black section-padding text-kult-white">
        <div className="container-custom">
          <SectionEyebrow>The People</SectionEyebrow>
          <h1 className="mt-4 font-display fluid-h1 text-kult-white">The Artists.</h1>
          <p className="mt-4 max-w-xl font-body text-base text-neutral-400">
            Our team brings together international training, editorial precision, and years of experience serving Ahmedabad&apos;s most discerning clientele.
          </p>
        </div>
      </section>

      <section className="bg-kult-offwhite section-padding text-kult-black">
        <div className="container-custom space-y-16 sm:space-y-24">
          {staff.map((s, idx) => (
            <Reveal key={s.id}>
              <div
                className={`grid grid-cols-1 items-center gap-8 sm:gap-12 lg:grid-cols-12 bg-white border border-neutral-200 p-6 sm:p-10 shadow-sm ${
                  idx % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                {/* Artist Photo */}
                <div className="lg:col-span-5 relative aspect-[4/5] w-full overflow-hidden bg-neutral-100">
                  <img
                    src={s.photo}
                    alt={`${s.name} - ${s.role} at KULT Salon`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover grayscale transition-all duration-500 hover:grayscale-0"
                  />
                  <div className="absolute top-4 left-4 bg-kult-black text-kult-white px-3 py-1 font-heading text-[10px] font-bold uppercase tracking-[0.2em]">
                    {s.experience} Experience
                  </div>
                </div>

                {/* Artist Bio & Details */}
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <span className="font-heading text-xs font-bold uppercase tracking-[0.25em] text-kult-red">
                      {s.role}
                    </span>
                    <h2 className="mt-2 font-display fluid-h2 text-kult-black">{s.name}</h2>
                  </div>

                  <p className="font-body text-base leading-relaxed text-neutral-700 max-w-xl">
                    {s.bio}
                  </p>

                  <div>
                    <span className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 block mb-3">
                      Specializations
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {s.specialisations.map((sp) => (
                        <span
                          key={sp}
                          className="border border-neutral-300 bg-neutral-50 px-3 py-1 font-heading text-xs font-semibold uppercase tracking-[0.15em] text-neutral-800"
                        >
                          {sp}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-neutral-200 flex flex-wrap items-center gap-4">
                    <Link
                      to="/book"
                      className="touch-target inline-flex items-center justify-center border border-kult-red bg-kult-red px-6 py-3 font-heading text-xs font-semibold uppercase tracking-[0.2em] text-kult-white transition-all hover:bg-kult-black hover:border-kult-black"
                    >
                      Book With {s.name.split(" ")[0]}
                    </Link>
                    <Link
                      to="/gallery"
                      className="touch-target inline-flex items-center justify-center border border-neutral-300 bg-transparent px-6 py-3 font-heading text-xs font-semibold uppercase tracking-[0.2em] text-kult-black transition-all hover:border-kult-black"
                    >
                      View Work
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
