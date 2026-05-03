"use client";

import * as React from "react";
import type { EChartsOption } from "echarts";
import { EChart } from "@/components/charts/EChart";
import { axisTooltip, baseChartOption, chartColors } from "@/components/charts/chartStyle";
import { simulate } from "@/lib/simulator";
import { useClimateKavachStore } from "@/lib/store";

export function CompareEmissionsChart() {
  const inputs = useClimateKavachStore((s) => s.inputs);
  const baselineSim = useClimateKavachStore((s) => s.baselineSim);
  const sim = useClimateKavachStore((s) => s.sim);
  const saved = useClimateKavachStore((s) => s.saved);
  const compareIds = useClimateKavachStore((s) => s.compareIds);

  const option = React.useMemo<EChartsOption>(() => {
    if (!inputs || !baselineSim || !sim) return {};
    const years = sim.rows.map((r) => r.year);
    const baseOption = baseChartOption();

    const series: any[] = [
      {
        name: "Baseline",
        type: "line",
        data: baselineSim.rows.map((r) => r.net_ghg_mtco2e),
        showSymbol: false,
        smooth: true,
        lineStyle: { color: chartColors.baseline, type: "dashed", width: 2 },
      },
      {
        name: "Current",
        type: "line",
        data: sim.rows.map((r) => r.net_ghg_mtco2e),
        showSymbol: false,
        smooth: true,
        lineStyle: { color: chartColors.current, width: 3 },
        emphasis: { focus: "series" },
      },
    ];

    compareIds.forEach((id, index) => {
      const s = saved.find((x) => x.id === id);
      if (!s) return;
      const res = simulate(inputs, s.scenario);
      series.push({
        name: s.name,
        type: "line",
        data: res.rows.map((r) => r.net_ghg_mtco2e),
        showSymbol: false,
        smooth: true,
        lineStyle: { color: chartColors.compare[index % chartColors.compare.length], width: 2 },
        emphasis: { focus: "series" },
      });
    });

    return {
      ...baseOption,
      tooltip: axisTooltip("MtCO2e/yr"),
      grid: { ...(baseOption.grid as object), top: 40, bottom: 26 },
      xAxis: { ...(baseOption.xAxis as object), type: "category", data: years, boundaryGap: false },
      yAxis: { ...(baseOption.yAxis as object), type: "value" },
      series,
    };
  }, [inputs, baselineSim, sim, saved, compareIds]);

  if (!compareIds.length) return null;

  return (
    <div className="rounded-2xl border border-cyan-300/20 bg-slate-950/55 p-5 shadow-[0_0_50px_rgba(8,145,178,.10)] backdrop-blur-xl">
      <div className="mb-3 text-sm font-black uppercase tracking-[0.12em] text-cyan-100">Compare scenarios</div>
      <EChart option={option} style={{ height: 285 }} />
    </div>
  );
}
