import { getTranslations } from "next-intl/server";
import { HiOutlineCode, HiOutlineCog, HiOutlineUsers, HiOutlineCheck } from "react-icons/hi";
import ContactSection from "@/components/section/Contact";

export async function generateMetadata({ params: { locale } }) {
    const t = await getTranslations({ locale, namespace: "servicesPage" });
    return {
        title: `${t("title")} | Prambanan Digital`,
        description: t("subtitle"),
        alternates: {
            canonical: `/${locale}/services`,
        },
    };
}

export default async function ServicesPage({ params: { locale } }) {
    const t = await getTranslations({ locale, namespace: "servicesPage" });

    const servicesList = [
        {
            id: "custom",
            title: t("customTitle"),
            description: t("customDesc"),
            icon: HiOutlineCode,
            badge: "Full-Stack Development",
        },
        {
            id: "optimize",
            title: t("optimizeTitle"),
            description: t("optimizeDesc"),
            icon: HiOutlineCog,
            badge: "Modernization & Performance",
        },
        {
            id: "daas",
            title: t("daasTitle"),
            description: t("daasDesc"),
            icon: HiOutlineUsers,
            badge: "On-Demand Developers",
        },
    ];

    const engineeringStandards = t.raw("features");

    return (
        <main className="min-h-screen bg-white dark:bg-neutral-950">
            {/* Hero */}
            <div className="relative overflow-hidden bg-neutral-900 pt-32 pb-24 md:pt-40 md:pb-36 text-white">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-500/20 via-neutral-950 to-neutral-950 -z-10" />
                <div className="section-container">
                    <div className="max-w-3xl">
                        <span className="inline-block text-sm font-bold uppercase tracking-[0.2em] text-primary-500 mb-4">
                            Our Capabilities
                        </span>
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
                            {t("title")}
                        </h1>
                        <p className="text-lg md:text-xl text-neutral-300 leading-relaxed mb-8">
                            {t("subtitle")}
                        </p>
                    </div>
                </div>
            </div>

            {/* Detailed Services list */}
            <div className="section-padding bg-neutral-50 dark:bg-neutral-900/30">
                <div className="section-container space-y-16">
                    {servicesList.map((service, index) => {
                        const IconComponent = service.icon;
                        const isEven = index % 2 === 0;

                        return (
                            <div 
                                key={service.id} 
                                className={`flex flex-col lg:flex-row items-center gap-12 p-8 md:p-12 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-white/5 shadow-sm transition-all duration-500 hover:shadow-xl`}
                            >
                                <div className={`w-full lg:w-1/2 ${!isEven ? "lg:order-last" : ""}`}>
                                    <span className="inline-block px-3 py-1 bg-primary-50 dark:bg-primary-950/30 text-primary-600 dark:text-primary-400 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                                        {service.badge}
                                    </span>
                                    <h2 className="text-2xl md:text-3xl font-extrabold text-neutral-900 dark:text-white mb-6">
                                        {service.title}
                                    </h2>
                                    <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                                        {service.description}
                                    </p>
                                </div>

                                <div className="w-full lg:w-1/2 flex justify-center">
                                    <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-3xl bg-primary-500/5 dark:bg-primary-500/10 border border-primary-500/20 flex items-center justify-center text-primary-500">
                                        <IconComponent className="text-5xl md:text-6xl" />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Standards Section */}
            <div className="section-padding bg-white dark:bg-neutral-950 border-t border-neutral-100 dark:border-white/5">
                <div className="section-container">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900 dark:text-white mb-4">
                            {t("featuresTitle")}
                        </h2>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {engineeringStandards.map((std, idx) => (
                            <div key={idx} className="flex gap-4 items-start p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-100 dark:border-white/5 shadow-sm">
                                <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-950/50 flex items-center justify-center text-primary-600 dark:text-primary-400 shrink-0">
                                    <HiOutlineCheck className="text-lg font-bold" />
                                </div>
                                <p className="font-semibold text-neutral-800 dark:text-neutral-200">{std}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Contact CTA */}
            <ContactSection />
        </main>
    );
}
