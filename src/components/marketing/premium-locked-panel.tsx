"use client";

import * as React from "react";
import { Database, Download, Lock, ShieldCheck, Sparkles } from "lucide-react";
import { ActionLink } from "@/components/marketing/action-link";
import { Button } from "@/components/ui/button";
import { useClimateKavachStore } from "@/lib/store";
import { cn } from "@/lib/utils";

type PremiumLockedPanelProps = {
  title?: string;
  description?: string;
  className?: string;
};

export function PremiumLockedPanel({
  title = "Premium data locked",
  description = "Unlock the full analysed India climate data pack through the existing Climate Kavach premium flow.",
  className,
}: PremiumLockedPanelProps) {
  const premium = useClimateKavachStore((s) => s.premiumUnlocked);
  const openPaywall = useClimateKavachStore((s) => s.openPaywall);
  const refreshPremiumStatus = useClimateKavachStore((s) => s.refreshPremiumStatus);

  React.useEffect(() => {
    void refreshPremiumStatus();
  }, [refreshPremiumStatus]);

  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-2xl border border-cyan-300/20 bg-slate-950/65 p-5 shadow-[0_0_70px_rgba(34,211,238,.12)] backdrop-blur-xl",
        className
      )}
      aria-label={premium ? "Premium data access active" : "Premium data locked"}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent" />
      <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-cyan-100">
            {premium ? <ShieldCheck className="h-3.5 w-3.5" /> : <Lock className="h-3.5 w-3.5" />}
            {premium ? "Premium access active" : "Premium data locked"}
          </div>
          <h2 className="mt-4 text-2xl font-black tracking-[-0.04em] text-cyan-50">{premium ? "Premium reports are unlocked" : title}</h2>
          <p className="mt-3 max-w-3xl text-sm font-semibold leading-6 text-slate-400">
            {premium
              ? "Your browser has a valid premium access cookie. You can download the protected premium ZIP from the existing server route."
              : description}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <ActionLink href="/api/download/sample" variant="outline">
              <Download className="h-4 w-4" />
              Download Sample
            </ActionLink>
            {premium ? (
              <ActionLink href="/api/download/premium">
                <Download className="h-4 w-4" />
                Download Premium
              </ActionLink>
            ) : (
              <>
                <Button onClick={openPaywall}>
                  <Lock className="h-4 w-4" />
                  Unlock Premium
                </Button>
                <ActionLink href="/premium" variant="outline">
                  <Sparkles className="h-4 w-4" />
                  Premium Page
                </ActionLink>
              </>
            )}
          </div>
        </div>

        <div className="rounded-xl border border-cyan-300/15 bg-slate-950/70 p-4">
          <div className="flex items-center gap-2 text-sm font-black text-cyan-100">
            <Database className="h-4 w-4 text-cyan-300" />
            Protected data route
          </div>
          <div className="mt-4 space-y-3 text-sm font-semibold text-slate-300">
            <div className="flex items-center justify-between gap-3 rounded-lg border border-cyan-300/10 bg-cyan-300/5 px-3 py-2">
              <span>Sample ZIP</span>
              <span className="text-emerald-300">Open</span>
            </div>
            <div className="flex items-center justify-between gap-3 rounded-lg border border-fuchsia-300/15 bg-fuchsia-300/5 px-3 py-2">
              <span>Premium ZIP</span>
              <span className={premium ? "text-emerald-300" : "text-yellow-300"}>{premium ? "Unlocked" : "Locked"}</span>
            </div>
            <div className="flex items-center justify-between gap-3 rounded-lg border border-cyan-300/10 bg-slate-900/65 px-3 py-2">
              <span>Payment system</span>
              <span className="text-cyan-200">Existing Stripe/UPI</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
