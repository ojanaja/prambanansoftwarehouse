"use client";
import { useRef } from "react";
import {
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiFlutter,
  SiPostgresql,
  SiTailwindcss,
  SiTypescript,
  SiDocker,
  SiFirebase,
  SiFigma,
  SiGit,
  SiAmazonwebservices,
} from "react-icons/si";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useTranslations } from "next-intl";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TECH_ICONS = {
  react: { icon: SiReact, color: "#61DAFB" },
  nextjs: { icon: SiNextdotjs, color: null },
  nodejs: { icon: SiNodedotjs, color: "#339933" },
  flutter: { icon: SiFlutter, color: "#02569B" },
  postgresql: { icon: SiPostgresql, color: "#4169E1" },
  tailwind: { icon: SiTailwindcss, color: "#06B6D4" },
  typescript: { icon: SiTypescript, color: "#3178C6" },
  docker: { icon: SiDocker, color: "#2496ED" },
  firebase: { icon: SiFirebase, color: "#FFCA28" },
  figma: { icon: SiFigma, color: "#F24E1E" },
  git: { icon: SiGit, color: "#F05032" },
  aws: { icon: SiAmazonwebservices, color: "#FF9900" },
};

export default function TechStackSection() {
  const containerRef = useRef(null);
  const t = useTranslations("techStack");
  const items = t.raw("items");

  useGSAP(
    () => {
      gsap.from(".tech-heading", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      const cards = gsap.utils.toArray(".tech-card");
      cards.forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 92%",
          },
          y: 30,
          opacity: 0,
          scale: 0.9,
          duration: 0.5,
          delay: i * 0.06,
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
        <div className="tech-heading text-center max-w-2xl mx-auto mb-16">
          <p className="section-heading">{t("heading")}</p>
          <h2 className="section-title">{t("title")}</h2>
          <p className="section-subtitle mx-auto">{t("subtitle")}</p>
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 lg:gap-6 max-w-4xl mx-auto">
          {items.map((item) => {
            const tech = TECH_ICONS[item.id];
            const Icon = tech?.icon;
            const iconColor = tech?.color;
            return (
              <div key={item.id} className="tech-card group">
                <div className="glass-card p-4 lg:p-6 flex flex-col items-center justify-center text-center aspect-square hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  {Icon && (
                    <Icon
                      className="text-3xl lg:text-4xl mb-3 transition-transform duration-300 group-hover:scale-110"
                      style={iconColor ? { color: iconColor } : undefined}
                    />
                  )}
                  <span className="text-xs font-medium text-neutral-500 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors">
                    {item.name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
