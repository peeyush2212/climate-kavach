"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { Database, Download, Lock, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useClimateKavachStore } from "@/lib/store";

export function PremiumPage() {
  const premium = useClimateKavachStore((s) => s.premiumUnlocked);
  const openPaywall = useClimateKavachStore((s) => s.openPaywall);
  const refreshPremiumStatus = useClimateKavachStore((s) => s.refreshPremiumStatus);
  const searchParams = useSearchParams();
  const canceled = searchParams.get("canceled") === "1";
  const deliveryEmail = searchParams.get("deliveryEmail") || "";

  React.useEffect(() => { void refreshPremiumStatus(); }, [refreshPremiumStatus]);
  React.useEffect(() => {
    if (deliveryEmail && !premium) openPaywall();
  }, [deliveryEmail, openPaywall, premium]);

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-2xl border border-cyan-300/20 bg-slate-950/70 p-6 shadow-[0_0_80px_rgba(34,211,238,.12)] backdrop-blur-xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(34,211,238,.18),transparent_24rem),radial-gradient(circle_at_90%_20%,rgba(168,85,247,.18),transparent_24rem)]" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.20em] text-cyan-300"><Sparkles className="h-4 w-4" /> Premium</div>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-cyan-50">Premium data and scenario packs</h1>
          <p className="mt-3 max-w-3xl text-sm font-semibold leading-6 text-slate-400">
            Sample data is always free. The premium pack is locked behind a verified Stripe checkout and a secure server-side cookie. Data and materials are emailed after payment.
          </p>
        </div>
      </section>

      {canceled && <div className="rounded-xl border border-yellow-300/20 bg-yellow-300/10 p-4 text-sm font-semibold text-yellow-100">Checkout canceled. You can retry whenever you want.</div>}

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-cyan-300/20 bg-slate-950/60 p-5 backdrop-blur-xl">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-lg font-black text-cyan-50"><Database className="h-5 w-5 text-cyan-300" /> Sample Data Pack</div>
              <p className="mt-2 text-sm leading-6 text-slate-400">A small free pack with model notes, a sample scenario output, and the open variable map.</p>
            </div>
            <Badge variant="success">Free</Badge>
          </div>
          <ul className="mt-4 space-y-2 text-sm font-semibold text-slate-300">
            <li>- Sample scenario CSV</li>
            <li>- Public model notes</li>
            <li>- Slider map excerpt</li>
          </ul>
          <a href="/api/download/sample" className="mt-5 inline-flex"><Button variant="outline"><Download className="h-4 w-4" /> Download sample</Button></a>
        </div>

        <div className="rounded-2xl border border-fuchsia-300/20 bg-slate-950/60 p-5 backdrop-blur-xl">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-lg font-black text-cyan-50"><Lock className="h-5 w-5 text-fuchsia-300" /> Premium Data Pack</div>
              <p className="mt-2 text-sm leading-6 text-slate-400">Full scenario templates, additional peer benchmarks, and premium coefficient notes delivered to your Gmail after payment.</p>
            </div>
            <Badge variant={premium ? "success" : "warn"}>{premium ? "Unlocked" : "Rs 500 locked"}</Badge>
          </div>
          <ul className="mt-4 space-y-2 text-sm font-semibold text-slate-300">
            <li className="flex gap-2"><ShieldCheck className="h-4 w-4 text-emerald-300" /> Full 2021–2100 scenario output templates</li>
            <li className="flex gap-2"><ShieldCheck className="h-4 w-4 text-emerald-300" /> India-specific calibration notes</li>
            <li className="flex gap-2"><ShieldCheck className="h-4 w-4 text-emerald-300" /> Peer country benchmark extracts</li>
          </ul>
          <div className="mt-5 flex flex-wrap gap-2">
            {premium ? (
              <a href="/api/download/premium"><Button><Download className="h-4 w-4" /> Download premium</Button></a>
            ) : (
              <Button onClick={openPaywall}><Lock className="h-4 w-4" /> Unlock Premium</Button>
            )}
            <Button variant="outline" onClick={() => refreshPremiumStatus()}>Refresh status</Button>
          </div>
          <div className="mt-4 rounded-xl border border-cyan-300/15 bg-slate-950/55 p-3 text-xs leading-5 text-slate-500">
            Premium file is not in /public; direct URL guessing cannot download it. The API checks a signed httpOnly cookie before serving the ZIP.
          </div>
        </div>
      </div>
    </div>
  );
}
