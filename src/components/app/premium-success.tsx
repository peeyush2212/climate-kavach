"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useClimateKavachStore } from "@/lib/store";

export function PremiumSuccess() {
  const params = useSearchParams();
  const sessionId = params.get("session_id");
  const refreshPremiumStatus = useClimateKavachStore((s) => s.refreshPremiumStatus);
  const [state, setState] = React.useState<"loading" | "ok" | "error">("loading");
  const [message, setMessage] = React.useState("Verifying Stripe session...");

  React.useEffect(() => {
    async function verify() {
      if (!sessionId) {
        setState("error");
        setMessage("No Stripe session id was provided.");
        return;
      }
      try {
        const res = await fetch("/api/stripe/verify-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "Verification failed");
        await refreshPremiumStatus();
        setState("ok");
        setMessage("Payment verified. Premium download is now unlocked for this browser.");
      } catch (e: any) {
        setState("error");
        setMessage(e?.message || "Verification failed.");
      }
    }
    void verify();
  }, [sessionId, refreshPremiumStatus]);

  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-cyan-300/20 bg-slate-950/70 p-8 text-center shadow-[0_0_80px_rgba(34,211,238,.16)] backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-cyan-300/25 bg-cyan-300/10">
        {state === "loading" ? <Loader2 className="h-8 w-8 animate-spin text-cyan-300" /> : state === "ok" ? <CheckCircle2 className="h-8 w-8 text-emerald-300" /> : <XCircle className="h-8 w-8 text-rose-300" />}
      </div>
      <h1 className="mt-5 text-3xl font-black tracking-tight text-cyan-50">Premium Checkout</h1>
      <p className="mt-3 text-sm font-semibold leading-6 text-slate-400">{message}</p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link href="/premium"><Button>Go to Premium</Button></Link>
        {state === "ok" && <a href="/api/download/premium"><Button variant="outline">Download Premium Pack</Button></a>}
      </div>
    </div>
  );
}
