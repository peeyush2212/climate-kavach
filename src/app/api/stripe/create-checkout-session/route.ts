import { NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";

const gmailPattern = /^[^\s@]+@gmail\.com$/i;

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const amountInr = Math.max(1, Number(body?.amountInr ?? 500));
    const deliveryEmail = typeof body?.deliveryEmail === "string" ? body.deliveryEmail.trim() : "";
    if (deliveryEmail && !gmailPattern.test(deliveryEmail)) {
      return NextResponse.json({ error: "Enter a valid Gmail address for delivery." }, { status: 400 });
    }
    const secret = process.env.STRIPE_SECRET_KEY;
    if (!secret) {
      return NextResponse.json({ error: "STRIPE_SECRET_KEY is not set. Configure Stripe env vars on Vercel to enable checkout." }, { status: 400 });
    }

    const stripe = new Stripe(secret, { apiVersion: "2023-10-16" });
    const origin = req.headers.get("origin") || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const priceId = process.env.STRIPE_PRICE_ID;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: priceId
        ? [{ price: priceId, quantity: 1 }]
        : [
            {
              price_data: {
                currency: "inr",
                product_data: {
                  name: "Climate Kavach Premium Data Pack",
                  description: "One-time premium scenario and data pack",
                },
                unit_amount: Math.round(amountInr * 100),
              },
              quantity: 1,
            },
          ],
      success_url: `${origin}/premium/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/premium?canceled=1`,
      customer_email: deliveryEmail || undefined,
      metadata: { product: "climate-kavach-premium", amountInr: String(amountInr), deliveryEmail },
    });

    return NextResponse.json({ url: session.url });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Stripe error" }, { status: 500 });
  }
}
