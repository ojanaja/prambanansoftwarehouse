import Image from "next/image";
import Link from "next/link";
import { useTranslations, useFormatter } from "next-intl";

export default function BlogCard({ post }) {
  const t = useTranslations("blog");
  const format = useFormatter();

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    // Use next-intl formatter for clean, consistent date formatting
    return format.dateTime(date, {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <>
      {/* Tablet and Desktop Mode */}
      <div className="hidden md:block">
        <div className="bg-white rounded-lg shadow-lg p-3 flex items-center gap-3 mx-auto h-full">
          {/* Image and Title/Description - Clickable */}
          <div className="w-full md:w-1/2 tablet-landscape:w-2/5 h-full">
            <Link href={`/blog/${post.slug}`} className="block h-full relative aspect-video">
              {post.image ? (
                <Image
                  src={post.image}
                  fill
                  className="object-cover rounded-lg"
                  alt={post.title || t("photosBlogAlt")}
                  priority
                />
              ) : (
                <Image
                  src={"https://placehold.co/600x500"}
                  fill
                  className="object-cover rounded-lg"
                  alt={t("photosBlogAlt")}
                  priority
                />
              )}
            </Link>
          </div>

          <div className="flex-1 flex flex-col justify-between py-2">
            <Link href={`/blog/${post.slug}`} className="group">
              <div className="hover:text-primary-500 transition-colors">
                {/* Title */}
                <h2 className="text-lg font-semibold md:line-clamp-2 group-hover:text-primary-500">
                  {post.title || t("noTitle")}
                </h2>

                {/* Blog Description */}
                <div className="py-2">
                  <p className="text-gray-600 line-clamp-3 text-justify group-hover:text-primary-500 text-sm">
                    {post.description || t("noDescription")}
                  </p>
                </div>
              </div>
            </Link>

            {/* Author Info */}
            <div className="mt-auto">
              <div className="p-2 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl">
                <div className="flex gap-3 items-center">
                  {/* Author Image */}
                  <div className="relative w-8 h-8 flex-shrink-0">
                    {post.author.image ? (
                      <Image
                        src={post.author.image}
                        fill
                        className="object-cover rounded-full"
                        alt={post.author.name || t("authorAlt")}
                      />
                    ) : (
                      <Image
                        src={"https://placehold.co/50x50"}
                        fill
                        className="object-cover rounded-full"
                        alt={t("authorAlt")}
                      />
                    )}
                  </div>
                  {/* Author Details */}
                  <div className="text-xs">
                    <p className="font-semibold text-neutral-800 dark:text-neutral-200">
                      {post.author?.name || t("noAuthor")}
                    </p>
                    <p className="text-neutral-500">
                      {formatDate(post.publishedAt || post.published_at || post.created_at)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Mode */}
      <div className="block md:hidden">
        <div className="p-4 bg-white rounded-lg shadow-lg">
          {/* Image - Clickable */}
          <Link href={`/blog/${post.slug}`} className="block relative aspect-video mb-3">
            {post.image ? (
              <Image
                src={post.image}
                fill
                className="object-cover rounded-lg"
                alt={post.title || t("photosBlogAlt")}
                priority
              />
            ) : (
              <Image
                src={"https://placehold.co/500x300"}
                fill
                className="object-cover rounded-lg"
                alt={t("photosBlogAlt")}
                priority
              />
            )}
          </Link>

          <Link href={`/blog/${post.slug}`} className="group">
            <div className="hover:text-primary-500 active:text-primary-500">
              {/* Title */}
              <h2 className="text-lg font-semibold line-clamp-2 group-hover:text-primary-500 group-active:text-primary-500">
                {post.title || t("noTitle")}
              </h2>

              {/* Description */}
              <p className="text-sm text-justify line-clamp-3 my-2 group-hover:text-primary-500 group-active:text-primary-500">
                {post.description || t("noDescription")}
              </p>
            </div>
          </Link>

          <div className="pt-2">
            <div className="p-3 bg-neutral-50 rounded-xl">
              <div className="flex gap-3 items-center">
                <div className="relative w-8 h-8 flex-shrink-0">
                  {post.author.image ? (
                    <Image
                      src={post.author.image}
                      fill
                      className="object-cover rounded-full"
                      alt={post.author.name || t("authorAlt")}
                    />
                  ) : (
                    <Image
                      src={"https://placehold.co/50x50"}
                      fill
                      className="object-cover rounded-full"
                      alt={t("authorAlt")}
                    />
                  )}
                </div>
                <div className="text-xs">
                  <p className="font-semibold text-neutral-800">
                    {post.author?.name || t("noAuthor")}
                  </p>
                  <p className="text-neutral-500">
                    {formatDate(post.publishedAt || post.published_at || post.created_at)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
