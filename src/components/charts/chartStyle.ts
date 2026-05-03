import type { EChartsOption } from "echarts";

export const chartColors = {
  baseline: "#94a3b8",
  current: "#00e5ff",
  compare: ["#a78bfa", "#34d399", "#f97316", "#f472b6"],
  good: "#22c55e",
  bad: "#fb7185",
  warn: "#facc15",
  neutral: "#64748b",
  grid: "rgba(148, 163, 184, 0.20)",
  text: "#e6fbff",
  muted: "#9fb8c8",
  panel: "rgba(2, 8, 23, .90)",
  coal: "#5b2333",
  oil: "#e24a0b",
  gas: "#0072bc",
  renewables: "#10b981",
  bioenergy: "#ec4899",
  nuclear: "#67e8f9",
  newZero: "#fb923c",
};

export function formatChartNumber(value: number, digits = 0) {
  if (!Number.isFinite(value)) return "-";
  return new Intl.NumberFormat(undefined, {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  }).format(value);
}

export function axisTooltip(unit = "", digits = 0) {
  return {
    trigger: "axis",
    confine: true,
    backgroundColor: "rgba(2, 6, 23, 0.96)",
    borderColor: "rgba(34, 211, 238, .35)",
    borderWidth: 1,
    padding: [10, 12],
    textStyle: { color: "#f8fafc", fontSize: 12 },
    axisPointer: {
      type: "cross",
      lineStyle: { color: "rgba(103, 232, 249, .55)", width: 1, type: "dashed" },
      crossStyle: { color: "rgba(103, 232, 249, .55)" },
      shadowStyle: { color: "rgba(34, 211, 238, 0.08)" },
    },
    valueFormatter: (value: unknown) => {
      const n = typeof value === "number" ? value : Number(value);
      return `${formatChartNumber(n, digits)}${unit ? ` ${unit}` : ""}`;
    },
  };
}

export function baseChartOption(): EChartsOption {
  return {
    color: [chartColors.current, chartColors.baseline, ...chartColors.compare],
    backgroundColor: "transparent",
    textStyle: {
      color: chartColors.text,
      fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    },
    animationDuration: 450,
    legend: {
      type: "scroll",
      top: 0,
      left: 0,
      itemWidth: 20,
      itemHeight: 8,
      icon: "roundRect",
      textStyle: { color: chartColors.muted, fontSize: 12, fontWeight: 700 },
    },
    grid: {
      left: 8,
      right: 10,
      top: 42,
      bottom: 36,
      containLabel: true,
    },
    xAxis: {
      axisLine: { lineStyle: { color: chartColors.grid } },
      axisTick: { show: false },
      axisLabel: { color: chartColors.muted, margin: 12, fontWeight: 600 },
      splitLine: { show: false },
    },
    yAxis: {
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: chartColors.muted, margin: 12, fontWeight: 600 },
      nameGap: 18,
      nameTextStyle: { color: chartColors.muted, fontSize: 11, fontWeight: 700, padding: [0, 0, 10, 0] },
      splitLine: { lineStyle: { color: chartColors.grid, type: "dashed" } },
    },
  };
}

export function dataZoom(startValue: number, endValue: number) {
  return [
    { type: "inside", startValue, endValue, zoomOnMouseWheel: "ctrl" },
    {
      type: "slider",
      height: 18,
      bottom: 4,
      startValue,
      endValue,
      borderColor: "rgba(34, 211, 238, .25)",
      fillerColor: "rgba(34, 211, 238, 0.18)",
      backgroundColor: "rgba(2, 6, 23, .42)",
      handleStyle: { color: chartColors.current, borderColor: chartColors.current, shadowBlur: 12, shadowColor: chartColors.current },
      dataBackground: {
        lineStyle: { color: chartColors.grid },
        areaStyle: { color: "rgba(100, 116, 139, 0.10)" },
      },
      selectedDataBackground: {
        lineStyle: { color: chartColors.current },
        areaStyle: { color: "rgba(34, 211, 238, 0.15)" },
      },
      textStyle: { color: chartColors.muted },
    },
  ];
}
