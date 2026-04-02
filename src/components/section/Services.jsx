"use client";
import { useRef } from "react";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useTranslations, useLocale } from "next-intl";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

import CustomSoftware from "../lottie/Custom Software development.json";
import OptimizeSoftware from "../lottie/Optimize Software.json";
import AdsIntegration from "../lottie/Social Media Integration.json";

const ANIMATIONS = {
  custom: CustomSoftware,
  optimize: OptimizeSoftware,
  daas: AdsIntegration,
};

export default function ServicesSection({ initialServices = [] }) {
  const containerRef = useRef(null);
  const t = useTranslations("services");
  const locale = useLocale();

  const serviceItems = initialServices.map((s, idx) => ({
    id: s.icon || 'custom',
    number: `0${idx + 1}`,
    title: locale === 'id' ? s.title_id : s.title_en,
    description: locale === 'id' ? s.description_id : s.description_en,
  }));

  useGSAP(
    () => {
      gsap.from(".service-heading", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      const serviceCards = gsap.utils.toArray(".service-card");
      serviceCards.forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
          y: 60,
          opacity: 0,
          scale: 0.95,
          duration: 0.8,
          delay: i * 0.15,
          ease: "power3.out",
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      className="section-padding bg-section-alt"
      id="services"
      ref={containerRef}
    >
      <div className="section-container">
        {/* Section Header */}
        <div className="service-heading text-center max-w-2xl mx-auto mb-16">
          <p className="section-heading">{t("heading")}</p>
          <h2 className="section-title">
            {t("title1")} <br className="hidden md:block" />
            {t("title2")}
          </h2>
          <p className="section-subtitle mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* Service Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {serviceItems.map((service) => (
            <div key={service.id} className="service-card group">
              <div className="glass-card-hover p-6 lg:p-8 h-full flex flex-col">
                {/* Number Tag */}
                <span className="text-xs font-bold tracking-widest text-primary-400/60 mb-4 uppercase">
                  {service.number}
                </span>

                {/* Lottie */}
                <div className="w-full max-w-[200px] mx-auto mb-6 transition-transform duration-500 group-hover:scale-105">
                  <Lottie animationData={ANIMATIONS[service.id]} />
                </div>

                {/* Text */}
                <h3 className="text-xl lg:text-2xl font-bold mb-3 group-hover:text-primary-500 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-neutral-500 leading-relaxed text-sm flex-grow">
                  {service.description}
                </p>

                {/* Bottom Accent */}
                <div className="mt-6 pt-4 border-t border-neutral-200/60 dark:border-white/10">
                  <span className="text-sm font-medium text-primary-400 group-hover:text-primary-500 transition-colors flex items-center gap-2">
                    {t("learnMore")}
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
