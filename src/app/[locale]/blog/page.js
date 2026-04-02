import BlogCard from "@/components/card/BlogCard";
import { client } from "@/sanity/lib/client";
import { postsQuery } from "@/sanity/lib/queries";

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
  const posts = await client.fetch(postsQuery, {}, { next: { revalidate: 60 } });

  if (!posts || posts.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-[5%] py-20">
        <div className="w-24 h-24 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mb-6 animate-pulse">
          <svg className="w-12 h-12 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
          Insights & Articles Coming Soon
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 max-w-lg mx-auto leading-relaxed">
          We&apos;re preparing high-quality content about software development, digital transformation, and industry trends. Stay tuned!
        </p>
      </div>
    );
  }

  return (
    <div className="section-container pt-32 pb-20">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4">Latest Insights</h1>
        <p className="text-neutral-600 dark:text-neutral-400">Discover stories, thinking, and expertise from our team.</p>
      </div>
      <div className="grid tablet-landscape:grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 min-h-[40vh]">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
