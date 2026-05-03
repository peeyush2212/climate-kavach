import { Database, FileText, Lock, Sparkles } from "lucide-react";
import { DataPackPreview } from "@/components/demo/data-pack-preview";
import { ActionLink } from "@/components/marketing/action-link";

const packs = [
  {
    title: "State Climate Policy Pack",
    text: "State emissions, energy mix, sector-wise emissions, policy scenarios, and recommendations.",
  },
  {
    title: "District Climate Risk Pack",
    text: "Flood, heatwave, drought, water stress, agriculture vulnerability, and infrastructure exposure.",
  },
  {
    title: "Urban Flood Risk Pack",
    text: "Flood-prone zones, road disruption risk, drainage vulnerability, ward-level risk score, and business exposure.",
  },
  {
    title: "Industrial Emissions Pack",
    text: "Industrial cluster emissions, energy demand, fuel use, efficiency opportunities, and cleaner production recommendations.",
  },
  {
    title: "Renewable Energy Opportunity Pack",
    text: "Solar potential, wind potential, rooftop opportunity, industrial demand mapping, and payback estimates.",
  },
  {
    title: "Heatwave Business Risk Pack",
    text: "Worker productivity risk, cooling demand growth, heat-exposed zones, disruption risk, and adaptation recommendations.",
  },
  {
    title: "Water Stress Pack",
    text: "District water stress score, groundwater risk, industrial water demand, and seasonal shortage risk.",
  },
  {
    title: "Agriculture Climate Risk Pack",
    text: "Crop vulnerability, heat and drought exposure, irrigation dependency, fertilizer emissions, and adaptation strategies.",
  },
];

export default function DataKavachPage() {
  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-2xl border border-cyan-300/20 bg-slate-950/70 p-6 shadow-[0_0_90px_rgba(34,211,238,.13)] backdrop-blur-xl sm:p-8">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent" />
        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-cyan-100">
            <Database className="h-3.5 w-3.5" />
            Data Kavach
          </div>
          <h1 className="mt-5 text-3xl font-black tracking-[-0.055em] text-cyan-50 sm:text-5xl">
            Decision-ready climate data packs for India
          </h1>
          <p className="mt-4 max-w-3xl text-sm font-semibold leading-6 text-slate-400 sm:text-base">
            Access analysed state, district, city, and sector-level climate data for planning, research, policy, risk,
            and business decisions.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <ActionLink href="#packs" size="lg">View Data Packs</ActionLink>
            <ActionLink href="/contact?interest=data" variant="outline" size="lg">Request Custom Report</ActionLink>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-cyan-300/20 bg-slate-950/60 p-6" aria-labelledby="raw-data">
        <div className="max-w-4xl">
          <h2 id="raw-data" className="text-2xl font-black tracking-[-0.04em] text-cyan-50">
            Raw data is not enough
          </h2>
          <p className="mt-3 text-sm font-semibold leading-6 text-slate-400 sm:text-base">
            Climate data is scattered across many sources and often difficult to use. Data Kavach converts raw climate,
            energy, emissions, economic, and risk data into clean reports, maps, charts, and recommendations.
          </p>
        </div>
      </section>

      <section id="packs" className="scroll-mt-24 space-y-4" aria-labelledby="pack-title">
        <h2 id="pack-title" className="text-2xl font-black tracking-[-0.04em] text-cyan-50">
          Data packs
        </h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {packs.map((pack) => (
            <article key={pack.title} className="rounded-xl border border-cyan-300/15 bg-slate-950/60 p-4">
              <div className="flex items-start justify-between gap-3">
                <FileText className="h-5 w-5 text-cyan-300" />
                <div className="inline-flex items-center gap-1 rounded-full border border-fuchsia-300/20 bg-fuchsia-300/10 px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.12em] text-fuchsia-100">
                  <Lock className="h-3 w-3" />
                  Premium
                </div>
              </div>
              <h3 className="mt-4 text-lg font-black text-cyan-50">{pack.title}</h3>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-400">{pack.text}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <ActionLink href="/api/download/sample" variant="outline" size="sm">Download Sample</ActionLink>
                <ActionLink href="/premium" size="sm">Unlock Premium</ActionLink>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="locked-preview">
        <div className="mb-4 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-cyan-300" />
          <h2 id="locked-preview" className="text-2xl font-black tracking-[-0.04em] text-cyan-50">
            Sample locked report preview
          </h2>
        </div>
        <DataPackPreview />
      </section>

      <section className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="text-sm font-black uppercase tracking-[0.18em] text-cyan-200">Custom analysis</div>
            <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-cyan-50">
              Need climate data for a project or policy decision?
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <ActionLink href="/premium">Buy Data Pack</ActionLink>
            <ActionLink href="/contact?interest=data" variant="outline">Request Custom Analysis</ActionLink>
          </div>
        </div>
      </section>
    </div>
  );
}
