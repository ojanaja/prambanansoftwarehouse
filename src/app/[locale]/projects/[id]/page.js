import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { projectBySlugQuery } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";

export async function generateMetadata({ params: { locale, id } }) {
    const project = await client.fetch(projectBySlugQuery, { slug: id }, { next: { revalidate: 0 } });

    if (!project) return { title: "Project Not Found" };

    const description = locale === 'id' ? project.description_id : project.description_en;

    return {
        title: `${project.title} | Prambanan Digital`,
        description: description || `Case study for ${project.title} by Prambanan Digital.`,
    };
}

export default async function ProjectDetail({ params: { locale, id } }) {
    const project = await client.fetch(projectBySlugQuery, { slug: id }, { next: { revalidate: 0 } });

    if (!project) notFound();

    const imageUrl = project.mainImage ? urlForImage(project.mainImage).width(1200).url() : "/projects/placeholder.webp";
    const description = locale === 'id' ? project.description_id : project.description_en;

    // Formatting category dynamically or falling back to 'Web App'
    const formatCategory = (cat) => {
        if (!cat) return "Case Study";
        if (cat === "web") return "Web App";
        if (cat === "mobile") return "Mobile App";
        if (cat === "design") return "UI/UX Design";
        return cat;
    };

    return (
        <div className="min-h-screen bg-white dark:bg-neutral-950 pt-28 pb-20">
            <div className="section-container">
                {/* Back Link */}
                <Link
                    href={`/${locale}`}
                    className="inline-flex items-center gap-2 text-neutral-500 hover:text-primary-500 transition-colors mb-10 group"
                >
                    <HiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                    <span>Back to Projects</span>
                </Link>

                {/* Hero Section */}
                <div className="grid lg:grid-cols-2 gap-12 lg:items-center">
                    <div>
                        <span className="inline-block text-primary-500 font-bold tracking-widest uppercase text-sm mb-4">
                            {formatCategory(project.category)}
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 dark:text-white leading-tight mb-6">
                            {project.title}
                        </h1>
                        <p className="text-xl text-neutral-600 dark:text-neutral-400 font-medium mb-8">
                            {description || "A successful deployment by Prambanan Digital"}
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <div className="p-4 bg-neutral-100 dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-white/5">
                                <p className="text-xs text-neutral-500 mb-1">Company</p>
                                <p className="font-semibold text-neutral-800 dark:text-neutral-200">Prambanan Client</p>
                            </div>
                            {project.liveLink && (
                                <div className="p-4 bg-neutral-100 dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-white/5">
                                    <p className="text-xs text-neutral-500 mb-1">Live Url</p>
                                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary-500 hover:underline">View Project</a>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl shadow-black/10 bg-neutral-100 dark:bg-neutral-900">
                        <Image
                            src={imageUrl}
                            alt={project.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>

                {/* Detailed Content */}
                <div className="mt-20 grid lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-12">
                        <section>
                            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-500 flex items-center justify-center font-bold text-sm">01</span>
                                Overview
                            </h2>
                            <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed whitespace-pre-wrap">
                                {description || "Information about this project's overview is coming soon."}
                            </p>
                        </section>

                        {(project.galleryImages && project.galleryImages.length > 0) && (
                            <section>
                                <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-500 flex items-center justify-center font-bold text-sm">02</span>
                                    Project Gallery
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {project.galleryImages.map((img, idx) => (
                                        <div key={idx} className="relative aspect-video rounded-xl overflow-hidden shadow-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900">
                                            <Image
                                                src={urlForImage(img).width(800).url()}
                                                alt={`Gallery image ${idx + 1}`}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    <div className="space-y-8">
                        <div className="bg-primary-500/5 dark:bg-primary-500/10 border border-primary-500/20 rounded-2xl p-8 sticky top-28">
                            <h3 className="text-xl font-bold text-primary-600 dark:text-primary-400 mb-4">Interested in a similar project?</h3>
                            <p className="text-neutral-600 dark:text-neutral-400 mb-6">Let&apos;s talk about how we can help your company reach its digital goals.</p>
                            <Link href={`/${locale}#contact`} className="btn-primary w-full justify-center">
                                Get a Proposal
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
