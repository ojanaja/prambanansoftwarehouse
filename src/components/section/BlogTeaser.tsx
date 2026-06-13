import React from "react";
import Image from "next/image";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";
import { getArticles, Article } from "@/lib/api";
import { getTranslations } from "next-intl/server";

interface BlogTeaserSectionProps {
  locale: string;
}

export default async function BlogTeaserSection({ locale }: BlogTeaserSectionProps) {
  const t = await getTranslations("blogTeaser");

  // Fetch latest 3 posts from API
  let posts: Article[] = [];
  try {
    const allPosts = await getArticles();
    posts = (allPosts || []).slice(0, 3);
  } catch (error: any) {
    console.error("Failed to fetch marketing articles:", error.message);
  }

  if (!posts || posts.length === 0) return null;

  return (
    <div className="section-padding">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="section-heading">{t("heading")}</p>
          <h2 className="section-title">{t("title")}</h2>
          <p className="section-subtitle mx-auto">{t("subtitle")}</p>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {posts.map((post) => (
            <Link 
              key={post._id} 
              href={`/insights/${post.slug}`} 
              className="group h-full"
            >
              <div className="bg-white dark:bg-neutral-900/40 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 border border-neutral-100 dark:border-white/10 overflow-hidden h-full flex flex-col group-hover:-translate-y-1">
                {/* Image */}
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={post.imageUrl || "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80"}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    alt={post.title || "Blog post"}
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest text-primary-600">
                    Featured
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white group-hover:text-primary-600 transition-colors line-clamp-2 leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-neutral-500 dark:text-neutral-400 mt-3 text-sm line-clamp-3 leading-relaxed flex-1">
                    {post.description}
                  </p>

                  <div className="flex items-center gap-3 mt-6 pt-4 border-t border-neutral-50 dark:border-white/5">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden bg-neutral-200 ring-2 ring-white dark:ring-neutral-800">
                      <Image
                        src={post.author?.image || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&q=80"}
                        fill
                        sizes="32px"
                        className="object-cover"
                        alt={post.author?.name || "Author"}
                      />
                    </div>
                    <div className="text-xs">
                      <p className="font-bold text-neutral-800 dark:text-neutral-200">
                        {post.author?.name || "Prambanan Editorial"}
                      </p>
                      <p className="text-neutral-400 font-medium">
                        {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString(locale === 'id' ? 'id-ID' : 'en-US', { day: 'numeric', month: 'short' }) : ""}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-10">
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors group"
          >
            {t("viewAll")}
            <HiArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </div>
  );
}
