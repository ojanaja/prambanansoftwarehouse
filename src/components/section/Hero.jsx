"use client";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useTranslations } from "next-intl";

export default function HeroSection() {
  const containerRef = useRef(null);
  const t = useTranslations("hero");

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(".hero-heading", { y: 60, opacity: 0, duration: 1, delay: 0.3 })
      .from(".hero-subtitle", { y: 40, opacity: 0, duration: 0.8 }, "-=0.5")
      .from(".hero-buttons", { y: 30, opacity: 0, duration: 0.8 }, "-=0.4")
      .from(".hero-badge", { scale: 0.8, opacity: 0, duration: 0.6 }, "-=0.3");
  }, { scope: containerRef });

  return (
    <div className="relative min-h-screen overflow-hidden" ref={containerRef}>
      {/* Background Image */}
      <Image
        src="/hero/background.webp"
        className="absolute inset-0 w-full h-full object-cover scale-105"
        width={1920}
        height={1080}
        quality={80}
        alt="Hero"
        priority
      />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary-950/40 to-transparent" />

      {/* Decorative Elements */}
      <div className="absolute top-20 right-[15%] w-72 h-72 bg-primary-400/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 left-[10%] w-96 h-96 bg-primary-500/8 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
      {/* Animated dots grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="section-container w-full">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 mb-8">
              <span className="w-2 h-2 bg-primary-400 rounded-full animate-pulse" />
              <span className="text-white/80 text-sm font-medium">{t("badge")}</span>
            </div>

            {/* Heading */}
            <h1 className="hero-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] tracking-tight">
              {t("heading1")}
              <span className="bg-gradient-to-r from-primary-300 to-primary-400 bg-clip-text text-transparent">
                {t("heading2")}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="hero-subtitle text-base md:text-lg text-white/70 mt-6 max-w-xl mx-auto leading-relaxed">
              {t("subtitle")}
            </p>

            {/* Buttons */}
            <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <Link href="#contact" className="btn-primary text-base relative group">
                <span className="absolute -inset-1 bg-primary-400/30 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative flex items-center gap-2">
                  {t("requestDemo")}
                  <HiArrowRight className="text-lg group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Link>
              <Link href="#services" className="btn-ghost text-base">
                {t("learnMore")}
              </Link>
            </div>

            {/* Social Proof */}
            <p className="hero-badge mt-6 text-white/50 text-sm flex items-center justify-center gap-2">
              <span className="w-4 h-4 rounded-full bg-green-400/80 flex items-center justify-center">
                <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              </span>
              {t("trustedBy")}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--background)] to-transparent" />
    </div>
  );
}
