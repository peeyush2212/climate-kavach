"use client";

import * as React from "react";
import { Info } from "lucide-react";
import { leverGroups, leverSpecs, type LeverSpec } from "@/lib/uiConfig";
import { useIndiaRoadsStore } from "@/lib/store";
import { Slider } from "@/components/ui/slider";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn, formatNumber } from "@/lib/utils";

function isActionSlider(l: LeverSpec) {
  return l.min === -100 && l.max === 100;
}

function formatLeverValue(l: LeverSpec, v: number) {
  if (!isFinite(v)) return "–";
  if (isActionSlider(l)) {
    if (Math.abs(v) < 0.5) return "status quo";
    const side = v > 0 ? (l.highLabel ?? "higher") : (l.lowLabel ?? "lower");
    return `${side} ${Math.abs(v).toFixed(0)}`;
  }
  if (l.key === "Pop2050_billion") return `${v.toFixed(2)} B`;
  if (l.key === "GDPpc_CAGR_pct" || l.key === "EI_improve_pct_per_year") return `${v.toFixed(1)}%/yr`;
  if (l.key === "CarbonPrice_INR_tCO2") return `₹${formatNumber(v, { maximumFractionDigits: 0 })}/t`;
  if (l.key === "RD2050_pct_gdp") return `${v.toFixed(2)}% GDP`;
  if (l.key === "AirControls_strength") return `${Math.round(v * 100)}%`; 
  if (String(l.key).includes("pct") || String(l.key).includes("2050")) return `${v.toFixed(0)}%`;
  return formatNumber(v);
}

function SliderCard({ spec }: { spec: LeverSpec }) {
  const scenario = useIndiaRoadsStore((s) => s.scenario);
  const setScenario = useIndiaRoadsStore((s) => s.setScenario);
  if (!scenario) return null;
  const v = scenario[spec.key];
  const action = isActionSlider(spec);

  return (
    <div className="group/lever relative rounded-xl border border-cyan-300/10 bg-slate-950/50 px-3 py-3 transition-colors hover:border-cyan-300/30 hover:bg-cyan-300/5">
      <div className="absolute inset-0 rounded-xl opacity-0 transition-opacity group-hover/lever:opacity-100 bg-[radial-gradient(circle_at_70%_0%,rgba(34,211,238,.12),transparent_12rem)]" />
      <div className="relative z-10 flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <div className="truncate text-[15px] font-black text-slate-100">{spec.title}</div>
          <Tooltip>
            <TooltipTrigger asChild>
              <button type="button" className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-slate-500 hover:bg-cyan-300/10 hover:text-cyan-200" aria-label={`Help: ${spec.title}`}>
                <Info className="h-3.5 w-3.5" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <div className="max-w-xs">{spec.help}</div>
            </TooltipContent>
          </Tooltip>
        </div>
        <div className="shrink-0 rounded-md border border-cyan-300/15 bg-slate-900/70 px-2 py-1 text-[11px] font-black text-cyan-100 tabular-nums">
          {formatLeverValue(spec, v)}
        </div>
      </div>

      <div className="relative z-10 mt-3">
        <Slider value={[v]} min={spec.min} max={spec.max} step={spec.step} onValueChange={(val) => setScenario({ [spec.key]: val[0] } as any)} aria-label={spec.title} />
      </div>
      <div className="relative z-10 mt-2 grid grid-cols-3 text-[10px] font-black uppercase tracking-[0.08em] text-slate-500">
        <span className="truncate text-left">{spec.lowLabel ?? `${spec.min}`}</span>
        <span className="truncate text-center text-slate-400">{spec.statusLabel ?? (action ? "status quo" : "target")}</span>
        <span className="truncate text-right">{spec.highLabel ?? `${spec.max}`}</span>
      </div>
    </div>
  );
}

export function LeversPanel({ className }: { className?: string }) {
  const scenario = useIndiaRoadsStore((s) => s.scenario);
  if (!scenario) return <div className={cn("rounded-lg border border-cyan-300/20 p-4 text-slate-400", className)}>Loading levers…</div>;

  return (
    <TooltipProvider>
      <div className={cn("grid gap-4 lg:grid-cols-2 2xl:grid-cols-3", className)}>
        {leverGroups.map((group) => {
          const specs = leverSpecs.filter((l) => l.group === group);
          const wide = group === "Energy Supply" || group === "India Specific";
          return (
            <section key={group} className={cn("rounded-2xl border border-cyan-300/20 bg-slate-950/60 p-4 shadow-[0_0_45px_rgba(8,145,178,.08)] backdrop-blur-xl", wide && "2xl:col-span-1")}>
              <div className="mb-3 flex items-center justify-between gap-3 border-b border-cyan-300/10 pb-3">
                <h3 className="text-center text-sm font-black uppercase tracking-[0.16em] text-cyan-100">{group}</h3>
                <span className="rounded-full border border-cyan-300/15 bg-cyan-300/10 px-2 py-0.5 text-[10px] font-black text-cyan-200">{specs.length}</span>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {specs.map((l) => <SliderCard key={l.key} spec={l} />)}
              </div>
            </section>
          );
        })}
      </div>
    </TooltipProvider>
  );
}
