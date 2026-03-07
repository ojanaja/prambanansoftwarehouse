"use client";
import { useRef, useMemo } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useTranslations } from "next-intl";
import { PRODUCTS } from "@/config/products";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css";

export default function OurProductSection() {
  const t = useTranslations("ourProduct");
  const containerRef = useRef(null);

  // Combine product metadata from config with names from translations
  const localizedProducts = useMemo(() => {
    const translationItems = t.raw("items");
    return PRODUCTS.map((configItem) => {
      const translated = translationItems.find((item) => item.id === configItem.id);
      return {
        ...configItem,
        name: translated?.name || configItem.id,
      };
    });
  }, [t]);

  useGSAP(() => {
    gsap.from(".product-title", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
      },
      y: -30,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });
    gsap.from(".product-swiper", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      },
      y: 50,
      opacity: 0,
      duration: 1,
      delay: 0.2,
      ease: "power3.out",
    });
  }, { scope: containerRef });

  return (
    <div className="px-[5%] md:px-[3%] pt-[7%]" ref={containerRef}>
      <h2 className="text-right text-2xl text-primary-600 font-medium product-title">
        {t("heading")}
      </h2>
      <div className="flex justify-center w-full pt-[3%] product-swiper">
        <div className="w-full rounded-lg backdrop-blur-2xl">
          <div className="py-[1%] px-[5%]">
            <Swiper
              effect={"coverflow"}
              grabCursor={true}
              slidesPerView={"auto"}
              centeredSlides={true}
              loop={true}
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              initialSlide={1}
              modules={[EffectCoverflow, Pagination]}
              className="mySwiper"
            >
              {localizedProducts.map((item) => (
                <SwiperSlide
                  key={item.id}
                  className="flex flex-col items-center"
                >
                  <div className="hidden md:block">
                    <div className="flex gap-2">
                      <div className="relative w-full h-[400px]">
                        <Image
                          src={item.imageURL}
                          alt={item.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="w-auto h-auto object-contain"
                        />
                      </div>
                      <div className="relative w-full h-[400px]">
                        <Image
                          src={item.imageURL2}
                          alt={item.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="w-auto h-auto object-contain"
                        />
                      </div>
                      <div className="relative w-full h-[400px]">
                        <Image
                          src={item.imageURL3}
                          alt={item.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="w-auto h-auto object-contain"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="md:hidden">
                    <div className="flex gap-2">
                      <div className="relative w-full h-[300px]">
                        <Image
                          src={item.imageURL}
                          alt={item.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="w-auto h-auto object-contain"
                        />
                      </div>
                      <div className="relative w-full h-[300px]">
                        <Image
                          src={item.imageURL2}
                          alt={item.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="w-auto h-auto object-contain"
                        />
                      </div>
                    </div>
                  </div>
                  <h3 className="md:text-3xl italic font-semibold text-center text-primary-900 mt-3">
                    {item.name}
                  </h3>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="py-[5%] md:hidden"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
