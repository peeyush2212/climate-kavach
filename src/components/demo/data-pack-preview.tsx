import { BarChart3, Database, FileText, Lock, MapPinned, ShieldCheck, Table2 } from "lucide-react";
import { ActionLink } from "@/components/marketing/action-link";
import { PremiumLockedPanel } from "@/components/marketing/premium-locked-panel";

const statCards = [
  { label: "Available data packs", value: "8", icon: Database },
  { label: "Purchased reports", value: "Premium", icon: ShieldCheck },
  { label: "Sample previews", value: "Open", icon: FileText },
  { label: "Premium reports", value: "Locked", icon: Lock },
];

const reports = [
  "State climate policy",
  "District flood risk",
  "Industrial emissions",
  "Renewable energy",
  "Heatwave risk",
];

const riskRows = [
  ["Maharashtra", "Flood", "High"],
  ["Delhi NCR", "Heat", "High"],
  ["Tamil Nadu", "Water", "Medium"],
  ["Gujarat", "Industry", "Medium"],
];

export function DataPackPreview() {
  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-cyan-300/20 bg-slate-950/65 p-4 shadow-[0_0_80px_rgba(34,211,238,.10)] backdrop-blur-xl">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.18em] text-cyan-300">
              <Database className="h-4 w-4" />
              Data Pack Preview
            </div>
            <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-cyan-50">Analysed reports, not raw spreadsheets</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <ActionLink href="/api/download/sample" variant="outline">
              Download sample
            </ActionLink>
            <ActionLink href="/premium">Buy full report</ActionLink>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {statCards.map(({ label, value, icon: Icon }) => (
            <div key={label} className="rounded-xl border border-cyan-300/15 bg-slate-950/70 p-3">
              <div className="flex items-center justify-between gap-3">
                <div className="text-[11px] font-black uppercase tracking-[0.13em] text-slate-500">{label}</div>
                <Icon className="h-4 w-4 text-cyan-300" />
              </div>
              <div className="mt-3 text-2xl font-black tracking-[-0.04em] text-cyan-50">{value}</div>
            </div>
          ))}
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-[1.1fr_.9fr]">
          <div className="relative min-h-[320px] overflow-hidden rounded-xl border border-cyan-300/15 bg-slate-950/70 p-4">
            <div className="flex items-center gap-2 text-sm font-black text-cyan-50">
              <MapPinned className="h-4 w-4 text-cyan-300" />
              India/state map placeholder
            </div>
            <div className="absolute inset-x-6 bottom-8 top-14 rounded-xl border border-cyan-300/10 bg-[linear-gradient(90deg,rgba(14,165,233,.10)_1px,transparent_1px),linear-gradient(rgba(14,165,233,.08)_1px,transparent_1px)] bg-[size:42px_42px]" />
            <div className="absolute left-[18%] top-[28%] rounded-lg border border-orange-300/25 bg-orange-300/10 px-3 py-2 text-xs font-black text-orange-100">
              Flood risk cluster
            </div>
            <div className="absolute right-[20%] top-[38%] rounded-lg border border-emerald-300/25 bg-emerald-300/10 px-3 py-2 text-xs font-black text-emerald-100">
              Solar opportunity
            </div>
            <div className="absolute bottom-[24%] left-[32%] rounded-lg border border-cyan-300/25 bg-cyan-300/10 px-3 py-2 text-xs font-black text-cyan-100">
              Industrial emissions
            </div>
            <div className="absolute bottom-4 left-4 rounded-lg border border-cyan-300/15 bg-slate-950/85 px-3 py-2 text-xs font-semibold text-slate-300">
              Premium data locked: map layers are preview-only
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-xl border border-cyan-300/15 bg-slate-950/70 p-4">
              <div className="flex items-center gap-2 text-sm font-black text-cyan-50">
                <Table2 className="h-4 w-4 text-cyan-300" />
                Risk score table
              </div>
              <div className="mt-3 overflow-hidden rounded-lg border border-cyan-300/10">
                {riskRows.map(([place, category, score]) => (
                  <div key={place} className="grid grid-cols-3 gap-2 border-b border-cyan-300/10 px-3 py-2 text-sm font-semibold last:border-b-0">
                    <span className="text-slate-200">{place}</span>
                    <span className="text-slate-400">{category}</span>
                    <span className={score === "High" ? "text-orange-200" : "text-cyan-200"}>{score}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-cyan-300/15 bg-slate-950/70 p-4">
              <div className="flex items-center gap-2 text-sm font-black text-cyan-50">
                <BarChart3 className="h-4 w-4 text-cyan-300" />
                Emissions mini chart
              </div>
              <div className="mt-4 flex h-32 items-end gap-3">
                {[72, 58, 64, 46, 38, 30].map((height, idx) => (
                  <div key={idx} className="flex flex-1 flex-col items-center gap-2">
                    <div
                      className="w-full rounded-t-md bg-gradient-to-t from-cyan-500/70 to-emerald-300/80"
                      style={{ height: `${height}%` }}
                    />
                    <span className="text-[10px] font-bold text-slate-500">{2021 + idx}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-emerald-300/15 bg-emerald-300/5 p-4">
              <div className="text-sm font-black text-emerald-100">Policy recommendations</div>
              <ul className="mt-3 space-y-2 text-sm font-semibold leading-6 text-slate-300">
                <li>- Prioritize drainage upgrades in high business-exposure wards.</li>
                <li>- Target rooftop solar for high-demand industrial corridors.</li>
                <li>- Use district risk scores for phased adaptation planning.</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-5">
          {reports.map((report) => (
            <div key={report} className="rounded-xl border border-fuchsia-300/15 bg-fuchsia-300/5 p-3">
              <Lock className="h-4 w-4 text-fuchsia-300" />
              <div className="mt-2 text-sm font-black text-cyan-50">{report}</div>
              <div className="mt-1 text-xs font-semibold text-slate-500">Premium report</div>
            </div>
          ))}
        </div>
      </div>

      <PremiumLockedPanel />
    </div>
  );
}
