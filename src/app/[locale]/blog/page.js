import BlogCard from "@/components/card/BlogCard";
import { supabase } from "@/lib/supabase";

export async function generateMetadata({ params: { locale } }) {
  return {
    alternates: {
      canonical: `/${locale}/blog`,
      languages: {
        en: '/en/blog',
        id: '/id/blog',
        'x-default': '/id/blog',
      },
    },
  };
}

export default async function Blog() {
  const { data: posts, error } = await supabase
    .from("posts")
    .select("*, author:authors(*), tags(*)")
    .order("published_at", { ascending: false });
  return (
    <div className="grid tablet-landscape:grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 mt-16 px-[3%] mb-10 md:mb-0">
      {posts && posts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
}
