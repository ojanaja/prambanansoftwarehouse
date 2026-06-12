import { getTranslations } from "next-intl/server";
import { getPortfolios } from "@/lib/api";
import ProjectCard from "@/components/card/ProjectCard";
import SectionHeader from "@/components/ui/SectionHeader";

export const revalidate = 60;

export async function generateMetadata({ params: { locale } }) {
    const t = await getTranslations({ locale, namespace: "projects" });
    return {
        title: `${t("heading")} | Prambanan Digital`,
        description: t("subtitle"),
        alternates: {
            canonical: `/${locale}/work`,
        },
    };
}

export default async function WorkPage({ params: { locale } }) {
    const portfolios = await getPortfolios();
    const t = await getTranslations({ locale, namespace: "projects" });

    // Formatting category dynamically or falling back to 'Web App'
    const formatCategory = (cat) => {
        if (!cat) return "Case Study";
        if (cat === "webapp") return "Web App";
        if (cat === "mobile") return "Mobile App";
        if (cat === "website") return "Website";
        return cat;
    };

    return (
        <main className="min-h-screen bg-white dark:bg-neutral-950 pt-32 pb-24">
            <div className="section-container">
                {/* Header Section */}
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-500 mb-3 block">
                        {t("heading")}
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-tight mb-6">
                        {t("title")}
                    </h1>
                    <p className="text-lg md:text-xl text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
                        {t("subtitle")}
                    </p>
                </div>

                {/* Grid layout of Case Studies */}
                {portfolios && portfolios.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {portfolios.map((project, index) => (
                            <div key={project.slug} className="flex h-full">
                                <ProjectCard
                                    slug={project.slug}
                                    company={project.title}
                                    name={locale === 'id' ? project.description_id : project.description_en}
                                    imageUrl={project.imageUrl}
                                    index={index}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-neutral-50 dark:bg-neutral-900/30 border border-neutral-100 dark:border-white/5 rounded-3xl">
                        <p className="text-lg text-neutral-500 dark:text-neutral-400">{t("noProjects")}</p>
                    </div>
                )}
            </div>
        </main>
    );
}
