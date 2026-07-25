import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="bg-kult-black text-kult-white">
      <div className="h-[2px] w-full bg-kult-red" />
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-6 py-16 md:grid-cols-4">
        <div>
          <div className="font-display text-3xl tracking-widest">KULT</div>
          <p className="mt-4 max-w-xs text-sm text-kult-gray">
            Premium hair and beauty for the discerning. Beauty with an edge.
          </p>
        </div>
        <div>
          <h4 className="font-heading text-[11px] font-semibold uppercase tracking-[0.25em] text-kult-red">Services</h4>
          <ul className="mt-4 space-y-2 text-sm text-kult-gray">
            <li>Hair</li>
            <li>Colour</li>
            <li>Skin</li>
            <li>Nails</li>
            <li>Bridal</li>
          </ul>
        </div>
        <div>
          <h4 className="font-heading text-[11px] font-semibold uppercase tracking-[0.25em] text-kult-red">Quick Links</h4>
          <ul className="mt-4 space-y-2 text-sm text-kult-gray">
            <li><Link to="/team" className="hover:text-kult-white">Team</Link></li>
            <li><Link to="/gallery" className="hover:text-kult-white">Gallery</Link></li>
            <li><Link to="/loyalty" className="hover:text-kult-white">Loyalty</Link></li>
            <li><Link to="/book" className="hover:text-kult-white">Book</Link></li>
            <li><Link to="/contact" className="hover:text-kult-white">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-heading text-[11px] font-semibold uppercase tracking-[0.25em] text-kult-red">Contact</h4>
          <ul className="mt-4 space-y-2 text-sm text-kult-gray">
            <li>12 Linking Road, Bandra West</li>
            <li>Mumbai 400050</li>
            <li>+91 98765 43210</li>
            <li>hello@kultsalon.com</li>
          </ul>
          <div className="mt-4 flex gap-4 font-heading text-[11px] font-semibold uppercase tracking-[0.2em] text-kult-white">
            <a href="#" className="hover:text-kult-red">Instagram</a>
            <a href="#" className="hover:text-kult-red">Facebook</a>
            <a href="#" className="hover:text-kult-red">Youtube</a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs text-kult-gray">
        © 2025 KULT Salon. All rights reserved.
      </div>
    </footer>
  );
}
