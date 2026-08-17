import React from "react";

export function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-3">
      <span className="h-[2px] w-6 bg-kult-red" />
      <span className="font-heading text-xs font-bold uppercase tracking-[0.25em] text-kult-red">
        {children}
      </span>
    </div>
  );
}
