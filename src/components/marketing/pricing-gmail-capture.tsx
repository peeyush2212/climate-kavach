"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const DELIVERY_EMAIL_KEY = "climate_kavach_delivery_gmail";
const gmailPattern = /^[^\s@]+@gmail\.com$/i;

export function PricingGmailCapture() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    const saved = window.localStorage.getItem(DELIVERY_EMAIL_KEY);
    if (saved) setEmail(saved);
  }, []);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!gmailPattern.test(trimmed)) {
      setError("Enter a valid Gmail address.");
      return;
    }

    window.localStorage.setItem(DELIVERY_EMAIL_KEY, trimmed);
    router.push(`/premium?deliveryEmail=${encodeURIComponent(trimmed)}`);
  }

  return (
    <form onSubmit={onSubmit} className="rounded-xl border border-cyan-300/20 bg-slate-950/55 p-4">
      <label className="text-sm font-black text-cyan-50" htmlFor="pricing-delivery-gmail">
        Gmail address for delivery
      </label>
      <div className="mt-3 flex gap-2">
        <div className="relative min-w-0 flex-1">
          <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-300" />
          <input
            id="pricing-delivery-gmail"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            type="email"
            inputMode="email"
            placeholder="name@gmail.com"
            className="h-10 w-full rounded-lg border border-cyan-300/15 bg-slate-950/80 pl-9 pr-3 text-sm font-semibold text-slate-100 outline-none placeholder:text-slate-500 focus:border-cyan-300/60"
          />
        </div>
        <Button type="submit">Continue</Button>
      </div>
      <p className="mt-3 text-xs font-semibold leading-5 text-slate-400">
        Data and materials will be emailed to this Gmail address after payment is made.
      </p>
      {error && <div className="mt-2 text-xs font-semibold text-red-200">{error}</div>}
    </form>
  );
}
