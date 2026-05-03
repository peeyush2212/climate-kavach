import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { PREMIUM_COOKIE, verifyPremiumToken } from "@/lib/premiumServer";

export const runtime = "nodejs";

function getCookie(req: Request, name: string) {
  const raw = req.headers.get("cookie") || "";
  return raw.split(";").map((s) => s.trim()).find((s) => s.startsWith(`${name}=`))?.split("=")[1];
}

export async function GET(req: Request) {
  const token = getCookie(req, PREMIUM_COOKIE);
  if (!verifyPremiumToken(token)) {
    return NextResponse.json({ error: "Premium download locked. Complete Stripe checkout first." }, { status: 402 });
  }
  const file = path.join(process.cwd(), "data", "premium", "climate_kavach_premium_data_pack.zip");
  const buf = fs.readFileSync(file);
  return new NextResponse(buf, {
    status: 200,
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": "attachment; filename=climate_kavach_premium_data_pack.zip",
    },
  });
}
