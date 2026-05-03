import { NextResponse } from "next/server";
import Stripe from "stripe";
import { PREMIUM_COOKIE, createPremiumToken } from "@/lib/premiumServer";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { sessionId } = await req.json();
    if (!sessionId || typeof sessionId !== "string") {
      return NextResponse.json({ error: "Missing sessionId" }, { status: 400 });
    }
    const secret = process.env.STRIPE_SECRET_KEY;
    if (!secret) {
      return NextResponse.json({ error: "STRIPE_SECRET_KEY is not configured." }, { status: 400 });
    }
    const stripe = new Stripe(secret, { apiVersion: "2023-10-16" });
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const paid = session.payment_status === "paid" && session.metadata?.product === "climate-kavach-premium";
    if (!paid) {
      return NextResponse.json({ error: "Stripe session is not paid or not a premium session." }, { status: 402 });
    }

    const token = createPremiumToken(session.id);
    const res = NextResponse.json({ unlocked: true });
    res.cookies.set(PREMIUM_COOKIE, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
    return res;
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Unable to verify Stripe session" }, { status: 500 });
  }
}
