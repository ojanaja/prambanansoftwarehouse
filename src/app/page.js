"use client";
import Navbar from "@/components/navigation/Navbar";
import AboutSection from "@/components/section/About";
import ContactSection from "@/components/section/Contact";
import ContactBottom from "@/components/section/ContactBottom";
import Footer from "@/components/section/Footer";
import HeroSection from "@/components/section/Hero";
import OurProjectSection from "@/components/section/OurProject";
import ServicesSection from "@/components/section/Services";
import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function Home() {
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    const scrollStep = -window.scrollY / (500 / 15);
    const scrollInterval = setInterval(() => {
      if (window.scrollY !== 0) {
        window.scrollBy(0, scrollStep);
      } else {
        clearInterval(scrollInterval);
      }
    }, 20);
  };

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
        {/* <div className=" hidden absolute top-[4%] right-[5%] z-30 md:block">
          <Link href={"#contact"} className="bg-primary-400 py-2 px-4 rounded-lg text-white hover:bg-primary-600">
            Request Demo
          </Link>
        </div> */}
        <Navbar />
        <HeroSection />
        <ServicesSection />
        {/* <OurClient /> */}
        {/* <OurProductSection /> */}
        <OurProjectSection />
        <AboutSection />
        <ContactSection />
        {scrolling && (
          <button onClick={scrollToTop} className="fixed bottom-28 right-5 bg-transparent text-gray-500 p-4 border border-gray-400 rounded-full shadow-lg hover:bg-gray-300 transition text-xl z-50">
            <FaArrowUp />
          </button>
        )}
      </div>
      <ContactBottom />
      <Footer />
    </main>
  );
}
