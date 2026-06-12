"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";

export default function SmoothScroll({ children }) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      gsap.globalTimeline.timeScale(1000);
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    //  Handle anchor link clicks for smooth scroll
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const target = document.querySelector(hash);
        if (target) {
          lenis.scrollTo(target, { offset: -80 });
        }
      }
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      lenis.destroy();
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return children;
}
