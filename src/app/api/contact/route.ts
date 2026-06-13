import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/helper/rateLimit";
import { validateContactPayload } from "@/helper/validation";
import axios from "axios";

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

    const { name, institution, whatsapp, email, appType } = body;

    // Retrieve server-only EmailJS credentials
    const serviceId = process.env.EMAILJS_SERVICE_ID;
    const templateId = process.env.EMAILJS_TEMPLATE_ID;
    const userId = process.env.EMAILJS_USER_ID;

    if (!serviceId || !templateId || !userId) {
      console.error("EmailJS credentials are not configured on the server.");
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
    console.error("Error sending contact email in server route:", error.response?.data || error.message);
    
    return NextResponse.json(
      { error: "Failed to deliver message. Please try again later." }, 
      { status: 500 }
    );
  }
}
