import { createFileRoute, Link } from "@tanstack/react-router";
import { mockLoyalty } from "@/lib/mock-data";
import { SectionEyebrow } from "@/components/shared/SectionEyebrow";

export const Route = createFileRoute("/loyalty")({
  head: () => ({
    meta: [
      { title: "KULT Rewards — Loyalty Programme" },
      { name: "description", content: "Earn points on every haircut, skin treatment, and colour service at KULT Salon Ahmedabad. Unlock VIP tier perks and complimentary services." },
      { property: "og:title", content: "KULT Rewards — Loyalty" },
      { property: "og:description", content: "Earn. Reward. Repeat with KULT Rewards." },
    ],
  }),
  component: LoyaltyPage,
});

const STEPS = [
  { n: "01", t: "Book A Service", d: "Any hair, skin, colour or nail service at KULT counts toward your points balance." },
  { n: "02", t: "Earn Points", d: "₹100 spent = 1 KULT point earned. Points bank automatically." },
  { n: "03", t: "Redeem Rewards", d: "100 points = ₹50 off any service. Stack them, use them anytime." },
];

const TIERS = [
  { name: "KULT", range: "0 – 199 pts", border: "border-neutral-700", badge: null, perks: ["Points on every visit", "Birthday surprise treat", "Seasonal styling offers"] },
  { name: "KULT+", range: "200 – 499 pts", border: "border-kult-white", badge: null, perks: ["Everything in KULT", "Priority booking queue", "Complimentary blowout twice yearly", "Product discounts"] },
  { name: "KULT BLACK", range: "500+ pts", border: "border-kult-red", badge: "VIP Access", perks: ["Everything in KULT+", "Dedicated senior artist", "Two complimentary services yearly", "Private salon hours access"] },
];

function LoyaltyPage() {
  return (
    <>
      {/* Hero Banner */}
      <section className="bg-kult-black section-padding text-kult-white">
        <div className="container-custom">
          <SectionEyebrow>Rewards Programme</SectionEyebrow>
          <h1 className="mt-4 font-display fluid-h1 text-kult-white">KULT Rewards.</h1>
          <p className="mt-4 max-w-xl font-body text-base text-neutral-400">
            Earn. Reward. Repeat. A loyalty programme designed for clients who visit often — and expect to be recognised for it.
          </p>
        </div>
      </section>

      {/* How it works steps */}
      <section className="bg-kult-black border-t border-white/10 section-padding text-kult-white">
        <div className="container-custom">
          <SectionEyebrow>How It Works</SectionEyebrow>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {STEPS.map((s) => (
              <div key={s.n} className="border border-white/10 bg-neutral-950 p-8 space-y-4">
                <div className="flex h-12 w-12 items-center justify-center border-2 border-kult-red font-display text-2xl text-kult-white">
                  {s.n}
                </div>
                <h3 className="font-heading text-base font-bold uppercase tracking-[0.2em] text-kult-white">{s.t}</h3>
                <p className="font-body text-sm leading-relaxed text-neutral-400">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Points conversion callout */}
      <section className="bg-kult-black pb-16">
        <div className="container-custom">
          <div className="border border-kult-red bg-neutral-950 p-8 sm:p-12 text-center space-y-3">
            <h2 className="font-display fluid-h2 text-kult-white">₹100 SPENT = 1 REWARD POINT</h2>
            <p className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-kult-red">
              100 POINTS = ₹50 DIRECT REDEMPTION OFF ANY SERVICE
            </p>
          </div>
        </div>
      </section>

      {/* Membership Tiers */}
      <section className="bg-kult-black pb-24 text-kult-white">
        <div className="container-custom">
          <SectionEyebrow>Membership Tiers</SectionEyebrow>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {TIERS.map((t) => (
              <div key={t.name} className={`relative border-2 ${t.border} bg-neutral-950 p-8 space-y-6 flex flex-col justify-between`}>
                {t.badge && (
                  <div className="absolute top-0 right-0 bg-kult-red px-3 py-1 font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-kult-white">
                    {t.badge}
                  </div>
                )}
                <div>
                  <h3 className="font-display text-4xl text-kult-white">{t.name}</h3>
                  <div className="mt-1 font-heading text-xs uppercase tracking-[0.2em] text-kult-red">{t.range}</div>
                  <ul className="mt-6 space-y-3 font-body text-sm text-neutral-300">
                    {t.perks.map((p) => (
                      <li key={p} className="flex items-start gap-2.5">
                        <span className="text-kult-red font-bold">—</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <Link
                    to="/book"
                    className="touch-target flex w-full items-center justify-center border border-kult-red bg-kult-red px-5 py-3 font-heading text-xs font-semibold uppercase tracking-[0.2em] text-kult-white transition-all hover:bg-transparent"
                  >
                    Book To Earn
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Dashboard Card */}
      <section className="bg-kult-black border-t border-white/10 section-padding text-kult-white">
        <div className="container-custom">
          <SectionEyebrow>Sample Member Dashboard</SectionEyebrow>
          <div className="mt-8 grid grid-cols-1 gap-0 border border-white/10 bg-neutral-950 lg:grid-cols-3">
            <div className="border-b border-white/10 p-8 lg:border-b-0 lg:border-r">
              <span className="font-heading text-xs uppercase tracking-[0.2em] text-neutral-400">Member Profile</span>
              <div className="mt-2 font-display text-3xl text-kult-white">{mockLoyalty.name}</div>
              <div className="mt-6 font-heading text-xs uppercase tracking-[0.2em] text-neutral-400">Current Tier Status</div>
              <div className="mt-2 font-display text-2xl text-kult-red">{mockLoyalty.tier}</div>
            </div>
            <div className="border-b border-white/10 p-8 lg:border-b-0 lg:border-r">
              <span className="font-heading text-xs uppercase tracking-[0.2em] text-neutral-400">Points Balance</span>
              <div className="mt-2 font-display text-6xl text-kult-white">{mockLoyalty.points}</div>
              <div className="mt-6 h-2 w-full bg-neutral-800 rounded-full overflow-hidden">
                <div className="h-full bg-kult-red" style={{ width: `${(mockLoyalty.points / 500) * 100}%` }} />
              </div>
              <div className="mt-3 font-body text-xs text-neutral-400">
                {mockLoyalty.pointsNeeded} points until {mockLoyalty.nextTier}
              </div>
            </div>
            <div className="p-8">
              <span className="font-heading text-xs uppercase tracking-[0.2em] text-neutral-400">Recent Activity</span>
              <ul className="mt-4 space-y-3 font-body text-sm">
                {mockLoyalty.transactions.map((t) => (
                  <li key={t.date} className="flex items-center justify-between border-b border-white/5 pb-2">
                    <div>
                      <div className="text-kult-white font-medium">{t.label}</div>
                      <div className="text-xs text-neutral-500">{t.date}</div>
                    </div>
                    <div className={`font-display text-2xl ${t.delta > 0 ? "text-kult-red" : "text-neutral-500"}`}>
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
