import { BarChart3, Building2, CloudRain, Database, Globe2, Landmark, Leaf, Target } from "lucide-react";
import { ActionLink } from "@/components/marketing/action-link";

const whyCards = [
  {
    title: "India needs local climate tools",
    text: "Global tools do not always reflect local Indian conditions.",
    icon: Globe2,
  },
  {
    title: "SMEs need affordable climate support",
    text: "Most businesses cannot afford consultants or complex ESG software.",
    icon: Building2,
  },
  {
    title: "Governments need decision-ready data",
    text: "Agencies need tools that turn climate data into policy action.",
    icon: Landmark,
  },
];

const goals = [
  "Help businesses measure and reduce emissions",
  "Improve flood preparedness",
  "Support better climate policy",
  "Make climate data easier to use",
  "Reduce losses from extreme weather",
];

const founders = ["Peeyush Kumar Jha", "Arya Rajhans"];

export default function AboutPage() {
  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-2xl border border-cyan-300/20 bg-slate-950/70 p-6 shadow-[0_0_90px_rgba(34,211,238,.13)] backdrop-blur-xl sm:p-8">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent" />
        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-cyan-100">
            <Leaf className="h-3.5 w-3.5" />
            About Climate Kavach
          </div>
          <h1 className="mt-5 text-3xl font-black tracking-[-0.055em] text-cyan-50 sm:text-5xl">
            Making climate action practical for India
          </h1>
          <p className="mt-4 max-w-3xl text-sm font-semibold leading-6 text-slate-400 sm:text-base">
            Climate Kavach helps organizations move from climate awareness to measurable climate action through data,
            simulation, sensors, and risk intelligence.
          </p>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-6">
          <Target className="h-6 w-6 text-emerald-300" />
          <h2 className="mt-3 text-2xl font-black tracking-[-0.04em] text-cyan-50">Mission</h2>
          <p className="mt-3 text-sm font-semibold leading-6 text-slate-300">
            To make climate intelligence affordable, local, and actionable for Indian businesses and governments.
          </p>
        </div>
        <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-6">
          <BarChart3 className="h-6 w-6 text-cyan-300" />
          <h2 className="mt-3 text-2xl font-black tracking-[-0.04em] text-cyan-50">Vision</h2>
          <p className="mt-3 text-sm font-semibold leading-6 text-slate-300">
            To become India's climate operating system for emissions reduction, climate resilience, and policy planning.
          </p>
        </div>
      </section>

      <section className="space-y-4" aria-labelledby="why-title">
        <h2 id="why-title" className="text-2xl font-black tracking-[-0.04em] text-cyan-50">
          Why Climate Kavach Exists
        </h2>
        <div className="grid gap-4 lg:grid-cols-3">
          {whyCards.map(({ title, text, icon: Icon }) => (
            <article key={title} className="rounded-xl border border-cyan-300/15 bg-slate-950/60 p-5">
              <Icon className="h-6 w-6 text-cyan-300" />
              <h3 className="mt-4 text-lg font-black text-cyan-50">{title}</h3>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-400">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="rounded-2xl border border-cyan-300/20 bg-slate-950/60 p-6">
          <h2 className="text-2xl font-black tracking-[-0.04em] text-cyan-50">Impact goals</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {goals.map((goal) => (
              <div key={goal} className="rounded-xl border border-emerald-300/15 bg-emerald-300/5 p-4 text-sm font-bold text-slate-200">
                {goal}
              </div>
            ))}
          </div>
        </div>
        <aside className="rounded-2xl border border-cyan-300/20 bg-slate-950/60 p-6">
          <h2 className="text-2xl font-black tracking-[-0.04em] text-cyan-50">Founders</h2>
          <div className="mt-4 space-y-2 text-sm font-semibold text-slate-300">
            {founders.map((founder) => (
              <div key={founder} className="rounded-lg border border-cyan-300/15 bg-cyan-300/5 px-3 py-2">
                {founder}
              </div>
            ))}
          </div>
          <div className="my-6 h-px bg-cyan-300/15" />
          <h2 className="text-2xl font-black tracking-[-0.04em] text-cyan-50">Platform pillars</h2>
          <div className="mt-5 space-y-3 text-sm font-semibold text-slate-300">
            <div className="flex gap-3"><BarChart3 className="h-4 w-4 shrink-0 text-cyan-300" /> Policy simulation</div>
            <div className="flex gap-3"><Leaf className="h-4 w-4 shrink-0 text-emerald-300" /> Carbon accounting</div>
            <div className="flex gap-3"><CloudRain className="h-4 w-4 shrink-0 text-orange-300" /> Flood resilience</div>
            <div className="flex gap-3"><Database className="h-4 w-4 shrink-0 text-cyan-300" /> Climate data packs</div>
          </div>
          <ActionLink href="/contact" className="mt-6 w-full">Request Demo</ActionLink>
        </aside>
      </section>
    </div>
  );
}
