import { getArticleBySlug } from "@/lib/api";
import SlugCard from "@/components/card/SlugCard";
import { notFound } from "next/navigation";

export async function generateMetadata({ params: { locale, slug } }) {
  const post = await getArticleBySlug(slug);
  if (!post) return { title: "Article Not Found" };

  return {
    title: `${post.title} | Prambanan Digital`,
    description: post.description || `Read about ${post.title} on Prambanan Digital Insights.`,
    alternates: {
      canonical: `/${locale}/insights/${slug}`,
    },
  };
}

export default async function BlogPost({ params: { slug } }) {
  const post = await getArticleBySlug(slug);
  if (!post) notFound();

  return <SlugCard slug={slug} />;
}
