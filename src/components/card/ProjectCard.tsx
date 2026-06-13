"use client";

import React from "react";
import Image from "next/image";
import { HiArrowRight } from "react-icons/hi";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams } from "next/navigation";

interface ProjectCardProps {
  slug: string;
  company: string;
  name: string;
  imageUrl?: string;
  index?: number;
}

export default function ProjectCard({ slug, company, name, imageUrl, index = 0 }: ProjectCardProps) {
  const number = String(index + 1).padStart(2, "0");
  const t = useTranslations("projects");
  const params = useParams();
  const locale = (params?.locale as string) || "en";

  return (
    <Link
      href={`/${locale}/work/${slug}`}
      className="group relative w-full h-[380px] md:h-[420px] rounded-2xl overflow-hidden cursor-pointer block"
    >
      {/* Accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-primary-400 z-20" />

      {/* Full-bleed image */}
      {imageUrl && (
        <Image
          src={imageUrl}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          alt={name}
        />
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-500 group-hover:from-black/90 group-hover:via-black/40" />

      {/* Number badge */}
      <div className="absolute top-4 left-4 z-10">
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-bold">
          {number}
        </span>
      </div>

      {/* Bottom content — glassmorphic strip */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-5 lg:p-6">
        <div className="backdrop-blur-xl bg-white/10 dark:bg-white/5 border border-white/15 rounded-xl p-4 lg:p-5 transition-all duration-500 group-hover:bg-white/15 dark:group-hover:bg-white/10">
          {/* Company tag */}
          <span className="inline-block text-[11px] font-semibold uppercase tracking-widest text-primary-400 mb-2">
            {company}
          </span>

          {/* Project name */}
          <h3 className="font-bold text-lg text-white leading-snug">
            {name}
          </h3>

          {/* Hover CTA */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10 overflow-hidden">
            <span className="text-sm font-medium text-white/70 group-hover:text-primary-400 transition-colors duration-300">
              {t("viewCaseStudy")}
            </span>
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary-500/0 group-hover:bg-primary-500 transition-all duration-500 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100">
              <HiArrowRight className="text-white text-sm" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
