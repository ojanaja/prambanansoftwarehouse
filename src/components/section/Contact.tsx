"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { HiArrowRight } from "react-icons/hi";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { getPreservedUtmAndReferrer } from "@/helper/utm";
import { trackEvent } from "@/helper/analytics";

const ParticleBackground = dynamic(
  () => import("../particles/ParticleBackground"),
  { ssr: false }
);

interface ContactOption {
  id: string | number;
  label: string;
}

export default function ContactSection() {
  const t = useTranslations("contact");
  const options = t.raw("options") as ContactOption[];

  const [formData, setFormData] = useState({
    name: "",
    institution: "",
    whatsapp: "",
    email: "",
    appType: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasStartedForm, setHasStartedForm] = useState(false);

  const handleFormFocus = () => {
    if (!hasStartedForm) {
      setHasStartedForm(true);
      trackEvent("contact_form_start");
    }
  };

  const handleWhatsappInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.value = event.target.value.replace(/[^0-9]/g, "");
    setFormData({ ...formData, whatsapp: event.target.value });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.whatsapp.length < 10) {
      toast.error(t("whatsappMinDigits"));
      trackEvent("contact_form_validation_failure", { reason: "whatsapp_too_short" });
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading(t("sending"));

    try {
      const utmData = getPreservedUtmAndReferrer();
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          ...utmData,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        trackEvent("contact_form_validation_failure", { reason: errorData.error || "server_error" });
        throw new Error(errorData.error || "Failed to submit form.");
      }

      toast.success(t("sendSuccess"), { id: toastId });
      trackEvent("contact_form_success", { app_type: formData.appType });
      // Reset form on success
      setFormData({ name: "", institution: "", whatsapp: "", email: "", appType: "" });
      setHasStartedForm(false);
    } catch (error: any) {
      toast.error(error.message || t("sendError"), { id: toastId });
      console.error("Error sending contact form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="contact" className="section-padding bg-section-alt">
      <div className="section-container">
        <div className="relative w-full max-w-5xl mx-auto overflow-hidden rounded-3xl shadow-2xl shadow-black/10">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('form/background.webp')" }}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/50" />
          {/* Ambient Particles */}
          <ParticleBackground variant="ambient" />

          {/* Content */}
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10 p-8 md:p-12 lg:p-16">
            {/* Left - Text */}
            <div className="text-white md:w-1/2 text-center md:text-left">
              <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary-300 mb-3">
                {t("badge")}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
                {t("heading1")}{" "}
                <span className="bg-gradient-to-r from-primary-300 to-primary-400 bg-clip-text text-transparent">
                  {t("heading2")}
                </span>
              </h2>
              <p className="text-white/60 text-sm leading-relaxed">
                {t("description")}
              </p>
            </div>

            {/* Right - Form */}
            <div className="md:w-1/2 w-full max-w-md">
              <div className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-2xl p-6 lg:p-8">
                <h3 className="text-lg font-semibold text-white mb-6">
                  {t("formTitle")}
                </h3>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      onFocus={handleFormFocus}
                      placeholder={t("namePlaceholder")}
                      aria-label={t("namePlaceholder")}
                      className="w-full p-3.5 bg-white/10 border border-white/10 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400/50 focus:border-primary-400/50 placeholder:text-white/40 transition-all duration-300 text-sm"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="institution"
                      value={formData.institution}
                      onChange={handleInputChange}
                      onFocus={handleFormFocus}
                      placeholder={t("institutionPlaceholder")}
                      aria-label={t("institutionPlaceholder")}
                      className="w-full p-3.5 bg-white/10 border border-white/10 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400/50 focus:border-primary-400/50 placeholder:text-white/40 transition-all duration-300 text-sm"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleWhatsappInput}
                      onFocus={handleFormFocus}
                      inputMode="numeric"
                      placeholder={t("whatsappPlaceholder")}
                      aria-label={t("whatsappPlaceholder")}
                      className="w-full p-3.5 bg-white/10 border border-white/10 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400/50 focus:border-primary-400/50 placeholder:text-white/40 transition-all duration-300 text-sm"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onFocus={handleFormFocus}
                      placeholder={t("emailPlaceholder")}
                      aria-label={t("emailPlaceholder")}
                      className="w-full p-3.5 bg-white/10 border border-white/10 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400/50 focus:border-primary-400/50 placeholder:text-white/40 transition-all duration-300 text-sm"
                    />
                  </div>
                  <div className="relative group">
                    <select
                      name="appType"
                      value={formData.appType}
                      onChange={handleInputChange}
                      onFocus={handleFormFocus}
                      aria-label={t("selectAppType")}
                      className="w-full p-3.5 bg-white/10 border border-white/10 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400/50 focus:border-primary-400/50 transition-all duration-300 text-sm appearance-none cursor-pointer"
                      required
                    >
                      <option value="" disabled className="text-neutral-900 bg-white">
                        {t("selectAppType")}
                      </option>
                      {options.map((option) => (
                        <option key={option.id} value={option.label} className="text-neutral-900 bg-white">
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {/* Select Arrow */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none group-hover:text-primary-400 transition-colors text-white/40">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full btn-primary py-4 text-sm"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        {t("sendingBtn")}
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        {t("sendRequest")}
                        <HiArrowRight />
                      </span>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
