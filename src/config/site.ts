export interface ContactConfig {
  email: string;
  phone: string;
  phoneDisplay: string;
  phoneHref: string;
  whatsapp: string;
  instagram: string;
  instagramHref: string;
}

export interface SiteConfig {
  name: string;
  contact: ContactConfig;
  url: string;
  saasUrl: string;
}

const url = "https://prambanandigital.web.id";
const saasUrl = process.env.NEXT_PUBLIC_SAAS_URL || "https://app.prambanandigital.web.id";

if (!url.startsWith("https://")) {
  throw new Error("Base marketing URL must use HTTPS.");
}
if (!saasUrl.startsWith("https://")) {
  throw new Error("SaaS URL must use HTTPS.");
}

export const siteConfig: SiteConfig = {
  name: "Prambanan Digital",
  url,
  saasUrl,
  contact: {
    email: "prambanandigital@gmail.com",
    phone: "+6281221779294", // Main WA from ContactBottom
    phoneDisplay: "(+62) 851-8993-3901 (Min Pram)", // From Footer
    phoneHref: "tel:+6285189933901",
    whatsapp: "6281221779294",
    instagram: "prambanandigital",
    instagramHref: "https://www.instagram.com/prambanandigital/",
  },
};
