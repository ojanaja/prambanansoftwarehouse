import { logger } from "./logger";

describe("Logger Helper Unit Tests", () => {
  let logSpy: jest.SpyInstance;
  let warnSpy: jest.SpyInstance;
  let errorSpy: jest.SpyInstance;

  beforeEach(() => {
    logSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
    errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    logSpy.mockRestore();
    warnSpy.mockRestore();
    errorSpy.mockRestore();
    jest.resetModules();
  });

  it("should log human-readable outputs in non-production mode", () => {
    logger.info("Dev info message", { key: "value" });
    expect(logSpy).toHaveBeenCalled();
    const output = logSpy.mock.calls[0][0];
    expect(output).toContain("[INFO] Dev info message");
    expect(output).toContain('{"key":"value"}');
  });

  it("should output JSON format in production mode", () => {
    const originalEnv = process.env.NODE_ENV;
    Object.defineProperty(process.env, "NODE_ENV", {
      value: "production",
      writable: true,
      configurable: true
    });

    const { logger: prodLogger } = require("./logger");
    prodLogger.info("Prod info message", { foo: "bar" });

    expect(logSpy).toHaveBeenCalled();
    const outputStr = logSpy.mock.calls[0][0];
    const payload = JSON.parse(outputStr);

    expect(payload.level).toBe("info");
    expect(payload.message).toBe("Prod info message");
    expect(payload.context).toEqual({ foo: "bar" });
    expect(payload.timestamp).toBeDefined();

    Object.defineProperty(process.env, "NODE_ENV", {
      value: originalEnv,
      writable: true,
      configurable: true
    });
  });

  it("should serialize error instances in the context correctly", () => {
    const testError = new Error("Something went wrong");
    logger.error("Error occurred", { err: testError });

    expect(errorSpy).toHaveBeenCalled();
    const output = errorSpy.mock.calls[0][0];
    expect(output).toContain("Error occurred");
    expect(output).toContain("Something went wrong");
  });
});
