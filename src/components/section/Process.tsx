"use client";

import React, { useRef } from "react";
import {
  HiOutlineSearchCircle,
  HiOutlineColorSwatch,
  HiOutlineCode,
  HiOutlineCloudUpload,
} from "react-icons/hi";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useTranslations } from "next-intl";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  discovery: HiOutlineSearchCircle,
  design: HiOutlineColorSwatch,
  develop: HiOutlineCode,
  deploy: HiOutlineCloudUpload,
};

interface ProcessItem {
  id: string;
  number: string;
  title: string;
  description: string;
}

export default function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("process");
  const items = t.raw("items") as ProcessItem[];

  useGSAP(
    () => {
      gsap.from(".process-heading", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      const steps = gsap.utils.toArray(".process-step");
      steps.forEach((step, i) => {
        gsap.from(step as HTMLElement, {
          scrollTrigger: {
            trigger: step as HTMLElement,
            start: "top 88%",
          },
          y: 40,
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
        <div className="process-heading text-center max-w-2xl mx-auto mb-16">
          <p className="section-heading">{t("heading")}</p>
          <h2 className="section-title">{t("title")}</h2>
          <p className="section-subtitle mx-auto">{t("subtitle")}</p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary-400/30 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-6">
            {items.map((item, index) => {
              const Icon = ICONS[item.id];
              return (
                <div key={item.id} className="process-step group relative">
                  {/* Mobile connector line */}
                  {index < items.length - 1 && (
                    <div className="md:hidden absolute left-6 top-16 bottom-0 w-0.5 bg-primary-400/20 -mb-8" />
                  )}

                  <div className="flex flex-col items-center text-center">
                    {/* Step number + Icon circle */}
                    <div className="relative mb-6">
                      <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary-500/10 to-primary-400/20 dark:from-primary-500/15 dark:to-primary-400/25 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 border border-primary-400/10">
                        {Icon && (
                          <Icon className="text-4xl text-primary-500" />
                        )}
                      </div>
                      {/* Step number badge */}
                      <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-gradient-to-br from-primary-500 to-primary-400 flex items-center justify-center shadow-lg shadow-primary-400/30">
                        <span className="text-white text-xs font-bold">
                          {item.number}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-lg font-bold mb-2 group-hover:text-primary-500 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-neutral-500 text-sm leading-relaxed max-w-xs">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
