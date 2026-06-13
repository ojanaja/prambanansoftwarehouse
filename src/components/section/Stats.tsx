"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useTranslations } from "next-intl";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface CountUpProps {
  target: string | number;
  suffix?: string;
  duration?: number;
}

function CountUp({ target, suffix = "", duration = 2.5 }: CountUpProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  // Reset if target changes
  useEffect(() => {
    setCount(0);
    hasAnimated.current = false;
  }, [target]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const startValue = 0;
          const endValue = Number(target) || 0;
          const startTime = performance.now();

          const animate = (now: number) => {
            const elapsedTime = now - startTime;
            const progress = Math.min(elapsedTime / (duration * 1000), 1);

            // Quad ease-out for smoother finish
            const eased = 1 - Math.pow(1 - progress, 3);
            const currentCount = Math.floor(startValue + eased * (endValue - startValue));

            setCount(currentCount);

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.15 } // Lower threshold for more reliable triggering
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

interface StatItem {
  id: string;
  value: string;
  suffix: string;
  label: string;
}

export default function StatsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("stats");
  const items = t.raw("items") as StatItem[];

  useGSAP(
    () => {
      const cards = gsap.utils.toArray(".stat-card");
      cards.forEach((card, i) => {
        gsap.from(card as HTMLElement, {
          scrollTrigger: {
            trigger: card as HTMLElement,
            start: "top 90%",
          },
          y: 40,
          opacity: 0,
          duration: 0.7,
          delay: i * 0.12,
          ease: "power3.out",
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <div className="relative -mt-20 z-20 pb-8 md:pb-12" ref={containerRef}>
      <div className="section-container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          {items.map((item) => (
            <div key={item.id} className="stat-card group">
              <div className="glass-card p-6 lg:p-8 text-center relative overflow-hidden">
                {/* Hover gradient accent */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 to-primary-400/0 group-hover:from-primary-500/5 group-hover:to-primary-400/10 transition-all duration-500" />
                <div className="relative z-10">
                  <p className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text">
                    <CountUp target={item.value} suffix={item.suffix} />
                  </p>
                  <p className="text-neutral-700 text-sm mt-2 font-medium">
                    {item.label}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
