"use client";
import { useRef } from "react";
import {
  HiOutlineShieldCheck,
  HiOutlineCurrencyDollar,
  HiOutlineLightningBolt,
  HiOutlineUserGroup,
} from "react-icons/hi";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useTranslations } from "next-intl";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ICONS = {
  quality: HiOutlineShieldCheck,
  fixedPrice: HiOutlineCurrencyDollar,
  speed: HiOutlineLightningBolt,
  team: HiOutlineUserGroup,
};

export default function WhyChooseUsSection() {
  const containerRef = useRef(null);
  const t = useTranslations("whyChooseUs");
  const items = t.raw("items");

  useGSAP(
    () => {
      gsap.from(".wcu-heading", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      const cards = gsap.utils.toArray(".wcu-card");
      cards.forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
          },
          y: 50,
          opacity: 0,
          scale: 0.95,
          duration: 0.7,
          delay: i * 0.12,
          ease: "power3.out",
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <div className="section-padding bg-section-alt" ref={containerRef}>
      <div className="section-container">
        {/* Section Header */}
        <div className="wcu-heading text-center max-w-2xl mx-auto mb-16">
          <p className="section-heading">{t("heading")}</p>
          <h2 className="section-title">
            {t("title1")} <br className="hidden md:block" />
            {t("title2")}
          </h2>
          <p className="section-subtitle mx-auto">{t("subtitle")}</p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => {
            const Icon = ICONS[item.id];
            return (
              <div key={item.id} className="wcu-card group">
                <div className="glass-card-hover p-6 lg:p-8 h-full flex flex-col items-center text-center">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500/10 to-primary-400/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500">
                    {Icon && (
                      <Icon className="text-2xl text-primary-500" />
                    )}
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold mb-2 group-hover:text-primary-500 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-neutral-500 text-sm leading-relaxed flex-grow">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
