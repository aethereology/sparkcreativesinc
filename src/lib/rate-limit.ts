const CONTACT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const CONTACT_LIMIT = 6;

const contactRateMap = new Map<string, { count: number; firstSeen: number }>();

function getClientIp(headers: Headers) {
  return (
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headers.get("x-real-ip") ||
    headers.get("cf-connecting-ip") ||
    headers.get("fastly-client-ip") ||
    headers.get("true-client-ip") ||
    "unknown"
  );
}

export function getContactRateLimitStatus(headers: Headers) {
  const ip = getClientIp(headers);
  const now = Date.now();
  const entry = contactRateMap.get(ip);

  if (!entry || now - entry.firstSeen > CONTACT_WINDOW_MS) {
    return { allowed: true, remaining: CONTACT_LIMIT, retryAfter: 0 };
  }

  const remaining = Math.max(0, CONTACT_LIMIT - entry.count);
  return {
    allowed: remaining > 0,
    remaining,
    retryAfter: Math.ceil((CONTACT_WINDOW_MS - (now - entry.firstSeen)) / 1000),
  };
}

export function recordContactSubmission(headers: Headers) {
  const ip = getClientIp(headers);
  const now = Date.now();
  const entry = contactRateMap.get(ip);

  if (!entry || now - entry.firstSeen > CONTACT_WINDOW_MS) {
    contactRateMap.set(ip, { count: 1, firstSeen: now });
    return { count: 1, remaining: CONTACT_LIMIT - 1, retryAfter: CONTACT_WINDOW_MS / 1000 };
  }

  entry.count += 1;
  contactRateMap.set(ip, entry);
  return {
    count: entry.count,
    remaining: Math.max(0, CONTACT_LIMIT - entry.count),
    retryAfter: Math.ceil((CONTACT_WINDOW_MS - (now - entry.firstSeen)) / 1000),
  };
}
