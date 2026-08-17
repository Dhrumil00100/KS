import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { galleryImages } from "@/lib/mock-data";
import { SectionEyebrow } from "@/components/shared/SectionEyebrow";

const CATS = ["All", "Hair", "Colour", "Bridal", "Nails", "Skin"] as const;

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Recent Work | KULT Salon Ahmedabad" },
      { name: "description", content: "View the portfolio of KULT Salon Ahmedabad: hair cut transformations, master balayage, editorial bridal makeup, and gel nail art." },
      { property: "og:title", content: "Gallery — KULT Salon" },
      { property: "og:description", content: "Curated recent work from KULT Salon." },
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
      <section className="bg-kult-black section-padding text-kult-white">
        <div className="container-custom">
          <SectionEyebrow>Recent Work</SectionEyebrow>
          <h1 className="mt-4 font-display fluid-h1 text-kult-white">Portfolio Gallery.</h1>
          <p className="mt-4 max-w-xl font-body text-base text-neutral-400">
            A curated showcase of precision haircuts, hand-painted balayage, clinical skin treatments, and editorial bridal styling created at KULT.
          </p>

          {/* Touch-friendly Category Filter Pills */}
          <div className="mt-10 flex flex-wrap gap-3 border-b border-white/10 pb-6" role="tablist" aria-label="Gallery category filters">
            {CATS.map((c) => (
              <button
                key={c}
                type="button"
                role="tab"
                aria-selected={cat === c}
                onClick={() => setCat(c)}
                className={`touch-target px-5 py-2.5 font-heading text-xs font-bold uppercase tracking-[0.2em] transition-all rounded-none ${
                  cat === c
                    ? "bg-kult-red text-kult-white shadow-sm"
                    : "bg-neutral-900 border border-neutral-800 text-neutral-300 hover:border-kult-red hover:text-kult-white"
                }`}
              >
                {c} <span className="ml-1 opacity-70">({counts[c] ?? 0})</span>
              </button>
            ))}
          </div>

          {/* Responsive Gallery Grid */}
          <motion.div layout className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
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
                  className="group relative aspect-[4/5] w-full overflow-hidden bg-neutral-900 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kult-red"
                >
                  <img
                    src={g.url}
                    alt={`KULT Salon ${g.category} portfolio work transformation`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-kult-white">
                      {g.category}
                    </span>
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal */}
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

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [index, images]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image preview"
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-in fade-in duration-200"
    >
      <button
        type="button"
        aria-label="Close image preview"
        onClick={onClose}
        className="touch-target absolute top-6 right-6 z-10 text-kult-white hover:text-kult-red transition-colors"
      >
        <X size={32} />
      </button>

      <button
        type="button"
        aria-label="Previous image"
        onClick={prev}
        className="touch-target absolute left-4 sm:left-8 z-10 text-kult-white hover:text-kult-red transition-colors"
      >
        <ChevronLeft size={44} />
      </button>

      <div className="relative max-h-[85vh] max-w-[90vw]">
        <img
          src={img.url}
          alt={`KULT Salon ${img.category} portfolio work enlarged view`}
          className="max-h-[80vh] max-w-[85vw] object-contain shadow-2xl"
          loading="eager"
        />
        <div className="mt-4 text-center">
          <span className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-kult-red">
            {img.category} • {index + 1} of {images.length}
          </span>
        </div>
      </div>

      <button
        type="button"
        aria-label="Next image"
        onClick={next}
        className="touch-target absolute right-4 sm:right-8 z-10 text-kult-white hover:text-kult-red transition-colors"
      >
        <ChevronRight size={44} />
      </button>
    </div>
  );
}
