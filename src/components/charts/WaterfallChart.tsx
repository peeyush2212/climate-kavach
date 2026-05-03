"use client";

import * as React from "react";
import { EChart } from "@/components/charts/EChart";
import { baseChartOption, chartColors, formatChartNumber } from "@/components/charts/chartStyle";
import { makeWaterfallContributions } from "@/lib/simulator";
import { useClimateKavachStore } from "@/lib/store";
import type { EChartsOption } from "echarts";

export function WaterfallChart() {
  const baselineSim = useClimateKavachStore((s) => s.baselineSim);
  const sim = useClimateKavachStore((s) => s.sim);

  const option = React.useMemo<EChartsOption>(() => {
    if (!baselineSim || !sim) return {};

    const wf = makeWaterfallContributions(baselineSim, sim);
    const labels = ["Baseline", ...wf.contrib.map((c) => c.name), "Current"];
    const deltas = wf.contrib.map((c) => c.value);
    const cum: number[] = [wf.baselineNet];
    for (const d of deltas) cum.push(cum[cum.length - 1] + d);

    const placeholder: number[] = [0];
    const bars: number[] = [wf.baselineNet];

    for (let i = 0; i < deltas.length; i++) {
      const prev = cum[i];
      const d = deltas[i];
      placeholder.push(d >= 0 ? prev : prev + d);
      bars.push(Math.abs(d));
    }

    placeholder.push(0);
    bars.push(wf.currentNet);

    const baseOption = baseChartOption();

    return {
      ...baseOption,
      title: {
        text: "2050 net emissions change",
        subtext: "Contribution versus baseline, MtCO2e/yr",
        left: 0,
        top: 0,
        textStyle: { color: chartColors.text, fontSize: 13, fontWeight: 600 },
        subtextStyle: { color: chartColors.muted, fontSize: 11 },
      },
      tooltip: {
        trigger: "axis",
        confine: true,
        backgroundColor: "rgba(2, 6, 23, 0.96)",
        borderWidth: 0,
        padding: [10, 12],
        textStyle: { color: "#f8fafc", fontSize: 12 },
        axisPointer: { type: "shadow", shadowStyle: { color: "rgba(37, 99, 235, 0.08)" } },
        formatter: (params: any) => {
          const point = Array.isArray(params) ? params[1] : params;
          const idx = point?.dataIndex ?? 0;
          if (idx === 0) return `Baseline<br/>${formatChartNumber(wf.baselineNet)} MtCO2e/yr`;
          if (idx === labels.length - 1) return `Current<br/>${formatChartNumber(wf.currentNet)} MtCO2e/yr`;
          const delta = deltas[idx - 1];
          const sign = delta >= 0 ? "+" : "";
          return `${labels[idx]}<br/>${sign}${formatChartNumber(delta)} MtCO2e/yr`;
        },
      },
      grid: { ...(baseOption.grid as object), top: 58, bottom: 82 },
      xAxis: {
        ...(baseOption.xAxis as object),
        type: "category",
        data: labels,
        axisLabel: { color: chartColors.muted, rotate: 30, interval: 0, width: 86, overflow: "truncate" },
      },
      yAxis: { ...(baseOption.yAxis as object), type: "value" },
      series: [
        {
          type: "bar",
          stack: "total",
          itemStyle: { color: "transparent", borderColor: "transparent" },
          emphasis: { disabled: true },
          data: placeholder,
        },
        {
          name: "Change",
          type: "bar",
          stack: "total",
          barMaxWidth: 38,
          data: bars,
          itemStyle: {
            borderRadius: [5, 5, 0, 0],
            color: (p: any) => {
              const idx = p.dataIndex;
              if (idx === 0 || idx === labels.length - 1) return chartColors.neutral;
              return deltas[idx - 1] < 0 ? chartColors.good : chartColors.bad;
            },
          },
          label: {
            show: true,
            position: "top",
            formatter: (p: any) => {
              const idx = p.dataIndex;
              if (idx === 0 || idx === labels.length - 1) return formatChartNumber(p.value);
              const raw = deltas[idx - 1];
              const sign = raw >= 0 ? "+" : "";
              return `${sign}${formatChartNumber(raw)}`;
            },
            color: chartColors.muted,
            fontSize: 10,
          },
        },
      ],
    };
  }, [baselineSim, sim]);

  return <EChart option={option} style={{ height: 360 }} />;
}
