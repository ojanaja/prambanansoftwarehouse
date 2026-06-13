"use client";

import React, { useEffect } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { HiOutlineExclamationCircle, HiRefresh, HiHome } from "react-icons/hi";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const MotionDiv = motion.div as any;
const MotionH1 = motion.h1 as any;
const MotionP = motion.p as any;

export default function ErrorPage({ error, reset }: ErrorProps) {
  const t = useTranslations("errorPage");

  useEffect(() => {
    // Log the error to console or error reporting service
    console.error("Global boundary caught error:", error);
  }, [error]);

  return (
    <main className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-6 py-24 md:py-32">
      {/* Dynamic Background Gradients */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center opacity-30 dark:opacity-25 pointer-events-none select-none">
        <div className="h-[350px] w-[350px] rounded-full bg-red-400/80 blur-[90px] dark:bg-red-900/30 animate-pulse duration-5000" />
        <div className="ml-24 h-[250px] w-[250px] rounded-full bg-primary-300 blur-[70px] dark:bg-primary-900/15" />
      </div>

      <div className="w-full max-w-lg text-center z-10">
        {/* Decorative Animated Icon */}
        <MotionDiv
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-red-50 text-red-500 shadow-sm dark:bg-neutral-800/80 dark:text-red-400 border border-red-100/50 dark:border-red-900/30"
        >
          <HiOutlineExclamationCircle size={44} />
        </MotionDiv>

        {/* Section Heading */}
        <MotionH1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mt-6 text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl"
        >
          {t("title")}
        </MotionH1>

        {/* Section Description */}
        <MotionP
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-4 text-base text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-md mx-auto"
        >
          {t("description")}
        </MotionP>

        {/* Action Buttons */}
        <MotionDiv
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row justify-center gap-4 items-center"
        >
          <button
            onClick={() => reset()}
            className="btn-primary w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 shadow-md shadow-primary-500/10 dark:shadow-none hover:shadow-lg hover:shadow-primary-500/20"
          >
            <HiRefresh size={20} />
            <span>{t("retry")}</span>
          </button>
          
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 text-neutral-700 dark:text-neutral-300 font-semibold rounded-full transition-all duration-300"
          >
            <HiHome size={20} />
            <span>{t("backHome")}</span>
          </Link>
        </MotionDiv>
      </div>
    </main>
  );
}
