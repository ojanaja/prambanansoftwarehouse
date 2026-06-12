import { NextResponse } from "next/server";
import { rateLimit } from "@/helper/rateLimit";
import axios from "axios";

export async function POST(req) {
  // Extract client IP address for rate limiting
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || 
             req.headers.get("x-real-ip") || 
             "127.0.0.1";

  // Enforce IP rate limiting: max 3 notifications per IP per minute
  const limitCheck = rateLimit(ip, 3, 60000);
  if (!limitCheck.success) {
    return NextResponse.json(
      { error: "Too many notification requests. Please try again later." },
      { 
        status: 429, 
        headers: { "Retry-After": limitCheck.reset.toString() } 
      }
    );
  }

  try {
    // Basic body size safety check
    const contentLength = parseInt(req.headers.get("content-length") || "0", 10);
    if (contentLength > 10 * 1024) { // 10KB max request size
      return NextResponse.json({ error: "Payload too large." }, { status: 413 });
    }

    const body = await req.json();
    const { message } = body;

    // Payload validation
    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Invalid notification message." }, { status: 400 });
    }

    if (message.length > 3000) {
      return NextResponse.json({ error: "Notification message exceeds character limit." }, { status: 400 });
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error("Server-side Telegram configuration is missing.");
      return NextResponse.json(
        { error: "Notification service configuration error." }, 
        { status: 500 }
      );
    }

    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    const response = await axios.post(url, {
      chat_id: chatId,
      text: message,
      parse_mode: "HTML",
    }, {
      timeout: 10000 // 10s timeout
    });

    return NextResponse.json({ success: true, data: response.data });
  } catch (error) {
    console.error("Error sending Telegram notification in server route:", error);
    
    // Do not leak internal system details
    return NextResponse.json(
      { error: "Failed to process notification request." }, 
      { status: 500 }
    );
  }
}
