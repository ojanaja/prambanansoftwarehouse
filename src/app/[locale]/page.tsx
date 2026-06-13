import React from "react";
import dynamic from "next/dynamic";
import HeroSection from "@/components/section/Hero";
import StatsSection from "@/components/section/Stats";
import { getServices, getShowcaseProducts, getPortfolios, getTestimonials } from "@/lib/api";
import { Metadata } from "next";

const SpecializedSolutionsSection = dynamic(
  () => import("@/components/section/SpecializedSolutions"),
  { ssr: true }
);

const SecurityComplianceSection = dynamic(
  () => import("@/components/section/SecurityCompliance"),
  { ssr: true }
);

const ProcessSection = dynamic(
  () => import("@/components/section/Process"),
  { ssr: true }
);

const OurProjectSection = dynamic(
  () => import("@/components/section/OurProject"),
  { ssr: false }
);

const TestimonialsSection = dynamic(
  () => import("@/components/section/Testimonials"),
  { ssr: true }
);

const ContactSection = dynamic(
  () => import("@/components/section/Contact"),
  { ssr: false }
);

export const revalidate = 60; // Revalidate every 60 seconds

interface PageParams {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params: { locale } }: PageParams): Promise<Metadata> {
  return {
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: '/en',
        id: '/id',
        'x-default': '/id',
      },
    },
  };
}

export default async function Home() {
  let sanityProjects: any[] = [];
  let sanityServices: any[] = [];
  let sanityTestimonials: any[] = [];
  let sanityProducts: any[] = [];

  try {
    const [fetchedProjects, fetchedServices, fetchedTestimonials, fetchedProducts] = await Promise.all([
      getPortfolios(),
      getServices(),
      getTestimonials(),
      getShowcaseProducts()
    ]);

    if (fetchedProjects && fetchedProjects.length > 0) sanityProjects = fetchedProjects;
    if (fetchedServices && fetchedServices.length > 0) sanityServices = fetchedServices;
    if (fetchedTestimonials && fetchedTestimonials.length > 0) sanityTestimonials = fetchedTestimonials;
    if (fetchedProducts && fetchedProducts.length > 0) sanityProducts = fetchedProducts;
  } catch (error: any) {
    console.error("Failed to fetch marketing data:", error.message);
  }

  return (
    <main className="flex flex-col min-h-screen">
      {/* 1. Hero with literal promise */}
      <HeroSection />
      
      {/* 2. Stats Section (Verified proof / Client count) */}
      <StatsSection />
      
      {/* 3. Three Offer Paths (Government solutions, Education, Custom Engineering) */}
      <SpecializedSolutionsSection />
      
      {/* 4. Security, compliance, and engineering standards */}
      <SecurityComplianceSection />
      
      {/* 5. Delivery Process */}
      <ProcessSection />
      
      {/* 6. Case Studies / Projects (Render only if CMS data exists) */}
      {sanityProjects && sanityProjects.length > 0 && (
        <OurProjectSection initialProjects={sanityProjects} />
      )}
      
      {/* 7. Testimonials (Render only if customer proof exists) */}
      {sanityTestimonials && sanityTestimonials.length > 0 && (
        <TestimonialsSection initialTestimonials={sanityTestimonials} />
      )}
      
      {/* 8. Focused lead capture / Consultation CTA */}
      <ContactSection />
    </main>
  );
}
