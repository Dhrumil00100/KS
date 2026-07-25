import { createFileRoute, Link } from "@tanstack/react-router";
import { mockLoyalty } from "@/lib/mock-data";
import { SectionEyebrow } from "@/components/shared/SectionEyebrow";

export const Route = createFileRoute("/loyalty")({
  head: () => ({
    meta: [
      { title: "KULT Rewards — Loyalty" },
      { name: "description", content: "Earn points on every visit and unlock complimentary services with KULT Rewards." },
      { property: "og:title", content: "KULT Rewards — Loyalty" },
      { property: "og:description", content: "KULT Rewards. Earn. Reward. Repeat." },
    ],
  }),
  component: LoyaltyPage,
});

const STEPS = [
  { n: "01", t: "Book a service", d: "Any service at KULT counts toward your points balance." },
  { n: "02", t: "Earn points", d: "₹100 spent = 1 point. Points bank automatically." },
  { n: "03", t: "Redeem rewards", d: "100 points = ₹50 off any service. Stack them, use them anytime." },
];

const TIERS = [
  { name: "KULT", range: "0 – 199 pts", border: "border-kult-gray", badge: null, perks: ["Points on every visit", "Birthday treat"] },
  { name: "KULT+", range: "200 – 499 pts", border: "border-kult-white", badge: null, perks: ["Everything in KULT", "Priority booking", "Complimentary blowout twice a year"] },
  { name: "KULT BLACK", range: "500+ pts", border: "border-kult-red", badge: "Most exclusive", perks: ["Everything in KULT+", "Dedicated artist", "Two complimentary services yearly", "Private event access"] },
];

function LoyaltyPage() {
  return (
    <>
      <section className="bg-kult-black py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6">
          <SectionEyebrow>Loyalty</SectionEyebrow>
          <h1 className="mt-4 font-display text-6xl text-kult-white md:text-[80px]">KULT Rewards.</h1>
          <p className="mt-6 max-w-lg text-kult-gray">Earn. Reward. Repeat. A programme designed for clients who visit often — and expect to be recognised for it.</p>
        </div>
      </section>

      <section className="bg-kult-black pb-24">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="relative grid grid-cols-1 gap-10 md:grid-cols-3">
            <div className="pointer-events-none absolute left-[10%] right-[10%] top-6 hidden h-[2px] md:block" style={{ backgroundImage: "repeating-linear-gradient(to right, #E60012 0 8px, transparent 8px 16px)" }} />
            {STEPS.map((s) => (
              <div key={s.n} className="relative">
                <div className="flex h-12 w-12 items-center justify-center border-2 border-kult-red font-display text-xl text-kult-white">
                  {s.n}
                </div>
                <div className="mt-6 font-heading text-sm font-semibold uppercase tracking-[0.2em] text-kult-white">{s.t}</div>
                <p className="mt-2 max-w-xs text-sm text-kult-gray">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-kult-black pb-24">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="border border-kult-red p-10 text-center md:p-14">
            <div className="font-display text-5xl text-kult-white md:text-6xl">₹100 SPENT = 1 POINT</div>
            <div className="mt-4 font-heading text-sm uppercase tracking-[0.3em] text-kult-gray">100 POINTS = ₹50 OFF</div>
          </div>
        </div>
      </section>

      <section className="bg-kult-black pb-24">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-6 px-6 md:grid-cols-3">
          {TIERS.map((t) => (
            <div key={t.name} className={`relative border-2 ${t.border} p-8`}>
              {t.badge && (
                <div className="absolute right-0 top-0 bg-kult-red px-3 py-1 font-heading text-[10px] font-semibold uppercase tracking-[0.2em] text-kult-white">
                  {t.badge}
                </div>
              )}
              <div className="font-display text-4xl text-kult-white">{t.name}</div>
              <div className="mt-1 font-heading text-[11px] uppercase tracking-[0.25em] text-kult-gray">{t.range}</div>
              <ul className="mt-6 space-y-2 text-sm text-kult-white/90">
                {t.perks.map((p) => (
                  <li key={p} className="flex gap-3"><span className="text-kult-red">—</span>{p}</li>
                ))}
              </ul>
              <Link to="/book" className="mt-8 inline-block border border-kult-red px-5 py-2 font-heading text-[11px] font-semibold uppercase tracking-[0.25em] text-kult-white hover:bg-kult-red">
                Book to earn
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-kult-black pb-24">
        <div className="mx-auto max-w-[1400px] px-6">
          <SectionEyebrow>Sample dashboard</SectionEyebrow>
          <div className="mt-6 grid grid-cols-1 gap-0 border border-white/10 bg-kult-black md:grid-cols-3">
            <div className="border-b border-white/10 p-8 md:border-b-0 md:border-r">
              <div className="font-heading text-[11px] uppercase tracking-[0.25em] text-kult-gray">Member</div>
              <div className="mt-2 font-display text-3xl text-kult-white">{mockLoyalty.name}</div>
              <div className="mt-6 font-heading text-[11px] uppercase tracking-[0.25em] text-kult-gray">Tier</div>
              <div className="mt-2 font-display text-2xl text-kult-red">{mockLoyalty.tier}</div>
            </div>
            <div className="border-b border-white/10 p-8 md:border-b-0 md:border-r">
              <div className="font-heading text-[11px] uppercase tracking-[0.25em] text-kult-gray">Points</div>
              <div className="mt-2 font-display text-6xl text-kult-white">{mockLoyalty.points}</div>
              <div className="mt-6 h-[3px] w-full bg-white/10">
                <div className="h-full bg-kult-red" style={{ width: `${(mockLoyalty.points / 500) * 100}%` }} />
              </div>
              <div className="mt-3 text-xs text-kult-gray">
                {mockLoyalty.pointsNeeded} points to {mockLoyalty.nextTier}
              </div>
            </div>
            <div className="p-8">
              <div className="font-heading text-[11px] uppercase tracking-[0.25em] text-kult-gray">Recent activity</div>
              <ul className="mt-4 space-y-3 text-sm">
                {mockLoyalty.transactions.map((t) => (
                  <li key={t.date} className="flex items-center justify-between">
                    <div>
                      <div className="text-kult-white">{t.label}</div>
                      <div className="text-xs text-kult-gray">{t.date}</div>
                    </div>
                    <div className={`font-display text-2xl ${t.delta > 0 ? "text-kult-red" : "text-kult-gray"}`}>
                      {t.delta > 0 ? "+" : ""}{t.delta}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
