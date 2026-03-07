"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { HiMenu } from "react-icons/hi";
import NavbarMobile from "./NavbarMobile";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useTheme } from "next-themes";
import { FaMoon, FaSun } from "react-icons/fa";
import { navLinks } from "@/config/navigation";

export default function Navbar({ disabledScroll = false }) {
  const t = useTranslations("navigation");
  const [scrolled, setScrolled] = useState(false);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (disabledScroll) {
      setScrolled(true);
      return;
    }
    const handleScroll = () => setScrolled(window.scrollY > 9);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [disabledScroll]);

  // Language switch handler
  const switchLocale = () => {
    const newLocale = locale === "id" ? "en" : "id";
    router.push(pathname, { locale: newLocale });
  };

  // Theme switch handler
  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <>
      {/* Desktop Navbar */}
      <div className="hidden md:block">
        <div className="fixed w-full z-20 flex justify-center">
          <div className="container flex flex-row justify-center py-4">
            <nav
              className={`flex items-center gap-1 px-4 py-2 rounded-full transition-all duration-500 ${
                scrolled
                  ? "bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl shadow-lg shadow-black/5 border border-neutral-200/60 dark:border-white/10"
                  : "bg-white/5 backdrop-blur-sm border border-transparent"
              }`}
            >
              <a href="/" className="w-14 p-1.5 pl-3 select-none flex-shrink-0">
                <Image
                  src="/logo/prambanan_logo3.png"
                  className="w-auto h-auto"
                  alt="Logo Prambanan"
                  width={100}
                  height={100}
                  priority
                />
              </a>

              <ul className="flex flex-row items-center gap-1 p-1">
                {navLinks.map((link) => (
                  <li key={link.labelKey}>
                    <a
                      href={link.href}
                      className={`relative px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 group ${
                        scrolled
                          ? "text-neutral-700 dark:text-neutral-300 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-950/50"
                          : "text-white/90 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {t(link.labelKey)}
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary-400 rounded-full transition-all duration-300 group-hover:w-4" />
                    </a>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`ml-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  scrolled
                    ? "bg-gradient-to-r from-primary-500 to-primary-400 text-white shadow-md shadow-primary-400/20 hover:shadow-lg hover:shadow-primary-400/30 hover:scale-[1.03]"
                    : "bg-white/15 text-white border border-white/25 hover:bg-white/25"
                }`}
              >
                {t("requestDemo")}
              </a>

              {/* Divider */}
              <div
                className={`mx-2 w-px h-6 transition-colors duration-300 ${
                  scrolled ? "bg-neutral-300 dark:bg-neutral-600" : "bg-white/20"
                }`}
              />

              {/* Language Toggle */}
              <button
                onClick={switchLocale}
                className={`px-3 py-2 rounded-full text-xs font-bold tracking-wide transition-all duration-300 ${
                  scrolled
                    ? "text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-950/50 border border-primary-300/50 dark:border-primary-500/30"
                    : "text-white/90 hover:text-white hover:bg-white/10 border border-white/20"
                }`}
                aria-label="Switch language"
              >
                {locale === "id" ? "EN" : "ID"}
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`p-2.5 rounded-full transition-all duration-300 ${
                  scrolled
                    ? "text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-950/50"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                }`}
                aria-label="Switch theme"
              >
                {mounted &&
                  (resolvedTheme === "dark" ? <FaSun className="text-sm" /> : <FaMoon className="text-sm" />)}
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden">
        <nav
          className={`fixed top-0 w-full z-20 transition-all duration-500 ${
            scrolled
              ? "bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl shadow-lg shadow-black/5"
              : "bg-transparent"
          }`}
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
                className={`p-2 rounded-xl transition-all duration-300 ${
                  scrolled
                    ? "text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    : "text-white hover:bg-white/10"
                }`}
                aria-label="Open menu"
              >
                <HiMenu className="text-2xl" />
              </button>
            </div>
          </div>
        </nav>
      </div>

      <NavbarMobile isOpen={isNavbarOpen} onClose={() => setIsNavbarOpen(false)} />
    </>
  );
}
