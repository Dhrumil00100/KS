const items = ["HAIR", "COLOUR", "SKIN", "NAILS", "BRIDAL", "KULT"];

export function Marquee() {
  const row = [...items, ...items, ...items, ...items];
  return (
    <div className="overflow-hidden border-y border-white/10 bg-kult-black py-6">
      <div className="marquee-track flex w-max whitespace-nowrap">
        {[0, 1].map((k) => (
          <div key={k} className="flex items-center">
            {row.map((w, i) => (
              <span key={`${k}-${i}`} className="flex items-center px-8 font-display text-4xl tracking-widest text-kult-white md:text-5xl">
                {w}
                <span className="mx-8 inline-block h-2 w-2 rounded-full bg-kult-red" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
