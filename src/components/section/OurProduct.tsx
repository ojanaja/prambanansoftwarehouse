"use client";

import React, { useRef, useState, useMemo, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useTranslations, useLocale } from "next-intl";
import { Product } from "@/lib/api";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface OurProductSectionProps {
  initialProducts?: Product[];
}

export default function OurProductSection({ initialProducts = [] }: OurProductSectionProps) {
  const t = useTranslations("ourProduct");
  const locale = useLocale();
  const containerRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const localizedProducts = useMemo(() => {
    return initialProducts.map((p) => ({
      id: p._id,
      name: locale === 'id' ? p.name_id : p.name_en,
      description: locale === 'id' ? p.description_id : p.description_en,
      imageURL: p.imageURL,
      imageURL2: p.imageURL2,
      imageURL3: p.imageURL3,
    }));
  }, [initialProducts, locale]);

  const activeProduct = localizedProducts[activeIndex] || {
    id: "",
    name: "",
    description: "",
    imageURL: "",
    imageURL2: "",
    imageURL3: "",
  };

  const handleProductChange = useCallback(
    (index: number) => {
      if (index === activeIndex) return;

      // Animate out current images
      gsap.to(".product-showcase-images", {
        opacity: 0,
        y: 20,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          setActiveIndex(index);
          // Animate in new images
          gsap.fromTo(
            ".product-showcase-images",
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
          );
        },
      });
    },
    [activeIndex]
  );

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });

      tl.fromTo(".product-section-heading",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      )
        .fromTo(".product-section-subtitle",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
          "-=0.4"
        )
        .fromTo(".product-tab-item",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power3.out" },
          "-=0.3"
        )
        .fromTo(".product-showcase-images",
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.3"
        );
    },
    { scope: containerRef }
  );

  if (localizedProducts.length === 0) return null;

  return (
    <section
      ref={containerRef}
      className="section-padding bg-section-alt"
      id="our-product"
    >
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="section-heading product-section-heading">
            {t("heading")}
          </p>
          <h2 className="section-title product-section-heading mt-3">
            {t("title")}
          </h2>
          <p className="section-subtitle product-section-subtitle mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* Product Tabs */}
        <div className="flex justify-center mb-10 md:mb-14">
          <div role="tablist" className="product-tabs-container inline-flex flex-wrap justify-center gap-2 md:gap-3 p-1.5 rounded-2xl bg-white/60 dark:bg-neutral-800/40 backdrop-blur-sm border border-neutral-200 dark:border-white/10">
            {localizedProducts.map((product, index) => (
              <button
                key={product.id}
                role="tab"
                aria-selected={activeIndex === index ? "true" : "false"}
                onClick={() => handleProductChange(index)}
                className={`product-tab-item px-4 py-2.5 md:px-6 md:py-3 rounded-xl text-sm md:text-base font-medium transition-all duration-300 whitespace-nowrap ${activeIndex === index
                  ? "bg-gradient-to-r from-primary-500 to-primary-400 text-white shadow-lg shadow-primary-500/25"
                  : "text-neutral-600 hover:text-neutral-900 dark:hover:text-neutral-200 hover:bg-white/80 dark:hover:bg-neutral-700/50"
                  }`}
              >
                {product.name}
              </button>
            ))}
          </div>
        </div>

        {/* Product Showcase */}
        <div ref={showcaseRef} className="product-showcase-images">
          <div className="relative">
            {/* Main showcase area */}
            <div className="glass-card p-4 md:p-8 lg:p-10 overflow-hidden">
              {/* Product name badge */}
              <div className="flex items-center justify-between mb-6 md:mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary-400 animate-pulse" />
                  <span className="text-sm font-semibold uppercase tracking-wider text-primary-500">
                    {activeProduct.name}
                  </span>
                </div>
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-400/60" />
                  <span className="w-3 h-3 rounded-full bg-yellow-400/60" />
                  <span className="w-3 h-3 rounded-full bg-green-400/60" />
                </div>
              </div>

              {/* Images grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                {/* Main featured image */}
                <div className="md:col-span-2 group">
                  <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 ring-1 ring-black/5 dark:ring-white/5">
                    {activeProduct.imageURL2 && (
                      <Image
                        src={activeProduct.imageURL2}
                        alt={`${activeProduct.name} - Main View`}
                        fill
                        sizes="(max-width: 768px) 100vw, 66vw"
                        className="object-contain transition-transform duration-700 group-hover:scale-[1.03]"
                        priority
                      />
                    )}
                  </div>
                </div>

                {/* Side images stack */}
                <div className="flex md:flex-col gap-4 md:gap-6">
                  <div className="relative flex-1 group">
                    <div className="relative aspect-[4/3] md:aspect-auto md:h-full rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 ring-1 ring-black/5 dark:ring-white/5">
                      {activeProduct.imageURL && (
                        <Image
                          src={activeProduct.imageURL}
                          alt={`${activeProduct.name} - Detail View`}
                          fill
                          sizes="(max-width: 768px) 50vw, 33vw"
                          className="object-contain transition-transform duration-700 group-hover:scale-[1.03]"
                        />
                      )}
                    </div>
                  </div>
                  <div className="relative flex-1 group">
                    <div className="relative aspect-[4/3] md:aspect-auto md:h-full rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 ring-1 ring-black/5 dark:ring-white/5">
                      {activeProduct.imageURL3 && (
                        <Image
                          src={activeProduct.imageURL3}
                          alt={`${activeProduct.name} - Feature View`}
                          fill
                          sizes="(max-width: 768px) 50vw, 33vw"
                          className="object-contain transition-transform duration-700 group-hover:scale-[1.03]"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Product description */}
              {activeProduct.description && (
                <p className="mt-6 md:mt-8 text-center text-neutral-500 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                  {activeProduct.description}
                </p>
              )}
            </div>

            {/* Decorative elements */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-gradient-to-br from-primary-400/10 to-primary-500/5 rounded-full blur-3xl" />
          </div>
        </div>

        {/* Product navigation dots */}
        <div className="flex justify-center gap-2 mt-8">
          {localizedProducts.map((_, index) => (
            <button
              key={index}
              onClick={() => handleProductChange(index)}
              aria-label={`View product ${index + 1}`}
              className={`transition-all duration-300 rounded-full ${activeIndex === index
                ? "w-8 h-2.5 bg-primary-400"
                : "w-2.5 h-2.5 bg-neutral-300 dark:bg-neutral-600 hover:bg-primary-300"
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
