export async function checkPremiumUnlocked(): Promise<boolean> {
  if (typeof window === "undefined") return false;
  try {
    const res = await fetch("/api/premium/status", { cache: "no-store" });
    if (!res.ok) return false;
    const data = await res.json();
    return Boolean(data?.unlocked);
  } catch {
    return false;
  }
}
