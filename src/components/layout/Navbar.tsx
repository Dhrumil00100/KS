import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const NAV = [
  { to: "/", label: "HOME" },
  { to: "/services", label: "SERVICES" },
  { to: "/team", label: "ARTISTS" },
  { to: "/gallery", label: "WORK" },
  { to: "/loyalty", label: "LOYALTY" },
  { to: "/contact", label: "CONTACT" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);

  // Keyboard accessibility: ESC key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).locomotiveScroll?.stop?.();
    } else {
      document.body.style.overflow = "";
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).locomotiveScroll?.start?.();
    }
    return () => {
      document.body.style.overflow = "";
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).locomotiveScroll?.start?.();
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-kult-black/95 backdrop-blur-md">
      <div className="container-custom flex h-20 items-center justify-between">
        {/* Brand Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 font-display text-3xl tracking-widest text-kult-white focus-visible:outline-none"
        >
          <span>KULT</span>
          <span className="text-kult-red">.</span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main Navigation">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="hover-red-line font-heading text-xs font-semibold uppercase tracking-[0.2em] text-kult-white transition-colors hover:text-kult-white"
              activeProps={{ className: "text-kult-red font-bold" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <Link
            to="/book"
            className="touch-target hidden items-center justify-center border border-kult-red bg-kult-red px-6 py-2.5 font-heading text-xs font-semibold uppercase tracking-[0.2em] text-kult-white transition-all duration-200 hover:bg-kult-black hover:text-kult-white sm:flex"
          >
            Book Now
          </Link>

          <button
            type="button"
            aria-label={open ? "Close Navigation Menu" : "Open Navigation Menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation-drawer"
            onClick={() => setOpen(!open)}
            className="touch-target flex items-center justify-center text-kult-white hover:text-kult-red md:hidden focus-visible:outline-none"
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {open && (
        <div
          id="mobile-navigation-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="fixed inset-0 z-[60] flex flex-col bg-kult-black animate-in fade-in slide-in-from-top-4 duration-300 md:hidden"
        >
          <div className="h-1 w-full bg-kult-red" />
          <div className="container-custom flex h-20 items-center justify-between">
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="font-display text-3xl tracking-widest text-kult-white"
            >
              KULT<span className="text-kult-red">.</span>
            </Link>
            <button
              type="button"
              aria-label="Close Navigation Menu"
              onClick={() => setOpen(false)}
              className="touch-target flex items-center justify-center text-kult-white hover:text-kult-red"
            >
              <X size={32} />
            </button>
          </div>

          <nav className="container-custom flex flex-1 flex-col justify-center space-y-6 py-8">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="font-display text-4xl uppercase tracking-wider text-kult-white transition-colors hover:text-kult-red"
                activeProps={{ className: "text-kult-red" }}
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label}
              </Link>
            ))}

            <div className="pt-6">
              <Link
                to="/book"
                onClick={() => setOpen(false)}
                className="touch-target flex w-full items-center justify-center border border-kult-red bg-kult-red py-4 font-heading text-sm font-semibold uppercase tracking-[0.2em] text-kult-white transition-all hover:bg-transparent"
              >
                Book An Appointment
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
