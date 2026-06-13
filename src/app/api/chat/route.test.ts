import { NextRequest } from "next/server";
import { POST } from "./route";
import { rateLimit } from "@/helper/rateLimit";

jest.mock("@/helper/rateLimit", () => ({
  rateLimit: jest.fn(),
}));

const mockedRateLimit = rateLimit as jest.MockedFunction<typeof rateLimit>;

describe("POST /api/chat", () => {
  const envBackup = { ...process.env };
  let fetchSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.OPENROUTER_API_KEY = "openrouter-key-123";
    mockedRateLimit.mockReturnValue({ success: true, remaining: 10, reset: 60 });
    fetchSpy = jest.spyOn(global, "fetch");
  });

  afterEach(() => {
    fetchSpy.mockRestore();
  });

  afterAll(() => {
    process.env = envBackup;
  });

  it("should return 429 when rate limit is exceeded", async () => {
    mockedRateLimit.mockReturnValue({ success: false, remaining: 0, reset: 30 });

    const req = new NextRequest("http://localhost/api/chat", {
      method: "POST",
      body: JSON.stringify({}),
    });

    const res = await POST(req);
    expect(res.status).toBe(429);
    const data = await res.json();
    expect(data.error).toContain("Too many chat requests");
  });

  it("should return 413 when payload exceeds 2.5MB limit", async () => {
    const hugeBody = "a".repeat(3 * 1024 * 1024);
    const req = new NextRequest("http://localhost/api/chat", {
      method: "POST",
      body: hugeBody,
      headers: {
        "content-length": hugeBody.length.toString(),
      },
    });

    const res = await POST(req);
    expect(res.status).toBe(413);
    const data = await res.json();
    expect(data.error).toBe("Payload too large. Max attachment size is 2MB.");
  });

  it("should return 400 when validation fails (invalid message schema)", async () => {
    const req = new NextRequest("http://localhost/api/chat", {
      method: "POST",
      body: JSON.stringify({
        messages: "not-an-array",
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it("should return 500 when OPENROUTER_API_KEY is missing", async () => {
    delete process.env.OPENROUTER_API_KEY;

    const req = new NextRequest("http://localhost/api/chat", {
      method: "POST",
      body: JSON.stringify({
        messages: [{ role: "user", content: "Hello" }],
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(500);
    const data = await res.json();
    expect(data.error).toBe("Chat service is temporarily unavailable.");
  });

  it("should return 200 with completions response on success", async () => {
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({
        model: "qwen/qwen3.6-plus:free",
        choices: [
          {
            message: {
              content: "Hello! How can I assist you today?",
            },
          },
        ],
      }),
    });

    const req = new NextRequest("http://localhost/api/chat", {
      method: "POST",
      body: JSON.stringify({
        messages: [{ role: "user", content: "Hi" }],
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.text).toBe("Hello! How can I assist you today?");
    expect(data.model).toBe("qwen/qwen3.6-plus:free");
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });

  it("should retry with fallback models when primary model fails with 429", async () => {
    // Primary model returns 429
    fetchSpy.mockResolvedValueOnce({
      ok: false,
      status: 429,
    });
    // Fallback 1 returns 500
    fetchSpy.mockResolvedValueOnce({
      ok: false,
      status: 500,
    });
    // Fallback 2 succeeds
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({
        model: "qwen/qwen-2.5-72b-instruct:free",
        choices: [
          {
            message: {
              content: "This is a fallback response.",
            },
          },
        ],
      }),
    });

    const req = new NextRequest("http://localhost/api/chat", {
      method: "POST",
      body: JSON.stringify({
        messages: [{ role: "user", content: "Hi" }],
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.text).toBe("This is a fallback response.");
    expect(data.model).toBe("qwen/qwen-2.5-72b-instruct:free");
    expect(fetchSpy).toHaveBeenCalledTimes(3); // 1 primary + 2 fallbacks
  });

  it("should return 504 when AI request times out", async () => {
    const abortError = new Error("The user aborted a request.");
    abortError.name = "AbortError";
    fetchSpy.mockRejectedValueOnce(abortError);

    const req = new NextRequest("http://localhost/api/chat", {
      method: "POST",
      body: JSON.stringify({
        messages: [{ role: "user", content: "Hi" }],
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(504);
    const data = await res.json();
    expect(data.error).toBe("AI request timed out. Please try again.");
  });

  it("should support image attachments formatted as base64 content", async () => {
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({
        choices: [{ message: { content: "I see the image." } }],
      }),
    });

    const req = new NextRequest("http://localhost/api/chat", {
      method: "POST",
      body: JSON.stringify({
        messages: [
          {
            role: "user",
            content: "What is this?",
            attachment: {
              name: "screenshot.png",
              type: "image/png",
              data: "data:image/png;base64,abc",
            },
          },
        ],
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.text).toBe("I see the image.");

    // Verify format sent to OpenRouter API
    const fetchArgs = fetchSpy.mock.calls[0];
    const body = JSON.parse(fetchArgs[1].body);
    expect(body.messages[1].content).toEqual([
      { type: "text", text: "What is this?" },
      { type: "image_url", image_url: { url: "data:image/png;base64,abc" } },
    ]);
  });
});
