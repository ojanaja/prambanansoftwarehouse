import React from "react";
import { MdOutlineWhatsapp } from "react-icons/md";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/config/site";

export default function ContactBottom() {
  const t = useTranslations("contactBottom");
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a
        href={`https://wa.me/${siteConfig.contact.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center"
        aria-label={t("whatsappAriaLabel")}
      >
        {/* Pulse Rings */}
        <span className="absolute w-14 h-14 rounded-full bg-primary-400/30 animate-pulse-ring" />
        <span
          className="absolute w-14 h-14 rounded-full bg-primary-400/20 animate-pulse-ring"
          style={{ animationDelay: "0.5s" }}
        />

        {/* Button */}
        <div className="relative w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-400 rounded-full flex items-center justify-center shadow-lg shadow-primary-400/30 transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-primary-400/40">
          <MdOutlineWhatsapp className="text-2xl text-white" />
        </div>
      </a>
    </div>
  );
}
