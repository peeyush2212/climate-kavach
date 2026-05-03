import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

export interface SliderProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  label?: string;
  valueLabel?: string;
}

export function Slider({ className, label, valueLabel, ...props }: SliderProps) {
  return (
    <div className={cn("space-y-2", className)}>
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
        <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-slate-700/80 shadow-inner shadow-black/50">
          <SliderPrimitive.Range className="absolute h-full bg-gradient-to-r from-cyan-400 via-sky-400 to-fuchsia-400 shadow-[0_0_16px_rgba(34,211,238,.65)]" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border border-cyan-100/80 bg-slate-950 shadow-[0_0_18px_rgba(34,211,238,.8)] transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 active:scale-110" />
      </SliderPrimitive.Root>
    </div>
  );
}
