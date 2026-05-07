"use client";

import * as React from "react";
import type { EChartsOption } from "echarts";
import { EChart } from "@/components/charts/EChart";
import { axisTooltip, baseChartOption, chartColors, dataZoom } from "@/components/charts/chartStyle";
import { useClimateKavachStore } from "@/lib/store";

export function EmissionsChart({ compact = false }: { compact?: boolean }) {
  const baselineSim = useClimateKavachStore((s) => s.baselineSim);
  const sim = useClimateKavachStore((s) => s.sim);
  const zoom = useClimateKavachStore((s) => s.zoom);
  const setZoom = useClimateKavachStore((s) => s.setZoom);

  const option = React.useMemo<EChartsOption>(() => {
    if (!baselineSim || !sim) return {};
    const years = sim.rows.map((r) => r.year);
    const base = baselineSim.rows.map((r) => r.net_ghg_mtco2e / 1000);
    const cur = sim.rows.map((r) => r.net_ghg_mtco2e / 1000);
    const zero = sim.rows.map(() => 0);
    const startIndex = zoom ? Math.max(0, years.indexOf(zoom.startYear)) : 0;
    const endIndex = zoom ? Math.max(0, years.indexOf(zoom.endYear)) : years.length - 1;
    const baseOption = baseChartOption();

    return {
      ...baseOption,
      title: compact
        ? undefined
        : { text: "Greenhouse Gas Net Emissions", left: 0, top: 0, textStyle: { color: chartColors.text, fontSize: 14, fontWeight: 800 } },
      tooltip: axisTooltip("GtCO2e/yr", 2),
      legend: { ...(baseOption.legend as object), top: 0, right: 0, data: ["Baseline", "Current Scenario"] },
      grid: { ...(baseOption.grid as object), top: compact ? 34 : 74, bottom: compact ? 18 : 48, left: compact ? 42 : 48, right: compact ? 12 : 16 },
      xAxis: { ...(baseOption.xAxis as object), type: "category", data: years, boundaryGap: false },
      yAxis: { ...(baseOption.yAxis as object), type: "value", name: compact ? "" : "Gt CO2 equivalent/year" },
      dataZoom: compact ? [{ type: "inside", startValue: years[startIndex], endValue: years[endIndex], zoomOnMouseWheel: "ctrl" }] : dataZoom(years[startIndex], years[endIndex]),
      series: [
        { name: "Zero", type: "line", data: zero, showSymbol: false, lineStyle: { color: "rgba(226,232,240,.4)", width: 1 }, tooltip: { show: false } },
        { name: "Baseline", type: "line", data: base, showSymbol: false, smooth: true, lineStyle: { color: chartColors.baseline, type: "dashed", width: 2 } },
        { name: "Current Scenario", type: "line", data: cur, showSymbol: false, smooth: true, lineStyle: { color: chartColors.current, width: 3, shadowBlur: 12, shadowColor: chartColors.current }, areaStyle: { color: "rgba(34, 211, 238, .10)" } },
      ],
    };
  }, [baselineSim, sim, zoom, compact]);

  const onEvents = React.useMemo(() => ({
    datazoom: (params: any) => {
      if (!sim) return;
      const years = sim.rows.map((r) => r.year);
      const batch = params?.batch?.[0] ?? params;
      const startValue = batch?.startValue ?? years[0];
      const endValue = batch?.endValue ?? years[years.length - 1];
      if (typeof startValue === "number" && typeof endValue === "number") setZoom({ startYear: startValue, endYear: endValue });
    },
  }), [sim, setZoom]);

  return <EChart option={option} style={{ height: compact ? 218 : 315 }} onEvents={onEvents} />;
}
