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
}

export const siteConfig: SiteConfig = {
  name: "Prambanan Digital",
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
