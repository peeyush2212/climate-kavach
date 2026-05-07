import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

export interface SliderProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  label?: string;
  valueLabel?: string;
  compact?: boolean;
}

export function Slider({ className, label, valueLabel, compact = false, ...props }: SliderProps) {
  return (
    <div className={cn(compact ? "space-y-1" : "space-y-2", className)}>
      {(label || valueLabel) && (
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium">{label}</div>
          <div className="text-xs text-muted-foreground tabular-nums">{valueLabel}</div>
        </div>
      )}
      <SliderPrimitive.Root
        className={cn("relative flex w-full touch-none select-none items-center", props.disabled && "opacity-60")}
        {...props}
      >
        <SliderPrimitive.Track className={cn("relative w-full grow overflow-hidden rounded-full bg-slate-700/80 shadow-inner shadow-black/50", compact ? "h-1.5" : "h-2")}>
          <SliderPrimitive.Range className="absolute h-full bg-gradient-to-r from-cyan-400 via-sky-400 to-fuchsia-400 shadow-[0_0_16px_rgba(34,211,238,.65)]" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className={cn("block rounded-full border border-cyan-100/80 bg-slate-950 shadow-[0_0_18px_rgba(34,211,238,.8)] transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 active:scale-110", compact ? "h-3.5 w-3.5" : "h-4 w-4")} />
      </SliderPrimitive.Root>
    </div>
  );
}
