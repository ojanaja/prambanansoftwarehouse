import Image from "next/image";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";
import { supabase } from "@/lib/supabase";
import { getTranslations, getFormatter } from "next-intl/server";

export default async function BlogTeaserSection() {
  const t = await getTranslations("blogTeaser");
  const format = await getFormatter();

  // Fetch latest 3 posts
  const { data: posts } = await supabase
    .from("posts")
    .select("*, author:authors(*)")
    .order("published_at", { ascending: false })
    .limit(3);

  if (!posts || posts.length === 0) return null;

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return format.dateTime(date, {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

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
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group block"
            >
              <div className="glass-card-hover h-full flex flex-col overflow-hidden">
                {/* Image */}
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={post.image || "https://placehold.co/600x400"}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    alt={post.title || "Blog post"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-5 lg:p-6 flex flex-col flex-grow">
                  <p className="text-xs text-neutral-500 mb-2">
                    {formatDate(post.published_at || post.created_at)}
                  </p>
                  <h3 className="font-bold text-base lg:text-lg mb-2 line-clamp-2 group-hover:text-primary-500 transition-colors duration-300">
                    {post.title}
                  </h3>
                  <p className="text-neutral-500 text-sm leading-relaxed line-clamp-2 flex-grow">
                    {post.description}
                  </p>

                  {/* Author */}
                  {post.author && (
                    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-neutral-200/60 dark:border-white/10">
                      <div className="relative w-6 h-6 rounded-full overflow-hidden flex-shrink-0">
                        <Image
                          src={post.author.image || "https://placehold.co/50x50"}
                          fill
                          className="object-cover"
                          alt={post.author.name || "Author"}
                        />
                      </div>
                      <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
                        {post.author.name}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary-500 hover:text-primary-600 transition-colors group"
          >
            {t("viewAll")}
            <HiArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </div>
  );
}
