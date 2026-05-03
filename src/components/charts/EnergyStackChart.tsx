"use client";

import * as React from "react";
import type { EChartsOption } from "echarts";
import { EChart } from "@/components/charts/EChart";
import { axisTooltip, baseChartOption, chartColors, dataZoom } from "@/components/charts/chartStyle";
import { useIndiaRoadsStore } from "@/lib/store";

const sources = [
  { key: "coal_EJ", name: "COAL", color: chartColors.coal },
  { key: "oil_EJ", name: "OIL", color: chartColors.oil },
  { key: "gas_EJ", name: "GAS", color: chartColors.gas },
  { key: "renewables_EJ", name: "RENEWABLES", color: chartColors.renewables },
  { key: "bioenergy_EJ", name: "BIOENERGY", color: chartColors.bioenergy },
  { key: "nuclear_EJ", name: "NUCLEAR", color: chartColors.nuclear },
  { key: "new_zero_EJ", name: "NEW ZERO", color: chartColors.newZero },
] as const;

export function EnergyStackChart() {
  const sim = useIndiaRoadsStore((s) => s.sim);
  const zoom = useIndiaRoadsStore((s) => s.zoom);
  const setZoom = useIndiaRoadsStore((s) => s.setZoom);

  const option = React.useMemo<EChartsOption>(() => {
    if (!sim) return {};
    const years = sim.rows.map((r) => r.year);
    const startIndex = zoom ? Math.max(0, years.indexOf(zoom.startYear)) : 0;
    const endIndex = zoom ? Math.max(0, years.indexOf(zoom.endYear)) : years.length - 1;
    const baseOption = baseChartOption();

    return {
      ...baseOption,
      title: { text: "Sources of Primary Energy", left: 0, top: 0, textStyle: { color: chartColors.text, fontSize: 14, fontWeight: 800 } },
      color: sources.map((s) => s.color),
      tooltip: axisTooltip("EJ/yr", 1),
      legend: { ...(baseOption.legend as object), top: 28, data: sources.map((s) => s.name) },
      grid: { ...(baseOption.grid as object), top: 74, bottom: 48, right: 10 },
      xAxis: { ...(baseOption.xAxis as object), type: "category", data: years, boundaryGap: false },
      yAxis: { ...(baseOption.yAxis as object), type: "value", name: "Exajoules/year" },
      dataZoom: dataZoom(years[startIndex], years[endIndex]),
      series: sources.map((s) => ({
        name: s.name,
        type: "line",
        stack: "energy",
        areaStyle: { opacity: 0.88 },
        lineStyle: { width: 0 },
        symbol: "none",
        smooth: true,
        data: sim.rows.map((r) => (r as any)[s.key]),
      })),
    };
  }, [sim, zoom]);

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

  return <EChart option={option} style={{ height: 315 }} onEvents={onEvents} />;
}
