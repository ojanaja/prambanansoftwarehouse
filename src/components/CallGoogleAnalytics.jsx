"use client";
import { GoogleAnalytics } from "nextjs-google-analytics";

export default function CallGoogleAnalytics() {
  // Fix Error Google Analytics
  return <GoogleAnalytics trackPageViews />;
}
