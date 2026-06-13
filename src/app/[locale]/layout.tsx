import React from "react";
import { Analytics } from "@vercel/analytics/next";
import { Poppins } from "next/font/google";
import "../globals.css";
import { Toaster } from "sonner";
import CallGoogleAnalytics from "@/components/CallGoogleAnalytics";
import ScrollProgress from "@/components/ScrollProgress";
import SmoothScroll from "@/components/SmoothScroll";
import dynamic from "next/dynamic";
import { Metadata } from "next";

const CursorGlow = dynamic(
  () => import("@/components/particles/CursorGlow"),
  { ssr: false }
);

const ChatWidget = dynamic(
  () => import("@/components/chat/ChatWidget"),
  { ssr: false }
);

import { ThemeProvider } from "@/components/ThemeProvider";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/section/Footer";
import { siteConfig } from "@/config/site";

const poppins = Poppins({
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

interface GenerateMetadataProps {
  params: {
    locale?: string;
  };
}

export async function generateMetadata({ params }: GenerateMetadataProps): Promise<Metadata> {
  // Add a fallback in case locale is unexpectedly undefined
  let locale = params?.locale;
  // Fall back to 'id' if invalid locale, though middleware handles this
  if (!locale) locale = 'id';

  try {
    const t = await getTranslations({ locale });
    return {
      metadataBase: new URL(siteConfig.url),
      title: t('metadata.title'),
      description: t('metadata.description'),
      keywords: t('metadata.keywords').split(', '),
      openGraph: {
        title: t('metadata.title'),
        description: t('metadata.description'),
        siteName: "Prambanan Digital",
        locale: locale === 'id' ? 'id_ID' : 'en_US',
        type: "website",
        images: [
          {
            url: "/image/Image%20Card%20Prambanan.png",
            width: 1200,
            height: 630,
            alt: "Prambanan Digital",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: t('metadata.title'),
        description: t('metadata.description'),
        images: ["/image/Image%20Card%20Prambanan.png"],
      },
    };
  } catch (error) {
    // Fallback if translations fail
    return {
      title: "Prambanan Digital | Web & Mobile App Development",
      description: "Prambanan Digital is a top-tier software house based in Bandung, Indonesia.",
    };
  }
}

interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

export default async function RootLayout({ children, params }: RootLayoutProps) {
  const { locale } = params;

  // Re-enable this to see if it catches the throw in request.js
  const messages = await getMessages();

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Prambanan Digital",
    "image": `${siteConfig.url}/logo.png`,
    "url": siteConfig.url,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Bandung",
      "addressCountry": "ID"
    },
    "description": "Prambanan Digital is a software house based in Bandung, Indonesia."
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Prambanan Digital",
    "url": `${siteConfig.url}/${locale}`,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${siteConfig.url}/${locale}/insights?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className={poppins.className}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <CallGoogleAnalytics />
            <CursorGlow />
            <ScrollProgress />
            <SmoothScroll>
              <Navbar />
              {children}
              <Footer />
            </SmoothScroll>
            <ChatWidget />
            <Toaster position="top-center" richColors />
            <Analytics />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
