"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { HiMenu } from "react-icons/hi";
import NavbarMobile from "./NavbarMobile";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { useTheme } from "next-themes";
import { FaMoon, FaSun } from "react-icons/fa";
import { navLinks } from "@/config/navigation";
import { motion } from "framer-motion";

const MotionDiv = motion.div as any;
const MotionNav = motion.nav as any;

interface NavbarProps {
  disabledScroll?: boolean;
}

import { siteConfig } from "@/config/site";

export default function Navbar({ disabledScroll = false }: NavbarProps) {
  const saasUrl = siteConfig.saasUrl;
  const t = useTranslations("navigation");
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [, setActiveSection] = useState("");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => setMounted(true), []);

  const isHomePage = pathname === "/";

  // Smart scroll: hide on scroll down, show on scroll up
  useEffect(() => {
    if (disabledScroll) {
      setScrolled(true);
      return;
    }
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(!isHomePage || currentY > 9);

      // Hide/show on scroll direction (only after scrolling past hero)
      if (currentY > 400) {
        setHidden(currentY > lastScrollY.current && currentY - lastScrollY.current > 5);
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentY;
    };

    // Initial call to set correct state
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [disabledScroll, isHomePage]);

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    if (!isHomePage) return;

    const sectionIds = navLinks
      .filter((link) => link.href.startsWith("#"))
      .map((link) => link.href.replace("#", ""));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isHomePage]);

  // Smooth scroll handler
  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      if (isHomePage) {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    }
  }, [isHomePage]);

  const isActive = (link: { href: string }) => {
    if (link.href === "/") return pathname === "/";
    return pathname.startsWith(link.href);
  };

  // Language switch handler
  const switchLocale = (newLocale: string) => {
    if (newLocale === locale) return;
    router.push(pathname, { locale: newLocale });
  };

  // Theme switch handler
  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  if (pathname?.includes("/admin")) return null;

  return (
    <>
      {/* Desktop Navbar */}
      <div className="hidden md:block">
        <MotionDiv
          className="fixed w-full z-50 flex justify-center"
          initial={{ y: -100 }}
          animate={{ y: hidden ? -100 : 0 }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="container flex flex-row justify-center py-4">
            <nav
              className={`flex items-center gap-1 px-4 py-2 rounded-full transition-all duration-500 ${scrolled
                ? "bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl shadow-lg shadow-black/5 border border-neutral-200/60 dark:border-white/10"
                : "bg-white/5 backdrop-blur-sm border border-transparent"
                }`}
            >
              <Link href="/" className="w-14 p-1.5 pl-3 select-none flex-shrink-0">
                <Image
                  src="/logo/prambanan_logo3.png"
                  className="w-auto h-auto"
                  alt="Logo Prambanan"
                  width={100}
                  height={100}
                  priority
                />
              </Link>

              <ul className="flex flex-row items-center gap-1 p-1">
                {navLinks.map((link) => {
                  const isLinkActive = isActive(link);
                  const textColorClass = scrolled
                    ? isLinkActive
                      ? "text-primary-700 bg-primary-50"
                      : "text-neutral-800 dark:text-neutral-200 hover:text-primary-700 hover:bg-primary-50"
                    : isLinkActive
                      ? "text-white bg-white/15"
                      : "text-white/90 hover:text-white hover:bg-white/10";

                  return (
                    <li key={link.labelKey}>
                      {link.href.startsWith("#") ? (
                        <a
                          href={isHomePage ? link.href : `/${locale}${link.href}`}
                          onClick={(e) => handleNavClick(e, link.href)}
                          className={`relative px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 group ${textColorClass}`}
                        >
                          {t(link.labelKey)}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className={`relative px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 group ${textColorClass}`}
                        >
                          {t(link.labelKey)}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>

              <a
                href={`${saasUrl}/signup`}
                className={`ml-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${scrolled
                  ? "bg-gradient-to-r from-primary-500 to-primary-400 text-white shadow-md shadow-primary-400/20 hover:shadow-lg hover:shadow-primary-400/30 hover:scale-[1.03]"
                  : "bg-white/15 text-white border border-white/25 hover:bg-white/25"
                  }`}
              >
                {t("requestDemo")}
              </a>

              {/* Language Switcher UX Refined */}
              <div className={`flex items-center gap-1 ml-4 mr-2 p-1 rounded-full border transition-all duration-300 ${scrolled ? "bg-neutral-100 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700" : "bg-white/10 border-white/20"
                }`}>
                <button
                  onClick={() => switchLocale("id")}
                  aria-label="Switch language to Indonesian"
                  aria-current={locale === "id" ? "true" : undefined}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all ${locale === "id"
                    ? "bg-primary-700 dark:bg-primary-50 text-white shadow-sm"
                    : scrolled ? "text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white" : "text-white/60 hover:text-white"
                    }`}
                >
                  ID
                </button>
                <button
                  onClick={() => switchLocale("en")}
                  aria-label="Switch language to English"
                  aria-current={locale === "en" ? "true" : undefined}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all ${locale === "en"
                    ? "bg-primary-700 dark:bg-primary-50 text-white shadow-sm"
                    : scrolled ? "text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white" : "text-white/60 hover:text-white"
                    }`}
                >
                  EN
                </button>
              </div>

              <button
                onClick={toggleTheme}
                className={`p-2.5 rounded-full transition-all duration-300 ${scrolled
                  ? "text-neutral-800 dark:text-neutral-200 hover:text-primary-700 hover:bg-primary-50"
                  : "text-white/90 hover:text-white hover:bg-white/10"
                  }`}
                aria-label="Switch theme"
              >
                {mounted &&
                  (resolvedTheme === "dark" ? <FaSun className="text-sm" /> : <FaMoon className="text-sm" />)}
              </button>
            </nav>
          </div>
        </MotionDiv>
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden">
        <MotionNav
          className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled
            ? "bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl shadow-lg shadow-black/5"
            : "bg-transparent"
            }`}
          initial={{ y: 0 }}
          animate={{ y: hidden ? -100 : 0 }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="px-5 py-4">
            <div className="flex justify-between items-center">
              <a href="/" className="w-12 cursor-pointer">
                <Image
                  src="/logo/prambanan_logo3.png"
                  className="w-auto h-auto"
                  alt="Logo Prambanan"
                  width={100}
                  height={100}
                  priority
                />
              </a>
              <button
                onClick={() => setIsNavbarOpen(true)}
                className={`p-2 rounded-xl transition-all duration-300 ${scrolled
                  ? "text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  : "text-white hover:bg-white/10"
                  }`}
                aria-label="Open menu"
                aria-expanded={isNavbarOpen}
              >
                <HiMenu className="text-2xl" />
              </button>
            </div>
          </div>
        </MotionNav>
      </div>

      <NavbarMobile isOpen={isNavbarOpen} onClose={() => setIsNavbarOpen(false)} />
    </>
  );
}
