"use client";

import React, { useEffect, useState, useMemo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

interface ParticleBackgroundProps {
  variant?: "hero" | "ambient" | "tech";
  className?: string;
}

const PRESETS = {
  hero: {
    fullScreen: { enable: false },
    fpsLimit: 60,
    particles: {
      number: { value: 35, density: { enable: true, width: 1200, height: 800 } },
      color: { value: "#ef613d" },
      shape: { type: "circle" },
      opacity: { value: { min: 0.08, max: 0.25 }, animation: { enable: true, speed: 0.4, startValue: "random" as const, sync: false } },
      size: { value: { min: 1, max: 2.5 } },
      links: { enable: true, distance: 140, color: "#ef613d", opacity: 0.06, width: 0.8 },
      move: { enable: true, speed: { min: 0.2, max: 0.6 }, direction: "none" as const, outModes: { default: "out" as const } },
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: "grab" },
      },
      modes: {
        grab: { distance: 160, links: { opacity: 0.15, color: "#ef613d" } },
      },
    },
    detectRetina: true,
  },
  ambient: {
    fullScreen: { enable: false },
    fpsLimit: 30,
    particles: {
      number: { value: 18, density: { enable: true, width: 1200, height: 800 } },
      color: { value: "#ffffff" },
      shape: { type: "circle" },
      opacity: { value: { min: 0.04, max: 0.12 }, animation: { enable: true, speed: 0.3, startValue: "random" as const, sync: false } },
      size: { value: { min: 1, max: 2 } },
      links: { enable: false },
      move: { enable: true, speed: { min: 0.1, max: 0.3 }, direction: "none" as const, outModes: { default: "out" as const } },
    },
    interactivity: { events: { onHover: { enable: false } } },
    detectRetina: true,
  },
  tech: {
    fullScreen: { enable: false },
    fpsLimit: 30,
    particles: {
      number: { value: 20, density: { enable: true, width: 1200, height: 800 } },
      color: { value: "#ef613d" },
      shape: { type: "circle" },
      opacity: { value: { min: 0.03, max: 0.1 }, animation: { enable: true, speed: 0.3, startValue: "random" as const, sync: false } },
      size: { value: { min: 1, max: 2 } },
      links: { enable: true, distance: 100, color: "#ef613d", opacity: 0.04, width: 0.6 },
      move: { enable: true, speed: { min: 0.15, max: 0.4 }, direction: "top" as const, outModes: { default: "out" as const } },
    },
    interactivity: { events: { onHover: { enable: false } } },
    detectRetina: true,
  },
};

export default function ParticleBackground({ variant = "hero", className = "" }: ParticleBackgroundProps) {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const prefersReducedMotion = typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

  const options = useMemo(() => PRESETS[variant] || PRESETS.hero, [variant]);

  if (prefersReducedMotion || !init) return null;

  return (
    <div className={`absolute inset-0 pointer-events-none z-[1] ${className}`}>
      <Particles
        id={`particles-${variant}`}
        options={options}
        className="w-full h-full"
      />
    </div>
  );
}
