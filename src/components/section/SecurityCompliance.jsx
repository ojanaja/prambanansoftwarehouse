"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useTranslations } from "next-intl";
import { HiOutlineShieldCheck, HiOutlineLockClosed, HiOutlineDocumentSearch } from "react-icons/hi";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function SecurityComplianceSection() {
    const containerRef = useRef(null);
    const t = useTranslations("securityCompliance");
    const features = t.raw("features");

    const icons = [HiOutlineLockClosed, HiOutlineShieldCheck, HiOutlineDocumentSearch];

    useGSAP(
        () => {
            gsap.from(".security-heading", {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 85%",
                },
                y: 40,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
            });

            const securityCards = gsap.utils.toArray(".security-card");
            securityCards.forEach((card, i) => {
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
            className="section-padding bg-background relative overflow-hidden"
            id="security"
            ref={containerRef}
        >
            {/* Decorative Grid Background */}
            <div className="absolute inset-0 bg-[url('/hero/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20 pointer-events-none" />

            <div className="section-container relative z-10">
                {/* Section Header */}
                <div className="security-heading text-center max-w-3xl mx-auto mb-16">
                    <p className="section-heading flex justify-center items-center gap-2">
                        <HiOutlineShieldCheck className="text-xl" />
                        {t("heading")}
                    </p>
                    <h2 className="section-title">
                        {t("title")}
                    </h2>
                    <p className="section-subtitle mx-auto">
                        {t("subtitle")}
                    </p>
                </div>

                {/* Info Grid */}
                <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
                    {features.map((feature, idx) => {
                        const IconComponent = icons[idx];
                        return (
                            <div key={idx} className="security-card group">
                                <div className="glass-card-hover bg-white dark:bg-neutral-800 p-8 h-full flex flex-col border border-neutral-200 dark:border-neutral-700">
                                    <div className="w-14 h-14 rounded-2xl bg-primary-50 dark:bg-primary-900/40 flex items-center justify-center mb-6 text-primary-500 group-hover:scale-110 group-hover:bg-primary-500 group-hover:text-white transition-all duration-500 shadow-sm shadow-primary-500/10">
                                        <IconComponent className="text-3xl" />
                                    </div>
                                    <h3 className="text-lg font-bold mb-3 text-neutral-900 dark:text-white">
                                        {feature.title}
                                    </h3>
                                    <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed text-sm flex-grow">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
