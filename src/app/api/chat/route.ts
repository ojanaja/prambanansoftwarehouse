import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/helper/rateLimit";
import { validateChatPayload } from "@/helper/validation";

const PRIMARY_MODEL = "qwen/qwen3.6-plus:free";
const FALLBACK_MODELS = [
  "openrouter/free", // Official router for currently available free models
  "qwen/qwen-2.5-72b-instruct:free",
  "meta-llama/llama-3.2-3b-instruct:free",
  "google/gemini-flash-1.5-8b"
];

async function callOpenRouter(model: string, messages: any[], apiKey: string, signal: AbortSignal) {
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://prambanandigital.web.id", // Updated domain referrer
      "X-Title": "Prambanan Digital Assistant",
    },
    body: JSON.stringify({
      model: model,
      messages: messages,
      temperature: 0.7,
    }),
    signal,
  });

  return response;
}

export async function POST(req: NextRequest) {
  // Extract client IP address for rate limiting
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || 
             req.headers.get("x-real-ip") || 
             "127.0.0.1";

  // Enforce rate limiting: max 10 chat completions requests per minute per IP
  const limitCheck = rateLimit(ip, 10, 60000);
  if (!limitCheck.success) {
    return NextResponse.json(
      { error: "Too many chat requests. Please wait a minute before sending another message." },
      { 
        status: 429, 
        headers: { "Retry-After": limitCheck.reset.toString() } 
      }
    );
  }

  // Size limit: 2.5MB payload max to prevent large base64 image flooding
  const contentLength = parseInt(req.headers.get("content-length") || "0", 10);
  if (contentLength > 2.5 * 1024 * 1024) {
    return NextResponse.json({ error: "Payload too large. Max attachment size is 2MB." }, { status: 413 });
  }

  try {
    const body = await req.json();
    const validation = validateChatPayload(body);
    if (!validation.success) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const { messages } = body;
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      console.error("OpenRouter API key is not configured.");
      return NextResponse.json(
        { error: "Chat service is temporarily unavailable." },
        { status: 500 }
      );
    }

    const systemPrompt = `You are the official AI Assistant for Prambanan Digital, a premier software house specializing in Digital Transformation for the Public Sector and Education in Indonesia.

Your goal is to assist website visitors by explaining our services and expertise.

Core Services:
- **E-Government (SPBE)**: Integrated, secure electronic government systems compliant with SPBE standards.
- **Integrated Licensing**: One-stop licensing automation to reduce bureaucracy.
- **Command Center**: Real-time data monitoring and visualization for decision making.
- **SIAKAD**: Comprehensive Academic Information System for schools/universities.
- **LMS (Learning Management System)**: Interactive e-learning platforms.
- **Foundation Management System**: Integrated solutions for education foundations (finance, HR, assets).

Formatting Guidelines:
- Use **Markdown** for professional presentation.
- Use **bold** for key terms, service names, and emphasis.
- Use bullet points for lists to keep the response clean and readable.
- Avoid using excessive or "dirty" punctuation.
- Keep the tone professional, helpful, and authoritative.
- Respond in the language used by the user (Indonesian or English).

Value Propositions:
- Premium quality with high security.
- Transparent, **fixed-price** contracts.
- Agile and fast delivery, fully compliant with Indonesian regulations.
- Trusted by 30+ companies and 50+ government/school implementations.

Vision Capability:
- You CAN see and analyze images provided by the user. If an image is provided, describe it or help the user based on its content.

Handoff:
- If the user explicitly asks for "Tanya Manusia" or a real person, the system will handle the notification, but you should acknowledge their request and ask for context if they haven't provided any.`;

    // Format messages for OpenRouter (multimodal support)
    const formattedMessages = messages.map((m: any) => {
      // Validate schema of message object
      if (!m || typeof m.content !== "string") {
        throw new Error("Invalid message content format.");
      }

      if (m.attachment && m.attachment.type && m.attachment.type.startsWith("image/") && m.attachment.data) {
        return {
          role: m.role || "user",
          content: [
            { type: "text", text: m.content || "" },
            {
              type: "image_url",
              image_url: {
                url: m.attachment.data // Base64 data from client
              }
            }
          ]
        };
      }
      return {
        role: m.role || "user",
        content: m.content
      };
    });

    const finalMessages = [
      { role: "system", content: systemPrompt },
      ...formattedMessages
    ];

    // Set up AbortController for overall timeout of 15 seconds
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
      // Try primary model first
      let response = await callOpenRouter(PRIMARY_MODEL, finalMessages, apiKey, controller.signal);
      
      // Retry with fallbacks if Rate Limited (429) or other temporary errors
      if (response.status === 429 || response.status >= 500) {
        console.warn(`Primary model ${PRIMARY_MODEL} failed with status ${response.status}. Trying fallbacks...`);
        
        for (const fallbackModel of FALLBACK_MODELS) {
          try {
            response = await callOpenRouter(fallbackModel, finalMessages, apiKey, controller.signal);
            if (response.ok) {
              console.info(`Successfully fell back to ${fallbackModel}`);
              break;
            }
            console.warn(`Fallback model ${fallbackModel} also failed with status ${response.status}`);
          } catch (fallbackError: any) {
            console.error(`Error attempting fallback ${fallbackModel}:`, fallbackError.message);
          }
        }
      }

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`OpenRouter returned status ${response.status}`);
      }

      const data = await response.json();
      
      if (data.error) {
         console.error("OpenRouter API error detail:", data.error);
         return NextResponse.json({ error: "AI assistant returned an error." }, { status: 500 });
      }

      const messageContent = data.choices?.[0]?.message?.content;
      if (!messageContent) {
        throw new Error("Invalid response schema from OpenRouter.");
      }

      return NextResponse.json({ 
        text: messageContent,
        model: data.model
      });

    } catch (fetchError: any) {
      clearTimeout(timeoutId);
      if (fetchError.name === "AbortError") {
        return NextResponse.json(
          { error: "AI request timed out. Please try again." }, 
          { status: 504 }
        );
      }
      throw fetchError;
    }

  } catch (error: any) {
    console.error("Error in AI Route:", error.message || error);
    return NextResponse.json(
      { error: "Failed to connect to AI assistant." },
      { status: 500 }
    );
  }
}
