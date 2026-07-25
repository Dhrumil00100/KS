import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { galleryImages } from "@/lib/mock-data";
import { SectionEyebrow } from "@/components/shared/SectionEyebrow";

const CATS = ["All", "Hair", "Colour", "Bridal", "Nails", "Skin"] as const;

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — KULT Salon" },
      { name: "description", content: "A curated look at recent work from the KULT team." },
      { property: "og:title", content: "Gallery — KULT Salon" },
      { property: "og:description", content: "Recent work from KULT." },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const [cat, setCat] = useState<(typeof CATS)[number]>("All");
  const [open, setOpen] = useState<number | null>(null);

  const filtered = useMemo(
    () => (cat === "All" ? galleryImages : galleryImages.filter((g) => g.category === cat)),
    [cat],
  );

  const counts = useMemo(() => {
    const m: Record<string, number> = { All: galleryImages.length };
    for (const g of galleryImages) m[g.category] = (m[g.category] ?? 0) + 1;
    return m;
  }, []);

  return (
    <>
      <section className="bg-kult-black py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6">
          <SectionEyebrow>Recent work</SectionEyebrow>
          <h1 className="mt-4 font-display text-6xl text-kult-white md:text-8xl">Gallery.</h1>

          <div className="mt-12 flex flex-wrap gap-6 border-b border-white/10 pb-4">
            {CATS.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`relative pb-2 font-heading text-xs font-semibold uppercase tracking-[0.25em] ${cat === c ? "text-kult-white" : "text-kult-gray"}`}
              >
                {c} <span className="ml-1 text-kult-red">{counts[c] ?? 0}</span>
                {cat === c && <span className="absolute -bottom-[17px] left-0 h-[2px] w-full bg-kult-red" />}
              </button>
            ))}
          </div>

          <motion.div layout className="mt-10 columns-1 gap-3 md:columns-2 lg:columns-3">
            <AnimatePresence>
              {filtered.map((g, idx) => (
                <motion.button
                  layout
                  key={g.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  onClick={() => setOpen(idx)}
                  className="group relative mb-3 block w-full overflow-hidden break-inside-avoid text-left"
                >
                  <img src={g.url} alt={`KULT Salon ${g.category} portfolio image`} className="w-full object-cover" loading="lazy" decoding="async" />
                  <div className="absolute inset-x-0 bottom-0 translate-y-full bg-kult-red/80 p-4 transition-transform duration-200 group-hover:translate-y-0">
                    <div className="font-heading text-[11px] font-semibold uppercase tracking-[0.25em] text-kult-white">{g.category}</div>
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {open !== null && (
        <Lightbox
          images={filtered}
          index={open}
          onClose={() => setOpen(null)}
          onChange={setOpen}
        />
      )}
    </>
  );
}

function Lightbox({
  images,
  index,
  onClose,
  onChange,
}: {
  images: typeof galleryImages;
  index: number;
  onClose: () => void;
  onChange: (i: number) => void;
}) {
  const img = images[index];
  const prev = () => onChange((index - 1 + images.length) % images.length);
  const next = () => onChange((index + 1) % images.length);

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-kult-black">
      <button aria-label="Close" onClick={onClose} className="absolute right-6 top-6 text-kult-red">
        <X size={32} />
      </button>
      <button aria-label="Previous" onClick={prev} className="absolute left-6 text-kult-white">
        <ChevronLeft size={40} />
      </button>
      <img src={img.url} alt={`KULT Salon ${img.category} portfolio image enlarged`} className="max-h-[85vh] max-w-[90vw] object-contain" loading="lazy" decoding="async" />
      <button aria-label="Next" onClick={next} className="absolute right-6 text-kult-white" style={{ right: "3.5rem" }}>
        <ChevronRight size={40} />
      </button>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-heading text-xs uppercase tracking-[0.3em] text-kult-white">
        {img.category}
      </div>
    </div>
  );
}
