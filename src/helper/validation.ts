const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const WHATSAPP_REGEX = /^\d{10,15}$/;

export interface ContactPayload {
  name: any;
  institution: any;
  whatsapp: any;
  email?: any;
  appType: any;
}

export function validateContactPayload(body: any): { success: boolean; error?: string } {
  if (!body || typeof body !== "object") {
    return { success: false, error: "Invalid payload type." };
  }

  const { name, institution, whatsapp, email, appType } = body as ContactPayload;

  if (!name || typeof name !== "string" || name.trim().length === 0 || name.length > 100) {
    return { success: false, error: "Invalid name (required, max 100 characters)." };
  }

  if (!institution || typeof institution !== "string" || institution.trim().length === 0 || institution.length > 150) {
    return { success: false, error: "Invalid institution/yayasan (required, max 150 characters)." };
  }

  if (!whatsapp || typeof whatsapp !== "string" || !WHATSAPP_REGEX.test(whatsapp)) {
    return { success: false, error: "Invalid WhatsApp number (digits only, 10 to 15 digits required)." };
  }

  if (email && (typeof email !== "string" || !EMAIL_REGEX.test(email) || email.length > 100)) {
    return { success: false, error: "Invalid email format." };
  }

  if (!appType || typeof appType !== "string" || appType.trim().length === 0 || appType.length > 100) {
    return { success: false, error: "Invalid app type selected." };
  }

  return { success: true };
}

export function validateChatPayload(body: any): { success: boolean; error?: string } {
  if (!body || typeof body !== "object") {
    return { success: false, error: "Invalid payload type." };
  }

  const { messages } = body;

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return { success: false, error: "Invalid request payload." };
  }

  for (const m of messages) {
    if (!m || typeof m.content !== "string") {
      return { success: false, error: "Invalid message content format." };
    }
  }

  return { success: true };
}

export const ALLOWED_CONTENT_TAGS = /<img[^>]*>/g;

export function cleanContent(htmlContent?: string): string {
  if (!htmlContent) return "";
  return htmlContent.replace(ALLOWED_CONTENT_TAGS, "");
}

