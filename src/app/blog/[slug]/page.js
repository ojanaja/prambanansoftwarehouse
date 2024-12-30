import { wisp } from "@/lib/wisp";
import { IoIosArrowForward } from "react-icons/io";
import { FaRegCalendar } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";

export default async function BlogPost({ params: { slug } }) {
  const formatDate = (dateString) => {
    const options = {
      day: "2-digit",
      month: "long",
      year: "numeric",
    };

    const date = new Date(dateString);

    return date.toLocaleDateString("id-ID", options);
  };
  const result = await wisp.getPost(slug);

  if (!result.post) return null;
  const { title, publishedAt, createdAt, content, tags, author, image } = result.post;
  return (
    <div className="mt-20 px-[5%] pb-[5%]">
      {/* {console.log(result)} */}
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
          <h1 className="md:text-2xl font-medium">{title}</h1>
          <div className="py-5">
            {image ? (
              <Image src={image} width={600} height={500} className="w-full object-cover rounded-lg" alt={title} priority />
            ) : (
              <Image src={"https://placehold.co/600x500"} width={600} height={200} className="w-full h-[500px] object-cover rounded-lg" alt="Photos Blog" priority />
            )}
          </div>
          <div className="flex justify-center items-center gap-1  text-gray-600">
            <FaRegCalendar />
            <p className="text-xs mt-0.5">{formatDate(publishedAt)}</p>
          </div>
          <div className="py-5">
            <div
              className=" mx-auto"
              dangerouslySetInnerHTML={{
                __html: content,
              }}
            />
          </div>
        </div>
        <div className="w-full md:w-1/4">
          <div className="bg-gray-100 rounded-lg py-[3%] px-[3%]">
            <div className="flex gap-2">
              {author.image ? (
                <Image src={author.image} width={100} height={100} className="w-2/12 tablet-landscape:w-1/12 h-auto object-cover rounded-lg" alt={author.name || "Author"} priority />
              ) : (
                <Image src={"https://placehold.co/50x50"} width={100} height={100} className="w-2/12 tablet-landscape:w-1/12 h-auto object-cover rounded-lg" alt="Author" priority />
              )}
              <p className="font-semibold">{author.name || "No Author"}</p>
            </div>
          </div>
          <div className="bg-gray-100 rounded-lg py-[3%] px-[3%] mt-5">
            <div className="flex gap-2 items-center">
              <div className="bg-primary-500 h-4 w-2 rounded-full"></div>
              <h1 className="text-lg font-semibold">Tags</h1>
            </div>
            <div className="flex gap-1 break-words flex-wrap py-2">
              {tags.map((tag) => (
                <span>#{tag.name}</span>
              ))}
            </div>
          </div>
          {/* <div className="bg-gray-100 rounded-lg py-[3%] px-[3%] mt-5">
            <div className="flex gap-2 items-center">
              <div className="bg-primary-500 h-4 w-2 rounded-full"></div>
              <h1 className="text-lg font-semibold">Our Post</h1>
            </div>
            <div className="flex-col gap-1 py-2">
              <div className="flex gap-2 w-full">
                <Image src={"https://placehold.co/70x70"} width={70} height={70} className="object-cover rounded-lg" alt="Photos Blog" priority />
                <p className="text-xs line-clamp-1">Apa Itu Software Custom dan Mengapa Penting untuk Bisnis Anda?</p>
              </div>
            </div>
          </div> */}
        </div>
      </div>

      {/* <div className="prose lg:prose-xl dark:prose-invert mx-auto lg:prose-h1:text-4xl mb-10 lg:mt-20 break-words">
        <h1>{title}</h1>
        <div
          className="blog-content mx-auto"
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />
        <div className="mt-10 opacity-40 text-sm">
          {tags.map((tag) => (
            <span>#{tag.name}</span>
          ))}
        </div>
        <div className="text-sm opacity-40 mt-4">{Intl.DateTimeFormat("en-US").format(new Date(publishedAt || createdAt))}</div>
      </div> */}
    </div>
  );
}
