"use client";

import * as React from "react";
import { ArrowDownRight, ArrowUpRight, Cloud, Flame, Leaf, Wind, Zap, Activity } from "lucide-react";
import { summarize2050 } from "@/lib/simulator";
import { useClimateKavachStore } from "@/lib/store";
import { formatNumber } from "@/lib/utils";

function Delta({ value, unit, positiveIsGood = false }: { value: number; unit: string; positiveIsGood?: boolean }) {
  if (!isFinite(value) || Math.abs(value) < 1e-9) return <span className="text-[11px] text-slate-500">baseline</span>;
  const isDown = value < 0;
  const Icon = isDown ? ArrowDownRight : ArrowUpRight;
  const good = positiveIsGood ? value > 0 : value < 0;
  return (
    <div className={`flex items-center gap-1 text-[11px] font-black ${good ? "text-emerald-300" : "text-rose-300"}`}>
      <Icon className="h-3 w-3" />
      <span>{formatNumber(Math.abs(value), { maximumFractionDigits: 1 })} {unit}</span>
    </div>
  );
}

export function KpiCards() {
  const baselineSim = useClimateKavachStore((s) => s.baselineSim);
  const sim = useClimateKavachStore((s) => s.sim);

  const data = React.useMemo(() => {
    if (!baselineSim || !sim) return null;
    return { b: summarize2050(baselineSim), c: summarize2050(sim) };
  }, [baselineSim, sim]);

  if (!data) return null;

  const { b, c } = data;
  const cards = [
    { icon: Flame, title: "2050 Net GHG", value: `${formatNumber(c.netGhg2050 / 1000, { maximumFractionDigits: 2 })} Gt`, delta: (c.netGhg2050 - b.netGhg2050) / 1000, unit: "Gt" },
    { icon: Cloud, title: "2100 Atm. CO2", value: `${formatNumber(c.ppmContribution2100, { maximumFractionDigits: 1 })} ppm`, delta: c.ppmContribution2100 - b.ppmContribution2100, unit: "ppm" },
    { icon: Zap, title: "Primary Energy 2100", value: `${formatNumber(c.primaryEnergy2100, { maximumFractionDigits: 0 })} EJ`, delta: c.primaryEnergy2100 - b.primaryEnergy2100, unit: "EJ", positiveIsGood: false },
    { icon: Leaf, title: "Renewables 2050", value: `${formatNumber(c.renewables2050, { maximumFractionDigits: 0 })}%`, delta: c.renewables2050 - b.renewables2050, unit: "pp", positiveIsGood: true },
    { icon: Wind, title: "PM2.5 Exposure", value: `${formatNumber(c.pm25_2050, { maximumFractionDigits: 1 })}%`, delta: c.pm25_2050 - b.pm25_2050, unit: "pp" },
    { icon: Activity, title: "Temperature Analog", value: `+${formatNumber(c.temperature2100, { maximumFractionDigits: 1 })}°C`, delta: c.temperature2100 - b.temperature2100, unit: "°C" },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6">
      {cards.map((x) => {
        const Icon = x.icon;
        return (
          <div key={x.title} className="group relative overflow-hidden rounded-xl border border-cyan-300/20 bg-slate-950/65 p-4 shadow-[0_0_40px_rgba(8,145,178,.08)] backdrop-blur-xl">
            <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,.16),transparent_16rem)]" />
            <div className="relative z-10 flex items-center justify-between gap-2">
              <div className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">{x.title}</div>
              <Icon className="h-4 w-4 text-cyan-300" />
            </div>
            <div className="relative z-10 mt-3 text-2xl font-black tabular-nums text-slate-50">{x.value}</div>
            <div className="relative z-10 mt-1"><Delta value={x.delta} unit={x.unit} positiveIsGood={Boolean((x as any).positiveIsGood)} /></div>
          </div>
        );
      })}
    </div>
  );
}
