import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { services, staff } from "@/lib/mock-data";
import { SectionEyebrow } from "@/components/shared/SectionEyebrow";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book Appointment — KULT Salon Ahmedabad" },
      { name: "description", content: "Book your appointment online at KULT Salon on Sindhu Bhavan Road, Ahmedabad. Select service, senior artist, date and time." },
      { property: "og:title", content: "Book Appointment — KULT Salon" },
      { property: "og:description", content: "Reserve your chair online in under 60 seconds." },
    ],
  }),
  component: BookPage,
});

const STEP_LABELS = ["Service", "Artist", "Date & Time", "Confirm"];

function BookPage() {
  const [step, setStep] = useState(0);
  const [serviceId, setServiceId] = useState<string | null>(null);
  const [staffId, setStaffId] = useState<string | null>("none");
  const [date, setDate] = useState<number | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [done, setDone] = useState(false);

  const service = services.find((s) => s.id === serviceId);
  const artist = staffId === "none" ? null : staff.find((s) => s.id === staffId);

  const canNext = [!!serviceId, !!staffId, date !== null && !!time, !!name && !!email && !!phone][step];

  if (done && service) {
    return <SuccessScreen service={service} artist={artist} date={date} time={time} />;
  }

  return (
    <section className="min-h-[calc(100vh-80px)] bg-kult-black section-padding text-kult-white">
      <div className="container-custom max-w-4xl">
        <SectionEyebrow>Online Booking</SectionEyebrow>
        <h1 className="mt-4 font-display fluid-h1 text-kult-white">Reserve your chair.</h1>

        {/* Progress Tracker */}
        <div className="mt-10 sm:mt-14">
          <div className="relative mb-4 flex items-center justify-between">
            <div className="absolute left-4 right-4 top-1/2 h-[2px] -translate-y-1/2 bg-white/10" />
            <motion.div
              className="absolute left-4 top-1/2 h-[2px] -translate-y-1/2 bg-kult-red"
              initial={false}
              animate={{ width: `calc(${(step / (STEP_LABELS.length - 1)) * 100}% - 2rem)` }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
            />
            {STEP_LABELS.map((_, i) => (
              <div
                key={i}
                className={`relative z-10 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center border-2 font-display text-base sm:text-lg transition-colors ${
                  i <= step
                    ? "border-kult-red bg-kult-red text-kult-white"
                    : "border-white/20 bg-kult-black text-neutral-500"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
            ))}
          </div>
          <div className="flex justify-between font-heading text-[10px] sm:text-xs uppercase tracking-[0.15em] text-neutral-400">
            {STEP_LABELS.map((l, i) => (
              <div key={l} className={i <= step ? "text-kult-white font-bold" : ""}>
                {l}
              </div>
            ))}
          </div>
        </div>

        {/* Step Views */}
        <div className="relative mt-10 sm:mt-14 overflow-hidden border border-white/10 bg-neutral-950 p-6 sm:p-10">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              {step === 0 && <StepService serviceId={serviceId} setServiceId={setServiceId} />}
              {step === 1 && <StepArtist staffId={staffId} setStaffId={setStaffId} />}
              {step === 2 && <StepDate date={date} setDate={setDate} time={time} setTime={setTime} />}
              {step === 3 && (
                <StepConfirm
                  service={service}
                  artist={artist}
                  date={date}
                  time={time}
                  name={name}
                  setName={setName}
                  email={email}
                  setEmail={setEmail}
                  phone={phone}
                  setPhone={setPhone}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="mt-8 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="touch-target flex items-center gap-2 font-heading text-xs font-semibold uppercase tracking-[0.25em] text-neutral-400 disabled:opacity-30 hover:text-kult-white"
          >
            <ChevronLeft size={18} /> Back
          </button>

          {step < STEP_LABELS.length - 1 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s + 1)}
              disabled={!canNext}
              className="touch-target flex items-center gap-2 border border-kult-red bg-kult-red px-8 py-3.5 font-heading text-xs font-semibold uppercase tracking-[0.25em] text-kult-white disabled:opacity-40 hover:bg-transparent"
            >
              Next <ChevronRight size={18} />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setDone(true)}
              disabled={!canNext}
              className="touch-target border border-kult-red bg-kult-red px-10 py-3.5 font-heading text-xs font-semibold uppercase tracking-[0.25em] text-kult-white disabled:opacity-40 hover:bg-transparent"
            >
              Confirm Booking
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

function StepService({
  serviceId,
  setServiceId,
}: {
  serviceId: string | null;
  setServiceId: (id: string) => void;
}) {
  const cats = ["all", "hair", "colour", "skin", "nails", "bridal"] as const;
  const [cat, setCat] = useState<(typeof cats)[number]>("all");
  const filtered = cat === "all" ? services : services.filter((s) => s.category === cat);

  return (
    <div className="space-y-6">
      <h2 className="font-display text-3xl text-kult-white">1. Select A Service</h2>

      <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
        {cats.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCat(c)}
            className={`touch-target px-4 py-2 font-heading text-xs font-bold uppercase tracking-[0.2em] transition-colors ${
              cat === c ? "bg-kult-red text-kult-white" : "bg-neutral-900 text-neutral-400 hover:text-white"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <ul className="divide-y divide-white/10 max-h-[400px] overflow-y-auto pr-2">
        {filtered.map((s) => {
          const active = s.id === serviceId;
          return (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => setServiceId(s.id)}
                className={`touch-target flex w-full items-center justify-between gap-4 p-4 text-left transition-all ${
                  active ? "border-l-4 border-l-kult-red bg-neutral-900" : "border-l-4 border-l-transparent hover:bg-neutral-900/60"
                }`}
              >
                <div>
                  <div className="font-heading text-base font-bold text-kult-white">{s.name}</div>
                  <div className="mt-1 font-body text-xs text-neutral-400">
                    {s.duration} min • <span className="capitalize">{s.category}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="font-display text-2xl text-kult-white">
                    ₹{s.price.toLocaleString("en-IN")}
                  </div>
                  {active && (
                    <div className="flex h-6 w-6 items-center justify-center bg-kult-red text-kult-white">
                      <Check size={16} strokeWidth={3} />
                    </div>
                  )}
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function StepArtist({
  staffId,
  setStaffId,
}: {
  staffId: string | null;
  setStaffId: (id: string) => void;
}) {
  return (
    <div className="space-y-6">
      <h2 className="font-display text-3xl text-kult-white">2. Choose An Artist</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <ArtistOption
          id="none"
          name="No Preference"
          role="Pair with best available senior artist"
          active={staffId === "none"}
          onClick={() => setStaffId("none")}
        />
        {staff.map((s) => (
          <ArtistOption
            key={s.id}
            id={s.id}
            name={s.name}
            role={s.role}
            photo={s.photo}
            active={staffId === s.id}
            onClick={() => setStaffId(s.id)}
          />
        ))}
      </div>
    </div>
  );
}

function ArtistOption({
  name,
  role,
  photo,
  active,
  onClick,
}: {
  id: string;
  name: string;
  role: string;
  photo?: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`touch-target relative flex items-center gap-4 p-4 text-left transition-all ${
        active ? "border-2 border-kult-red bg-neutral-900" : "border border-white/10 bg-neutral-950 hover:bg-neutral-900"
      }`}
    >
      {photo ? (
        <img src={photo} alt={name} className="h-14 w-14 object-cover grayscale flex-shrink-0" loading="lazy" decoding="async" />
      ) : (
        <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center border border-neutral-700 bg-neutral-900 font-display text-xl text-neutral-400">
          ?
        </div>
      )}
      <div>
        <div className="font-heading text-sm font-bold text-kult-white">{name}</div>
        <div className="mt-1 font-body text-xs text-neutral-400">{role}</div>
      </div>
      {active && (
        <div className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center bg-kult-red text-kult-white">
          <Check size={14} strokeWidth={3} />
        </div>
      )}
    </button>
  );
}

function StepDate({
  date,
  setDate,
  time,
  setTime,
}: {
  date: number | null;
  setDate: (d: number) => void;
  time: string | null;
  setTime: (t: string) => void;
}) {
  const days = useMemo(() => {
    const now = new Date();
    return Array.from({ length: 14 }).map((_, i) => {
      const d = new Date(now);
      d.setDate(now.getDate() + i);
      return d;
    });
  }, []);

  const times = ["10:00 AM", "11:30 AM", "01:00 PM", "02:30 PM", "04:00 PM", "05:30 PM", "07:00 PM"];
  const taken = new Set(["01:00 PM"]);

  return (
    <div className="space-y-6">
      <h2 className="font-display text-3xl text-kult-white">3. Select Date &amp; Time</h2>

      <div>
        <span className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 block mb-3">
          Select Date
        </span>
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
          {days.map((d, i) => {
            const active = date === i;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setDate(i)}
                className={`touch-target flex flex-col items-center justify-center border p-2.5 transition-colors ${
                  active ? "border-kult-red bg-kult-red text-kult-white" : "border-white/10 text-kult-white hover:bg-neutral-900"
                }`}
              >
                <div className="font-heading text-[10px] uppercase tracking-[0.1em]">
                  {d.toLocaleDateString("en-US", { weekday: "short" })}
                </div>
                <div className="mt-1 font-display text-lg">{d.getDate()}</div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="pt-4 border-t border-white/10">
        <span className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 block mb-3">
          Available Time Slots
        </span>
        <div className="flex flex-wrap gap-2.5">
          {times.map((t) => {
            const isTaken = taken.has(t);
            const active = time === t;
            return (
              <button
                key={t}
                type="button"
                disabled={isTaken}
                onClick={() => setTime(t)}
                className={`touch-target px-5 py-2.5 font-heading text-xs font-bold tracking-[0.15em] transition-colors ${
                  isTaken
                    ? "opacity-30 line-through border border-white/10 text-neutral-500"
                    : active
                    ? "bg-kult-red text-kult-white border border-kult-red"
                    : "border border-white/20 text-kult-white hover:bg-neutral-900"
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function StepConfirm({
  service,
  artist,
  date,
  time,
  name,
  setName,
  email,
  setEmail,
  phone,
  setPhone,
}: any) {
  const dateStr =
    date !== null
      ? new Date(Date.now() + date * 86400000).toLocaleDateString("en-IN", {
          weekday: "short",
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      : "";

  return (
    <div className="space-y-6">
      <h2 className="font-display text-3xl text-kult-white">4. Your Information</h2>

      <div className="border border-kult-red bg-neutral-900 p-6 space-y-3">
        <Row label="Selected Service" value={service?.name} />
        <Row label="Assigned Artist" value={artist?.name ?? "No Preference"} />
        <Row label="Appointment Time" value={`${dateStr} at ${time}`} />
        <Row label="Total Payable" value={`₹${service?.price.toLocaleString("en-IN")}`} highlight />
      </div>

      <div className="space-y-4 pt-2">
        <Input label="Full Name" value={name} onChange={setName} placeholder="e.g. Ananya Sharma" />
        <Input label="Email Address" type="email" value={email} onChange={setEmail} placeholder="e.g. ananya@example.com" />
        <Input label="Phone Number" type="tel" value={phone} onChange={setPhone} placeholder="e.g. +91 98765 43210" />
      </div>
    </div>
  );
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-baseline justify-between border-b border-white/10 pb-2.5 last:border-b-0">
      <div className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-neutral-400">{label}</div>
      <div className={`font-heading ${highlight ? "font-display text-2xl text-kult-red" : "text-sm font-bold text-kult-white"}`}>
        {value}
      </div>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="block space-y-2">
      <span className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-neutral-300">
        {label} <span className="text-kult-red">*</span>
      </span>
      <input
        type={type}
        required
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="touch-target w-full border border-neutral-700 bg-black px-4 py-3 text-kult-white font-body text-sm outline-none transition-colors focus:border-kult-red"
      />
    </label>
  );
}

function SuccessScreen({
  service,
  artist,
  date,
  time,
}: {
  service: any;
  artist: any;
  date: number | null;
  time: string | null;
}) {
  const dateStr =
    date !== null
      ? new Date(Date.now() + date * 86400000).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "";

  return (
    <section className="min-h-[calc(100vh-80px)] bg-kult-black section-padding flex items-center justify-center text-kult-white">
      <div className="container-custom max-w-lg text-center space-y-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-kult-red/20 text-kult-red"
        >
          <Check size={44} strokeWidth={3} />
        </motion.div>

        <h1 className="font-display fluid-h1 text-kult-white">YOU&apos;RE BOOKED.</h1>
        <p className="font-body text-base text-neutral-400">
          A confirmation SMS and email have been sent to your details.
        </p>

        <div className="border border-white/10 bg-neutral-950 p-6 text-left space-y-3">
          <Row label="Service" value={service.name} />
          <Row label="Artist" value={artist?.name ?? "Senior Specialist"} />
          <Row label="Date & Time" value={`${dateStr} at ${time}`} />
        </div>

        <div className="pt-4 flex flex-col items-center gap-4">
          <Link
            to="/"
            className="touch-target inline-flex items-center justify-center border border-kult-red bg-kult-red px-8 py-3.5 font-heading text-xs font-semibold uppercase tracking-[0.25em] text-kult-white hover:bg-transparent"
          >
            Return To Home
          </Link>
        </div>
      </div>
    </section>
  );
}
