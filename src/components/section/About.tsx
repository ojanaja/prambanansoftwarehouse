"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { HiOutlineMail, HiPhone, HiOutlineEye, HiOutlineFlag } from "react-icons/hi";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/config/site";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("about");

  useGSAP(
    () => {
      gsap.from(".about-text", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
      gsap.from(".about-image", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        scale: 0.9,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
      });
      gsap.from(".about-mv-card", {
        scrollTrigger: {
          trigger: ".about-mv-card",
          start: "top 90%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      className="relative overflow-hidden bg-gradient-to-br from-primary-500 via-primary-400 to-primary-600"
      id="about"
      ref={containerRef}
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-black/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />

      <div className="section-container section-padding relative z-10">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Text */}
          <div className="order-2 md:order-1 about-text">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60 mb-2">
              {t("heading")}
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Prambanan <span className="text-primary-950 italic">Digital</span>
            </h2>
            <p className="text-white/85 mt-5 leading-relaxed text-base lg:text-lg">
              {t("description")}
            </p>

            {/* Contact Badges */}
            <div className="mt-8 flex flex-col gap-3">
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 w-fit hover:bg-white/20 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-white/15 flex items-center justify-center flex-shrink-0 group-hover:bg-white/30 transition-colors">
                  <HiOutlineMail className="text-xl text-white" />
                </div>
                <span className="text-white text-sm font-medium">
                  {siteConfig.contact.email}
                </span>
              </a>
              <a
                href={siteConfig.contact.phoneHref}
                className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 w-fit hover:bg-white/20 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-white/15 flex items-center justify-center flex-shrink-0 group-hover:bg-white/30 transition-colors">
                  <HiPhone className="text-xl text-white" />
                </div>
                <span className="text-white text-sm font-medium">
                  {siteConfig.contact.phoneDisplay}
                </span>
              </a>
            </div>
          </div>

          {/* Image */}
          <div className="order-1 md:order-2 flex justify-center about-image">
            <div className="relative">
              {/* Decorative offset border */}
              <div className="absolute -inset-3 bg-white/10 rounded-3xl -rotate-3" />
              <Image
                src="/about/about.webp"
                alt="About Us"
                className="relative rounded-2xl object-cover w-full max-w-md h-auto shadow-2xl shadow-black/20"
                width={1000}
                height={500}
                quality={50}
                sizes="(max-width: 768px) 100vw, 450px"
              />
            </div>
          </div>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid md:grid-cols-2 gap-6 mt-12 lg:mt-16">
          <div className="about-mv-card bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-6 lg:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
                <HiOutlineFlag className="text-xl text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">{t("missionTitle")}</h3>
            </div>
            <p className="text-white/80 text-sm leading-relaxed">{t("missionDescription")}</p>
          </div>
          <div className="about-mv-card bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-6 lg:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
                <HiOutlineEye className="text-xl text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">{t("visionTitle")}</h3>
            </div>
            <p className="text-white/80 text-sm leading-relaxed">{t("visionDescription")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
