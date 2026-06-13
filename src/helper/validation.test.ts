import { validateContactPayload, validateChatPayload, cleanContent } from "./validation";

jest.mock("dompurify", () => {
  return {
    sanitize: (html: string, options?: any) => {
      if (!html) return "";
      let cleaned = html;
      // Mock basic DOMPurify script and event handler stripping behaviors
      cleaned = cleaned.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
      cleaned = cleaned.replace(/onload="[^"]*"/gi, "");
      cleaned = cleaned.replace(/onerror="[^"]*"/gi, "");
      cleaned = cleaned.replace(/javascript:[^"']*/gi, "");
      if (options?.FORBID_TAGS?.includes("img")) {
        cleaned = cleaned.replace(/<img[^>]*>/gi, "");
      }
      return cleaned;
    }
  };
});

describe("validation helpers", () => {
  describe("validateContactPayload", () => {
    const validPayload = {
      name: "Fauzan",
      institution: "Prambanan Software",
      whatsapp: "081234567890",
      email: "fauzan@example.com",
      appType: "Government System",
    };

    it("should succeed with a valid payload", () => {
      const result = validateContactPayload(validPayload);
      expect(result.success).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it("should succeed without optional email", () => {
      const payload = { ...validPayload };
      delete payload.email;
      const result = validateContactPayload(payload);
      expect(result.success).toBe(true);
    });

    it("should fail if name is missing or invalid", () => {
      expect(validateContactPayload({ ...validPayload, name: "" }).success).toBe(false);
      expect(validateContactPayload({ ...validPayload, name: null }).success).toBe(false);
      expect(validateContactPayload({ ...validPayload, name: "a".repeat(101) }).success).toBe(false);
    });

    it("should fail if institution is missing or invalid", () => {
      expect(validateContactPayload({ ...validPayload, institution: "" }).success).toBe(false);
      expect(validateContactPayload({ ...validPayload, institution: "a".repeat(151) }).success).toBe(false);
    });

    it("should fail if whatsapp format is invalid", () => {
      expect(validateContactPayload({ ...validPayload, whatsapp: "" }).success).toBe(false);
      expect(validateContactPayload({ ...validPayload, whatsapp: "123456789" }).success).toBe(false); // too short (<10)
      expect(validateContactPayload({ ...validPayload, whatsapp: "1234567890123456" }).success).toBe(false); // too long (>15)
      expect(validateContactPayload({ ...validPayload, whatsapp: "abc1234567890" }).success).toBe(false); // letters
    });

    it("should fail if email format is invalid", () => {
      expect(validateContactPayload({ ...validPayload, email: "invalid-email" }).success).toBe(false);
      expect(validateContactPayload({ ...validPayload, email: "invalid@domain" }).success).toBe(false);
    });

    it("should fail if appType is missing", () => {
      expect(validateContactPayload({ ...validPayload, appType: "" }).success).toBe(false);
    });
  });

  describe("validateChatPayload", () => {
    it("should succeed with valid messages array", () => {
      const payload = {
        messages: [
          { role: "user", content: "Hello" },
          { role: "assistant", content: "Hi! How can I help you?" },
        ],
      };
      const result = validateChatPayload(payload);
      expect(result.success).toBe(true);
    });

    it("should fail if messages is missing, empty, or not an array", () => {
      expect(validateChatPayload({}).success).toBe(false);
      expect(validateChatPayload({ messages: [] }).success).toBe(false);
      expect(validateChatPayload({ messages: {} }).success).toBe(false);
    });

    it("should fail if any message content is missing or not a string", () => {
      const payload1 = {
        messages: [
          { role: "user", content: null },
        ],
      };
      expect(validateChatPayload(payload1).success).toBe(false);

      const payload2 = {
        messages: [
          { role: "user" },
        ],
      };
      expect(validateChatPayload(payload2).success).toBe(false);
    });
  });

  describe("cleanContent", () => {
    it("should return an empty string if htmlContent is falsy", () => {
      expect(cleanContent(undefined)).toBe("");
      expect(cleanContent("")).toBe("");
    });

    it("should strip out all <img> tags, including those with properties", () => {
      const input = '<p>Hello world</p><img src="test.png" alt="Test image" /><p>Goodbye world</p>';
      const expected = "<p>Hello world</p><p>Goodbye world</p>";
      expect(cleanContent(input)).toBe(expected);
    });

    it("should strip standard non-self-closing <img> tags if any are present", () => {
      const input = '<div>Text <img src="logo.jpg"> More Text</div>';
      const expected = "<div>Text  More Text</div>";
      expect(cleanContent(input)).toBe(expected);
    });

    it("should preserve other HTML elements and plain text", () => {
      const input = "<h1>Title</h1><p>Paragraph with <strong>bold</strong> text.</p>";
      expect(cleanContent(input)).toBe(input);
    });

    it("should strip out script tags and event handlers to prevent XSS", () => {
      const input = '<div>Safe text <script>alert("XSS")</script> <a href="javascript:alert(1)">Link</a> <div onload="malicious()">Content</div></div>';
      const sanitized = cleanContent(input);
      expect(sanitized).not.toContain("<script>");
      expect(sanitized).not.toContain("onload=");
      expect(sanitized).not.toContain("javascript:alert");
      expect(sanitized).toContain("Safe text");
      expect(sanitized).toContain("Content");
    });
  });
});

