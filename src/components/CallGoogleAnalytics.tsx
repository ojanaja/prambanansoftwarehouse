"use client";

import React from "react";
import { GoogleAnalytics } from "nextjs-google-analytics";

export default function CallGoogleAnalytics() {
  // Fix Error Google Analytics
  return <GoogleAnalytics trackPageViews />;
}
