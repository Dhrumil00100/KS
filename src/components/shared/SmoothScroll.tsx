import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

declare global {
  interface Window {
    locomotiveScroll?: any;
  }
}

type LocoScroll = {
  destroy: () => void;
  on?: (event: string, cb: () => void) => void;
  off?: (event: string, cb: () => void) => void;
  stop?: () => void;
  start?: () => void;
};

export function SmoothScroll() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Respect user preference — skip smooth scroll entirely.
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    let scroll: LocoScroll | null = null;
    let cancelled = false;
    const onScroll = () => ScrollTrigger.update();

    (async () => {
      try {
        const mod = await import("locomotive-scroll");
        if (cancelled) return;
        const LocomotiveScroll = mod.default;
        scroll = new LocomotiveScroll({
          lenisOptions: { lerp: 0.08, smoothWheel: true },
        }) as unknown as LocoScroll;

        window.locomotiveScroll = scroll;

        // Keep ScrollTrigger in sync with Lenis-driven scroll.
        scroll.on?.("scroll", onScroll);
        ScrollTrigger.refresh();
      } catch (err) {
        console.warn("SmoothScroll init failed", err);
      }
    })();

    return () => {
      cancelled = true;
      scroll?.off?.("scroll", onScroll);
      scroll?.destroy();
      window.locomotiveScroll = undefined;
      scroll = null;
    };
  }, []);

  // On route change: reset scroll and refresh triggers after new content mounts.
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });

    // Kill triggers whose trigger element has been detached from the DOM
    // (defensive — component cleanups should have handled this already).
    ScrollTrigger.getAll().forEach((t) => {
      const el = t.trigger as Element | null;
      if (el && !document.body.contains(el)) t.kill();
    });

    const raf = window.requestAnimationFrame(() => {
      const id = window.setTimeout(() => ScrollTrigger.refresh(), 200);
      cleanupId = id;
    });
    let cleanupId: number | undefined;
    return () => {
      window.cancelAnimationFrame(raf);
      if (cleanupId !== undefined) window.clearTimeout(cleanupId);
    };
  }, [pathname]);

  return null;
}
