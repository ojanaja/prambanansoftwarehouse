"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations, useFormatter } from "next-intl";
import { Article } from "@/lib/api";

interface BlogCardProps {
  post: Article;
}

// Local helper to handle legacy Sanity image formats if present
const urlForImage = (source: any) => {
  return {
    width: (w: number) => ({
      url: () => {
        if (typeof source === "string") return source;
        if (source?.asset?.url) return source.asset.url;
        if (source?.url) return source.url;
        return "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80";
      }
    })
  };
};

export default function BlogCard({ post }: BlogCardProps) {
  const t = useTranslations("blog");
  const format = useFormatter();

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    // Use next-intl formatter for clean, consistent date formatting
    return format.dateTime(date, {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const coverImage = post.imageUrl || "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80";
  const authorImage = post.author?.image 
    ? urlForImage(post.author.image).width(100).url() 
    : "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&q=80";

  return (
    <>
      {/* Tablet and Desktop Mode */}
      <div className="hidden md:block group h-full">
        <Link href={`/insights/${post.slug}`} className="block h-full">
          <div className="bg-white dark:bg-neutral-900/40 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 border border-neutral-100 dark:border-white/10 flex flex-col tablet-landscape:flex-row p-4 gap-6 h-full group-hover:-translate-y-1">
            {/* Image Section */}
            <div className="w-full tablet-landscape:w-2/5 relative aspect-[16/10] overflow-hidden rounded-xl">
              <Image
                src={coverImage}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 40vw, 20vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                alt={post.title || t("photosBlogAlt")}
              />
              {/* Category Badge overlay if needed */}
              <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest text-primary-600">
                Insights
              </div>
            </div>

            {/* Content Section */}
            <div className="flex-1 flex flex-col justify-between py-1">
              <div>
                <h2 className="text-xl font-bold text-neutral-900 dark:text-white group-hover:text-primary-500 transition-colors line-clamp-2 leading-tight">
                  {post.title || t("noTitle")}
                </h2>
                <p className="text-neutral-500 dark:text-neutral-400 mt-3 text-sm line-clamp-3 leading-relaxed">
                  {post.description || t("noDescription")}
                </p>
              </div>

              {/* Author & Date Footer */}
              <div className="mt-6 flex items-center gap-3 pt-4 border-t border-neutral-50 dark:border-white/5">
                <div className="relative w-8 h-8 rounded-full overflow-hidden bg-neutral-200 ring-2 ring-white dark:ring-neutral-800">
                  <Image
                    src={authorImage}
                    fill
                    sizes="32px"
                    className="object-cover"
                    alt={post.author?.name || t("authorAlt")}
                  />
                </div>
                <div className="text-xs">
                  <p className="font-bold text-neutral-800 dark:text-neutral-200">
                    {post.author?.name || "Prambanan Editorial"}
                  </p>
                  <p className="text-neutral-400 font-medium">
                    {formatDate(post.publishedAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Mobile Mode */}
      <div className="block md:hidden">
        <Link href={`/insights/${post.slug}`} className="block">
          <div className="bg-white dark:bg-neutral-900/60 rounded-2xl shadow-md border border-neutral-100 dark:border-white/10 overflow-hidden">
            <div className="relative aspect-video">
              <Image
                src={coverImage}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 40vw, 20vw"
                className="object-cover"
                alt={post.title || t("photosBlogAlt")}
              />
            </div>
            <div className="p-5">
              <h2 className="text-lg font-bold text-neutral-900 dark:text-white mb-2 leading-snug">
                {post.title || t("noTitle")}
              </h2>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-3 mb-4 leading-relaxed">
                {post.description || t("noDescription")}
              </p>
              
              <div className="flex items-center gap-3 pt-3 border-t border-neutral-50 dark:border-white/5">
                <div className="relative w-6 h-6 rounded-full overflow-hidden bg-neutral-200">
                  <Image
                    src={authorImage}
                    fill
                    sizes="24px"
                    className="object-cover"
                    alt={post.author?.name || t("authorAlt")}
                  />
                </div>
                <p className="text-[10px] font-bold text-neutral-400 tracking-wide">
                  {formatDate(post.publishedAt).toUpperCase()}
                </p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
