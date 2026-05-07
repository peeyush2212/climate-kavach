"use client";

import * as React from "react";
import { Copy, ExternalLink, Lock, Mail, ShieldCheck, Sparkles } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useClimateKavachStore } from "@/lib/store";

const UPI_ID = "peeyush2212@okhdfcbank";
const AMOUNT_INR = 500;
const DELIVERY_EMAIL_KEY = "climate_kavach_delivery_gmail";
const gmailPattern = /^[^\s@]+@gmail\.com$/i;

function buildUpiUri() {
  const params = new URLSearchParams({
    pa: UPI_ID,
    pn: "Peeyush Jha",
    am: String(AMOUNT_INR),
    cu: "INR",
    tn: "Climate Kavach Premium Data Pack",
  });
  return `upi://pay?${params.toString()}`;
}

export function PaywallModal() {
  const open = useClimateKavachStore((s) => s.paywallOpen);
  const close = useClimateKavachStore((s) => s.closePaywall);
  const refreshPremiumStatus = useClimateKavachStore((s) => s.refreshPremiumStatus);
  const [status, setStatus] = React.useState<string>("");
  const [loading, setLoading] = React.useState(false);
  const [deliveryEmail, setDeliveryEmail] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const upiUri = React.useMemo(() => buildUpiUri(), []);

  function saveDeliveryEmail() {
    const trimmed = deliveryEmail.trim();
    if (!gmailPattern.test(trimmed)) {
      setEmailError("Enter a valid Gmail address.");
      return false;
    }
    window.localStorage.setItem(DELIVERY_EMAIL_KEY, trimmed);
    setEmailError("");
    return true;
  }

  async function startStripeCheckout() {
    setStatus("");
    if (!saveDeliveryEmail()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amountInr: AMOUNT_INR, deliveryEmail: deliveryEmail.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus(data?.error || "Stripe checkout is not configured yet. Add STRIPE_SECRET_KEY in Vercel.");
        return;
      }
      if (data?.url) window.location.href = data.url;
      else setStatus("Stripe response did not include a checkout URL.");
    } catch (e: any) {
      setStatus(e?.message || "Stripe checkout failed.");
    } finally {
      setLoading(false);
    }
  }

  async function copyUpi() {
    await navigator.clipboard.writeText(UPI_ID);
    setStatus("UPI ID copied.");
    setTimeout(() => setStatus(""), 1300);
  }

  function openUpiApp() {
    setStatus("");
    if (!saveDeliveryEmail()) return;
    window.location.href = upiUri;
  }

  React.useEffect(() => {
    if (!open) return;
    void refreshPremiumStatus();

    const params = new URLSearchParams(window.location.search);
    const fromQuery = params.get("deliveryEmail") || "";
    const saved = window.localStorage.getItem(DELIVERY_EMAIL_KEY) || "";
    const next = fromQuery || saved;
    if (next) {
      setDeliveryEmail(next);
      setEmailError("");
      window.localStorage.setItem(DELIVERY_EMAIL_KEY, next);
    }
  }, [open, refreshPremiumStatus]);

  return (
    <Dialog open={open} onOpenChange={(v) => (!v ? close() : null)}>
      <DialogContent className="max-w-4xl border-cyan-300/25 bg-slate-950/95 text-slate-100 shadow-[0_0_90px_rgba(34,211,238,.20)]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl font-black tracking-tight text-cyan-50">
            <Lock className="h-5 w-5 text-cyan-300" /> Unlock Premium Data Pack
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            Rs {AMOUNT_INR} one-time access. Data and materials will be emailed to your Gmail after payment is made.
          </DialogDescription>
        </DialogHeader>

        <div className="rounded-xl border border-cyan-300/20 bg-slate-900/55 p-4">
          <label className="text-sm font-black text-cyan-50" htmlFor="paywall-delivery-gmail">
            Gmail address for delivery
          </label>
          <div className="mt-3 relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-300" />
            <input
              id="paywall-delivery-gmail"
              value={deliveryEmail}
              onChange={(e) => {
                setDeliveryEmail(e.target.value);
                setEmailError("");
              }}
              type="email"
              inputMode="email"
              placeholder="name@gmail.com"
              className="h-10 w-full rounded-lg border border-cyan-300/15 bg-slate-950/80 pl-9 pr-3 text-sm font-semibold text-slate-100 outline-none placeholder:text-slate-500 focus:border-cyan-300/60"
            />
          </div>
          <p className="mt-2 text-xs font-semibold leading-5 text-slate-400">
            Use a Gmail address so the premium data pack and materials can be sent after payment confirmation.
          </p>
          {emailError && <div className="mt-2 text-xs font-semibold text-red-200">{emailError}</div>}
        </div>

        <Tabs defaultValue="upi">
          <TabsList className="bg-slate-900/90">
            <TabsTrigger value="upi">UPI / GPay</TabsTrigger>
            <TabsTrigger value="stripe">Stripe Checkout</TabsTrigger>
          </TabsList>

          <TabsContent value="upi">
            <div className="grid gap-5 md:grid-cols-[360px_1fr]">
              <div className="rounded-2xl border border-cyan-300/20 bg-slate-900/55 p-4">
                <div className="text-sm font-black uppercase tracking-[0.18em] text-cyan-200">Scan & Pay</div>
                <div className="mt-2 text-xs font-semibold text-slate-400">Pay Rs {AMOUNT_INR} to {UPI_ID}</div>
                <div className="mt-4 flex items-center justify-center overflow-hidden rounded-2xl bg-white p-2">
                  <img src="/payments/gpay_qr.png" alt="GPay QR for peeyush2212@okhdfcbank" className="max-h-[430px] w-full rounded-xl object-contain" />
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button variant="outline" onClick={copyUpi}><Copy className="h-4 w-4" /> Copy UPI ID</Button>
                  <Button variant="outline" onClick={openUpiApp}><ExternalLink className="h-4 w-4" /> Open UPI App</Button>
                </div>
                <p className="mt-3 text-xs leading-5 text-slate-500">
                  UPI payments cannot be verified automatically in this build. Use Stripe for instant unlock; UPI can be manually reconciled later.
                </p>
              </div>

              <div className="rounded-2xl border border-cyan-300/20 bg-slate-900/55 p-5">
                <div className="flex items-center gap-2 text-lg font-black text-cyan-50"><Sparkles className="h-5 w-5 text-cyan-300" /> Premium includes</div>
                <ul className="mt-4 space-y-3 text-sm font-semibold text-slate-300">
                  <li className="flex gap-2"><ShieldCheck className="h-4 w-4 shrink-0 text-emerald-300" /> Full scenario output pack with 2021-2100 data.</li>
                  <li className="flex gap-2"><ShieldCheck className="h-4 w-4 shrink-0 text-emerald-300" /> India-specific coefficient notes and calibrated lever templates.</li>
                  <li className="flex gap-2"><ShieldCheck className="h-4 w-4 shrink-0 text-emerald-300" /> Premium JSON presets for aggressive, balanced, and delayed-transition pathways.</li>
                  <li className="flex gap-2"><ShieldCheck className="h-4 w-4 shrink-0 text-emerald-300" /> Additional peer-country benchmark extracts.</li>
                </ul>
                <div className="mt-6 rounded-xl border border-yellow-300/20 bg-yellow-300/10 p-4 text-sm text-yellow-100">
                  Premium remains locked unless a verified Stripe session creates a secure httpOnly cookie. No localStorage unlock is used.
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="stripe">
            <div className="rounded-2xl border border-cyan-300/20 bg-slate-900/55 p-5">
              <div className="text-lg font-black text-cyan-50">Stripe Checkout - Rs {AMOUNT_INR}</div>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                This creates a Stripe Checkout Session. On success, the app verifies the session server-side and mints a secure premium cookie, which unlocks the protected download endpoint.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Button onClick={startStripeCheckout} disabled={loading}>{loading ? "Creating checkout..." : `Checkout Rs ${AMOUNT_INR}`}</Button>
                <a href="/api/download/sample"><Button variant="outline"><ExternalLink className="h-4 w-4" /> Download sample first</Button></a>
              </div>
              <div className="mt-4 rounded-xl border border-cyan-300/15 bg-slate-950/60 p-3 text-xs text-slate-500">
                Required Vercel env vars: <span className="font-mono text-slate-300">STRIPE_SECRET_KEY</span>, optional <span className="font-mono text-slate-300">STRIPE_PRICE_ID</span>, and recommended <span className="font-mono text-slate-300">PREMIUM_COOKIE_SECRET</span>.
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {status && <div className="rounded-lg border border-cyan-300/15 bg-cyan-300/10 p-3 text-sm font-semibold text-cyan-100">{status}</div>}

        <DialogFooter>
          <Button variant="outline" onClick={close}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
