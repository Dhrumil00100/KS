import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Reveals direct children (or [data-reveal] descendants) on scroll with a stagger.
 * Uses gsap.context for scoped cleanup — reverts tweens AND kills ScrollTriggers
 * created inside, preventing leaks across route changes.
 */
export function useGsapReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined") return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const targets = el.querySelectorAll<HTMLElement>("[data-reveal]");
    const nodes = targets.length
      ? Array.from(targets)
      : (Array.from(el.children) as HTMLElement[]);
    if (!nodes.length) return;

    if (prefersReduced) {
      gsap.set(nodes, { opacity: 1, y: 0, clearProps: "willChange" });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        nodes,
        { opacity: 0, y: 40, willChange: "opacity, transform" },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
            invalidateOnRefresh: true,
          },
          onComplete: () => gsap.set(nodes, { clearProps: "willChange" }),
        },
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return ref;
}
