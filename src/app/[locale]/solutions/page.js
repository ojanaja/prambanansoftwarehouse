import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { HiOutlineOfficeBuilding, HiOutlineAcademicCap, HiOutlineLightningBolt, HiArrowRight } from "react-icons/hi";

export async function generateMetadata({ params: { locale } }) {
    const t = await getTranslations({ locale, namespace: "solutions" });
    return {
        title: `${t("title")} | Prambanan Digital`,
        description: t("subtitle"),
        alternates: {
            canonical: `/${locale}/solutions`,
        },
    };
}

export default async function SolutionsOverviewPage({ params: { locale } }) {
    const t = await getTranslations({ locale, namespace: "solutions" });

    const sectors = [
        {
            id: "government",
            title: t("govTitle"),
            description: t("govDesc"),
            path: `/${locale}/solutions/government`,
            icon: HiOutlineOfficeBuilding,
            colorClass: "from-orange-500 to-amber-500",
            bgGlass: "bg-orange-500/5 hover:bg-orange-500/10 border-orange-500/20",
            iconColor: "text-orange-500 bg-orange-50 dark:bg-orange-950/30",
        },
        {
            id: "education",
            title: t("eduTitle"),
            description: t("eduDesc"),
            path: `/${locale}/solutions/education`,
            icon: HiOutlineAcademicCap,
            colorClass: "from-blue-500 to-indigo-500",
            bgGlass: "bg-blue-500/5 hover:bg-blue-500/10 border-blue-500/20",
            iconColor: "text-blue-500 bg-blue-50 dark:bg-blue-950/30",
        },
        {
            id: "business",
            title: t("bizTitle"),
            description: t("bizDesc"),
            path: `/${locale}/solutions/business`,
            icon: HiOutlineLightningBolt,
            colorClass: "from-emerald-500 to-teal-500",
            bgGlass: "bg-emerald-500/5 hover:bg-emerald-500/10 border-emerald-500/20",
            iconColor: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30",
        },
    ];

    return (
        <main className="min-h-screen bg-white dark:bg-neutral-950 pt-32 pb-24">
            <div className="section-container">
                {/* Header */}
                <div className="max-w-3xl mx-auto text-center mb-20">
                    <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-500 mb-3 block">
                        {t("heading")}
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-tight mb-6">
                        {t("title")}
                    </h1>
                    <p className="text-lg md:text-xl text-neutral-500 dark:text-neutral-400 leading-relaxed">
                        {t("subtitle")}
                    </p>
                </div>

                {/* Sectors Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    {sectors.map((sector) => {
                        const Icon = sector.icon;
                        return (
                            <div key={sector.id} className="group relative rounded-3xl overflow-hidden flex flex-col h-full">
                                {/* Gradient hover outline accent */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${sector.colorClass} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`} style={{ padding: "1px" }}>
                                    <div className="w-full h-full bg-white dark:bg-neutral-950 rounded-[23px]" />
                                </div>

                                <div className={`flex-1 flex flex-col justify-between p-8 md:p-10 rounded-3xl border border-neutral-200/60 dark:border-white/5 bg-white dark:bg-neutral-900/40 backdrop-blur-sm shadow-sm transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl dark:group-hover:shadow-black/40`}>
                                    <div>
                                        {/* Icon */}
                                        <div className={`w-14 h-14 rounded-2xl ${sector.iconColor} flex items-center justify-center mb-8`}>
                                            <Icon className="text-3xl" />
                                        </div>

                                        {/* Content */}
                                        <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
                                            {sector.title}
                                        </h3>
                                        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
                                            {sector.description}
                                        </p>
                                    </div>

                                    {/* Action button */}
                                    <Link href={sector.path} className={`inline-flex items-center gap-2 font-semibold text-neutral-900 dark:text-white group-hover:text-primary-500 transition-colors duration-300 w-fit focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-lg p-1`}>
                                        <span>{t("explore")}</span>
                                        <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}
