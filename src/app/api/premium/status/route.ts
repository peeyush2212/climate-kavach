import { NextResponse } from "next/server";
import { PREMIUM_COOKIE, verifyPremiumToken } from "@/lib/premiumServer";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const token = (req as any).cookies?.get?.(PREMIUM_COOKIE)?.value;
  // Next's Web Request does not always expose cookies in older builds, so parse header too.
  const raw = req.headers.get("cookie") || "";
  const headerToken = raw.split(";").map((s) => s.trim()).find((s) => s.startsWith(`${PREMIUM_COOKIE}=`))?.split("=")[1];
  return NextResponse.json({ unlocked: verifyPremiumToken(token || headerToken) });
}
