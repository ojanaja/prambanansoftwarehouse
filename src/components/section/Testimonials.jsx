"use client";
import { useRef } from "react";
import { HiStar } from "react-icons/hi";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useTranslations } from "next-intl";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function TestimonialsSection() {
  const containerRef = useRef(null);
  const t = useTranslations("testimonials");
  const items = t.raw("items");

  useGSAP(
    () => {
      gsap.from(".testimonials-heading", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      const cards = gsap.utils.toArray(".testimonial-card");
      cards.forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
          },
          y: 50,
          opacity: 0,
          duration: 0.7,
          delay: i * 0.15,
          ease: "power3.out",
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <div className="section-padding" ref={containerRef}>
      <div className="section-container">
        {/* Section Header */}
        <div className="testimonials-heading text-center max-w-2xl mx-auto mb-16">
          <p className="section-heading">{t("heading")}</p>
          <h2 className="section-title">{t("title")}</h2>
          <p className="section-subtitle mx-auto">{t("subtitle")}</p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {items.map((item) => (
            <div key={item.id} className="testimonial-card group">
              <div className="glass-card-hover p-6 lg:p-8 h-full flex flex-col">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <HiStar
                      key={i}
                      className="text-lg text-amber-400"
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed flex-grow italic">
                  &ldquo;{item.quote}&rdquo;
                </p>

                {/* Divider */}
                <div className="mt-6 pt-5 border-t border-neutral-200/60 dark:border-white/10 flex items-center gap-3">
                  {/* Avatar placeholder */}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{item.name}</p>
                    <p className="text-neutral-500 text-xs">{item.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
