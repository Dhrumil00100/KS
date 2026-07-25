import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const NAV = [
  { to: "/", label: "HOME" },
  { to: "/services", label: "SERVICES" },
  { to: "/team", label: "TEAM" },
  { to: "/gallery", label: "GALLERY" },
  { to: "/loyalty", label: "LOYALTY" },
  { to: "/contact", label: "CONTACT" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      window.locomotiveScroll?.stop?.();
    } else {
      document.body.style.overflow = "";
      window.locomotiveScroll?.start?.();
    }
    return () => {
      document.body.style.overflow = "";
      window.locomotiveScroll?.start?.();
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-kult-black">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6">
        <Link to="/" className="font-display text-[28px] leading-none tracking-widest text-kult-white">
          KULT
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="hover-red-line font-heading text-[12px] font-semibold uppercase tracking-[0.2em] text-kult-white"
              activeProps={{ style: { color: "#E60012" } }}
              activeOptions={{ exact: true }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/book"
            className="hidden border border-kult-red bg-kult-black px-5 py-2 font-heading text-[11px] font-semibold uppercase tracking-[0.2em] text-kult-white transition-colors duration-150 hover:bg-kult-red md:inline-block"
          >
            Book Now
          </Link>
          <button
            aria-label="Menu"
            onClick={() => setOpen(true)}
            className="text-kult-white md:hidden"
          >
            <Menu size={26} />
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-[60] flex flex-col bg-kult-black md:hidden">
          <div className="h-[3px] w-full bg-kult-red" />
          <div className="flex items-center justify-between px-6 h-16">
            <span className="font-display text-[28px] tracking-widest text-kult-white">KULT</span>
            <button aria-label="Close" onClick={() => setOpen(false)} className="text-kult-white">
              <X size={28} />
            </button>
          </div>
          <nav className="flex flex-1 flex-col items-start gap-6 px-8 pt-10">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="font-display text-5xl uppercase tracking-wide text-kult-white"
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/book"
              onClick={() => setOpen(false)}
              className="mt-4 inline-block border border-kult-red bg-kult-red px-6 py-3 font-heading text-sm font-semibold uppercase tracking-[0.2em] text-kult-white"
            >
              Book Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
