"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { RxCross2 } from "react-icons/rx";
import { HiArrowRight } from "react-icons/hi";
import { FaMoon, FaSun, FaGlobe } from "react-icons/fa";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { useTheme } from "next-themes";
import { navLinks } from "@/config/navigation";

export default function NavbarMobile({ isOpen, onClose }) {
  const saasUrl = process.env.NEXT_PUBLIC_SAAS_URL || "http://app.localhost";
  const t = useTranslations("navigation");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isHomePage = pathname === "/";

  const switchLocale = (newLocale) => {
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[999] bg-black/20 backdrop-blur-sm md:hidden"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-[1000] w-full max-w-sm md:hidden"
          >
            <div className="bg-white dark:bg-neutral-900 w-full h-full px-6 py-5 flex flex-col shadow-2xl">
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
              <motion.nav
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
                  <motion.div
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
                        className="group flex items-center gap-4 px-4 py-4 rounded-xl text-2xl font-medium text-neutral-800 dark:text-neutral-200 hover:bg-primary-50 dark:hover:bg-primary-950/30 hover:text-primary-500 transition-all duration-300"
                      >
                        <span className="w-1 h-6 rounded-full bg-transparent group-hover:bg-primary-400 transition-all duration-300" />
                        {t(link.labelKey)}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className="group flex items-center gap-4 px-4 py-4 rounded-xl text-2xl font-medium text-neutral-800 dark:text-neutral-200 hover:bg-primary-50 dark:hover:bg-primary-950/30 hover:text-primary-500 transition-all duration-300"
                      >
                        <span className="w-1 h-6 rounded-full bg-transparent group-hover:bg-primary-400 transition-all duration-300" />
                        {t(link.labelKey)}
                      </Link>
                    )}
                  </motion.div>
                ))}

                {/* Language & Theme Toggle Row */}
                <motion.div
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
                      className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${locale === "id" ? "bg-primary-500 text-white shadow-sm" : "text-neutral-500"
                        }`}
                    >
                      Indonesian
                    </button>
                    <button
                      onClick={() => switchLocale("en")}
                      className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${locale === "en" ? "bg-primary-500 text-white shadow-sm" : "text-neutral-500"
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
                    {mounted && (resolvedTheme === "dark" ? <FaSun className="text-amber-400" /> : <FaMoon className="text-primary-500" />)}
                  </button>
                </motion.div>

                {/* CTA */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: 20 },
                    show: { opacity: 1, x: 0 },
                  }}
                  className="mt-4"
                >
                  <a
                    href={`${saasUrl}/signup`}
                    onClick={onClose}
                    className="btn-primary w-full text-lg shadow-lg shadow-primary-500/20"
                  >
                    {t("requestDemo")}
                    <HiArrowRight className="text-lg" />
                  </a>
                </motion.div>
              </motion.nav>

              {/* Bottom Brand */}
              <div className="mt-auto pb-6 flex justify-center items-center">
                <p className="text-sm font-semibold italic text-neutral-400">
                  Prambanan Digital
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
