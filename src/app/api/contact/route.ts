import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/helper/rateLimit";
import { validateContactPayload } from "@/helper/validation";
import { supabase } from "@/helper/supabase";
import axios from "axios";
import { logger } from "@/helper/logger";

export async function POST(req: NextRequest) {
  // Extract client IP address for rate limiting
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || 
             req.headers.get("x-real-ip") || 
             "127.0.0.1";

  // Enforce rate limiting: max 3 submissions per IP per minute
  const limitCheck = rateLimit(ip, 3, 60000);
  if (!limitCheck.success) {
    return NextResponse.json(
      { error: "Too many contact submissions. Please wait a minute before trying again." },
      { 
        status: 429, 
        headers: { "Retry-After": limitCheck.reset.toString() } 
      }
    );
  }

  try {
    // Basic body size safety check
    const contentLength = parseInt(req.headers.get("content-length") || "0", 10);
    if (contentLength > 5 * 1024) { // 5KB max request size
      return NextResponse.json({ error: "Payload too large." }, { status: 413 });
    }

    const body = await req.json();
    const validation = validateContactPayload(body);
    if (!validation.success) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const { 
      name, 
      institution, 
      whatsapp, 
      email, 
      appType,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_term,
      utm_content,
      referrer 
    } = body;

    const sanitize = (val: any, maxLen: number): string | null => {
      if (typeof val !== "string") return null;
      return val.replace(/<[^>]*>/g, "").trim().substring(0, maxLen);
    };

    // 1. Save lead to Supabase (non-blocking fallback design)
    try {
      const { error: dbError } = await supabase.from("leads").insert({
        name: sanitize(name, 100),
        institution: sanitize(institution, 150),
        whatsapp: sanitize(whatsapp, 20),
        email: email ? sanitize(email, 100) : null,
        app_type: sanitize(appType, 100),
        utm_source: utm_source ? sanitize(utm_source, 150) : null,
        utm_medium: utm_medium ? sanitize(utm_medium, 150) : null,
        utm_campaign: utm_campaign ? sanitize(utm_campaign, 150) : null,
        utm_term: utm_term ? sanitize(utm_term, 150) : null,
        utm_content: utm_content ? sanitize(utm_content, 150) : null,
        referrer: referrer ? sanitize(referrer, 500) : null,
      });

      if (dbError) {
        logger.warn(`Database storage failed for lead (non-blocking): ${dbError.message}`, { error: dbError });
      }
    } catch (dbErr) {
      logger.warn("Database connection failed for lead (non-blocking)", { error: dbErr });
    }

    // Retrieve server-only EmailJS credentials
    const serviceId = process.env.EMAILJS_SERVICE_ID;
    const templateId = process.env.EMAILJS_TEMPLATE_ID;
    const userId = process.env.EMAILJS_USER_ID;

    if (!serviceId || !templateId || !userId) {
      logger.error("EmailJS credentials are not configured on the server.");
      return NextResponse.json(
        { error: "Email delivery configuration is missing." }, 
        { status: 500 }
      );
    }

    // Forward request to EmailJS REST API
    await axios.post("https://api.emailjs.com/api/v1.0/email/send", {
      service_id: serviceId,
      template_id: templateId,
      user_id: userId,
      template_params: {
        to_name: "Admin",
        from_name: name.trim(),
        instansi_yayasan: institution.trim(),
        email: email ? email.trim() : "N/A",
        no_whatsapp: whatsapp,
        jenis_aplikasi: appType.trim(),
      }
    }, {
      headers: {
        "Content-Type": "application/json"
      },
      timeout: 10000 // 10s timeout
    });

    return NextResponse.json({ success: true, message: "Message sent successfully." });
  } catch (error: any) {
    logger.error("Error sending contact email in server route", { error: error.response?.data || error });
    
    return NextResponse.json(
      { error: "Failed to deliver message. Please try again later." }, 
      { status: 500 }
    );
  }
}
