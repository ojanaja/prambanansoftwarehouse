import React from "react";
import ContactSection from "@/components/section/Contact";
import HeroSection from "@/components/section/Hero";
import OurProjectSection from "@/components/section/OurProject";
import ProcessSection from "@/components/section/Process";
import SpecializedSolutionsSection from "@/components/section/SpecializedSolutions";
import SecurityComplianceSection from "@/components/section/SecurityCompliance";
import StatsSection from "@/components/section/Stats";
import TestimonialsSection from "@/components/section/Testimonials";
import { getServices, getShowcaseProducts, getPortfolios, getTestimonials } from "@/lib/api";
import { Metadata } from "next";

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
      Promise.resolve(getServices()),
      getTestimonials(),
      Promise.resolve(getShowcaseProducts())
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
