import {
  BarChart3,
  Building2,
  CloudRain,
  Database,
  Factory,
  Landmark,
  LineChart,
  RadioTower,
  ReceiptText,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { ActionLink } from "@/components/marketing/action-link";
import { ModuleEntryCards } from "@/components/marketing/module-entry-cards";

export default function Page() {
  const outcomes = [
    "Measure business emissions without a large sustainability team.",
    "Predict flood exposure before stock, vehicles, and buildings are damaged.",
    "Use India-focused climate data for planning, policy, and investment decisions.",
    "Connect sensors when real-time carbon or flood intelligence is needed.",
  ];

  const users = [
    { title: "Businesses", text: "Carbon accounting, flood readiness, energy savings, and ESG-ready reports.", icon: Building2 },
    { title: "Governments", text: "Policy simulation, district risk intelligence, and decision-ready climate data.", icon: Landmark },
    { title: "Industrial sites", text: "Emissions, energy, flood, water, and operational risk across locations.", icon: Factory },
  ];

  const workflow = [
    { title: "Measure", text: "Upload bills, operational records, or connect sensors to build a practical climate baseline.", icon: ReceiptText },
    { title: "Simulate", text: "Use the India policy simulator to test emissions, energy, air quality, and temperature pathways.", icon: LineChart },
    { title: "Protect", text: "Monitor flood risk, rainfall, drains, and site-level exposure before disruption happens.", icon: CloudRain },
    { title: "Decide", text: "Buy data packs or request custom analysis for cities, districts, sectors, and assets.", icon: Database },
  ];

  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-2xl border border-cyan-300/20 bg-slate-950/70 p-6 shadow-[0_0_100px_rgba(34,211,238,.14)] backdrop-blur-xl sm:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(34,211,238,.20),transparent_26rem),radial-gradient(circle_at_88%_16%,rgba(16,185,129,.16),transparent_30rem)]" />
        <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_420px] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-cyan-100">
              <Sparkles className="h-3.5 w-3.5" />
              Climate Kavach
            </div>
            <h1 className="mt-5 max-w-5xl text-4xl font-black tracking-[-0.06em] text-cyan-50 sm:text-6xl">
              India's climate protection platform for businesses and governments
            </h1>
            <p className="mt-5 max-w-3xl text-base font-semibold leading-7 text-slate-400">
              Climate Kavach helps Indian organizations measure emissions, predict flood risk, simulate climate policy,
              and access decision-ready climate data through one India-focused platform.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <ActionLink href="/contact" size="lg">
                Request Demo
              </ActionLink>
              <ActionLink href="/simulator" variant="outline" size="lg">
                Open Policy Simulator
              </ActionLink>
            </div>
          </div>

          <div className="rounded-2xl border border-cyan-300/20 bg-slate-950/75 p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-sm font-black uppercase tracking-[0.16em] text-slate-500">Platform snapshot</div>
                <div className="mt-1 text-2xl font-black text-cyan-50">Carbon + Flood + Data</div>
              </div>
              <ShieldCheck className="h-10 w-10 text-emerald-300" />
            </div>
            <div className="mt-5 grid gap-3">
              {[
                ["Carbon accounting", "Bills to footprint", "78%"],
                ["Flood protection", "Risk to alerts", "64%"],
                ["Climate data", "Reports to action", "86%"],
              ].map(([label, detail, width]) => (
                <div key={label} className="rounded-xl border border-cyan-300/15 bg-cyan-300/5 p-3">
                  <div className="flex items-center justify-between gap-3 text-sm font-black text-slate-200">
                    <span>{label}</span>
                    <span className="text-cyan-200">{detail}</span>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-slate-800">
                    <div className="h-2 rounded-full bg-gradient-to-r from-cyan-300 to-emerald-300" style={{ width }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[.9fr_1.1fr]">
        <div className="rounded-2xl border border-cyan-300/20 bg-slate-950/60 p-6">
          <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.18em] text-cyan-300">
            <BarChart3 className="h-4 w-4" />
            What the business does
          </div>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.05em] text-cyan-50">
            Climate intelligence that turns risk into action
          </h2>
          <p className="mt-4 text-sm font-semibold leading-6 text-slate-400">
            The platform combines software dashboards, analysed climate data packs, optional sensors, and India-specific
            modelling. Customers can start with a demo, buy premium reports, or pilot carbon and flood intelligence for
            their locations.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {outcomes.map((item) => (
            <div key={item} className="rounded-xl border border-emerald-300/15 bg-slate-950/55 p-4 text-sm font-bold leading-6 text-slate-200">
              {item}
            </div>
          ))}
        </div>
      </section>

      <ModuleEntryCards />

      <section className="space-y-4" aria-labelledby="workflow-title">
        <h2 id="workflow-title" className="text-2xl font-black tracking-[-0.04em] text-cyan-50">
          One platform, four practical workflows
        </h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {workflow.map(({ title, text, icon: Icon }) => (
            <article key={title} className="rounded-xl border border-cyan-300/15 bg-slate-950/60 p-4">
              <Icon className="h-6 w-6 text-cyan-300" />
              <h3 className="mt-4 text-lg font-black text-cyan-50">{title}</h3>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-400">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-4" aria-labelledby="who-title">
        <h2 id="who-title" className="text-2xl font-black tracking-[-0.04em] text-cyan-50">
          Built for Indian operating conditions
        </h2>
        <div className="grid gap-4 lg:grid-cols-3">
          {users.map(({ title, text, icon: Icon }) => (
            <article key={title} className="rounded-2xl border border-cyan-300/20 bg-slate-950/60 p-5">
              <Icon className="h-6 w-6 text-cyan-300" />
              <h3 className="mt-4 text-xl font-black text-cyan-50">{title}</h3>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-400">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.18em] text-emerald-200">
              <RadioTower className="h-4 w-4" />
              Pilot Climate Kavach
            </div>
            <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-cyan-50">
              Start with a demo, sample data pack, or simulator run
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <ActionLink href="/contact" variant="outline">
              Request Demo
            </ActionLink>
            <ActionLink href="/api/download/sample" variant="outline">
              Download Sample
            </ActionLink>
            <ActionLink href="/simulator">
              Open Simulator
            </ActionLink>
          </div>
        </div>
      </section>
    </div>
  );
}
