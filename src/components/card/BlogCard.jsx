import Image from "next/image";
import Link from "next/link";

export default function BlogCard({ post }) {
  const formatDate = (dateString) => {
    const options = {
      day: "2-digit",
      month: "long",
      year: "numeric",
    };

    const date = new Date(dateString);

    return date.toLocaleDateString("id-ID", options);
  };

  return (
    <>
      {/* Tablet and Desktop Mode */}
      <div className="hidden md:block">
        <div className="bg-white rounded-lg shadow-lg p-3 flex items-center gap-3 mx-auto">
          {/* Image and Title/Description - Clickable */}
          <div className="w-full md:w-1/2 tablet-landscape:w-2/5">
            <Link href={`/blog/${post.slug}`}>
              {post.image ? (
                <Image src={post.image} width={600} height={500} className="object-cover rounded-lg" alt={post.title} priority />
              ) : (
                <Image src={"https://placehold.co/600x500"} width={600} height={500} className="object-cover rounded-lg" alt="Photos Blog" priority />
              )}
            </Link>
          </div>

          <div className="flex-1">
            <Link href={`/blog/${post.slug}`} className="group">
              <div className="hover:text-primary-500">
                {/* Title */}
                <h1 className="text-lg font-semibold md:line-clamp-2 group-hover:text-primary-500">{post.title || "No title available"}</h1>

                {/* Blog Description */}
                <div className="py-3">
                  <p className="text-gray-600 line-clamp-3 text-justify group-hover:text-primary-500">{post.description || "No description available"}</p>
                </div>
              </div>
            </Link>

            {/* Author Info */}
            <div className="py-2">
              <div className="md:p-3 tablet-landscape:p-2 bg-[#F5F5F5] rounded-2xl">
                <div className="flex md:gap-5 tablet-landscape:gap-3 items-center">
                  {/* Author Image */}
                  {post.author.image ? (
                    <Image src={post.author.image} width={100} height={100} className="w-2/12 tablet-landscape:w-1/12 h-auto object-cover rounded-lg" alt={post.author.name || "Author"} priority />
                  ) : (
                    <Image src={"https://placehold.co/50x50"} width={100} height={100} className="w-2/12 tablet-landscape:w-1/12 h-auto object-cover rounded-lg" alt="Author" priority />
                  )}
                  {/* Author Details */}
                  <div className="text-sm">
                    <p className="font-semibold">{post.author.name || "No Author"}</p>
                    <p className="text-slate-500">{formatDate(post.publishedAt)}</p>
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
          <Link href={`/blog/${post.slug}`}>
            {post.image ? (
              <Image src={post.image} width={500} height={300} className="object-cover rounded-lg" alt={post.title} priority />
            ) : (
              <Image src={"https://placehold.co/500x300"} width={500} height={300} className="object-cover rounded-lg" alt="Photos Blog" priority />
            )}
          </Link>

          <Link href={`/blog/${post.slug}`} className="group">
            <div className="hover:text-primary-500 active:text-primary-500">
              {/* Title */}
              <div className="py-2">
                <h1 className="text-lg font-semibold line-clamp-2 group-hover:text-primary-500 group-active:text-primary-500">{post.title || "No title available"}</h1>
              </div>

              {/* Description */}
              <p className="text-sm text-justify line-clamp-3 group-hover:text-primary-500 group-active:text-primary-500">{post.description || "No description available"}</p>
            </div>
          </Link>

          <div className="pt-2">
            <div className="p-3 bg-[#F5F5F5] rounded-2xl">
              <div className="flex gap-3 items-center">
                {/* Author Image */}
                {post.author.image ? (
                  <Image src={post.author.image} width={50} height={50} className="h-auto object-cover rounded-lg" alt={post.author.name || "Author"} priority />
                ) : (
                  <Image src={"https://placehold.co/50x50"} width={50} height={50} className="h-auto object-cover rounded-lg" alt="Author" priority />
                )}
                {/* Author Details */}
                <div className="text-sm">
                  <p className="font-semibold">{post.author.name || "No Author"}</p>
                  <p className="text-slate-500">{formatDate(post.publishedAt)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
