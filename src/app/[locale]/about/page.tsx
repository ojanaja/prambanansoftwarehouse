import React from "react";
import { getTranslations } from "next-intl/server";
import { HiOutlineEye, HiOutlineLightningBolt, HiOutlineBadgeCheck } from "react-icons/hi";
import StatsSection from "@/components/section/Stats";
import ContactSection from "@/components/section/Contact";
import { Metadata } from "next";

interface PageParams {
  params: {
    locale: string;
  };
}

interface WhyChooseUsItem {
  id: string | number;
  title: string;
  description: string;
}

export async function generateMetadata({ params: { locale } }: PageParams): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    title: `${t("heading")} | Prambanan Digital`,
    description: t("description"),
    alternates: {
      canonical: `/${locale}/about`,
    },
  };
}

export default async function AboutPage({ params: { locale } }: PageParams) {
  const t = await getTranslations({ locale, namespace: "about" });
  const tWhy = await getTranslations({ locale, namespace: "whyChooseUs" });
  const whyItems = tWhy.raw("items") as WhyChooseUsItem[];

  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950">
      {/* Hero */}
      <div className="relative overflow-hidden bg-neutral-900 pt-32 pb-24 md:pt-40 md:pb-36 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-500/20 via-neutral-950 to-neutral-950 -z-10" />
        <div className="section-container">
          <div className="max-w-3xl">
            <span className="inline-block text-sm font-bold uppercase tracking-[0.2em] text-primary-500 mb-4">
              {t("heading")}
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
              Who We Are
            </h1>
            <p className="text-lg md:text-xl text-neutral-300 leading-relaxed mb-8">
              {t("description")}
            </p>
          </div>
        </div>
      </div>

      {/* Stats section */}
      <StatsSection />

      {/* Mission & Vision */}
      <div className="section-padding bg-neutral-50 dark:bg-neutral-900/30">
        <div className="section-container">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="bg-white dark:bg-neutral-900 p-8 md:p-12 rounded-3xl border border-neutral-200/60 dark:border-white/5 shadow-sm flex flex-col items-start">
              <div className="w-14 h-14 rounded-2xl bg-primary-500/5 dark:bg-primary-500/10 border border-primary-500/20 flex items-center justify-center text-primary-500 mb-8">
                <HiOutlineLightningBolt className="text-3xl" />
              </div>
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
                {t("missionTitle")}
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {t("missionDescription")}
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white dark:bg-neutral-900 p-8 md:p-12 rounded-3xl border border-neutral-200/60 dark:border-white/5 shadow-sm flex flex-col items-start">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/5 dark:bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 mb-8">
                <HiOutlineEye className="text-3xl" />
              </div>
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
                {t("visionTitle")}
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {t("visionDescription")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Values / Why Choose Us */}
      <div className="section-padding bg-white dark:bg-neutral-950">
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-500 mb-3 block">
              {tWhy("heading")}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900 dark:text-white mb-4">
              Our Core Standards
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyItems.map((item) => (
              <div key={item.id} className="bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-100 dark:border-white/5 rounded-3xl p-8 shadow-sm flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300">
                <div className="flex gap-4 items-start mb-6">
                  <HiOutlineBadgeCheck className="text-3xl text-primary-500 shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg text-neutral-900 dark:text-white mb-3">{item.title}</h3>
                    <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed text-sm">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <ContactSection />
    </main>
  );
}
