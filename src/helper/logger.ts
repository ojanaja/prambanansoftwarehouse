type LogLevel = "info" | "warn" | "error" | "debug";

interface LogPayload {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: Record<string, any>;
}

const isProduction = process.env.NODE_ENV === "production";

function formatContext(context?: Record<string, any>): Record<string, any> | undefined {
  if (!context) return undefined;

  const formatted: Record<string, any> = {};
  for (const [key, value] of Object.entries(context)) {
    if (value instanceof Error) {
      formatted[key] = {
        name: value.name,
        message: value.message,
        stack: value.stack,
      };
    } else {
      formatted[key] = value;
    }
  }
  return formatted;
}

function log(level: LogLevel, message: string, context?: Record<string, any>) {
  if (level === "debug" && isProduction && !process.env.DEBUG) {
    return;
  }

  const formattedCtx = formatContext(context);

  if (isProduction) {
    const payload: LogPayload = {
      timestamp: new Date().toISOString(),
      level,
      message,
    };
    if (formattedCtx) {
      payload.context = formattedCtx;
    }
    console.log(JSON.stringify(payload));
  } else {
    const timeString = new Date().toLocaleTimeString();
    const contextStr = formattedCtx ? ` ${JSON.stringify(formattedCtx)}` : "";
    const prefix = `[${timeString}] [${level.toUpperCase()}]`;

    switch (level) {
      case "error":
        console.error(`${prefix} ${message}${contextStr}`);
        break;
      case "warn":
        console.warn(`${prefix} ${message}${contextStr}`);
        break;
      default:
        console.log(`${prefix} ${message}${contextStr}`);
        break;
    }
  }
}

export const logger = {
  info: (message: string, context?: Record<string, any>) => log("info", message, context),
  warn: (message: string, context?: Record<string, any>) => log("warn", message, context),
  error: (message: string, context?: Record<string, any>) => log("error", message, context),
  debug: (message: string, context?: Record<string, any>) => log("debug", message, context),
};
