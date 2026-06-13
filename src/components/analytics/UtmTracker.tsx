"use client";

import { useEffect } from "react";
import { captureUtmAndReferrer } from "@/helper/utm";

export default function UtmTracker() {
  useEffect(() => {
    captureUtmAndReferrer();
  }, []);

  return null;
}
