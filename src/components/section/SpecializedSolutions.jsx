"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useTranslations } from "next-intl";
import { HiOutlineOfficeBuilding, HiOutlineAcademicCap, HiOutlineCheckCircle } from "react-icons/hi";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function SpecializedSolutionsSection() {
    const containerRef = useRef(null);
    const t = useTranslations("specializedSolutions");

    const govServices = t.raw("govServices");
    const eduServices = t.raw("eduServices");

    useGSAP(
        () => {
            gsap.from(".solutions-heading", {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 85%",
                },
                y: 40,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
            });

            const solutionCards = gsap.utils.toArray(".solution-card");
            solutionCards.forEach((card, i) => {
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                    },
                    y: 60,
                    opacity: 0,
                    scale: 0.95,
                    duration: 0.8,
                    delay: i * 0.15,
                    ease: "power3.out",
                });
            });
        },
        { scope: containerRef }
    );

    return (
        <div
            className="section-padding bg-section-alt"
            id="solutions"
            ref={containerRef}
        >
            <div className="section-container">
                {/* Section Header */}
                <div className="solutions-heading text-center max-w-3xl mx-auto mb-16">
                    <p className="section-heading">{t("heading")}</p>
                    <h2 className="section-title">
                        {t("title")}
                    </h2>
                    <p className="section-subtitle mx-auto">
                        {t("subtitle")}
                    </p>
                </div>

                {/* Info Grid */}
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Government Solutions */}
                    <div className="solution-card group">
                        <div className="glass-card-hover p-8 md:p-10 h-full flex flex-col bg-white dark:bg-neutral-800 border-t-4 border-t-primary-500 rounded-2xl shadow-lg border-x border-b border-neutral-100 dark:border-neutral-700">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-14 h-14 rounded-full bg-primary-50 dark:bg-primary-900/40 flex items-center justify-center text-primary-500">
                                    <HiOutlineOfficeBuilding className="text-3xl" />
                                </div>
                                <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">
                                    {t("govDomain")}
                                </h3>
                            </div>
                            <ul className="space-y-6">
                                {govServices.map((service, idx) => (
                                    <li key={idx} className="flex gap-4 items-start">
                                        <HiOutlineCheckCircle className="text-2xl text-primary-400 mt-1 shrink-0" />
                                        <div>
                                            <h4 className="font-semibold text-lg text-neutral-800 dark:text-neutral-100 mb-1">{service.title}</h4>
                                            <p className="text-neutral-500 dark:text-neutral-400 text-sm">{service.desc}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Education Solutions */}
                    <div className="solution-card group">
                        <div className="glass-card-hover p-8 md:p-10 h-full flex flex-col bg-white dark:bg-neutral-800 border-t-4 border-t-blue-500 rounded-2xl shadow-lg border-x border-b border-neutral-100 dark:border-neutral-700">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-14 h-14 rounded-full bg-blue-50 dark:bg-blue-900/40 flex items-center justify-center text-blue-500">
                                    <HiOutlineAcademicCap className="text-3xl" />
                                </div>
                                <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">
                                    {t("eduDomain")}
                                </h3>
                            </div>
                            <ul className="space-y-6">
                                {eduServices.map((service, idx) => (
                                    <li key={idx} className="flex gap-4 items-start">
                                        <HiOutlineCheckCircle className="text-2xl text-blue-400 mt-1 shrink-0" />
                                        <div>
                                            <h4 className="font-semibold text-lg text-neutral-800 dark:text-neutral-100 mb-1">{service.title}</h4>
                                            <p className="text-neutral-500 dark:text-neutral-400 text-sm">{service.desc}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
