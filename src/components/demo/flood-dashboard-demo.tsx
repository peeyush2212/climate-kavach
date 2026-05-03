"use client";

import { AlertTriangle, CheckCircle2, CloudRain, FileDown, MapPinned, Navigation, RadioTower, Route, Waves } from "lucide-react";
import { MockActionModal } from "@/components/marketing/mock-action-modal";
import { cn } from "@/lib/utils";

const floodMetrics = [
  { label: "Current flood risk", value: "High", tone: "text-orange-200", border: "border-orange-300/25" },
  { label: "Risk score", value: "78/100", tone: "text-orange-200", border: "border-orange-300/25" },
  { label: "Rainfall next 3 hours", value: "64 mm", tone: "text-cyan-200", border: "border-cyan-300/20" },
  { label: "Water level near gate", value: "12 cm", tone: "text-blue-200", border: "border-blue-300/20" },
  { label: "Drain overflow risk", value: "Critical", tone: "text-red-200", border: "border-red-300/25" },
  { label: "Sensor health", value: "5/5 live", tone: "text-emerald-200", border: "border-emerald-300/20" },
];

const alerts = [
  "Critical drain overflow near north loading bay.",
  "Rainfall intensity increasing for the next 90 minutes.",
  "Safe access currently available through Gate 3.",
];

const checklist = ["Move inventory", "Protect electrical panels", "Shift vehicles", "Avoid blocked roads", "Inform delivery partners"];

export function FloodDashboardDemo() {
  return (
    <div className="rounded-2xl border border-cyan-300/20 bg-slate-950/65 p-4 shadow-[0_0_80px_rgba(34,211,238,.10)] backdrop-blur-xl">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.18em] text-orange-300">
            <Waves className="h-4 w-4" />
            Sample Flood Dashboard
          </div>
          <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-cyan-50">Warehouse flood protection view</h2>
        </div>
        <div className="rounded-full border border-orange-300/30 bg-orange-300/10 px-3 py-1 text-xs font-black text-orange-200">
          Recommended action: Move stock above ground level
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {floodMetrics.map((metric) => (
          <div key={metric.label} className={cn("rounded-xl border bg-slate-950/70 p-3", metric.border)}>
            <div className="text-[11px] font-black uppercase tracking-[0.13em] text-slate-500">{metric.label}</div>
            <div className={cn("mt-3 text-2xl font-black tracking-[-0.04em]", metric.tone)}>{metric.value}</div>
          </div>
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.1fr_.9fr_230px]">
        <div className="relative min-h-[320px] overflow-hidden rounded-xl border border-cyan-300/15 bg-slate-950/70 p-4">
          <div className="flex items-center gap-2 text-sm font-black text-cyan-50">
            <MapPinned className="h-4 w-4 text-cyan-300" />
            Flood-risk map placeholder
          </div>
          <div className="absolute inset-x-6 bottom-8 top-14 rounded-xl border border-cyan-300/10 bg-[linear-gradient(90deg,rgba(14,165,233,.12)_1px,transparent_1px),linear-gradient(rgba(14,165,233,.10)_1px,transparent_1px)] bg-[size:42px_42px]" />
          <div className="absolute left-[18%] top-[34%] h-16 w-32 rounded-lg border border-emerald-300/25 bg-emerald-300/10 p-2 text-xs font-black text-emerald-100">
            Gate 3 safe
          </div>
          <div className="absolute right-[18%] top-[48%] h-20 w-36 rounded-lg border border-red-300/30 bg-red-400/15 p-2 text-xs font-black text-red-100">
            Gate 2 blocked
          </div>
          <div className="absolute bottom-[18%] left-[38%] h-24 w-40 rounded-lg border border-orange-300/30 bg-orange-300/15 p-2 text-xs font-black text-orange-100">
            Loading bay risk
          </div>
          <div className="absolute left-[12%] top-[66%] h-1 w-[68%] rotate-[-8deg] rounded-full bg-cyan-300/45" />
          <div className="absolute bottom-4 left-4 rounded-lg border border-cyan-300/15 bg-slate-950/85 px-3 py-2 text-xs font-semibold text-slate-300">
            Safe access route: <span className="text-cyan-200">Gate 3</span>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-xl border border-orange-300/20 bg-orange-300/10 p-4">
            <div className="flex items-center gap-2 text-sm font-black text-orange-100">
              <AlertTriangle className="h-4 w-4" />
              Real-time alerts
            </div>
            <div className="mt-3 space-y-2">
              {alerts.map((alert) => (
                <div key={alert} className="rounded-lg border border-orange-300/15 bg-slate-950/60 p-3 text-sm font-semibold leading-6 text-slate-300">
                  {alert}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-emerald-300/15 bg-emerald-300/5 p-4">
            <div className="flex items-center gap-2 text-sm font-black text-emerald-100">
              <CheckCircle2 className="h-4 w-4" />
              Business continuity checklist
            </div>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {checklist.map((item) => (
                <div key={item} className="flex items-center gap-2 rounded-lg border border-emerald-300/10 bg-slate-950/55 px-3 py-2 text-sm font-semibold text-slate-300">
                  <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="rounded-xl border border-cyan-300/15 bg-slate-950/70 p-3">
          <div className="text-sm font-black text-cyan-50">Actions</div>
          <div className="mt-3 grid gap-2">
            <MockActionModal triggerLabel="Add location" title="Location setup demo" ctaHref="/contact?interest=flood" />
            <MockActionModal triggerLabel="Add sensor" title="Sensor kit demo" ctaHref="/contact?interest=sensors" />
            <MockActionModal triggerLabel="Download risk report" title="Risk report demo" ctaHref="/contact?interest=flood" />
            <MockActionModal triggerLabel="View safe route" title="Safe route demo" ctaHref="/contact?interest=flood" />
          </div>
          <div className="mt-4 grid gap-2 text-xs font-semibold text-slate-400">
            <div className="flex items-center gap-2">
              <CloudRain className="h-3.5 w-3.5 text-cyan-300" />
              Rainfall alerts
            </div>
            <div className="flex items-center gap-2">
              <RadioTower className="h-3.5 w-3.5 text-blue-300" />
              Live sensors
            </div>
            <div className="flex items-center gap-2">
              <Route className="h-3.5 w-3.5 text-emerald-300" />
              Access routing
            </div>
            <div className="flex items-center gap-2">
              <FileDown className="h-3.5 w-3.5 text-orange-300" />
              Insurance report
            </div>
            <div className="flex items-center gap-2">
              <Navigation className="h-3.5 w-3.5 text-cyan-300" />
              Gate 3 recommended
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
