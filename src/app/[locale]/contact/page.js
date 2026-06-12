import { getTranslations } from "next-intl/server";
import ContactSection from "@/components/section/Contact";

export async function generateMetadata({ params: { locale } }) {
    const t = await getTranslations({ locale, namespace: "contact" });
    return {
        title: `${t("formTitle")} | Prambanan Digital`,
        description: t("description"),
        alternates: {
            canonical: `/${locale}/contact`,
        },
    };
}

export default async function ContactPage() {
    return (
        <main className="min-h-screen bg-white dark:bg-neutral-950 pt-20">
            {/* Direct injection of the full validation-equipped Contact form */}
            <ContactSection />
        </main>
    );
}
