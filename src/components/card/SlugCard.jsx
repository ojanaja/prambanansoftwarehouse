"use client";
import { handleFetchDataSlug } from "@/helper/getDataSlug";
import { IoIosArrowForward } from "react-icons/io";
import { FaRegCalendar } from "react-icons/fa";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations, useFormatter } from "next-intl";
import { PortableText } from "@portabletext/react";

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

  // Custom components for PortableText to match Sanity Editor visual style
  const ptComponents = {
    block: {
      h2: ({ children }) => (
        <h2 className="text-2xl md:text-3xl font-black text-neutral-900 dark:text-white mt-12 mb-6 tracking-tight leading-tight">
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className="text-xl md:text-2xl font-bold text-neutral-800 dark:text-neutral-100 mt-10 mb-4 tracking-tight">
          {children}
        </h3>
      ),
      normal: ({ children }) => (
        <p className="text-lg text-neutral-600 dark:text-neutral-300 leading-[1.8] mb-8 font-medium text-justify">
          {children}
        </p>
      ),
      blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-primary-500 bg-primary-50/30 dark:bg-neutral-800/40 rounded-r-2xl py-6 px-10 my-10 italic text-xl dark:text-neutral-200 shadow-sm border-opacity-50">
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className="list-none space-y-4 mb-10 pl-2">
          {children}
        </ul>
      ),
    },
    listItem: {
      bullet: ({ children }) => (
        <li className="flex items-start gap-4 text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed group">
          <span className="mt-2.5 w-2 h-2 rounded-full bg-primary-500 transition-colors flex-shrink-0" />
          <span className="text-justify">{children}</span>
        </li>
      ),
    },
    marks: {
      strong: ({ children }) => (
        <strong className="font-black text-neutral-900 dark:text-primary-400">
          {children}
        </strong>
      ),
    },
  };

  return (
    <div className="pt-32 pb-20 px-[5%] max-w-7xl mx-auto">
      {/* BreadCrumbs */}
      <nav className="flex gap-2 items-center mb-8 text-neutral-400 text-sm font-medium">
        <Link href="/" className="hover:text-primary-500 transition-colors">
          {tCommon("home")}
        </Link>
        <span>/</span>
        <Link href="/insights" className="hover:text-primary-500 transition-colors">
          {tCommon("insights")}
        </Link>
        <span>/</span>
        <span className="text-neutral-300 dark:text-neutral-600 truncate max-w-[200px]">{slug}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Content */}
        <article className="lg:col-span-8">
          {/* Header */}
          <header className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full text-[10px] font-bold uppercase tracking-widest">
                Technology & Business
              </span>
              <div className="text-neutral-400 text-sm flex items-center gap-2">
                <FaRegCalendar className="text-neutral-300" />
                {loading ? "..." : formatDate(slugData?.publishedAt || slugData?.created_at)}
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-neutral-900 dark:text-white leading-[1.1] mb-6">
              {loading ? <span className={`block ${skeletonStyle}`} style={{ height: "48px", width: "90%" }} /> : slugData?.title}
            </h1>
            <div className="text-xl text-neutral-500 dark:text-neutral-400 leading-relaxed font-medium mb-10">
              {loading ? <span className={`block ${skeletonStyle}`} style={{ height: "24px", width: "100%" }} /> : slugData?.description}
            </div>
          </header>

          {/* Featured Image */}
          <div className="relative aspect-[16/9] mb-12 overflow-hidden rounded-3xl shadow-2xl shadow-primary-500/10 bg-neutral-100 dark:bg-neutral-800">
            {loading ? (
              <div className={skeletonStyle} style={{ height: "100%", width: "100%" }} />
            ) : (
              <Image
                src={slugData?.imageUrl || (slugData?.mainImage ? urlForImage(slugData.mainImage).width(1200).url() : "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80")}
                fill
                className="object-cover"
                alt={slugData?.title || "Blog cover"}
                priority
              />
            )}
          </div>

          {/* Body Content */}
          <div className="prose-container max-w-none">
            {slugData?.content && Array.isArray(slugData.content) ? (
              <PortableText value={slugData.content} components={ptComponents} />
            ) : (
              <div 
                className="text-lg text-neutral-600 dark:text-neutral-300 leading-[1.8] space-y-8"
                dangerouslySetInnerHTML={{ __html: cleanContent(slugData?.content) }} 
              />
            )}
          </div>
        </article>

        {/* Sidebar */}
        <aside className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
          {/* Author Section */}
          <div className="bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-100 dark:border-white/5 rounded-3xl p-8 mb-8">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-6 flex items-center gap-2">
              <span className="w-4 h-[1px] bg-neutral-300" /> WRITTEN BY
            </h3>
            <div className="flex items-center gap-4 mb-6">
              <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-neutral-200 ring-4 ring-white dark:ring-neutral-800 shadow-lg">
                <Image
                  src={slugData?.author?.imageUrl || (slugData?.author?.image ? urlForImage(slugData.author.image).width(200).url() : "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80")}
                  fill
                  className="object-cover"
                  alt="Author"
                />
              </div>
              <div>
                <p className="font-black text-lg text-neutral-900 dark:text-white leading-tight">
                  {slugData?.author?.name || "Prambanan Editorial"}
                </p>
                <p className="text-sm text-primary-500 font-bold mt-1 uppercase tracking-wider">
                  Senior Contributor
                </p>
              </div>
            </div>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed italic">
              Focused on delivering deep insights into digital transformation and business process innovation.
            </p>
          </div>

          {/* Share/Tags Section */}
          <div className="bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-white/5 rounded-3xl p-8 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4 flex items-center gap-2">
              <span className="w-4 h-[1px] bg-neutral-300" /> EXPLORE TAGS
            </h3>
            <div className="flex gap-2 flex-wrap">
              {['Technology', 'Business', 'Innovation', 'Digital'].map(tag => (
                <span key={tag} className="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded-lg text-xs font-bold hover:bg-primary-500 hover:text-white transition-all cursor-pointer">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
