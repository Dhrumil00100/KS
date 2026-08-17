import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-kult-black text-kult-white">
      <div className="h-1 w-full bg-kult-red" />

      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Col 1: Brand & Statement */}
          <div className="space-y-4">
            <Link to="/" className="inline-block font-display text-4xl tracking-widest text-kult-white">
              KULT<span className="text-kult-red">.</span>
            </Link>
            <p className="max-w-xs font-body text-sm leading-relaxed text-neutral-400">
              Ahmedabad&apos;s premier unisex luxury hair &amp; beauty salon. Considered, precise, unmistakably you.
            </p>
            <div className="pt-2">
              <Link
                to="/book"
                className="touch-target inline-flex items-center justify-center border border-kult-red bg-kult-red px-5 py-2.5 font-heading text-xs font-semibold uppercase tracking-[0.2em] text-kult-white transition-colors hover:bg-transparent"
              >
                Book Appointment
              </Link>
            </div>
          </div>

          {/* Col 2: Services Menu */}
          <div>
            <h3 className="font-heading text-xs font-bold uppercase tracking-[0.25em] text-kult-red">
              Disciplines
            </h3>
            <ul className="mt-4 space-y-2.5 font-body text-sm text-neutral-400">
              <li>
                <Link to="/services" className="transition-colors hover:text-kult-white">Precision Hair Crafting</Link>
              </li>
              <li>
                <Link to="/services" className="transition-colors hover:text-kult-white">Master Colour &amp; Balayage</Link>
              </li>
              <li>
                <Link to="/services" className="transition-colors hover:text-kult-white">Advanced Skin Therapies</Link>
              </li>
              <li>
                <Link to="/services" className="transition-colors hover:text-kult-white">Editorial Bridal &amp; Nails</Link>
              </li>
              <li>
                <Link to="/loyalty" className="transition-colors hover:text-kult-white">KULT Rewards Programme</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Navigation Quick Links */}
          <div>
            <h3 className="font-heading text-xs font-bold uppercase tracking-[0.25em] text-kult-red">
              Explore
            </h3>
            <ul className="mt-4 space-y-2.5 font-body text-sm text-neutral-400">
              <li><Link to="/" className="transition-colors hover:text-kult-white">Home</Link></li>
              <li><Link to="/services" className="transition-colors hover:text-kult-white">Services Menu</Link></li>
              <li><Link to="/team" className="transition-colors hover:text-kult-white">The Artists</Link></li>
              <li><Link to="/gallery" className="transition-colors hover:text-kult-white">Recent Work</Link></li>
              <li><Link to="/loyalty" className="transition-colors hover:text-kult-white">Loyalty &amp; Rewards</Link></li>
              <li><Link to="/contact" className="transition-colors hover:text-kult-white">Contact &amp; Location</Link></li>
            </ul>
          </div>

          {/* Col 4: Location & Hours */}
          <div className="space-y-4">
            <h3 className="font-heading text-xs font-bold uppercase tracking-[0.25em] text-kult-red">
              Visit Us
            </h3>
            <ul className="space-y-3 font-body text-sm text-neutral-400">
              <li className="flex items-start gap-2.5">
                <MapPin size={18} className="mt-0.5 flex-shrink-0 text-kult-red" />
                <span>12 Sindhu Bhavan Road, Bodakdev, Ahmedabad 380054</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={18} className="flex-shrink-0 text-kult-red" />
                <a href="tel:+919876543210" className="transition-colors hover:text-kult-white">+91 98765 43210</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={18} className="flex-shrink-0 text-kult-red" />
                <a href="mailto:hello@kultsalon.com" className="transition-colors hover:text-kult-white">hello@kultsalon.com</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock size={18} className="flex-shrink-0 text-kult-red" />
                <span>Tue – Sun: 10:00 AM – 8:00 PM</span>
              </li>
            </ul>

            <div className="pt-2 flex gap-4 text-neutral-400">
              <a href="#" aria-label="Instagram" className="transition-colors hover:text-kult-red">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" aria-label="Facebook" className="transition-colors hover:text-kult-red">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.592 9 4.415V8z"/>
                </svg>
              </a>
              <a href="#" aria-label="Youtube" className="transition-colors hover:text-kult-red">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="mt-16 border-t border-white/10 pt-8 flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left text-xs text-neutral-500 font-body">
          <p>© {new Date().getFullYear()} KULT Salon. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/contact" className="hover:text-neutral-300">Privacy Policy</Link>
            <Link to="/contact" className="hover:text-neutral-300">Terms of Service</Link>
            <Link to="/contact" className="hover:text-neutral-300">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
