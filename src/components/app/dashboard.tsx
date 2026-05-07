"use client";

import * as React from "react";
import { Copy, Download, Lock, RotateCcw, Save, SlidersHorizontal } from "lucide-react";
import { EnergySourcesChart } from "@/components/charts/EnergySourcesChart";
import { EmissionsChart } from "@/components/charts/EmissionsChart";
import { CompareEmissionsChart } from "@/components/charts/CompareEmissionsChart";
import { NikeSponsoredAd } from "@/components/ads/nike-sponsored-ad";
import { KpiCards } from "@/components/kpi-cards";
import { ScenarioControls } from "@/components/scenario-controls";
import { TemperaturePanel } from "@/components/temperature-panel";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { encodeScenario } from "@/lib/scenarioCodec";
import { toCsv } from "@/lib/simulator";
import { useClimateKavachStore } from "@/lib/store";
import { leverGroups, leverSpecs, type LeverSpec } from "@/lib/uiConfig";
import { downloadText, formatNumber } from "@/lib/utils";

function isActionSlider(l: LeverSpec) {
  return l.min === -100 && l.max === 100;
}

function formatLeverValue(l: LeverSpec, v: number) {
  if (!isFinite(v)) return "-";
  if (isActionSlider(l)) {
    if (Math.abs(v) < 0.5) return "status quo";
    return `${v > 0 ? (l.highLabel ?? "higher") : (l.lowLabel ?? "lower")} ${Math.abs(v).toFixed(0)}`;
  }
  if (l.key === "Pop2050_billion") return `${v.toFixed(2)} B`;
  if (l.key === "GDPpc_CAGR_pct" || l.key === "EI_improve_pct_per_year") return `${v.toFixed(1)}%/yr`;
  if (l.key === "CarbonPrice_INR_tCO2") return `Rs ${formatNumber(v, { maximumFractionDigits: 0 })}/t`;
  if (l.key === "RD2050_pct_gdp") return `${v.toFixed(2)}% GDP`;
  if (l.key === "AirControls_strength") return `${Math.round(v * 100)}%`;
  if (String(l.key).includes("pct") || String(l.key).includes("2050")) return `${v.toFixed(0)}%`;
  return formatNumber(v);
}

function CompactScenarioBar() {
  const scenario = useClimateKavachStore((s) => s.scenario);
  const sim = useClimateKavachStore((s) => s.sim);
  const premium = useClimateKavachStore((s) => s.premiumUnlocked);
  const openPaywall = useClimateKavachStore((s) => s.openPaywall);
  const resetScenario = useClimateKavachStore((s) => s.resetScenario);
  const saveScenario = useClimateKavachStore((s) => s.saveScenario);
  const [name, setName] = React.useState("");
  const [copied, setCopied] = React.useState(false);

  function copyLink() {
    if (!scenario) return;
    const encoded = encodeScenario(scenario);
    const url = `${window.location.origin}${window.location.pathname}?s=${encoded}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    });
  }

  function exportCsv() {
    if (!sim) return;
    downloadText("climate_kavach_scenario.csv", toCsv(sim.rows), "text/csv");
  }

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-xl border border-cyan-300/20 bg-slate-950/60 p-2">
      <Button variant="outline" size="sm" onClick={resetScenario}>
        <RotateCcw className="h-4 w-4" />
        Reset
      </Button>
      <Button variant="outline" size="sm" onClick={copyLink}>
        <Copy className="h-4 w-4" />
        {copied ? "Copied" : "Share"}
      </Button>
      <Button variant="outline" size="sm" onClick={exportCsv}>
        <Download className="h-4 w-4" />
        CSV
      </Button>
      <a href="/api/download/sample" className="inline-flex">
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4" />
          Sample
        </Button>
      </a>
      {premium ? (
        <a href="/api/download/premium" className="inline-flex">
          <Button size="sm">
            <Download className="h-4 w-4" />
            Premium
          </Button>
        </a>
      ) : (
        <Button size="sm" onClick={openPaywall}>
          <Lock className="h-4 w-4" />
          Unlock
        </Button>
      )}
      <div className="flex min-w-[230px] flex-1 items-center gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Scenario name"
          className="h-9 min-w-0 flex-1 rounded-md border border-cyan-300/15 bg-slate-950/70 px-3 text-sm text-slate-100 placeholder:text-slate-500"
        />
        <Button size="sm" onClick={() => { saveScenario(name); setName(""); }}>
          <Save className="h-4 w-4" />
          Save
        </Button>
      </div>
    </div>
  );
}

function CompactLeversPanel() {
  const scenario = useClimateKavachStore((s) => s.scenario);
  const setScenario = useClimateKavachStore((s) => s.setScenario);

  if (!scenario) return <div className="text-sm text-slate-400">Loading levers...</div>;

  return (
    <section className="space-y-2" aria-labelledby="simulation-levers">
      <div className="flex items-center gap-2">
        <SlidersHorizontal className="h-4 w-4 text-cyan-300" />
        <h2 id="simulation-levers" className="text-sm font-black uppercase tracking-[0.16em] text-cyan-100">
          Simulation levers
        </h2>
      </div>
      <div className="grid gap-2 xl:grid-cols-3">
        {leverGroups.map((group) => {
          const specs = leverSpecs.filter((l) => l.group === group);
          return (
            <section key={group} className="rounded-lg border border-cyan-300/20 bg-slate-950/60">
              <div className="border-b border-cyan-300/15 bg-slate-300/15 px-3 py-1.5 text-center text-sm font-black text-cyan-50">
                {group}
              </div>
              <div className="grid gap-x-3 gap-y-2 p-3 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
                {specs.map((spec) => {
                  const v = scenario[spec.key];
                  return (
                    <div key={spec.key} className="min-w-0">
                      <div className="flex items-center justify-between gap-3">
                        <label className="truncate text-sm font-bold text-slate-100" htmlFor={`lever-${spec.key}`}>
                          {spec.title}
                        </label>
                        <span className="shrink-0 text-[11px] font-black text-slate-400">{formatLeverValue(spec, v)}</span>
                      </div>
                      <Slider
                        id={`lever-${spec.key}`}
                        value={[v]}
                        min={spec.min}
                        max={spec.max}
                        step={spec.step}
                        onValueChange={(val) => setScenario({ [spec.key]: val[0] } as any)}
                        aria-label={spec.title}
                        className="mt-1"
                      />
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
        <NikeSponsoredAd placement="rectangle" className="min-h-[330px]" />
      </div>
    </section>
  );
}

function ChartFrame({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <Card className="overflow-hidden border-cyan-300/20 bg-slate-950/60">
      <div className="border-b border-cyan-300/15 bg-slate-300/15 px-4 py-2">
        <h2 className="text-lg font-black leading-tight text-cyan-50">{title}</h2>
        <div className="text-xs font-bold text-slate-400">{subtitle}</div>
      </div>
      <CardContent className="p-3">{children}</CardContent>
    </Card>
  );
}

export function Dashboard() {
  const inputs = useClimateKavachStore((s) => s.inputs);

  if (!inputs) {
    return <div className="text-sm text-slate-400">Loading model...</div>;
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-cyan-300/20 bg-slate-950/60 px-3 py-2">
        <div>
          <h1 className="text-xl font-black tracking-[-0.04em] text-cyan-50">Climate Kavach Policy Simulator</h1>
          <p className="text-xs font-semibold text-slate-400">
            India pathway model | Base {inputs.meta.baseYear} | Horizon {inputs.meta.endYear}
          </p>
        </div>
        <CompactScenarioBar />
      </div>

      <div className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_340px]">
        <ChartFrame title="Primary Energy by Source" subtitle="India pathway, exajoules/year">
          <EnergySourcesChart compact />
        </ChartFrame>
        <ChartFrame title="Greenhouse Gas Net Emissions" subtitle="Gt CO2 equivalent/year">
          <EmissionsChart compact />
        </ChartFrame>
        <div className="grid gap-3">
          <TemperaturePanel compact />
          <NikeSponsoredAd placement="banner" />
        </div>
      </div>

      <CompactLeversPanel />

      <details className="rounded-xl border border-cyan-300/20 bg-slate-950/55 p-3">
        <summary className="cursor-pointer text-sm font-black uppercase tracking-[0.16em] text-cyan-100">
          Saved scenarios, comparison, and diagnostics
        </summary>
        <div className="mt-4 space-y-5">
          <div className="grid gap-5 xl:grid-cols-[380px_1fr]">
            <ScenarioControls />
            <KpiCards />
          </div>
          <CompareEmissionsChart />
        </div>
      </details>
    </div>
  );
}
