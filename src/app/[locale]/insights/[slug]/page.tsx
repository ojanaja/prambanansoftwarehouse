import React from "react";
import { getArticleBySlug } from "@/lib/api";
import SlugCard from "@/components/card/SlugCard";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface PageParams {
  params: {
    locale: string;
    slug: string;
  };
}

export async function generateMetadata({ params: { locale, slug } }: PageParams): Promise<Metadata> {
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

export default async function BlogPost({ params: { locale, slug } }: PageParams) {
  const post = await getArticleBySlug(slug);
  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "@id": `https://prambanandigital.web.id/${locale}/insights/${slug}`,
    "headline": post.title,
    "image": [
      post.imageUrl || "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80"
    ],
    "datePublished": post.publishedAt || new Date().toISOString(),
    "dateModified": post.publishedAt || new Date().toISOString(),
    "author": [{
      "@type": "Person",
      "name": post.author?.name || "Prambanan Editorial",
      "url": "https://prambanandigital.web.id"
    }]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": locale === 'id' ? "Beranda" : "Home",
        "item": `https://prambanandigital.web.id/${locale}`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": locale === 'id' ? "Wawasan" : "Insights",
        "item": `https://prambanandigital.web.id/${locale}/insights`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": `https://prambanandigital.web.id/${locale}/insights/${slug}`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <SlugCard slug={slug} />
    </>
  );
}
