import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Check, MessageSquare } from "lucide-react";
import { SectionEyebrow } from "@/components/shared/SectionEyebrow";
import { services } from "@/lib/mock-data";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Location — KULT Salon Ahmedabad" },
      { name: "description", content: "Visit KULT Salon on Sindhu Bhavan Road, Bodakdev, Ahmedabad. Phone +91 98765 43210. Open Tuesday to Sunday." },
      { property: "og:title", content: "Contact — KULT Salon" },
      { property: "og:description", content: "Get in touch with KULT Salon Ahmedabad." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <section className="grid min-h-[calc(100vh-80px)] grid-cols-1 lg:grid-cols-2">
      {/* Left Column: Contact Details & Location */}
      <div className="bg-kult-black p-8 sm:p-14 lg:p-20 text-kult-white flex flex-col justify-between space-y-10">
        <div>
          <SectionEyebrow>Contact &amp; Location</SectionEyebrow>
          <h1 className="mt-4 font-display fluid-h1 text-kult-white">LET&apos;S TALK.</h1>

          <ul className="mt-10 space-y-6 text-kult-white">
            <li className="flex items-start gap-4">
              <MapPin className="text-kult-red flex-shrink-0 mt-1" size={24} />
              <div>
                <div className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-neutral-400">Address</div>
                <div className="mt-1 font-body text-base text-neutral-200">12 Sindhu Bhavan Road, Bodakdev, Ahmedabad 380054</div>
              </div>
            </li>
            <li className="flex items-center gap-4">
              <Phone className="text-kult-red flex-shrink-0" size={24} />
              <div>
                <div className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-neutral-400">Phone</div>
                <a href="tel:+919876543210" className="mt-1 font-body text-base text-neutral-200 hover:text-kult-red transition-colors block">+91 98765 43210</a>
              </div>
            </li>
            <li className="flex items-center gap-4">
              <Mail className="text-kult-red flex-shrink-0" size={24} />
              <div>
                <div className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-neutral-400">Email</div>
                <a href="mailto:hello@kultsalon.com" className="mt-1 font-body text-base text-neutral-200 hover:text-kult-red transition-colors block">hello@kultsalon.com</a>
              </div>
            </li>
          </ul>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="touch-target inline-flex items-center justify-center gap-2 border border-kult-red bg-kult-red px-6 py-3 font-heading text-xs font-semibold uppercase tracking-[0.2em] text-kult-white transition-all hover:bg-transparent"
            >
              <MessageSquare size={16} /> WhatsApp Us
            </a>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10">
            <span className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-kult-red block mb-4">Opening Hours</span>
            <table className="w-full max-w-md text-sm font-body text-neutral-300">
              <tbody>
                {[
                  ["Tuesday – Friday", "10:00 AM – 8:00 PM"],
                  ["Saturday", "09:00 AM – 9:00 PM"],
                  ["Sunday", "10:00 AM – 8:00 PM"],
                  ["Monday", "Closed"],
                ].map(([d, h]) => (
                  <tr key={d} className="border-b border-white/10 last:border-b-0">
                    <td className="py-2.5 font-medium">{d}</td>
                    <td className="py-2.5 text-right text-neutral-400">{h}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Map visual card */}
        <div className="relative h-48 w-full max-w-md overflow-hidden border border-white/10 bg-neutral-900">
          <img
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&fit=crop&auto=format&q=70"
            alt="Map location of KULT Salon in Bodakdev, Ahmedabad"
            className="h-full w-full object-cover opacity-50"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <div className="flex items-center gap-2 bg-black/80 px-4 py-2 border border-kult-red text-kult-white font-heading text-xs uppercase tracking-wider">
              <MapPin size={16} className="text-kult-red" /> Sindhu Bhavan Road
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Interactive Form */}
      <div className="bg-kult-offwhite p-8 sm:p-14 lg:p-20 text-kult-black flex flex-col justify-center">
        {sent ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-6 py-16">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-kult-red/10 text-kult-red">
              <Check size={40} strokeWidth={3} />
            </div>
            <h2 className="font-display fluid-h2 text-kult-black">MESSAGE RECEIVED.</h2>
            <p className="font-body text-base text-neutral-600 max-w-sm mx-auto">
              Thank you for reaching out. A member of our concierge team will respond within 24 hours.
            </p>
          </motion.div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="max-w-md space-y-6"
          >
            <div>
              <SectionEyebrow>Send A Message</SectionEyebrow>
              <h2 className="mt-4 font-display fluid-h2 text-kult-black">TELL US ABOUT IT.</h2>
            </div>

            <div className="space-y-4 pt-4">
              <Field label="Full Name" required>
                <input required className="touch-target w-full border border-neutral-300 bg-white px-4 py-3 font-body text-sm outline-none focus:border-kult-red" placeholder="e.g. Rahul Mehta" />
              </Field>
              <Field label="Email Address" required>
                <input required type="email" className="touch-target w-full border border-neutral-300 bg-white px-4 py-3 font-body text-sm outline-none focus:border-kult-red" placeholder="e.g. rahul@example.com" />
              </Field>
              <Field label="Phone Number">
                <input type="tel" className="touch-target w-full border border-neutral-300 bg-white px-4 py-3 font-body text-sm outline-none focus:border-kult-red" placeholder="e.g. +91 98765 43210" />
              </Field>
              <Field label="Service Interest">
                <select className="touch-target w-full border border-neutral-300 bg-white px-4 py-3 font-body text-sm outline-none focus:border-kult-red">
                  <option>Select a discipline</option>
                  {services.map((s) => (
                    <option key={s.id}>{s.name}</option>
                  ))}
                </select>
              </Field>
              <Field label="Your Message">
                <textarea rows={4} className="w-full border border-neutral-300 bg-white p-4 font-body text-sm outline-none focus:border-kult-red resize-none" placeholder="Tell us how we can assist you..." />
              </Field>
            </div>

            <button
              type="submit"
              className="touch-target w-full border border-kult-black bg-kult-black py-4 font-heading text-xs font-semibold uppercase tracking-[0.25em] text-kult-white transition-all hover:bg-kult-red hover:border-kult-red"
            >
              Send Message
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block space-y-1.5">
      <span className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-neutral-700">
        {label}{required && <span className="text-kult-red"> *</span>}
      </span>
      <div>{children}</div>
    </label>
  );
}
