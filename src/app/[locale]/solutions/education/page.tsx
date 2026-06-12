import React from "react";
import EducationHero from "@/components/section/EducationHero";
import ContactSection from "@/components/section/Contact";
import StatsSection from "@/components/section/Stats";
import SecurityComplianceSection from "@/components/section/SecurityCompliance";
import FAQSection from "@/components/section/FAQ";
import { Metadata } from "next";

interface PageParams {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params: { locale } }: PageParams): Promise<Metadata> {
  return {
    title: "Sistem Pendidikan & SIAKAD | Prambanan Digital",
    description: "Partner Digitalisasi Sekolah Menuju Standar Global. Kami membangun sistem SIAKAD, LMS, dan manajemen yayasan.",
    alternates: {
      canonical: `/${locale}/solutions/education`,
    },
  };
}

export default async function EducationPage({ params: { locale } }: PageParams) {
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
        "name": locale === 'id' ? "Solusi" : "Solutions",
        "item": `https://prambanandigital.web.id/${locale}/solutions`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": locale === 'id' ? "Pendidikan & SIAKAD" : "Education & SIAKAD",
        "item": `https://prambanandigital.web.id/${locale}/solutions/education`
      }
    ]
  };

  return (
    <main className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <EducationHero />
      <StatsSection />
      <SecurityComplianceSection />
      {/* We can reuse the ContactSection but since it's a generic one with the new dropdown, it perfectly fits here */}
      <ContactSection />
      <FAQSection />
    </main>
  );
}
