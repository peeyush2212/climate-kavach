"use client";

import dynamic from "next/dynamic";
import type { EChartsOption } from "echarts";
import * as React from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });

function adaptChartColors(value: unknown, isDark: boolean): unknown {
  if (isDark || value == null) return value;
  if (typeof value === "string") {
    if (value === "#e2e8f0") return "#0f172a";
    if (value === "#cbd5e1") return "#64748b";
    return value;
  }
  if (Array.isArray(value)) return value.map((item) => adaptChartColors(item, isDark));
  if (typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, adaptChartColors(item, isDark)]));
  }
  return value;
}

export function EChart({
  option,
  style,
  className,
  onEvents,
}: {
  option: EChartsOption;
  style?: React.CSSProperties;
  className?: string;
  onEvents?: Record<string, (params: any) => void>;
}) {
  const { resolvedTheme } = useTheme();
  const themedOption = React.useMemo(
    () => adaptChartColors(option, resolvedTheme === "dark") as EChartsOption,
    [option, resolvedTheme]
  );

  return (
    <div className={cn("min-w-0", className)}>
      <ReactECharts
        option={themedOption}
        style={{ width: "100%", ...style }}
        onEvents={onEvents}
        notMerge
        lazyUpdate
        opts={{ renderer: "canvas" }}
      />
    </div>
  );
}
