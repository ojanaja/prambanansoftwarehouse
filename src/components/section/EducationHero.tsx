"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import dynamic from "next/dynamic";
import MagneticButton from "../particles/MagneticButton";

const ParticleBackground = dynamic(
  () => import("../particles/ParticleBackground"),
  { ssr: false }
);

export default function EducationHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(".hero-heading", { y: 60, opacity: 0, duration: 1, delay: 0.3 })
      .from(".hero-subtitle", { y: 40, opacity: 0, duration: 0.8 }, "-=0.5")
      .from(".hero-buttons", { y: 30, opacity: 0, duration: 0.8 }, "-=0.4")
      .from(".hero-badge", { scale: 0.8, opacity: 0, duration: 0.6 }, "-=0.3");
  }, { scope: containerRef });

  return (
    <div className="relative min-h-screen overflow-hidden" ref={containerRef}>
      <Image
        src="/hero/background.webp"
        className="absolute inset-0 w-full h-full object-cover scale-105"
        width={1920}
        height={1080}
        quality={80}
        alt="Education Solutions"
        priority
      />
      <div className="absolute inset-0 bg-black/70 dark:bg-black/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-transparent" />
      <ParticleBackground variant="hero" />

      <div className="relative z-10 min-h-screen flex items-center">
        <div className="section-container w-full">
          <div className="max-w-4xl mx-auto text-center">
            <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 md:mb-8">
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              <span className="text-white/90 text-sm font-medium">Partner Digitalisasi Sekolah Menuju Standar Global</span>
            </div>

            <h1 className="hero-heading text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight">
              Transformasi Digital <br />
              <span className="bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
                Pendidikan Indonesia
              </span>
            </h1>

            <p className="hero-subtitle text-base md:text-lg text-white/80 mt-6 max-w-2xl mx-auto leading-relaxed">
              Membangun sistem informasi akademik (SIAKAD), LMS, dan manajemen yayasan yang aman, terintegrasi, dan mudah digunakan. Kelola sekolah Anda dengan lebih efisien dan modern.
            </p>

            <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <MagneticButton>
                <Link href="#contact" className="btn-primary bg-gradient-to-r from-blue-600 to-blue-500 text-base relative group">
                  <span className="relative flex items-center gap-2">
                    Konsultasi Gratis
                    <HiArrowRight className="text-lg group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </Link>
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
