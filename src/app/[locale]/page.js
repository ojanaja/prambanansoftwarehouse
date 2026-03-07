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
import ServicesSection from "@/components/section/Services";
import StatsSection from "@/components/section/Stats";
import TechStackSection from "@/components/section/TechStack";
import TestimonialsSection from "@/components/section/Testimonials";
import WhyChooseUsSection from "@/components/section/WhyChooseUs";

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
  return (
    <main className="flex flex-col min-h-screen">
      <div>
        <Navbar />
        <HeroSection />
        <StatsSection />
        <ServicesSection />
        <TechStackSection />
        <WhyChooseUsSection />
        <ProcessSection />
        <OurProjectSection />
        <TestimonialsSection />
        <OurProductSection />
        <AboutSection />
        <FAQSection />
        <BlogTeaserSection />
        <ContactSection />
      </div>
      <ContactBottom />
      <Footer />
    </main>
  );
}

