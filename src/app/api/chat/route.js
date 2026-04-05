import { NextResponse } from "next/server";

const PRIMARY_MODEL = "qwen/qwen3.6-plus:free";
const FALLBACK_MODELS = [
  "openrouter/free", // Official router for currently available free models
  "qwen/qwen-2.5-72b-instruct:free",
  "meta-llama/llama-3.2-3b-instruct:free",
  "google/gemini-flash-1.5-8b"
];

async function callOpenRouter(model, messages, apiKey) {
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://prambanandigital.com",
      "X-Title": "Prambanan Digital Assistant",
    },
    body: JSON.stringify({
      model: model,
      messages: messages,
      temperature: 0.7,
    }),
  });

  return response;
}

export async function POST(req) {
  try {
    const { messages } = await req.json();
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "OpenRouter API Key not configured." },
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
    const formattedMessages = messages.map((m) => {
      if (m.attachment && m.attachment.type.startsWith("image/")) {
        return {
          role: m.role,
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
      return m;
    });

    const finalMessages = [
      { role: "system", content: systemPrompt },
      ...formattedMessages
    ];

    // Try primary model first
    let response = await callOpenRouter(PRIMARY_MODEL, finalMessages, apiKey);
    let data;

    // Retry with fallbacks if Rate Limited (429) or other temporary errors
    if (response.status === 429 || response.status >= 500) {
      console.warn(`Primary model ${PRIMARY_MODEL} failed with status ${response.status}. Trying fallbacks...`);
      
      for (const fallbackModel of FALLBACK_MODELS) {
        response = await callOpenRouter(fallbackModel, finalMessages, apiKey);
        if (response.ok) {
          console.info(`Successfully fell back to ${fallbackModel}`);
          break;
        }
        console.warn(`Fallback model ${fallbackModel} also failed with status ${response.status}`);
      }
    }

    data = await response.json();
    
    if (data.error) {
       console.error("OpenRouter API Error:", data.error);
       return NextResponse.json({ error: data.error.message }, { status: response.status || 500 });
    }

    return NextResponse.json({ 
      text: data.choices[0].message.content,
      model: data.model // Return which model actually answered
    });

  } catch (error) {
    console.error("Error in AI Route:", error);
    return NextResponse.json(
      { error: "Failed to connect to AI assistant." },
      { status: 500 }
    );
  }
}
