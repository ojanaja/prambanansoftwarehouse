"use client";

import React, { useRef } from "react";
import { HiStar } from "react-icons/hi";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useTranslations, useLocale } from "next-intl";
import { Testimonial } from "@/lib/api";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface TestimonialsSectionProps {
  initialTestimonials?: Testimonial[];
}

export default function TestimonialsSection({ initialTestimonials = [] }: TestimonialsSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("testimonials");
  const locale = useLocale();
  const items = initialTestimonials.map((item) => ({
    id: item._id,
    name: item.name,
    role: locale === 'id' ? item.role_id : item.role_en,
    quote: locale === 'id' ? item.content_id : item.content_en,
    rating: item.rating || 5,
    image: item.imageUrl,
  }));

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
        gsap.from(card as HTMLElement, {
          scrollTrigger: {
            trigger: card as HTMLElement,
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

  if (!initialTestimonials || initialTestimonials.length === 0) return null;

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
