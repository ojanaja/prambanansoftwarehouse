"use client";
import Image from "next/image";
import { FaEnvelope, FaInstagram, FaPhone } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/config/site";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="relative bg-gradient-to-br from-primary-500 via-primary-400 to-primary-600 text-white overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />

      <div className="section-container relative z-10 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/logo/prambanan_logo3.png"
                className="w-10 h-auto brightness-0 invert"
                alt="Logo Prambanan"
                width={100}
                height={100}
              />
              <h3 className="text-xl font-bold italic">{siteConfig.name}</h3>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              {t("description")}
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.15em] text-white/60 mb-5">
              {t("contactHeading")}
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-center gap-3 text-sm text-white/80 hover:text-white transition-colors group"
              >
                <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors">
                  <FaEnvelope className="text-sm" />
                </div>
                {siteConfig.contact.email}
              </a>
              <a
                href={siteConfig.contact.phoneHref}
                className="flex items-center gap-3 text-sm text-white/80 hover:text-white transition-colors group"
              >
                <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors">
                  <FaPhone className="text-sm" />
                </div>
                {siteConfig.contact.phoneDisplay}
              </a>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.15em] text-white/60 mb-5">
              {t("followHeading")}
            </h4>
            <a
              href={siteConfig.contact.instagramHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-sm text-white/80 hover:text-white transition-colors group"
            >
              <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors">
                <FaInstagram className="text-lg" />
              </div>
              @{siteConfig.contact.instagram}
            </a>
          </div>
        </div>

        {/* Divider + Copyright */}
        <div className="mt-12 pt-6 border-t border-white/15">
          <p className="text-sm text-white/50 text-center">
            {t("copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
