import { getTranslations } from "next-intl/server";
import { getShowcaseProducts } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineSparkles, HiArrowRight } from "react-icons/hi";

export async function generateMetadata({ params: { locale } }) {
    const t = await getTranslations({ locale, namespace: "productsPage" });
    return {
        title: `${t("title")} | Prambanan Digital`,
        description: t("subtitle"),
        alternates: {
            canonical: `/${locale}/products`,
        },
    };
}

export default async function ProductsPage({ params: { locale } }) {
    const t = await getTranslations({ locale, namespace: "productsPage" });
    const tHead = await getTranslations({ locale, namespace: "ourProduct" });
    
    // Fetch products
    const dynamicProducts = getShowcaseProducts();

    return (
        <main className="min-h-screen bg-white dark:bg-neutral-950 pt-32 pb-24">
            <div className="section-container">
                {/* Header */}
                <div className="max-w-3xl mx-auto text-center mb-20">
                    <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-500 mb-3 block">
                        {tHead("heading")}
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-tight mb-6">
                        {t("title")}
                    </h1>
                    <p className="text-lg md:text-xl text-neutral-500 dark:text-neutral-400 leading-relaxed">
                        {t("subtitle")}
                    </p>
                </div>

                {/* Flagship SaaS Product Box */}
                <div className="mb-20 relative rounded-3xl overflow-hidden bg-gradient-to-r from-primary-950 to-neutral-900 border border-primary-500/20 text-white p-8 md:p-12 shadow-2xl">
                    <div className="absolute top-0 right-0 p-4">
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-500/20 text-primary-400 border border-primary-500/30 rounded-full text-xs font-bold uppercase tracking-wider">
                            <HiOutlineSparkles /> Flagship SaaS
                        </span>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-extrabold mb-6 leading-tight">
                                {t("cmsTitle")}
                            </h2>
                            <p className="text-lg text-neutral-300 mb-8 leading-relaxed">
                                {t("cmsDesc")}
                            </p>
                            <Link href={`/${locale}/products/cms-landing-page`} className="btn-primary inline-flex items-center gap-2">
                                <span>{t("cmsButton")}</span>
                                <HiArrowRight />
                            </Link>
                        </div>
                        <div className="relative aspect-video rounded-2xl overflow-hidden bg-neutral-800 border border-white/5 shadow-2xl">
                            <Image 
                                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80" 
                                alt="CMS Landing Page Creator Preview"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>

                {/* Grid layout of Showcase Products */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-3xl font-extrabold text-neutral-900 dark:text-white mb-4">
                        {tHead("title")}
                    </h2>
                    <p className="text-lg text-neutral-500 dark:text-neutral-400">
                        {tHead("subtitle")}
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {dynamicProducts.map((prod) => (
                        <div key={prod._id} className="group bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-white/5 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full hover:-translate-y-1">
                            <div className="relative aspect-video overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                                <Image
                                    src={prod.imageURL}
                                    alt={locale === 'id' ? prod.name_id : prod.name_en}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                            <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">
                                        {locale === 'id' ? prod.name_id : prod.name_en}
                                    </h3>
                                    <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed mb-6">
                                        {locale === 'id' ? prod.description_id : prod.description_en}
                                    </p>
                                </div>
                                <Link href={`/${locale}#contact`} className="text-sm font-bold text-primary-600 hover:text-primary-700 transition-colors inline-flex items-center gap-1 group-hover:underline">
                                    <span>Request Custom Deployment</span>
                                    <HiArrowRight className="text-xs" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
