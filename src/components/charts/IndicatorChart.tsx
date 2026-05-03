"use client";

import * as React from "react";
import { EChart } from "@/components/charts/EChart";
import { axisTooltip, baseChartOption, chartColors, dataZoom } from "@/components/charts/chartStyle";
import { useIndiaRoadsStore } from "@/lib/store";
import type { EChartsOption } from "echarts";

export function IndicatorChart({
  title,
  field,
  yLabel,
  formatter,
}: {
  title: string;
  field: keyof (import("@/lib/types").SimulationRow);
  yLabel: string;
  formatter?: (v: number) => string;
}) {
  const baselineSim = useIndiaRoadsStore((s) => s.baselineSim);
  const sim = useIndiaRoadsStore((s) => s.sim);
  const zoom = useIndiaRoadsStore((s) => s.zoom);

  const option = React.useMemo<EChartsOption>(() => {
    if (!baselineSim || !sim) return {};
    const years = sim.rows.map((r) => r.year);
    const base = baselineSim.rows.map((r) => (r as any)[field] as number);
    const cur = sim.rows.map((r) => (r as any)[field] as number);

    const startYear = zoom?.startYear ?? years[0];
    const endYear = zoom?.endYear ?? years[years.length - 1];
    const baseOption = baseChartOption();

    return {
      ...baseOption,
      title: {
        text: `${title} (${yLabel})`,
        left: 0,
        top: 0,
        textStyle: { color: chartColors.text, fontSize: 13, fontWeight: 600 },
      },
      tooltip: {
        ...axisTooltip(yLabel, yLabel === "%" ? 1 : 2),
        valueFormatter: (value: unknown) => {
          const n = typeof value === "number" ? value : Number(value);
          return formatter ? formatter(n) : `${n.toFixed(yLabel === "%" ? 1 : 2)} ${yLabel}`;
        },
      },
      legend: { show: false },
      grid: { ...(baseOption.grid as object), top: 38, bottom: 48 },
      xAxis: { ...(baseOption.xAxis as object), type: "category", data: years, boundaryGap: false },
      yAxis: { ...(baseOption.yAxis as object), type: "value" },
      dataZoom: dataZoom(startYear, endYear),
      series: [
        {
          name: "Baseline",
          type: "line",
          data: base,
          showSymbol: false,
          smooth: true,
          lineStyle: { color: chartColors.baseline, type: "dashed", width: 2 },
        },
        {
          name: "Current",
          type: "line",
          data: cur,
          showSymbol: false,
          smooth: true,
          lineStyle: { color: chartColors.current, width: 3 },
          areaStyle: { color: "rgba(37, 99, 235, 0.08)" },
          emphasis: { focus: "series" },
        },
      ],
    };
  }, [baselineSim, sim, field, title, yLabel, formatter, zoom]);

  return <EChart option={option} style={{ height: 285 }} />;
}
