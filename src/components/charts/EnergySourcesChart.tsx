"use client";

import * as React from "react";
import type { EChartsOption } from "echarts";
import { EChart } from "@/components/charts/EChart";
import { axisTooltip, baseChartOption, chartColors, dataZoom } from "@/components/charts/chartStyle";
import { useClimateKavachStore } from "@/lib/store";

const seriesConfig = [
  { name: "COAL", field: "coal_EJ", color: chartColors.coal },
  { name: "OIL", field: "oil_EJ", color: chartColors.oil },
  { name: "GAS", field: "gas_EJ", color: chartColors.gas },
  { name: "RENEWABLES", field: "renewables_EJ", color: chartColors.renewables },
  { name: "BIOENERGY", field: "bioenergy_EJ", color: chartColors.bioenergy },
  { name: "NUCLEAR", field: "nuclear_EJ", color: chartColors.nuclear },
  { name: "NEW ZERO", field: "new_zero_EJ", color: chartColors.newZero },
] as const;

export function EnergySourcesChart({ compact = false }: { compact?: boolean }) {
  const sim = useClimateKavachStore((s) => s.sim);
  const zoom = useClimateKavachStore((s) => s.zoom);
  const setZoom = useClimateKavachStore((s) => s.setZoom);

  const option = React.useMemo<EChartsOption>(() => {
    if (!sim) return {};
    const years = sim.rows.map((r) => r.year);
    const startYear = zoom?.startYear ?? years[0];
    const endYear = zoom?.endYear ?? years[years.length - 1];
    const baseOption = baseChartOption();

    return {
      ...baseOption,
      title: compact
        ? undefined
        : {
            text: "Primary Energy by Source",
            subtext: "India pathway, exajoules/year",
            left: 0,
            top: 0,
            textStyle: { color: chartColors.text, fontSize: 14, fontWeight: 900 },
            subtextStyle: { color: chartColors.muted, fontSize: 11, fontWeight: 700 },
          },
      color: seriesConfig.map((s) => s.color),
      tooltip: axisTooltip("EJ/yr", 1),
      legend: { ...(baseOption.legend as object), top: compact ? 0 : 38, right: 0, data: seriesConfig.map((s) => s.name) },
      grid: { ...(baseOption.grid as object), top: compact ? 42 : 84, bottom: compact ? 22 : 48 },
      xAxis: { ...(baseOption.xAxis as object), type: "category", data: years, boundaryGap: false },
      yAxis: { ...(baseOption.yAxis as object), type: "value", name: compact ? "" : "Exajoules/year" },
      dataZoom: compact ? [{ type: "inside", startValue: startYear, endValue: endYear, zoomOnMouseWheel: "ctrl" }] : dataZoom(startYear, endYear),
      series: seriesConfig.map((cfg) => ({
        name: cfg.name,
        type: "line",
        stack: "energy",
        data: sim.rows.map((r) => Number((r as any)[cfg.field])),
        showSymbol: false,
        smooth: true,
        lineStyle: { width: 0 },
        areaStyle: { opacity: 0.92 },
        emphasis: { focus: "series" },
      })),
    };
  }, [sim, zoom, compact]);

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

  return <EChart option={option} style={{ height: compact ? 255 : 330 }} onEvents={onEvents} />;
}
