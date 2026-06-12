"use client";
import { useRef, useState } from "react";
import { HiChevronDown } from "react-icons/hi";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useTranslations } from "next-intl";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function AccordionItem({ question, answer, isOpen, onToggle }) {
  const contentRef = useRef(null);

  return (
    <div className="glass-card overflow-hidden transition-all duration-300">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 lg:p-6 text-left group"
      >
        <span className="font-semibold text-sm lg:text-base pr-4 group-hover:text-primary-500 transition-colors duration-300">
          {question}
        </span>
        <HiChevronDown
          className={`text-xl text-primary-500 flex-shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: isOpen ? contentRef.current?.scrollHeight + "px" : "0px",
        }}
      >
        <div className="px-5 lg:px-6 pb-5 lg:pb-6">
          <p className="text-neutral-500 text-sm leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQSection() {
  const containerRef = useRef(null);
  const t = useTranslations("faq");
  const items = t.raw("items");
  const [openIndex, setOpenIndex] = useState(0);

  useGSAP(
    () => {
      gsap.from(".faq-heading", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      const faqItems = gsap.utils.toArray(".faq-item");
      faqItems.forEach((item, i) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
          },
          y: 30,
          opacity: 0,
          duration: 0.6,
          delay: i * 0.1,
          ease: "power3.out",
        });
      });
    },
    { scope: containerRef }
  );

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <div className="section-padding bg-section-alt" ref={containerRef}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="section-container">
        <div className="max-w-3xl mx-auto">
          {/* Section Header */}
          <div className="faq-heading text-center mb-12">
            <p className="section-heading">{t("heading")}</p>
            <h2 className="section-title">{t("title")}</h2>
            <p className="section-subtitle mx-auto">{t("subtitle")}</p>
          </div>

          {/* Accordion */}
          <div className="space-y-3">
            {items.map((item, index) => (
              <div key={item.id} className="faq-item">
                <AccordionItem
                  question={item.question}
                  answer={item.answer}
                  isOpen={openIndex === index}
                  onToggle={() =>
                    setOpenIndex(openIndex === index ? -1 : index)
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
