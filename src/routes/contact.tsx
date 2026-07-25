import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Check } from "lucide-react";
import { SectionEyebrow } from "@/components/shared/SectionEyebrow";
import { services } from "@/lib/mock-data";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — KULT Salon" },
      { name: "description", content: "Get in touch with KULT Salon. Visit us, call, or send a message." },
      { property: "og:title", content: "Contact — KULT Salon" },
      { property: "og:description", content: "Get in touch with KULT." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <section className="grid min-h-[calc(100vh-64px)] grid-cols-1 md:grid-cols-2">
      <div className="bg-kult-black p-10 md:p-16">
        <SectionEyebrow>Contact</SectionEyebrow>
        <h1 className="mt-4 font-display text-5xl text-kult-white md:text-7xl">LET'S TALK.</h1>

        <ul className="mt-10 space-y-6 text-kult-white">
          <li className="flex gap-4">
            <MapPin className="text-kult-red" size={22} />
            <div>
              <div className="font-heading text-[11px] uppercase tracking-[0.25em] text-kult-gray">Address</div>
              <div className="mt-1 text-sm">12 Linking Road, Bandra West, Mumbai 400050</div>
            </div>
          </li>
          <li className="flex gap-4">
            <Phone className="text-kult-red" size={22} />
            <div>
              <div className="font-heading text-[11px] uppercase tracking-[0.25em] text-kult-gray">Phone</div>
              <div className="mt-1 text-sm">+91 98765 43210</div>
            </div>
          </li>
          <li className="flex gap-4">
            <Mail className="text-kult-red" size={22} />
            <div>
              <div className="font-heading text-[11px] uppercase tracking-[0.25em] text-kult-gray">Email</div>
              <div className="mt-1 text-sm">hello@kultsalon.com</div>
            </div>
          </li>
        </ul>

        <a href="https://wa.me/919876543210" className="mt-8 inline-block border border-kult-red bg-kult-red px-6 py-3 font-heading text-xs font-semibold uppercase tracking-[0.25em] text-kult-white hover:bg-kult-black">
          WhatsApp us
        </a>

        <div className="mt-10">
          <div className="font-heading text-[11px] uppercase tracking-[0.25em] text-kult-red">Hours</div>
          <table className="mt-3 w-full max-w-sm text-sm text-kult-white">
            <tbody>
              {[
                ["Mon – Fri", "10:00 – 21:00"],
                ["Saturday", "09:00 – 22:00"],
                ["Sunday", "10:00 – 20:00"],
              ].map(([d, h]) => (
                <tr key={d} className="border-b border-white/10">
                  <td className="py-2 text-kult-gray">{d}</td>
                  <td className="py-2 text-right">{h}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="relative mt-10 h-52 w-full max-w-md overflow-hidden bg-[#111]">
          <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&fit=crop&auto=format&q=70" alt="Location map for KULT Salon in Bandra West, Mumbai" className="h-full w-full object-cover opacity-60" loading="lazy" decoding="async" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <MapPin size={36} className="text-kult-red" fill="currentColor" />
          </div>
        </div>
      </div>

      <div className="bg-kult-offwhite p-10 md:p-16">
        {sent ? (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-32 text-center">
            <div className="flex h-20 w-20 items-center justify-center border-2 border-kult-red">
              <Check size={40} className="text-kult-red" strokeWidth={3} />
            </div>
            <h2 className="mt-8 font-display text-5xl text-kult-black">We'll be in touch.</h2>
            <p className="mt-3 text-sm text-kult-gray">Thanks — we'll respond within one business day.</p>
          </motion.div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="mx-auto max-w-md"
          >
            <SectionEyebrow>Send a message</SectionEyebrow>
            <h2 className="mt-4 font-display text-4xl text-kult-black">Tell us about it.</h2>

            <div className="mt-8 space-y-6">
              <Field label="Name" required><input required className="input" /></Field>
              <Field label="Email" required><input required type="email" className="input" /></Field>
              <Field label="Phone"><input type="tel" className="input" /></Field>
              <Field label="Service">
                <select className="input bg-transparent">
                  <option>Select a service</option>
                  {services.map((s) => <option key={s.id}>{s.name}</option>)}
                </select>
              </Field>
              <Field label="Message"><textarea rows={4} className="input resize-none" /></Field>
            </div>

            <button
              type="submit"
              className="mt-10 w-full border border-kult-black bg-kult-black py-4 font-heading text-xs font-semibold uppercase tracking-[0.25em] text-kult-white transition-colors hover:bg-kult-red hover:border-kult-red"
            >
              Send message
            </button>
          </form>
        )}
      </div>

      <style>{`
        .input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid #B8B8B8;
          padding: 8px 2px;
          font-family: var(--font-body);
          color: #000;
          outline: none;
          transition: border-color 0.2s;
        }
        .input:focus { border-color: #E60012; }
      `}</style>
    </section>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="font-heading text-[10px] font-semibold uppercase tracking-[0.25em] text-kult-gray">
        {label}{required && <span className="text-kult-red"> *</span>}
      </div>
      <div className="mt-1">{children}</div>
    </label>
  );
}
