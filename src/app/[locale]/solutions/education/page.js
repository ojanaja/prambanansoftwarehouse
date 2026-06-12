import EducationHero from "@/components/section/EducationHero";
import ContactSection from "@/components/section/Contact";
import Footer from "@/components/section/Footer";
import StatsSection from "@/components/section/Stats";
import SecurityComplianceSection from "@/components/section/SecurityCompliance";
import FAQSection from "@/components/section/FAQ";

export async function generateMetadata({ params: { locale } }) {
    return {
        title: "Sistem Pendidikan & SIAKAD | Prambanan Digital",
        description: "Partner Digitalisasi Sekolah Menuju Standar Global. Kami membangun sistem SIAKAD, LMS, dan manajemen yayasan.",
        alternates: {
            canonical: `/${locale}/solutions/education`,
        },
    };
}

export default async function EducationPage({ params: { locale } }) {
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": locale === 'id' ? "Beranda" : "Home",
                "item": `https://prambanandigital.web.id/${locale}`
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": locale === 'id' ? "Solusi" : "Solutions",
                "item": `https://prambanandigital.web.id/${locale}/solutions`
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": locale === 'id' ? "Pendidikan & SIAKAD" : "Education & SIAKAD",
                "item": `https://prambanandigital.web.id/${locale}/solutions/education`
            }
        ]
    };

    return (
        <main className="flex flex-col min-h-screen">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <EducationHero />
            <StatsSection />
            <SecurityComplianceSection />
            {/* We can reuse the ContactSection but since it's a generic one with the new dropdown, it perfectly fits here */}
            <ContactSection />
            <FAQSection />
        </main>
    );
}
