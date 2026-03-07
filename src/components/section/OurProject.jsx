"use client";
import { useRef, useState, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import ProjectCard from "../card/ProjectCard";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useTranslations } from "next-intl";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function OurProjectSection() {
  const containerRef = useRef(null);
  const t = useTranslations("projects");

  const projectsItems = t.raw("items");
  const categories = t.raw("categories");
  const [activeCategory, setActiveCategory] = useState("all");

  const projectImages = {
    ivolks: "/projects/ivolks.webp",
    bplj: "/projects/bplj.webp",
    onifarms: "/projects/onifarms.webp",
    pertamina: "/projects/pertamina.webp",
    stylish: "/projects/stylish.webp",
    edutrain: "/projects/edutrain.webp",
  };

  const projects = projectsItems.map((item) => ({
    ...item,
    imageUrl: projectImages[item.id],
  }));

  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [activeCategory, projects]);

  useGSAP(
    () => {
      gsap.from(".projects-heading", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    },
    { scope: containerRef }
  );

  return (
    <div className="section-padding" ref={containerRef}>
      <div className="section-container">
        {/* Section Header */}
        <div className="projects-heading text-center max-w-2xl mx-auto mb-8">
          <p className="section-heading">{t("heading")}</p>
          <h2 className="section-title">{t("title")}</h2>
          <p className="section-subtitle mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat.id
                  ? "bg-gradient-to-r from-primary-500 to-primary-400 text-white shadow-lg shadow-primary-400/30"
                  : "bg-white/70 dark:bg-neutral-800/50 border border-neutral-200/60 dark:border-white/10 text-neutral-600 dark:text-neutral-400 hover:border-primary-400/50 hover:text-primary-500"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Slider */}
        <div className="py-2 px-1">
          {filteredProjects.length > 0 ? (
            <Swiper
              key={activeCategory}
              modules={[Pagination, Navigation, Autoplay]}
              loop={filteredProjects.length > 3}
              spaceBetween={24}
              slidesPerView={1}
              centeredSlides={false}
              navigation={true}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              breakpoints={{
                640: { slidesPerView: Math.min(1.5, filteredProjects.length) },
                768: { slidesPerView: Math.min(2, filteredProjects.length) },
                1024: { slidesPerView: Math.min(3, filteredProjects.length) },
              }}
              className="w-full h-full py-6 !pb-12"
            >
              {filteredProjects.map((project, index) => (
                <SwiperSlide key={project.id} className="h-auto !flex">
                  <ProjectCard
                    company={project.company}
                    name={project.name}
                    imageUrl={project.imageUrl}
                    index={index}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <p className="text-center text-neutral-500 py-12">{t("noProjects")}</p>
          )}
        </div>
      </div>
    </div>
  );
}

