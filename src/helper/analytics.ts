import { event as gaEvent } from "nextjs-google-analytics";
import { track as vercelTrack } from "@vercel/analytics";

/**
 * Returns whether the user has explicitly accepted tracking cookies.
 */
export function getConsentState(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("cookie-consent") === "accepted";
}

/**
 * Track custom engagement events to Vercel Analytics and GA4.
 * Google Analytics events are only dispatched if consent is explicitly accepted.
 */
export function trackEvent(name: string, properties?: Record<string, any>) {
  if (typeof window === "undefined") return;

  const consent = localStorage.getItem("cookie-consent");
  const hasConsent = consent === "accepted";

  // 1. Vercel Analytics (Respect opt-out if user explicitly declined, otherwise default to tracking)
  if (consent !== "declined") {
    try {
      vercelTrack(name, properties);
    } catch (err) {
      console.warn("Vercel Analytics track error:", err);
    }
  }

  // 2. Google Analytics (Strictly require explicit opt-in consent)
  if (hasConsent) {
    try {
      gaEvent(name, properties);
    } catch (err) {
      console.warn("Google Analytics event error:", err);
    }
  }
}
