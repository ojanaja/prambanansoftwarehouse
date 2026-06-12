// In-memory rate limiter for Next.js App Router standalone deployments
const rateLimitMap = new Map();

/**
 * Basic IP-based rate limiting helper.
 * @param {string} ip - The requester IP address.
 * @param {number} limit - Maximum number of requests allowed within the window.
 * @param {number} windowMs - Time window in milliseconds (default: 1 minute).
 * @returns {{ success: boolean, remaining: number, reset: number }}
 */
export function rateLimit(ip, limit = 10, windowMs = 60000) {
  const now = Date.now();
  
  // Clean up old entries periodically to prevent memory leak
  if (rateLimitMap.size > 10000) {
    const threshold = now - windowMs;
    for (const [key, value] of rateLimitMap.entries()) {
      const active = value.filter(ts => ts > threshold);
      if (active.length === 0) {
        rateLimitMap.delete(key);
      } else {
        rateLimitMap.set(key, active);
      }
    }
  }

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, []);
  }

  const timestamps = rateLimitMap.get(ip).filter(ts => now - ts < windowMs);
  timestamps.push(now);
  rateLimitMap.set(ip, timestamps);

  if (timestamps.length > limit) {
    const oldestTs = timestamps[0];
    const resetTime = Math.ceil((oldestTs + windowMs - now) / 1000);
    return {
      success: false,
      remaining: 0,
      reset: resetTime > 0 ? resetTime : 1
    };
  }

  return {
    success: true,
    remaining: limit - timestamps.length,
    reset: Math.ceil(windowMs / 1000)
  };
}
