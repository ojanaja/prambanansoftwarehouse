import { Analytics } from "@vercel/analytics/next";
import { Poppins } from "next/font/google";
import "../globals.css";
import { Toaster } from "sonner";
import CallGoogleAnalytics from "@/components/CallGoogleAnalytics";
import ScrollProgress from "@/components/ScrollProgress";
import SmoothScroll from "@/components/SmoothScroll";

import { ThemeProvider } from "@/components/ThemeProvider";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';

const poppins = Poppins({
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata({ params }) {
  // Add a fallback in case locale is unexpectedly undefined
  let locale = params?.locale;
  // Fall back to 'id' if invalid locale, though middleware handles this
  if (!locale) locale = 'id';

  try {
    const t = await getTranslations({ locale });
    return {
      metadataBase: new URL("https://prambanandigital.com"),
      title: t('metadata.title'),
      description: t('metadata.description'),
      keywords: t('metadata.keywords').split(', '),
      openGraph: {
        title: t('metadata.title'),
        description: t('metadata.description'),
        siteName: "Prambanan Digital",
        locale: locale === 'id' ? 'id_ID' : 'en_US',
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: t('metadata.title'),
        description: t('metadata.description'),
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

export default async function RootLayout({ children, params }) {
  const { locale } = params;
  console.log('RootLayout locale:', locale);

  // Re-enable this to see if it catches the throw in request.js
  const messages = await getMessages();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Prambanan Digital",
    "image": "https://prambanandigital.com/logo.png",
    "url": "https://prambanandigital.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Bandung",
      "addressCountry": "ID"
    },
    "description": "Prambanan Digital is a software house based in Bandung, Indonesia."
  };

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
            <ScrollProgress />
            <SmoothScroll>
              {children}
            </SmoothScroll>
            <Toaster position="top-center" richColors />
            <Analytics />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

