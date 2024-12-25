"use client";
import Navbar from "@/components/navigation/Navbar";
import AboutSection from "@/components/section/About";
import ContactSection from "@/components/section/Contact";
import ContactBottom from "@/components/section/ContactBottom";
import Footer from "@/components/section/Footer";
import HeroSection from "@/components/section/Hero";
import OurProjectSection from "@/components/section/OurProject";
import ServicesSection from "@/components/section/Services";

export default function Home() {
  // useEffect(() => {
  //   const lastScrollPosition = sessionStorage.getItem("scrollPosition");

  //   window.scrollTo(0, 0);

  //   const smoothScrollTo = (targetPosition, duration) => {
  //     const startPosition = window.scrollY;
  //     const distance = targetPosition - startPosition;
  //     let startTime = null;

  //     const animation = (currentTime) => {
  //       if (startTime === null) startTime = currentTime;
  //       const timeElapsed = currentTime - startTime;
  //       const run = ease(timeElapsed, startPosition, distance, duration);
  //       window.scrollTo(0, run);
  //       if (timeElapsed < duration) requestAnimationFrame(animation);
  //     };

  //     const ease = (t, b, c, d) => {
  //       t /= d / 2;
  //       if (t < 1) return (c / 2) * t * t + b;
  //       t--;
  //       return (-c / 2) * (t * (t - 2) - 1) + b;
  //     };

  //     requestAnimationFrame(animation);
  //   };

  //   if (lastScrollPosition) {
  //     setTimeout(() => {
  //       smoothScrollTo(parseInt(lastScrollPosition, 10), 1000);
  //     }, 100);
  //   }

  //   const handleBeforeUnload = () => {
  //     sessionStorage.setItem("scrollPosition", window.scrollY);
  //   };

  //   window.addEventListener("beforeunload", handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, []);

  return (
    <main className="flex flex-col min-h-screen">
      <div>
        <Navbar />
        <HeroSection />
        <ServicesSection />
        {/* <OurClient /> */}
        {/* <OurProductSection /> */}
        <OurProjectSection />
        <AboutSection />
        <ContactSection />
      </div>
      <ContactBottom />
      <Footer />
    </main>
  );
}
