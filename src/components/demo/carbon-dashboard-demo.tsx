"use client";

import * as React from "react";
import type { EChartsOption } from "echarts";
import {
  Activity,
  BarChart3,
  Download,
  Fuel,
  Gauge,
  Lightbulb,
  PiggyBank,
  RadioTower,
  Snowflake,
  Sun,
  Trash2,
  Truck,
  Upload,
  Zap,
} from "lucide-react";
import { EChart } from "@/components/charts/EChart";
import { MockActionModal } from "@/components/marketing/mock-action-modal";
import { cn } from "@/lib/utils";

const metrics = [
  { label: "Total emissions this month", value: "8.4", unit: "tCO2e", icon: Activity, tone: "text-cyan-200" },
  { label: "Carbon score", value: "72", unit: "/100", icon: Gauge, tone: "text-emerald-200" },
  { label: "Electricity emissions", value: "4.9", unit: "tCO2e", icon: Zap, tone: "text-blue-200" },
  { label: "Fuel emissions", value: "1.7", unit: "tCO2e", icon: Fuel, tone: "text-orange-200" },
  { label: "Logistics emissions", value: "1.2", unit: "tCO2e", icon: Truck, tone: "text-fuchsia-200" },
  { label: "Estimated savings", value: "Rs 18.5k", unit: "/mo", icon: PiggyBank, tone: "text-emerald-200" },
];

const recommendations = [
  { title: "LED lighting upgrade", meta: "Medium impact - Low cost - 6-12 months", icon: Lightbulb },
  { title: "Diesel generator reduction", meta: "High impact - Medium cost - 12-18 months", icon: Fuel },
  { title: "Rooftop solar", meta: "High impact - High cost - 3-5 years", icon: Sun },
  { title: "Cooling efficiency", meta: "Medium impact - Medium cost - 1-2 years", icon: Snowflake },
  { title: "Waste segregation", meta: "Low impact - Low cost - Immediate", icon: Trash2 },
];

function MetricTile({ metric }: { metric: (typeof metrics)[number] }) {
  const Icon = metric.icon;
  return (
    <div className="rounded-xl border border-cyan-300/15 bg-slate-950/70 p-3">
      <div className="flex items-center justify-between gap-2">
        <div className="text-[11px] font-black uppercase tracking-[0.13em] text-slate-500">{metric.label}</div>
        <Icon className={cn("h-4 w-4 shrink-0", metric.tone)} />
      </div>
      <div className="mt-3 flex items-end gap-1">
        <span className="text-2xl font-black tracking-[-0.04em] text-cyan-50">{metric.value}</span>
        <span className="pb-1 text-xs font-bold text-slate-400">{metric.unit}</span>
      </div>
    </div>
  );
}

export function CarbonDashboardDemo() {
  const trendOption = React.useMemo(
    () =>
      ({
        backgroundColor: "transparent",
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(15, 23, 42, 0.96)",
          borderWidth: 0,
          textStyle: { color: "#f8fafc" },
        },
        grid: { left: 38, right: 16, top: 28, bottom: 34 },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          axisLine: { lineStyle: { color: "rgba(148,163,184,.35)" } },
          axisLabel: { color: "#94a3b8" },
        },
        yAxis: {
          type: "value",
          axisLabel: { color: "#94a3b8" },
          splitLine: { lineStyle: { color: "rgba(148,163,184,.16)" } },
        },
        series: [
          {
            name: "tCO2e",
            type: "line",
            smooth: true,
            symbolSize: 7,
            data: [9.6, 9.1, 8.8, 8.4, 8.0, 7.7],
            lineStyle: { color: "#22d3ee", width: 3 },
            itemStyle: { color: "#34d399" },
            areaStyle: { color: "rgba(34,211,238,.14)" },
          },
        ],
      }) as EChartsOption,
    []
  );

  const sourceOption = React.useMemo(
    () =>
      ({
        backgroundColor: "transparent",
        tooltip: {
          trigger: "item",
          backgroundColor: "rgba(15, 23, 42, 0.96)",
          borderWidth: 0,
          textStyle: { color: "#f8fafc" },
        },
        legend: { bottom: 0, textStyle: { color: "#cbd5e1" } },
        series: [
          {
            type: "pie",
            radius: ["48%", "72%"],
            center: ["50%", "44%"],
            label: { color: "#e2e8f0" },
            data: [
              { name: "Electricity", value: 4.9, itemStyle: { color: "#22d3ee" } },
              { name: "Fuel", value: 1.7, itemStyle: { color: "#fb923c" } },
              { name: "Logistics", value: 1.2, itemStyle: { color: "#a78bfa" } },
              { name: "Waste", value: 0.6, itemStyle: { color: "#34d399" } },
            ],
          },
        ],
      }) as EChartsOption,
    []
  );

  return (
    <div className="rounded-2xl border border-cyan-300/20 bg-slate-950/65 p-4 shadow-[0_0_80px_rgba(34,211,238,.10)] backdrop-blur-xl">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.18em] text-cyan-300">
            <BarChart3 className="h-4 w-4" />
            Sample Carbon Dashboard
          </div>
          <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-cyan-50">Monthly carbon intelligence</h2>
        </div>
        <div className="rounded-full border border-emerald-300/25 bg-emerald-300/10 px-3 py-1 text-xs font-black text-emerald-200">
          Carbon score 72/100
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {metrics.map((metric) => (
          <MetricTile key={metric.label} metric={metric} />
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.2fr_.8fr_230px]">
        <div className="rounded-xl border border-cyan-300/15 bg-slate-950/70 p-3">
          <div className="mb-2 text-sm font-black text-cyan-50">Monthly emissions trend</div>
          <EChart option={trendOption} style={{ height: 260 }} />
        </div>
        <div className="rounded-xl border border-cyan-300/15 bg-slate-950/70 p-3">
          <div className="mb-2 text-sm font-black text-cyan-50">Emissions by source</div>
          <EChart option={sourceOption} style={{ height: 260 }} />
        </div>
        <aside className="rounded-xl border border-cyan-300/15 bg-slate-950/70 p-3">
          <div className="text-sm font-black text-cyan-50">Actions</div>
          <div className="mt-3 grid gap-2">
            <MockActionModal
              triggerLabel="Upload bill"
              title="Demo upload coming soon"
              message="Demo upload coming soon. Request a demo to test Carbon Kavach."
              ctaHref="/contact?interest=carbon"
            />
            <MockActionModal triggerLabel="Download report" title="Sample report coming soon" ctaHref="/contact?interest=carbon" />
            <MockActionModal triggerLabel="Add sensor" title="Sensor setup demo" ctaHref="/contact?interest=sensors" />
            <MockActionModal triggerLabel="Compare benchmark" title="Benchmark demo" ctaHref="/contact?interest=carbon" />
          </div>
          <div className="mt-4 grid gap-2 text-xs font-semibold text-slate-400">
            <div className="flex items-center gap-2">
              <Upload className="h-3.5 w-3.5 text-cyan-300" />
              Bills and invoices
            </div>
            <div className="flex items-center gap-2">
              <Download className="h-3.5 w-3.5 text-emerald-300" />
              PDF reports
            </div>
            <div className="flex items-center gap-2">
              <RadioTower className="h-3.5 w-3.5 text-blue-300" />
              Sensor ready
            </div>
          </div>
        </aside>
      </div>

      <div className="mt-4 grid gap-3 lg:grid-cols-5">
        {recommendations.map(({ title, meta, icon: Icon }) => (
          <div key={title} className="rounded-xl border border-emerald-300/15 bg-emerald-300/5 p-3">
            <Icon className="h-4 w-4 text-emerald-300" />
            <div className="mt-2 text-sm font-black text-cyan-50">{title}</div>
            <div className="mt-1 text-xs font-semibold leading-5 text-slate-400">{meta}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
