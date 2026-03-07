"use client";
import { handleFetchDataSlug } from "@/helper/getDataSlug";
import { IoIosArrowForward } from "react-icons/io";
import { FaRegCalendar } from "react-icons/fa";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations, useFormatter } from "next-intl";

const ALLOWED_CONTENT_TAGS = /<img[^>]*>/g;
const skeletonStyle = "bg-gray-300 animate-pulse rounded-lg";

export default function SlugCard({ slug }) {
  const t = useTranslations("blog");
  const tCommon = useTranslations("common");
  const format = useFormatter();
  
  const [slugData, setSlugData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await handleFetchDataSlug(slug);
        setSlugData(response);
      } catch (error) {
        console.error("Failed to fetch slug data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return format.dateTime(date, {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const cleanContent = (htmlContent) => {
    if (!htmlContent) return "";
    return htmlContent.replace(ALLOWED_CONTENT_TAGS, "");
  };

  return (
    <div className="mt-20 px-[5%] pb-[5%]">
      {/* BreadCrumbs */}
      <nav className="flex gap-1 items-center mb-6 overflow-x-auto whitespace-nowrap scrollbar-hide py-2">
        <Link href="/" className="text-sm font-medium hover:text-primary-500 transition-colors">
          {tCommon("home")}
        </Link>
        <IoIosArrowForward className="text-gray-400 flex-shrink-0" />
        <Link href="/blog" className="text-sm font-medium hover:text-primary-500 transition-colors">
          {tCommon("blog")}
        </Link>
        <IoIosArrowForward className="text-gray-400 flex-shrink-0" />
        <span className="text-sm text-neutral-400 line-clamp-1 italic">{slug}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="lg:w-3/4">
          <div className="bg-white dark:bg-neutral-900 rounded-2xl p-4 md:p-8 shadow-sm border border-neutral-100 dark:border-neutral-800">
            {loading ? (
              <div className={skeletonStyle} style={{ height: "40px", width: "80%" }} />
            ) : (
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-white leading-tight">
                {slugData?.title}
              </h1>
            )}

            <div className="flex items-center gap-3 text-sm text-neutral-500 my-6">
              <FaRegCalendar className="text-primary-400" />
              {loading ? (
                <div className={skeletonStyle} style={{ height: "20px", width: "120px" }} />
              ) : (
                <time dateTime={slugData?.publishedAt}>{formatDate(slugData?.publishedAt || slugData?.published_at || slugData?.created_at)}</time>
              )}
            </div>

            <div className="relative aspect-video mb-8 overflow-hidden rounded-xl">
              {loading ? (
                <div className={skeletonStyle} style={{ height: "100%", width: "100%" }} />
              ) : slugData?.image ? (
                <Image
                  src={slugData.image}
                  fill
                  className="object-cover"
                  alt={slugData.title || t("photosBlogAlt")}
                  priority
                />
              ) : (
                <Image
                  src={"https://placehold.co/1200x800"}
                  fill
                  className="object-cover"
                  alt={t("photosBlogAlt")}
                  priority
                />
              )}
            </div>

            <div className="prose prose-neutral dark:prose-invert max-w-none lg:prose-lg">
              <div
                dangerouslySetInnerHTML={{
                  __html: cleanContent(slugData?.content),
                }}
              />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:w-1/4 flex flex-col gap-6">
          {/* Author Card */}
          <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow-sm border border-neutral-100 dark:border-neutral-800">
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12 flex-shrink-0">
                {loading ? (
                  <div className={`${skeletonStyle} rounded-full`} style={{ height: "48px", width: "48px" }} />
                ) : slugData?.author?.image ? (
                  <Image
                    src={slugData.author.image}
                    fill
                    className="object-cover rounded-full"
                    alt={slugData.author.name || t("authorAlt")}
                  />
                ) : (
                  <Image
                    src="https://placehold.co/80x80"
                    fill
                    className="object-cover rounded-full"
                    alt={t("authorAlt")}
                  />
                )}
              </div>
              <div>
                <p className="text-xs text-neutral-400 uppercase tracking-wider font-bold mb-0.5">
                  {t("noAuthor")}
                </p>
                <p className="font-bold text-neutral-900 dark:text-white">
                  {loading ? "..." : slugData?.author?.name || t("noAuthor")}
                </p>
              </div>
            </div>
          </div>

          {/* Tags Card */}
          <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow-sm border border-neutral-100 dark:border-neutral-800">
            <div className="flex gap-2 items-center mb-4 text-primary-500 font-bold uppercase tracking-widest text-xs">
              <span className="w-2 h-4 bg-primary-500 rounded-full" />
              {t("tags")}
            </div>
            <div className="flex gap-2 flex-wrap">
              {/* Placeholder for tags if they existed in the data */}
              <span className="text-sm text-neutral-400 italic">No tags</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
