import crypto from "crypto";

export const PREMIUM_COOKIE = "climate_kavach_premium";
const TTL_MS = 1000 * 60 * 60 * 24 * 30; // 30 days

function getSecret() {
  const s = process.env.PREMIUM_COOKIE_SECRET || process.env.STRIPE_SECRET_KEY;
  if (s && s.length >= 24) return s;
  // Local-only fallback so the app can be developed without real Stripe keys.
  if (process.env.NODE_ENV !== "production") return "climate-kavach-local-dev-cookie-secret-change-me";
  return null;
}

function hmac(payload: string) {
  const secret = getSecret();
  if (!secret) throw new Error("PREMIUM_COOKIE_SECRET or STRIPE_SECRET_KEY must be set in production.");
  return crypto.createHmac("sha256", secret).update(payload).digest("base64url");
}

export function createPremiumToken(sessionId: string) {
  const exp = Date.now() + TTL_MS;
  const payload = JSON.stringify({ product: "climate-kavach-premium", sessionId, exp });
  const encoded = Buffer.from(payload).toString("base64url");
  return `${encoded}.${hmac(encoded)}`;
}

export function verifyPremiumToken(token?: string | null) {
  if (!token) return false;
  const secret = getSecret();
  if (!secret) return false;
  const [encoded, sig] = token.split(".");
  if (!encoded || !sig) return false;
  try {
    const expected = hmac(encoded);
    if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return false;
    const payload = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8"));
    return payload?.product === "climate-kavach-premium" && typeof payload.exp === "number" && payload.exp > Date.now();
  } catch {
    return false;
  }
}
