import React from "react";
import { getTranslations } from "next-intl/server";
import { HiOutlineCheckCircle, HiArrowRight } from "react-icons/hi";
import Link from "next/link";
import StatsSection from "@/components/section/Stats";
import ContactSection from "@/components/section/Contact";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";

interface PageParams {
  params: {
    locale: string;
  };
}

interface SolutionFeature {
  title: string;
  desc: string;
}

export async function generateMetadata({ params: { locale } }: PageParams): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "solutions" });
  return {
    title: `${t("bizPage.title")} | Prambanan Digital`,
    description: t("bizPage.subtitle"),
    alternates: {
      canonical: `/${locale}/solutions/business`,
    },
  };
}

export default async function BusinessSolutionsPage({ params: { locale } }: PageParams) {
  const t = await getTranslations({ locale, namespace: "solutions" });

  // Features list
  const features = t.raw("bizPage.features") as SolutionFeature[];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": locale === 'id' ? "Beranda" : "Home",
        "item": `${siteConfig.url}/${locale}`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": locale === 'id' ? "Solusi" : "Solutions",
        "item": `${siteConfig.url}/${locale}/solutions`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": t("bizTitle"),
        "item": `${siteConfig.url}/${locale}/solutions/business`
      }
    ]
  };

  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-neutral-900 pt-32 pb-24 md:pt-40 md:pb-36 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/20 via-neutral-950 to-neutral-950 -z-10" />
        <div className="section-container">
          <div className="max-w-3xl">
            <span className="inline-block text-sm font-bold uppercase tracking-[0.2em] text-emerald-500 mb-4">
              {t("bizTitle")}
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
              {t("bizPage.title")}
            </h1>
            <p className="text-lg md:text-xl text-neutral-300 leading-relaxed mb-8">
              {t("bizPage.subtitle")}
            </p>
            <Link href={`/${locale}#contact`} className="btn-primary inline-flex items-center gap-2 !bg-emerald-500 hover:!bg-emerald-600 focus-visible:ring-emerald-500">
              <span>Strategic Consultation</span>
              <HiArrowRight />
            </Link>
          </div>
        </div>
      </div>

      {/* Core Solutions Grid */}
      <div className="section-padding bg-neutral-50 dark:bg-neutral-900/30">
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
              {t("bizPage.featureTitle")}
            </h2>
            <p className="text-lg text-neutral-500 dark:text-neutral-400">
              {t("bizPage.featureSubtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feat, idx) => (
              <div key={idx} className="bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-white/5 rounded-3xl p-8 shadow-sm flex flex-col justify-between">
                <div className="flex gap-4 items-start mb-6">
                  <HiOutlineCheckCircle className="text-3xl text-emerald-500 shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-xl text-neutral-900 dark:text-white mb-3">{feat.title}</h3>
                    <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed text-sm">{feat.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <StatsSection />

      {/* Consultation Form */}
      <ContactSection />
    </main>
  );
}
