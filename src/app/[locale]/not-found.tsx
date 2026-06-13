"use client";

import React from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { HiOutlineQuestionMarkCircle, HiHome } from "react-icons/hi";

const MotionDiv = motion.div as any;
const MotionH1 = motion.h1 as any;
const MotionH2 = motion.h2 as any;
const MotionP = motion.p as any;

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <main className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-6 py-24 md:py-32">
      {/* Dynamic Background Gradients */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center opacity-30 dark:opacity-25 pointer-events-none select-none">
        <div className="h-[350px] w-[350px] rounded-full bg-primary-400 blur-[90px] dark:bg-primary-600 animate-pulse duration-5000" />
        <div className="ml-24 h-[250px] w-[250px] rounded-full bg-primary-300 blur-[70px] dark:bg-primary-500" />
      </div>

      <div className="w-full max-w-lg text-center z-10">
        {/* Decorative Animated Icon */}
        <MotionDiv
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-primary-50 text-primary-500 shadow-sm dark:bg-neutral-800/80 dark:text-primary-400 border border-primary-100/50 dark:border-primary-900/30"
        >
          <HiOutlineQuestionMarkCircle size={44} className="animate-bounce" />
        </MotionDiv>

        {/* Big Branded 404 Badge */}
        <MotionDiv
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mt-6"
        >
          <MotionH1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-8xl font-extrabold tracking-tight bg-gradient-to-r from-primary-500 via-primary-400 to-primary-600 bg-clip-text text-transparent dark:from-primary-400 dark:via-primary-300 dark:to-primary-500 sm:text-9xl select-none leading-none"
          >
            404
          </MotionH1>
        </MotionDiv>

        {/* Section Heading */}
        <MotionH2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-6 text-2xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-3xl"
        >
          {t("title")}
        </MotionH2>

        {/* Section Description */}
        <MotionP
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-4 text-base text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-md mx-auto"
        >
          {t("description")}
        </MotionP>

        {/* Premium CTA Button */}
        <MotionDiv
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-10 flex justify-center"
        >
          <Link
            href="/"
            className="btn-primary inline-flex items-center gap-2.5 px-8 py-3.5 shadow-md shadow-primary-500/10 dark:shadow-none hover:shadow-lg hover:shadow-primary-500/20"
          >
            <HiHome size={20} />
            <span>{t("backHome")}</span>
          </Link>
        </MotionDiv>
      </div>
    </main>
  );
}
