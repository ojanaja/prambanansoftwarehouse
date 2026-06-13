import { NextRequest } from "next/server";
import { POST } from "./route";
import axios from "axios";
import { rateLimit } from "@/helper/rateLimit";

import { supabase } from "@/helper/supabase";

jest.mock("axios");
jest.mock("@/helper/rateLimit", () => ({
  rateLimit: jest.fn(),
}));
jest.mock("@/helper/supabase", () => ({
  supabase: {
    from: jest.fn().mockReturnThis(),
    insert: jest.fn().mockResolvedValue({ error: null }),
  },
}));

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedRateLimit = rateLimit as jest.MockedFunction<typeof rateLimit>;

describe("POST /api/contact", () => {
  const envBackup = { ...process.env };

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.EMAILJS_SERVICE_ID = "service-123";
    process.env.EMAILJS_TEMPLATE_ID = "template-456";
    process.env.EMAILJS_USER_ID = "user-789";
    mockedRateLimit.mockReturnValue({ success: true, remaining: 3, reset: 60 });
  });

  afterAll(() => {
    process.env = envBackup;
  });

  it("should return 429 when rate limit is exceeded", async () => {
    mockedRateLimit.mockReturnValue({ success: false, remaining: 0, reset: 45 });

    const req = new NextRequest("http://localhost/api/contact", {
      method: "POST",
      body: JSON.stringify({}),
    });

    const res = await POST(req);
    expect(res.status).toBe(429);
    const data = await res.json();
    expect(data.error).toContain("Too many contact submissions");
    expect(res.headers.get("Retry-After")).toBe("45");
  });

  it("should return 413 when payload exceeds 5KB limit", async () => {
    const hugeBody = "a".repeat(6 * 1024);
    const req = new NextRequest("http://localhost/api/contact", {
      method: "POST",
      body: hugeBody,
      headers: {
        "content-length": hugeBody.length.toString(),
      },
    });

    const res = await POST(req);
    expect(res.status).toBe(413);
    const data = await res.json();
    expect(data.error).toBe("Payload too large.");
  });

  it("should return 400 when validation fails (missing fields)", async () => {
    const req = new NextRequest("http://localhost/api/contact", {
      method: "POST",
      body: JSON.stringify({
        name: "",
        institution: "School",
        whatsapp: "12345",
        email: "invalid-email",
        appType: "SIAKAD",
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBeDefined();
  });

  it("should return 500 when EmailJS server configuration is missing", async () => {
    delete process.env.EMAILJS_SERVICE_ID;

    const req = new NextRequest("http://localhost/api/contact", {
      method: "POST",
      body: JSON.stringify({
        name: "Test User",
        institution: "Prambanan",
        whatsapp: "081234567890",
        email: "test@prambanan.com",
        appType: "SIAKAD",
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(500);
    const data = await res.json();
    expect(data.error).toBe("Email delivery configuration is missing.");
  });

  it("should return 500 when EmailJS API call fails", async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error("EmailJS API Failure"));

    const req = new NextRequest("http://localhost/api/contact", {
      method: "POST",
      body: JSON.stringify({
        name: "Test User",
        institution: "Prambanan",
        whatsapp: "081234567890",
        email: "test@prambanan.com",
        appType: "SIAKAD",
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(500);
    const data = await res.json();
    expect(data.error).toBe("Failed to deliver message. Please try again later.");
  });

  it("should send email via axios and return 200 on success", async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: "OK" });

    const req = new NextRequest("http://localhost/api/contact", {
      method: "POST",
      body: JSON.stringify({
        name: "John Doe",
        institution: "School Foundation",
        whatsapp: "085123456789",
        email: "john@doe.com",
        appType: "SIAKAD",
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.success).toBe(true);
    expect(data.message).toBe("Message sent successfully.");
    expect(mockedAxios.post).toHaveBeenCalledWith(
      "https://api.emailjs.com/api/v1.0/email/send",
      {
        service_id: "service-123",
        template_id: "template-456",
        user_id: "user-789",
        template_params: {
          to_name: "Admin",
          from_name: "John Doe",
          instansi_yayasan: "School Foundation",
          email: "john@doe.com",
          no_whatsapp: "085123456789",
          jenis_aplikasi: "SIAKAD",
        },
      },
      expect.any(Object)
    );
  });

  it("should process and store UTM parameters in Supabase leads database", async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: "OK" });
    const mockInsert = jest.fn().mockResolvedValue({ error: null });
    jest.spyOn(supabase, "from").mockReturnValue({
      insert: mockInsert,
    } as any);

    const req = new NextRequest("http://localhost/api/contact", {
      method: "POST",
      body: JSON.stringify({
        name: "John Doe",
        institution: "School Foundation",
        whatsapp: "085123456789",
        email: "john@doe.com",
        appType: "SIAKAD",
        utm_source: "google",
        utm_medium: "cpc",
        utm_campaign: "promo",
        utm_term: "software",
        utm_content: "banner",
        referrer: "https://google.com",
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    expect(supabase.from).toHaveBeenCalledWith("leads");
    expect(mockInsert).toHaveBeenCalledWith({
      name: "John Doe",
      institution: "School Foundation",
      whatsapp: "085123456789",
      email: "john@doe.com",
      app_type: "SIAKAD",
      utm_source: "google",
      utm_medium: "cpc",
      utm_campaign: "promo",
      utm_term: "software",
      utm_content: "banner",
      referrer: "https://google.com",
    });
  });
});
