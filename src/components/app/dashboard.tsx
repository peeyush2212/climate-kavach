"use client";

import * as React from "react";
import { Activity, Cpu, Orbit, Satellite, SlidersHorizontal } from "lucide-react";
import { EnergySourcesChart } from "@/components/charts/EnergySourcesChart";
import { EmissionsChart } from "@/components/charts/EmissionsChart";
import { IndicatorChart } from "@/components/charts/IndicatorChart";
import { WaterfallChart } from "@/components/charts/WaterfallChart";
import { CompareEmissionsChart } from "@/components/charts/CompareEmissionsChart";
import { KpiCards } from "@/components/kpi-cards";
import { LeversPanel } from "@/components/levers-panel";
import { ScenarioControls } from "@/components/scenario-controls";
import { TemperaturePanel } from "@/components/temperature-panel";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useIndiaRoadsStore } from "@/lib/store";

export function Dashboard() {
  const inputs = useIndiaRoadsStore((s) => s.inputs);

  if (!inputs) {
    return <div className="text-sm text-slate-400">Loading model...</div>;
  }

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-2xl border border-cyan-300/20 bg-slate-950/70 p-5 shadow-[0_0_90px_rgba(34,211,238,.10)] backdrop-blur-xl sm:p-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_0%,rgba(34,211,238,.18),transparent_26rem),radial-gradient(circle_at_86%_0%,rgba(168,85,247,.14),transparent_28rem)]" />
        <div className="relative z-10 flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="border-cyan-300/30 bg-cyan-300/10 text-cyan-100">
                <Satellite className="mr-1 h-3 w-3" /> India‑ROADS X
              </Badge>
              <Badge variant="outline" className="border-fuchsia-300/25 bg-fuchsia-300/10 text-fuchsia-100">
                En‑ROADS layout • India data engine
              </Badge>
            </div>
            <h1 className="mt-4 max-w-4xl text-3xl font-black tracking-[-0.055em] text-cyan-50 sm:text-5xl">
              India climate pathway command deck
            </h1>
            <p className="mt-3 max-w-4xl text-sm font-semibold leading-6 text-slate-400">
              Tune En‑ROADS-style levers plus India-specific policy controls. The simulator recalculates energy supply,
              net GHG emissions, CO₂ concentration contribution, PM2.5 co-benefits and a 2100 temperature analog.
            </p>
          </div>
          <div className="grid min-w-[220px] grid-cols-2 gap-2 text-sm">
            <div className="rounded-xl border border-cyan-300/15 bg-slate-950/55 p-3">
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-slate-500"><Cpu className="h-3.5 w-3.5" /> Base</div>
              <div className="mt-1 text-2xl font-black text-cyan-50 tabular-nums">{inputs.meta.baseYear}</div>
            </div>
            <div className="rounded-xl border border-cyan-300/15 bg-slate-950/55 p-3">
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-slate-500"><Orbit className="h-3.5 w-3.5" /> Horizon</div>
              <div className="mt-1 text-2xl font-black text-cyan-50 tabular-nums">{inputs.meta.endYear}</div>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-5 xl:grid-cols-[1.1fr_1fr_310px]">
        <Card className="border-cyan-300/20 bg-slate-950/60">
          <CardContent className="pt-5"><EnergySourcesChart /></CardContent>
        </Card>
        <Card className="border-cyan-300/20 bg-slate-950/60">
          <CardContent className="pt-5"><EmissionsChart /></CardContent>
        </Card>
        <TemperaturePanel />
      </div>

      <KpiCards />

      <div className="grid gap-6 xl:grid-cols-[380px_1fr]">
        <ScenarioControls />
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border-cyan-300/15 bg-slate-950/55">
            <CardContent className="pt-5">
              <IndicatorChart title="Renewables share" field="renewables_share" yLabel="%" />
            </CardContent>
          </Card>
          <Card className="border-cyan-300/15 bg-slate-950/55">
            <CardContent className="pt-5">
              <IndicatorChart title="Energy intensity" field="energy_intensity" yLabel="MJ/$" />
            </CardContent>
          </Card>
          <Card className="border-cyan-300/15 bg-slate-950/55">
            <CardContent className="pt-5">
              <IndicatorChart title="PM2.5 exposure proxy" field="pm25_exposed_pct" yLabel="%" />
            </CardContent>
          </Card>
          <Card className="border-cyan-300/15 bg-slate-950/55">
            <CardContent className="pt-5">
              <IndicatorChart title="Clean energy share" field="clean_energy_share_pct" yLabel="%" />
            </CardContent>
          </Card>
        </div>
      </div>

      <CompareEmissionsChart />

      <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
        <Card className="border-cyan-300/15 bg-slate-950/55">
          <CardContent className="pt-5"><WaterfallChart /></CardContent>
        </Card>
        <Card className="border-cyan-300/15 bg-slate-950/55">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.14em] text-cyan-100">
              <Activity className="h-4 w-4" /> Live interpretation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm font-semibold leading-6 text-slate-400">
            <p>
              The top charts mimic the En‑ROADS front page: stacked energy supply, net greenhouse-gas emissions, and a large 2100 climate signal.
            </p>
            <p>
              India-specific levers—energy intensity, grid losses, clean cooking, manufacturing, urbanization, forests, R&D and air controls—connect the global-style controls to Indian data.
            </p>
            <p>
              Premium downloads are served from a protected API route, not from the public folder.
            </p>
          </CardContent>
        </Card>
      </div>

      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-5 w-5 text-cyan-300" />
          <h2 className="text-xl font-black tracking-[-0.03em] text-cyan-50">Simulation levers</h2>
        </div>
        <LeversPanel />
      </section>
    </div>
  );
}
