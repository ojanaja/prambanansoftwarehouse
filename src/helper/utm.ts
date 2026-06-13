/**
 * Captures UTM parameters and referrer from the URL / document on first page load
 * and saves them in sessionStorage so they persist during the session.
 */
export function captureUtmAndReferrer() {
  if (typeof window === "undefined") return;

  try {
    const urlParams = new URLSearchParams(window.location.search);
    const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
    const utmData: Record<string, string> = {};
    let hasUtm = false;

    for (const key of utmKeys) {
      const val = urlParams.get(key);
      if (val) {
        // Basic sanitization: strip any HTML tags and limit length
        utmData[key] = val.replace(/<[^>]*>/g, "").trim().substring(0, 200);
        hasUtm = true;
      }
    }

    if (hasUtm) {
      sessionStorage.setItem("prambanan_utm", JSON.stringify(utmData));
    }

    // Capture referrer if it exists and is from a different host
    const referrer = document.referrer;
    if (referrer && !referrer.includes(window.location.hostname)) {
      const sanitizedReferrer = referrer.replace(/<[^>]*>/g, "").trim().substring(0, 500);
      sessionStorage.setItem("prambanan_referrer", sanitizedReferrer);
    }
  } catch (err) {
    console.error("Error capturing UTM or referrer:", err);
  }
}

/**
 * Returns the preserved UTM and referrer parameters from sessionStorage.
 */
export function getPreservedUtmAndReferrer(): Record<string, string> {
  if (typeof window === "undefined") return {};

  const result: Record<string, string> = {};

  try {
    const savedUtm = sessionStorage.getItem("prambanan_utm");
    if (savedUtm) {
      const parsed = JSON.parse(savedUtm);
      for (const [k, v] of Object.entries(parsed)) {
        if (typeof v === "string") {
          result[k] = v;
        }
      }
    }
  } catch (err) {
    console.error("Error reading saved UTM parameters:", err);
  }

  try {
    const referrer = sessionStorage.getItem("prambanan_referrer");
    if (referrer) {
      result["referrer"] = referrer;
    }
  } catch (err) {
    console.error("Error reading saved referrer:", err);
  }

  return result;
}
