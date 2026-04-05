import Image from "next/image";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";
import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { getTranslations, getFormatter } from "next-intl/server";

export default async function BlogTeaserSection({ locale }) {
  const t = await getTranslations("blogTeaser");
  const format = await getFormatter();

  // Fetch latest 3 posts from Sanity
  let posts = [];
  try {
    posts = await client.fetch(
      `*[_type == "post"] | order(publishedAt desc)[0...3] {
        _id,
        "id": _id,
        title,
        "slug": slug.current,
        description,
        publishedAt,
        mainImage,
        author->{
          name,
          image
        }
      }`,
      {},
      { next: { revalidate: 60 } }
    );
  } catch (error) {
    console.error("Failed to fetch sanity data:", error.message);
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
              key={post.id} 
              href={`/blog/${post.slug}`} 
              className="group h-full"
            >
              <div className="bg-white dark:bg-neutral-900/40 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 border border-neutral-100 dark:border-white/10 overflow-hidden h-full flex flex-col group-hover:-translate-y-1">
                {/* Image */}
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={post.mainImage ? urlForImage(post.mainImage).width(600).url() : "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80"}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    alt={post.title || "Blog post"}
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest text-primary-600">
                    Featured
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white group-hover:text-primary-500 transition-colors line-clamp-2 leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-neutral-500 dark:text-neutral-400 mt-3 text-sm line-clamp-3 leading-relaxed flex-1">
                    {post.description}
                  </p>

                  <div className="flex items-center gap-3 mt-6 pt-4 border-t border-neutral-50 dark:border-white/5">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden bg-neutral-200 ring-2 ring-white dark:ring-neutral-800">
                      <Image
                        src={post.author?.image ? urlForImage(post.author.image).width(100).url() : "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&q=80"}
                        fill
                        className="object-cover"
                        alt={post.author?.name || "Author"}
                      />
                    </div>
                    <div className="text-xs">
                      <p className="font-bold text-neutral-800 dark:text-neutral-200">
                        {post.author?.name || "Prambanan Editorial"}
                      </p>
                      <p className="text-neutral-400 font-medium">
                        {new Date(post.publishedAt).toLocaleDateString(locale === 'id' ? 'id-ID' : 'en-US', { day: 'numeric', month: 'short' })}
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
