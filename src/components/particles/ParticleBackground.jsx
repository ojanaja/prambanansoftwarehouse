"use client";
import { useCallback, useMemo } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const PRESETS = {
    // Hero: subtle floating network — clean & minimal
    hero: {
        fullScreen: { enable: false },
        fpsLimit: 60,
        particles: {
            number: { value: 35, density: { enable: true, width: 1200, height: 800 } },
            color: { value: "#ef613d" },
            shape: { type: "circle" },
            opacity: { value: { min: 0.08, max: 0.25 }, animation: { enable: true, speed: 0.4, startValue: "random", sync: false } },
            size: { value: { min: 1, max: 2.5 } },
            links: { enable: true, distance: 140, color: "#ef613d", opacity: 0.06, width: 0.8 },
            move: { enable: true, speed: { min: 0.2, max: 0.6 }, direction: "none", outModes: { default: "out" } },
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
    // Ambient: very sparse, slow, clean
    ambient: {
        fullScreen: { enable: false },
        fpsLimit: 30,
        particles: {
            number: { value: 18, density: { enable: true, width: 1200, height: 800 } },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: { value: { min: 0.04, max: 0.12 }, animation: { enable: true, speed: 0.3, startValue: "random", sync: false } },
            size: { value: { min: 1, max: 2 } },
            links: { enable: false },
            move: { enable: true, speed: { min: 0.1, max: 0.3 }, direction: "none", outModes: { default: "out" } },
        },
        interactivity: { events: { onHover: { enable: false } } },
        detectRetina: true,
    },
    // Tech: rising particles, subtle connected dots
    tech: {
        fullScreen: { enable: false },
        fpsLimit: 30,
        particles: {
            number: { value: 20, density: { enable: true, width: 1200, height: 800 } },
            color: { value: "#ef613d" },
            shape: { type: "circle" },
            opacity: { value: { min: 0.03, max: 0.1 }, animation: { enable: true, speed: 0.3, startValue: "random", sync: false } },
            size: { value: { min: 1, max: 2 } },
            links: { enable: true, distance: 100, color: "#ef613d", opacity: 0.04, width: 0.6 },
            move: { enable: true, speed: { min: 0.15, max: 0.4 }, direction: "top", outModes: { default: "out" } },
        },
        interactivity: { events: { onHover: { enable: false } } },
        detectRetina: true,
    },
};

export default function ParticleBackground({ variant = "hero", className = "" }) {
    const prefersReducedMotion = typeof window !== "undefined"
        ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
        : false;

    const particlesInit = useCallback(async (engine) => {
        await loadSlim(engine);
    }, []);

    const options = useMemo(() => PRESETS[variant] || PRESETS.hero, [variant]);

    if (prefersReducedMotion) return null;

    return (
        <div className={`absolute inset-0 pointer-events-none z-[1] ${className}`}>
            <Particles
                id={`particles-${variant}`}
                init={particlesInit}
                options={options}
                className="w-full h-full"
            />
        </div>
    );
}
