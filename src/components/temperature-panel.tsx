"use client";

import * as React from "react";
import { Target, Thermometer, Zap } from "lucide-react";
import { summarize2050 } from "@/lib/simulator";
import { useClimateKavachStore } from "@/lib/store";
import type { SimulationRow } from "@/lib/types";
import { clamp, formatNumber } from "@/lib/utils";

function findYear(rows: SimulationRow[], year: number) {
  return rows.find((row) => row.year === year) ?? rows[rows.length - 1];
}

export function TemperaturePanel({ compact = false }: { compact?: boolean }) {
  const sim = useClimateKavachStore((s) => s.sim);
  const baselineSim = useClimateKavachStore((s) => s.baselineSim);
  const values = React.useMemo(() => {
    if (!sim || !baselineSim) return null;
    const current2070 = findYear(sim.rows, 2070);
    const baseline2070 = findYear(baselineSim.rows, 2070);
    const baselineNet2070 = Math.max(1, baseline2070.net_emissions_mtco2);
    const netZeroScore = current2070.net_emissions_mtco2 <= 0
      ? 100
      : clamp(100 * (1 - current2070.net_emissions_mtco2 / baselineNet2070), 0, 100);

    return {
      c: summarize2050(sim),
      b: summarize2050(baselineSim),
      netZeroScore,
      netCo22070: current2070.net_emissions_mtco2,
    };
  }, [sim, baselineSim]);

  if (!values) return null;
  const delta = values.c.temperature2100 - values.b.temperature2100;
  const sign = delta >= 0 ? "+" : "-";

  return (
    <div
      className={`relative h-full overflow-hidden rounded-2xl border border-cyan-300/20 bg-slate-950/70 shadow-[0_0_70px_rgba(34,211,238,.12)] backdrop-blur-xl ${
        compact ? "min-h-[260px] p-3" : "min-h-[330px] p-5"
      }`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(34,211,238,.24),transparent_13rem),radial-gradient(circle_at_80%_70%,rgba(168,85,247,.20),transparent_18rem)]" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
        <div
          className={`${
            compact ? "mb-2 px-2.5 py-1 text-[10px]" : "mb-3 px-3 py-1 text-xs"
          } flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-300/10 font-black uppercase tracking-[0.2em] text-cyan-200`}
        >
          <Thermometer className="h-3.5 w-3.5" /> 2100 signal
        </div>

        <div
          className={`font-black leading-none text-cyan-300 drop-shadow-[0_0_24px_rgba(34,211,238,.55)] ${
            compact ? "text-[2.35rem] md:text-[2.65rem]" : "text-[4.5rem] md:text-[5.4rem]"
          }`}
        >
          +{formatNumber(values.c.temperature2100, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          <span className={`${compact ? "text-lg" : "text-3xl"} ml-1 align-super tracking-normal`}>&deg;C</span>
        </div>

        <div className={`${compact ? "mt-2 w-28" : "mt-3 w-36"} h-px bg-cyan-300/35`} />
        <div className={`${compact ? "mt-2 text-sm" : "mt-3 text-xl"} font-black tabular-nums ${delta <= 0 ? "text-emerald-300" : "text-rose-300"}`}>
          {sign}{formatNumber(Math.abs(delta), { minimumFractionDigits: 3, maximumFractionDigits: 3 })}&deg;C vs baseline
        </div>

        <div className={`${compact ? "mt-2 text-[11px]" : "mt-4 text-sm"} max-w-[250px] font-black leading-5 text-slate-100`}>
          Global-equivalent temperature analog by 2100
        </div>
        <div className={`${compact ? "mt-1.5" : "mt-3"} max-w-[270px] text-xs leading-5 text-slate-500`}>
          India-only: {formatNumber(values.c.indiaTempContribution2100, { minimumFractionDigits: 4, maximumFractionDigits: 4 })}&deg;C.
          PPM: {formatNumber(values.c.ppmContribution2100, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}.
        </div>

        <div className={`${compact ? "mt-2.5 p-2.5" : "mt-5 p-3"} w-full max-w-[280px] rounded-xl border border-cyan-300/15 bg-slate-950/55`}>
          <div className="flex items-center justify-between gap-3 text-xs font-black text-slate-300">
            <span className="flex items-center gap-2">
              <Target className="h-4 w-4 text-emerald-300" />
              2070 net-zero score
            </span>
            <span className="text-cyan-100">{formatNumber(values.netZeroScore, { maximumFractionDigits: 0 })}/100</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-rose-300 via-yellow-200 to-emerald-300"
              style={{ width: `${values.netZeroScore}%` }}
            />
          </div>
          {!compact && (
            <div className="mt-2 flex items-center gap-2 text-xs font-bold text-slate-500">
              <Zap className="h-4 w-4 text-cyan-300" />
              {formatNumber(values.netCo22070, { maximumFractionDigits: 1 })} MtCO2 net in 2070
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
