import { rateLimit } from "./rateLimit";

describe("rateLimit helper", () => {
  let dateNowSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.useFakeTimers();
    // Start at a fixed timestamp: 1718000000000 (roughly June 2024)
    let currentMockTime = 1718000000000;
    dateNowSpy = jest.spyOn(Date, "now").mockImplementation(() => currentMockTime);
    
    // Helper to advance time
    (global as any).advanceTime = (ms: number) => {
      currentMockTime += ms;
      jest.advanceTimersByTime(ms);
    };
  });

  afterEach(() => {
    dateNowSpy.mockRestore();
    jest.useRealTimers();
  });

  it("should allow requests below the limit", () => {
    const ip = "1.2.3.4";
    const result1 = rateLimit(ip, 3, 60000);
    expect(result1.success).toBe(true);
    expect(result1.remaining).toBe(2);

    const result2 = rateLimit(ip, 3, 60000);
    expect(result2.success).toBe(true);
    expect(result2.remaining).toBe(1);

    const result3 = rateLimit(ip, 3, 60000);
    expect(result3.success).toBe(true);
    expect(result3.remaining).toBe(0);
  });

  it("should block requests once the limit is exceeded", () => {
    const ip = "5.6.7.8";
    rateLimit(ip, 2, 60000);
    rateLimit(ip, 2, 60000);

    const blockedResult = rateLimit(ip, 2, 60000);
    expect(blockedResult.success).toBe(false);
    expect(blockedResult.remaining).toBe(0);
    expect(blockedResult.reset).toBe(60); // 60 seconds
  });

  it("should reset rate limit after window expiration", () => {
    const ip = "9.10.11.12";
    rateLimit(ip, 2, 60000);
    rateLimit(ip, 2, 60000);

    const blockedResult = rateLimit(ip, 2, 60000);
    expect(blockedResult.success).toBe(false);

    // Advance time past the 60 seconds window
    (global as any).advanceTime(61000);

    const resetResult = rateLimit(ip, 2, 60000);
    expect(resetResult.success).toBe(true);
    expect(resetResult.remaining).toBe(1);
  });
});
