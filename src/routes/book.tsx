import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { services, staff } from "@/lib/mock-data";
import { SectionEyebrow } from "@/components/shared/SectionEyebrow";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book — KULT Salon" },
      { name: "description", content: "Book your KULT appointment. Service, artist, date and time — in four steps." },
      { property: "og:title", content: "Book — KULT Salon" },
      { property: "og:description", content: "Book your KULT appointment." },
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
    <section className="min-h-[calc(100vh-64px)] bg-kult-black py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-6">
        <SectionEyebrow>Booking</SectionEyebrow>
        <h1 className="mt-4 font-display text-5xl text-kult-white md:text-7xl">Reserve your chair.</h1>

        <div className="mt-14">
          <div className="relative mb-4 flex items-center justify-between">
            <div className="absolute left-6 right-6 top-1/2 h-[2px] -translate-y-1/2 bg-white/10" />
            <motion.div
              className="absolute left-6 top-1/2 h-[2px] -translate-y-1/2 bg-kult-red"
              initial={false}
              animate={{ width: `calc(${(step / (STEP_LABELS.length - 1)) * 100}% - 3rem)` }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
            />
            {STEP_LABELS.map((_, i) => (
              <div
                key={i}
                className={`relative z-10 flex h-12 w-12 items-center justify-center border-2 font-display text-lg ${i <= step ? "border-kult-red bg-kult-red text-kult-white" : "border-white/20 bg-kult-black text-kult-gray"}`}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
            ))}
          </div>
          <div className="flex justify-between font-heading text-[10px] uppercase tracking-[0.2em] text-kult-gray">
            {STEP_LABELS.map((l, i) => (
              <div key={l} className={i <= step ? "text-kult-white" : ""}>{l}</div>
            ))}
          </div>
        </div>

        <div className="relative mt-14 overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
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
                  name={name} setName={setName}
                  email={email} setEmail={setEmail}
                  phone={phone} setPhone={setPhone}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-12 flex items-center justify-between">
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="flex items-center gap-2 font-heading text-xs font-semibold uppercase tracking-[0.25em] text-kult-gray disabled:opacity-30"
          >
            <ChevronLeft size={16} /> Back
          </button>
          {step < STEP_LABELS.length - 1 ? (
            <button
              onClick={() => setStep((s) => s + 1)}
              disabled={!canNext}
              className="flex items-center gap-2 border border-kult-red bg-kult-red px-6 py-3 font-heading text-xs font-semibold uppercase tracking-[0.25em] text-kult-white disabled:opacity-40"
            >
              Next <ChevronRight size={16} />
            </button>
          ) : (
            <button
              onClick={() => setDone(true)}
              disabled={!canNext}
              className="border border-kult-red bg-kult-red px-8 py-3 font-heading text-xs font-semibold uppercase tracking-[0.25em] text-kult-white disabled:opacity-40"
            >
              Confirm booking
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

function StepService({ serviceId, setServiceId }: { serviceId: string | null; setServiceId: (id: string) => void }) {
  const cats = ["all", "hair", "colour", "skin", "nails", "bridal"] as const;
  const [cat, setCat] = useState<(typeof cats)[number]>("all");
  const filtered = cat === "all" ? services : services.filter((s) => s.category === cat);
  return (
    <div>
      <h2 className="font-display text-3xl text-kult-white">Select a service</h2>
      <div className="mt-6 flex flex-wrap gap-5">
        {cats.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`relative pb-2 font-heading text-[11px] font-semibold uppercase tracking-[0.25em] ${cat === c ? "text-kult-white" : "text-kult-gray"}`}
          >
            {c}
            {cat === c && <span className="absolute -bottom-0 left-0 h-[2px] w-full bg-kult-red" />}
          </button>
        ))}
      </div>
      <ul className="mt-6 divide-y divide-white/10">
        {filtered.map((s) => {
          const active = s.id === serviceId;
          return (
            <li key={s.id}>
              <button
                onClick={() => setServiceId(s.id)}
                className={`flex w-full items-center justify-between gap-4 py-5 pl-4 pr-2 text-left transition-colors ${active ? "border-l-2 border-l-kult-red bg-[#111]" : "border-l-2 border-l-transparent hover:bg-[#111]"}`}
              >
                <div>
                  <div className="font-heading text-sm font-semibold text-kult-white">{s.name}</div>
                  <div className="mt-1 text-xs text-kult-gray">{s.duration} min</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="font-display text-2xl text-kult-white">₹{s.price.toLocaleString("en-IN")}</div>
                  {active && (
                    <div className="flex h-6 w-6 items-center justify-center bg-kult-red">
                      <Check size={14} className="text-kult-white" strokeWidth={3} />
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

function StepArtist({ staffId, setStaffId }: { staffId: string | null; setStaffId: (id: string) => void }) {
  return (
    <div>
      <h2 className="font-display text-3xl text-kult-white">Choose an artist</h2>
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <ArtistOption id="none" name="No preference" role="We'll pair you with the best available artist" active={staffId === "none"} onClick={() => setStaffId("none")} />
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

function ArtistOption({ name, role, photo, active, onClick }: { id: string; name: string; role: string; photo?: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`relative flex items-center gap-4 p-4 text-left transition-all ${active ? "border-2 border-kult-red bg-[#111]" : "border border-white/20 hover:bg-[#111]"}`}
    >
      {photo ? (
        <img src={photo} alt={name} className="h-16 w-16 object-cover grayscale" loading="lazy" decoding="async" />
      ) : (
        <div className="flex h-16 w-16 items-center justify-center border border-kult-gray text-kult-gray">?</div>
      )}
      <div>
        <div className="font-heading text-sm font-semibold text-kult-white">{name}</div>
        <div className="mt-1 text-xs text-kult-gray">{role}</div>
      </div>
      {active && (
        <div className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center bg-kult-red">
          <Check size={14} className="text-kult-white" strokeWidth={3} />
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
    return Array.from({ length: 30 }).map((_, i) => {
      const d = new Date(now);
      d.setDate(now.getDate() + i);
      return d;
    });
  }, []);
  const times = ["10:00", "11:00", "12:00", "13:30", "15:00", "16:30", "18:00", "19:00", "20:00"];
  const taken = new Set(["12:00", "16:30"]);
  return (
    <div>
      <h2 className="font-display text-3xl text-kult-white">Pick a date &amp; time</h2>
      <div className="mt-6 grid grid-cols-7 gap-2">
        {days.map((d, i) => {
          const active = date === i;
          return (
            <button
              key={i}
              onClick={() => setDate(i)}
              className={`flex flex-col items-center justify-center border p-3 transition-colors ${active ? "border-kult-red bg-kult-red text-kult-white" : "border-white/10 text-kult-white hover:bg-[#111]"}`}
            >
              <div className="font-heading text-[10px] uppercase tracking-[0.2em]">
                {d.toLocaleDateString("en-GB", { weekday: "short" })}
              </div>
              <div className="mt-1 font-display text-xl">{d.getDate()}</div>
            </button>
          );
        })}
      </div>

      <div className="mt-8 font-heading text-[11px] uppercase tracking-[0.25em] text-kult-gray">Available times</div>
      <div className="mt-4 flex flex-wrap gap-3">
        {times.map((t) => {
          const isTaken = taken.has(t);
          const active = time === t;
          return (
            <button
              key={t}
              disabled={isTaken}
              onClick={() => setTime(t)}
              className={`px-5 py-2 font-heading text-xs font-semibold tracking-[0.15em] transition-colors ${isTaken ? "text-kult-gray line-through" : active ? "bg-kult-red text-kult-white border border-kult-red" : "border border-kult-white text-kult-white hover:bg-[#111]"}`}
            >
              {t}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StepConfirm({
  service, artist, date, time,
  name, setName, email, setEmail, phone, setPhone,
}: any) {
  const dateStr = date !== null ? new Date(Date.now() + date * 86400000).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) : "";
  return (
    <div>
      <h2 className="font-display text-3xl text-kult-white">Confirm your booking</h2>
      <div className="mt-6 border border-kult-red p-6">
        <Row label="Service" value={service?.name} />
        <Row label="Artist" value={artist?.name ?? "No preference"} />
        <Row label="When" value={`${dateStr} · ${time}`} />
        <Row label="Total" value={`₹${service?.price.toLocaleString("en-IN")}`} highlight />
      </div>
      <div className="mt-8 space-y-6">
        <Input label="Name" value={name} onChange={setName} />
        <Input label="Email" type="email" value={email} onChange={setEmail} />
        <Input label="Phone" type="tel" value={phone} onChange={setPhone} />
      </div>
    </div>
  );
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-baseline justify-between border-b border-white/10 py-3 last:border-b-0">
      <div className="font-heading text-[11px] uppercase tracking-[0.25em] text-kult-gray">{label}</div>
      <div className={`font-heading ${highlight ? "font-display text-2xl text-kult-red" : "text-sm font-semibold text-kult-white"}`}>{value}</div>
    </div>
  );
}

function Input({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <label className="block">
      <div className="font-heading text-[10px] font-semibold uppercase tracking-[0.25em] text-kult-gray">{label} <span className="text-kult-red">*</span></div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full border-b border-kult-gray/40 bg-transparent px-1 py-2 text-kult-white outline-none transition-colors focus:border-kult-red"
      />
    </label>
  );
}

function SuccessScreen({ service, artist, date, time }: { service: any; artist: any; date: number | null; time: string | null }) {
  const dateStr = date !== null ? new Date(Date.now() + date * 86400000).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) : "";
  return (
    <section className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-kult-black px-6 py-24">
      <div className="max-w-lg text-center">
        <motion.svg
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          width="88"
          height="88"
          viewBox="0 0 88 88"
          className="mx-auto"
        >
          <motion.circle
            cx="44"
            cy="44"
            r="42"
            fill="none"
            stroke="#E60012"
            strokeWidth="3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          <motion.path
            d="M25 46 L40 60 L64 32"
            fill="none"
            stroke="#E60012"
            strokeWidth="4"
            strokeLinecap="square"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.5, duration: 0.4, ease: "easeOut" }}
          />
        </motion.svg>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="mt-8 font-display text-5xl leading-none text-kult-white md:text-[72px]"
        >
          YOU'RE BOOKED.
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-8 border border-white/15 p-6 text-left"
        >
          <Row label="Service" value={service.name} />
          <Row label="Artist" value={artist?.name ?? "No preference"} />
          <Row label="When" value={`${dateStr} · ${time}`} />
        </motion.div>
        <div className="mt-8 flex flex-col items-center gap-4">
          <a href="#" className="hover-red-line font-heading text-xs font-semibold uppercase tracking-[0.3em] text-kult-red">Add to calendar</a>
          <Link to="/" className="font-heading text-xs uppercase tracking-[0.25em] text-kult-gray hover:text-kult-white">← Back to home</Link>
        </div>
      </div>
    </section>
  );
}
