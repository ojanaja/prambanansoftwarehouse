import Navbar from "@/components/navigation/Navbar";
import AboutSection from "@/components/section/About";
import BlogTeaserSection from "@/components/section/BlogTeaser";
import ContactSection from "@/components/section/Contact";
import ContactBottom from "@/components/section/ContactBottom";
import FAQSection from "@/components/section/FAQ";
import Footer from "@/components/section/Footer";
import HeroSection from "@/components/section/Hero";
import OurProductSection from "@/components/section/OurProduct";
import OurProjectSection from "@/components/section/OurProject";
import ProcessSection from "@/components/section/Process";
import SpecializedSolutionsSection from "@/components/section/SpecializedSolutions";
import SecurityComplianceSection from "@/components/section/SecurityCompliance";
import StatsSection from "@/components/section/Stats";
import TechStackSection from "@/components/section/TechStack";
import TestimonialsSection from "@/components/section/Testimonials";
import WhyChooseUsSection from "@/components/section/WhyChooseUs";
import ServicesSection from "@/components/section/Services";
import { client } from "@/sanity/lib/client";
import { projectsQuery, servicesQuery, testimonialsQuery, productsQuery } from "@/sanity/lib/queries";

export const revalidate = 60; // Revalidate every 60 seconds

export async function generateMetadata({ params: { locale } }) {
  const isEn = locale === 'en';
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
  let sanityProjects = [];
  let sanityServices = [];
  let sanityTestimonials = [];
  let sanityProducts = [];

  try {
    const [fetchedProjects, fetchedServices, fetchedTestimonials, fetchedProducts] = await Promise.all([
      client.fetch(projectsQuery, {}, { next: { revalidate: 0 } }),
      client.fetch(servicesQuery, {}, { next: { revalidate: 0 } }),
      client.fetch(testimonialsQuery, {}, { next: { revalidate: 0 } }),
      client.fetch(productsQuery, {}, { next: { revalidate: 0 } })
    ]);

    if (fetchedProjects && fetchedProjects.length > 0) sanityProjects = fetchedProjects;
    if (fetchedServices && fetchedServices.length > 0) sanityServices = fetchedServices;
    if (fetchedTestimonials && fetchedTestimonials.length > 0) sanityTestimonials = fetchedTestimonials;
    if (fetchedProducts && fetchedProducts.length > 0) sanityProducts = fetchedProducts;
  } catch (error) {
    console.error("Failed to fetch sanity data:", error.message);
  }

  return (
    <main className="flex flex-col min-h-screen">
      <HeroSection />
      <StatsSection />
      <ServicesSection initialServices={sanityServices} />
      <SpecializedSolutionsSection />
      <SecurityComplianceSection />
      <TechStackSection />
      <WhyChooseUsSection />
      <ProcessSection />
      <OurProjectSection initialProjects={sanityProjects} />
      <TestimonialsSection initialTestimonials={sanityTestimonials} />
      <OurProductSection initialProducts={sanityProducts} />
      <AboutSection />
      <FAQSection />
      <BlogTeaserSection />
      <ContactSection />
    </main>
  );
}

