"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoShieldCheckmark } from "react-icons/io5";
import { useTranslations } from "next-intl";

const MotionDiv = motion.div as any;

export default function CookieConsent() {
  const t = useTranslations("cookieConsent");
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if the user has already made a choice
    const savedConsent = localStorage.getItem("cookie-consent");
    if (!savedConsent) {
      // Delay showing the banner slightly for better UX
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const updateConsentMode = (status: "granted" | "denied") => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("consent", "update", {
        analytics_storage: status,
        ad_storage: status,
        ad_user_data: status,
        ad_personalization: status,
      });
    }
  };

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    updateConsentMode("granted");
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    updateConsentMode("denied");
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <MotionDiv
          id="cookie-consent-banner"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 z-[9999] sm:w-[400px] bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-2xl shadow-black/10 dark:shadow-black/30 flex flex-col gap-4 text-neutral-900 dark:text-neutral-100"
        >
          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-full bg-primary-50 dark:bg-primary-950/30 flex items-center justify-center flex-shrink-0 text-primary-600 dark:text-primary-400">
              <IoShieldCheckmark size={24} />
            </div>
            <div>
              <h4 className="font-bold text-sm">{t("title")}</h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 leading-relaxed">
                {t("description")}
              </p>
            </div>
          </div>
          <div className="flex gap-2 justify-end mt-2">
            <button
              onClick={handleDecline}
              className="px-4 py-2 border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all text-xs font-semibold"
            >
              {t("decline")}
            </button>
            <button
              onClick={handleAccept}
              className="px-5 py-2 bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-neutral-200 text-white dark:text-neutral-950 rounded-xl shadow-lg shadow-neutral-900/10 dark:shadow-none transition-all text-xs font-semibold"
            >
              {t("accept")}
            </button>
          </div>
        </MotionDiv>
      )}
    </AnimatePresence>
  );
}
