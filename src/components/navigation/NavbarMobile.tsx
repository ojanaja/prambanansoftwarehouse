"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MotionDiv = motion.div as any;
const MotionNav = motion.nav as any;

import Image from "next/image";
import { RxCross2 } from "react-icons/rx";
import { HiArrowRight } from "react-icons/hi";
import { FaMoon, FaSun } from "react-icons/fa";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { useTheme } from "next-themes";
import { navLinks } from "@/config/navigation";

interface NavbarMobileProps {
  isOpen: boolean;
  onClose: () => void;
}

import { siteConfig } from "@/config/site";
import { trackEvent } from "@/helper/analytics";

export default function NavbarMobile({ isOpen, onClose }: NavbarMobileProps) {
  const saasUrl = siteConfig.saasUrl;
  const t = useTranslations("navigation");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!isOpen) return;

    // Save previous active element to restore focus when menu closes
    const previousActiveElement = document.activeElement as HTMLElement;

    // Focus the first focusable element initially
    const focusableElements = panelRef.current?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusableElements && focusableElements.length > 0) {
      focusableElements[0].focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key === "Tab") {
        if (!panelRef.current) return;
        const selectables = panelRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (selectables.length === 0) return;

        const firstElement = selectables[0];
        const lastElement = selectables[selectables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (previousActiveElement) {
        previousActiveElement.focus();
      }
    };
  }, [isOpen, onClose]);

  const isHomePage = pathname === "/";

  const switchLocale = (newLocale: string) => {
    if (newLocale === locale) return;
    router.push(pathname, { locale: newLocale });
    onClose();
  };

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[999] bg-black/20 backdrop-blur-sm md:hidden"
            onClick={onClose}
          />

          {/* Panel */}
          <MotionDiv
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-[1000] w-full max-w-sm md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
          >
            <div ref={panelRef} className="bg-white dark:bg-neutral-900 w-full h-full px-6 py-5 flex flex-col shadow-2xl">
              {/* Header */}
              <div className="flex justify-between items-center">
                <Link href="/" onClick={onClose} className="w-12 cursor-pointer">
                  <Image
                    src="/logo/prambanan_logo3.png"
                    className="w-auto h-auto"
                    alt="Logo Prambanan"
                    width={100}
                    height={100}
                    priority
                />
                </Link>
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                  aria-label="Close menu"
                >
                  <RxCross2 className="text-2xl text-neutral-800 dark:text-neutral-200" />
                </button>
              </div>

              {/* Nav Links */}
              <MotionNav
                className="flex flex-col gap-2 mt-12"
                initial="hidden"
                animate="show"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
                  },
                }}
              >
                {navLinks.map((link) => (
                  <MotionDiv
                    key={link.labelKey}
                    variants={{
                      hidden: { opacity: 0, x: 20 },
                      show: { opacity: 1, x: 0 },
                    }}
                  >
                    {link.href.startsWith("#") ? (
                      <a
                        href={isHomePage ? link.href : `/${locale}${link.href}`}
                        onClick={onClose}
                        className="group flex items-center gap-4 px-4 py-4 rounded-xl text-2xl font-medium text-neutral-800 dark:text-neutral-200 hover:bg-primary-50 dark:hover:bg-primary-950/30 hover:text-primary-700 dark:hover:text-primary-300 transition-all duration-300"
                      >
                        <span className="w-1 h-6 rounded-full bg-transparent group-hover:bg-primary-400 transition-all duration-300" />
                        {t(link.labelKey)}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className="group flex items-center gap-4 px-4 py-4 rounded-xl text-2xl font-medium text-neutral-800 dark:text-neutral-200 hover:bg-primary-50 dark:hover:bg-primary-950/30 hover:text-primary-700 dark:hover:text-primary-300 transition-all duration-300"
                      >
                        <span className="w-1 h-6 rounded-full bg-transparent group-hover:bg-primary-400 transition-all duration-300" />
                        {t(link.labelKey)}
                      </Link>
                    )}
                  </MotionDiv>
                ))}

                {/* Language & Theme Toggle Row */}
                <MotionDiv
                  variants={{
                    hidden: { opacity: 0, x: 20 },
                    show: { opacity: 1, x: 0 },
                  }}
                  className="flex flex-col gap-4 mt-6"
                >
                  {/* Language Toggle */}
                  <div className="flex bg-neutral-100 dark:bg-neutral-800 p-1 rounded-xl w-fit">
                    <button
                      onClick={() => switchLocale("id")}
                      aria-label="Switch language to Indonesian"
                      aria-current={locale === "id" ? "true" : undefined}
                      className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${locale === "id" ? "bg-primary-700 dark:bg-primary-600 text-white shadow-sm" : "text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white"
                        }`}
                    >
                      Indonesian
                    </button>
                    <button
                      onClick={() => switchLocale("en")}
                      aria-label="Switch language to English"
                      aria-current={locale === "en" ? "true" : undefined}
                      className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${locale === "en" ? "bg-primary-700 dark:bg-primary-600 text-white shadow-sm" : "text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white"
                        }`}
                    >
                      English
                    </button>
                  </div>

                  {/* Theme Toggle */}
                  <button
                    onClick={toggleTheme}
                    className="flex justify-between items-center px-4 py-3.5 rounded-xl border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-all"
                  >
                    <span className="text-sm font-medium">Switch Appearance</span>
                    {mounted && (resolvedTheme === "dark" ? <FaSun className="text-amber-400" /> : <FaMoon className="text-primary-700" />)}
                  </button>
                </MotionDiv>

                {/* CTA */}
                <MotionDiv
                  variants={{
                    hidden: { opacity: 0, x: 20 },
                    show: { opacity: 1, x: 0 },
                  }}
                  className="mt-4"
                >
                  <a
                    href={`${saasUrl}/signup`}
                    onClick={() => {
                      trackEvent("click_saas_link", { location: "navbar_mobile" });
                      onClose();
                    }}
                    className="btn-primary w-full text-lg shadow-lg shadow-primary-500/20"
                  >
                    {t("requestDemo")}
                    <HiArrowRight className="text-lg" />
                  </a>
                </MotionDiv>
              </MotionNav>

              {/* Bottom Brand */}
              <div className="mt-auto pb-6 flex justify-center items-center">
                <p className="text-sm font-semibold italic text-neutral-400">
                  Prambanan Digital
                </p>
              </div>
            </div>
          </MotionDiv>
        </>
      )}
    </AnimatePresence>
  );
}
