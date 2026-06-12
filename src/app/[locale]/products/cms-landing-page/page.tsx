import React from "react";
import { getTranslations } from "next-intl/server";
import { HiOutlineTranslate, HiOutlineLightningBolt, HiOutlineSearch, HiOutlineDocumentText, HiArrowRight } from "react-icons/hi";
import Image from "next/image";
import Link from "next/link";
import ContactSection from "@/components/section/Contact";
import { Metadata } from "next";
import { IconType } from "react-icons";

interface PageParams {
  params: {
    locale: string;
  };
}

interface FeatureItem {
  title: string;
  desc: string;
  icon: IconType;
}

export async function generateMetadata({ params: { locale } }: PageParams): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "productsPage" });
  return {
    title: `${t("cmsTitle")} | Prambanan Digital`,
    description: t("cmsDesc"),
    alternates: {
      canonical: `/${locale}/products/cms-landing-page`,
    },
  };
}

export default async function CmsLandingPage({ params: { locale } }: PageParams) {
  const t = await getTranslations({ locale, namespace: "productsPage" });

  const keyFeatures: FeatureItem[] = [
    {
      title: locale === 'id' ? "Dukungan Multi-Bahasa Bawaan" : "Built-in Multi-language",
      desc: locale === 'id' 
        ? "Kelola konten dalam bahasa Indonesia, Inggris, dan lainnya tanpa plugin tambahan."
        : "Manage content in Indonesian, English, and more with zero external plugins.",
      icon: HiOutlineTranslate,
    },
    {
      title: locale === 'id' ? "Optimasi Laju Muat Kilat" : "Lightning Fast Load Speed",
      desc: locale === 'id'
        ? "Dihasilkan secara statis menggunakan Next.js untuk waktu pemuatan instan."
        : "Statically generated utilizing Next.js ensuring sub-second rendering times.",
      icon: HiOutlineLightningBolt,
    },
    {
      title: locale === 'id' ? "SEO Siap Pakai" : "SEO Ready out-of-the-box",
      desc: locale === 'id'
        ? "Struktur HTML5 semantik, tag kanonik otomatis, sitemap, dan meta tag dinamis."
        : "Semantic HTML5, automated canonical URLs, sitemaps, and dynamic meta tags.",
      icon: HiOutlineSearch,
    },
    {
      title: locale === 'id' ? "Manajemen Editor Visual" : "Visual Editor Management",
      desc: locale === 'id'
        ? "Editor yang ramah pengguna untuk memperbarui teks, galeri, dan postingan blog dengan cepat."
        : "Clean user interface for updates of text blocks, gallery photos, and articles.",
      icon: HiOutlineDocumentText,
    },
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-neutral-900 pt-32 pb-24 md:pt-40 md:pb-36 text-white border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-500/20 via-neutral-950 to-neutral-950 -z-10" />
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-sm font-bold uppercase tracking-[0.2em] text-primary-500 mb-4">
                Premium SaaS Platform
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
                {t("cmsTitle")}
              </h1>
              <p className="text-lg md:text-xl text-neutral-300 leading-relaxed mb-8">
                {t("cmsDesc")}
              </p>
              <Link href={`/${locale}#contact`} className="btn-primary inline-flex items-center gap-2">
                <span>Get Access / Request Demo</span>
                <HiArrowRight />
              </Link>
            </div>
            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-neutral-800">
              <Image 
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80" 
                alt="SaaS Dashboard Interface Mockup"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Core Features Grid */}
      <div className="section-padding bg-neutral-50 dark:bg-neutral-900/30">
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900 dark:text-white mb-4">
              {locale === 'id' ? "Mengapa Memilih Platform Kami?" : "Why Deploy Our CMS?"}
            </h2>
            <p className="text-lg text-neutral-500 dark:text-neutral-400">
              {locale === 'id' 
                ? "Meningkatkan kehadiran online bisnis Anda dengan performa kelas atas." 
                : "Supercharge your online marketing with high performance landing configurations."}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {keyFeatures.map((feat, idx) => {
              const IconComponent = feat.icon;
              return (
                <div key={idx} className="bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-white/5 rounded-3xl p-8 shadow-sm flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-primary-500/5 dark:bg-primary-500/10 border border-primary-500/20 flex items-center justify-center text-primary-500 mb-6">
                      <IconComponent className="text-2xl" />
                    </div>
                    <h3 className="font-bold text-lg text-neutral-900 dark:text-white mb-3">{feat.title}</h3>
                    <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed text-sm">{feat.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <ContactSection />
    </main>
  );
}
