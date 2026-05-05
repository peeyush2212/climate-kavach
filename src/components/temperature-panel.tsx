"use client";

import * as React from "react";
import { Thermometer, Zap } from "lucide-react";
import { summarize2050 } from "@/lib/simulator";
import { useClimateKavachStore } from "@/lib/store";
import { formatNumber } from "@/lib/utils";

export function TemperaturePanel({ compact = false }: { compact?: boolean }) {
  const sim = useClimateKavachStore((s) => s.sim);
  const baselineSim = useClimateKavachStore((s) => s.baselineSim);
  const values = React.useMemo(() => {
    if (!sim || !baselineSim) return null;
    return { c: summarize2050(sim), b: summarize2050(baselineSim) };
  }, [sim, baselineSim]);

  if (!values) return null;
  const delta = values.c.temperature2100 - values.b.temperature2100;
  const sign = delta >= 0 ? "+" : "−";

  return (
    <div className={`relative h-full overflow-hidden rounded-2xl border border-cyan-300/20 bg-slate-950/70 p-5 shadow-[0_0_70px_rgba(34,211,238,.12)] backdrop-blur-xl ${compact ? "min-h-[285px]" : "min-h-[330px]"}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(34,211,238,.24),transparent_13rem),radial-gradient(circle_at_80%_70%,rgba(168,85,247,.20),transparent_18rem)]" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
        <div className="mb-3 flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-cyan-200">
          <Thermometer className="h-3.5 w-3.5" /> 2100 signal
        </div>
        <div className={`font-black leading-none tracking-[-0.08em] text-cyan-300 drop-shadow-[0_0_24px_rgba(34,211,238,.55)] ${compact ? "text-[3.8rem] md:text-[4.5rem]" : "text-[4.5rem] md:text-[5.4rem]"}`}>
          +{formatNumber(values.c.temperature2100, { maximumFractionDigits: 1 })}
          <span className="ml-1 align-super text-3xl tracking-normal">°C</span>
        </div>
        <div className="mt-3 h-px w-36 bg-cyan-300/35" />
        <div className={`mt-3 text-xl font-black tabular-nums ${delta <= 0 ? "text-emerald-300" : "text-rose-300"}`}>
          {sign}{formatNumber(Math.abs(delta), { maximumFractionDigits: 1 })}°C vs baseline
        </div>
        <div className="mt-4 max-w-[250px] text-sm font-black leading-6 text-slate-100">
          Global-equivalent temperature analog by 2100
        </div>
        <div className={`${compact ? "mt-2" : "mt-3"} max-w-[270px] text-xs leading-5 text-slate-500`}>
          The India-only contribution is {formatNumber(values.c.indiaTempContribution2100, { maximumFractionDigits: 3 })}°C in this simplified TCRE module; the large display is an En-ROADS-style pathway analog.
        </div>
        <div className="mt-5 flex items-center gap-2 rounded-xl border border-cyan-300/15 bg-slate-950/55 px-3 py-2 text-xs font-bold text-slate-400">
          <Zap className="h-4 w-4 text-cyan-300" /> {formatNumber(values.c.ppmContribution2100, { maximumFractionDigits: 1 })} ppm India CO2 contribution
        </div>
      </div>
    </div>
  );
}
