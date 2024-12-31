"use client";
import { handleFetchDataSlug } from "@/helper/getDataSlug";
import { IoIosArrowForward } from "react-icons/io";
import { FaRegCalendar } from "react-icons/fa";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

const skeletonStyle = "bg-gray-300 animate-pulse rounded-lg";

export default function SlugCard({ slug }) {
  const [slugData, setSlugData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDataSlug = async () => {
    setLoading(true);
    const response = await handleFetchDataSlug(slug);
    setSlugData(response);
    setLoading(false);
  };

  const formatDate = (dateString) => {
    const options = {
      day: "2-digit",
      month: "long",
      year: "numeric",
    };

    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", options);
  };

  const removeImagesFromContent = (htmlContent) => {
    if (!htmlContent) return "";
    return htmlContent.replace(/<img[^>]*>/g, "");
  };

  useEffect(() => {
    fetchDataSlug();
  }, [slug]);

  const contentWithoutImages = removeImagesFromContent(slugData?.content || "");

  return (
    <div className="mt-20 px-[5%] pb-[5%]">
      {/* BreadCrumbs */}
      <div className="flex gap-0.5 items-center">
        <Link href={"/"} className="text-sm font-medium">
          Home
        </Link>
        <IoIosArrowForward className="text-gray-400" />
        <Link href={"/blog"} className="text-sm font-medium">
          Blog
        </Link>
        <IoIosArrowForward className="text-gray-400" />
        <p className="text-sm text-gray-400 line-clamp-1">{slug}</p>
      </div>

      <div className="flex flex-col md:flex-row gap-5 mt-5">
        <div className="bg-gray-100 rounded-lg py-[2%] px-[2%] md:w-3/4">
          {loading ? <div className={skeletonStyle} style={{ height: "32px", width: "60%" }} /> : <h1 className="md:text-2xl font-medium">{slugData.title}</h1>}

          <div className="py-5">
            {loading ? (
              <div className={skeletonStyle} style={{ height: "300px", width: "100%" }} />
            ) : slugData?.image ? (
              <Image src={slugData.image} width={600} height={500} className="w-full object-cover rounded-lg" alt={slugData.title} priority />
            ) : (
              <Image src={"https://placehold.co/600x500"} width={600} height={200} className="w-full h-[500px] object-cover rounded-lg" alt="Photos Blog" priority />
            )}
          </div>

          <div className="flex justify-center items-center gap-1 text-gray-600">
            {loading ? (
              <div className={skeletonStyle} style={{ height: "20px", width: "80px" }} />
            ) : (
              <>
                <FaRegCalendar />
                <p className="text-xs mt-0.5">{formatDate(slugData.publishedAt)}</p>
              </>
            )}
          </div>

          <div className="py-5">
            <div
              className="mx-auto"
              dangerouslySetInnerHTML={{
                __html: contentWithoutImages,
              }}
            />
          </div>
        </div>

        <div className="w-full md:w-1/4">
          <div className="bg-gray-100 rounded-lg py-[3%] px-[3%]">
            <div className="flex gap-2">
              {loading ? (
                <div className={skeletonStyle} style={{ height: "100px", width: "100px" }} />
              ) : slugData?.author?.image ? (
                <Image src={slugData.author.image} width={100} height={100} className="w-2/12 tablet-landscape:w-1/12 h-auto object-cover rounded-lg" alt={slugData.author.name || "Author"} priority />
              ) : (
                <Image src="https://placehold.co/50x50" width={100} height={100} className="w-2/12 tablet-landscape:w-1/12 h-auto object-cover rounded-lg" alt="Author" priority />
              )}

              <p className="font-semibold">{slugData?.author?.name || "No Author"}</p>
            </div>
          </div>

          <div className="bg-gray-100 rounded-lg py-[3%] px-[3%] mt-5">
            <div className="flex gap-2 items-center">
              <div className="bg-primary-500 h-4 w-2 rounded-full"></div>
              <h1 className="text-lg font-semibold">Tags</h1>
            </div>
            <div className="flex gap-1 break-words flex-wrap py-2">{/* Placeholder untuk tags */}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
