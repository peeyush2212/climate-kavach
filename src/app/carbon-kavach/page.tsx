import { Building2, ClipboardCheck, Factory, FileText, Gauge, Leaf, LineChart, ReceiptText, Sparkles, Upload, Zap } from "lucide-react";
import { CarbonDashboardDemo } from "@/components/demo/carbon-dashboard-demo";
import { ActionLink } from "@/components/marketing/action-link";
import { MockActionModal } from "@/components/marketing/mock-action-modal";

const painPoints = [
  "No carbon footprint",
  "No sustainability team",
  "Rising energy bills",
  "Diesel generator dependence",
  "Buyer and ESG pressure",
  "No affordable reporting tool",
];

const steps = [
  {
    title: "Upload bills",
    text: "Electricity, diesel, LPG, water, logistics, and purchase records.",
    icon: Upload,
  },
  {
    title: "Calculate emissions",
    text: "The system estimates Scope 1, Scope 2, and basic Scope 3 emissions.",
    icon: ClipboardCheck,
  },
  {
    title: "View dashboard",
    text: "See emissions by source, month, location, and business activity.",
    icon: LineChart,
  },
  {
    title: "Reduce emissions",
    text: "Get ranked actions based on impact, cost, and payback.",
    icon: Leaf,
  },
];

const dashboardFeatures = [
  "Carbon score",
  "Monthly emissions tracking",
  "Electricity emissions",
  "Fuel emissions",
  "Logistics emissions",
  "Waste emissions",
  "ESG report generator",
  "Business benchmarking",
  "Sensor integration",
  "Cost-saving recommendations",
];

const recommendations = [
  { title: "Replace old lighting with LEDs", impact: "Medium", cost: "Low", payback: "6-12 months" },
  { title: "Reduce diesel generator use", impact: "High", cost: "Medium", payback: "12-18 months" },
  { title: "Install rooftop solar", impact: "High", cost: "High", payback: "3-5 years" },
  { title: "Improve cooling efficiency", impact: "Medium", cost: "Medium", payback: "1-2 years" },
];

const industries = ["Hotels", "Cafes", "Offices", "Colleges", "Hospitals", "Factories", "Warehouses", "Retail chains", "Industrial parks"];

export default function CarbonKavachPage() {
  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-2xl border border-emerald-300/20 bg-slate-950/70 p-6 shadow-[0_0_90px_rgba(16,185,129,.13)] backdrop-blur-xl sm:p-8">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/60 to-transparent" />
        <div className="relative z-10 grid gap-6 lg:grid-cols-[1fr_360px] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/25 bg-emerald-300/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-emerald-100">
              <ReceiptText className="h-3.5 w-3.5" />
              Carbon Kavach
            </div>
            <h1 className="mt-5 max-w-4xl text-3xl font-black tracking-[-0.055em] text-cyan-50 sm:text-5xl">
              Carbon accounting made simple for Indian businesses
            </h1>
            <p className="mt-4 max-w-3xl text-sm font-semibold leading-6 text-slate-400 sm:text-base">
              Upload electricity bills, fuel bills, logistics data, invoices, and operational records to calculate your
              business carbon footprint and get reduction recommendations.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ActionLink href="/contact?interest=carbon" size="lg">
                Start Carbon Check
              </ActionLink>
              <ActionLink href="#sample-dashboard" variant="outline" size="lg">
                View Sample Report
              </ActionLink>
            </div>
          </div>
          <div className="rounded-2xl border border-emerald-300/20 bg-slate-950/75 p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-sm font-black uppercase tracking-[0.16em] text-slate-500">Demo company</div>
                <div className="mt-1 text-2xl font-black text-cyan-50">8.4 tCO2e/mo</div>
              </div>
              <Gauge className="h-10 w-10 text-emerald-300" />
            </div>
            <div className="mt-5 grid gap-3">
              {[
                ["Electricity", "4.9 tCO2e", "68%"],
                ["Fuel", "1.7 tCO2e", "42%"],
                ["Logistics", "1.2 tCO2e", "34%"],
              ].map(([label, value, width]) => (
                <div key={label}>
                  <div className="mb-1 flex justify-between text-xs font-bold text-slate-400">
                    <span>{label}</span>
                    <span>{value}</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-800">
                    <div className="h-2 rounded-full bg-gradient-to-r from-emerald-300 to-cyan-300" style={{ width }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4" aria-labelledby="carbon-problem">
        <h2 id="carbon-problem" className="text-2xl font-black tracking-[-0.04em] text-cyan-50">
          Most SMEs do not know where their emissions come from
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {painPoints.map((point) => (
            <div key={point} className="rounded-xl border border-cyan-300/15 bg-slate-950/55 p-4 text-sm font-black text-slate-200">
              {point}
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4" aria-labelledby="carbon-how">
        <h2 id="carbon-how" className="text-2xl font-black tracking-[-0.04em] text-cyan-50">
          How Carbon Kavach Works
        </h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {steps.map(({ title, text, icon: Icon }, idx) => (
            <div key={title} className="rounded-xl border border-emerald-300/15 bg-slate-950/60 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-emerald-300/20 bg-emerald-300/10 text-emerald-200">
                <Icon className="h-5 w-5" />
              </div>
              <div className="mt-4 text-xs font-black uppercase tracking-[0.18em] text-slate-500">Step {idx + 1}</div>
              <h3 className="mt-1 text-lg font-black text-cyan-50">{title}</h3>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-400">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4" aria-labelledby="carbon-features">
        <h2 id="carbon-features" className="text-2xl font-black tracking-[-0.04em] text-cyan-50">
          Dashboard features
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {dashboardFeatures.map((feature) => (
            <div key={feature} className="rounded-xl border border-cyan-300/15 bg-cyan-300/5 p-4 text-sm font-bold text-slate-200">
              <Zap className="mb-3 h-4 w-4 text-cyan-300" />
              {feature}
            </div>
          ))}
        </div>
      </section>

      <section id="sample-dashboard" className="scroll-mt-24">
        <CarbonDashboardDemo />
      </section>

      <section className="space-y-4" aria-labelledby="carbon-recommendations">
        <h2 id="carbon-recommendations" className="text-2xl font-black tracking-[-0.04em] text-cyan-50">
          Recommendation cards
        </h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {recommendations.map((rec) => (
            <div key={rec.title} className="rounded-xl border border-emerald-300/15 bg-slate-950/60 p-4">
              <Sparkles className="h-5 w-5 text-emerald-300" />
              <h3 className="mt-3 text-base font-black text-cyan-50">{rec.title}</h3>
              <div className="mt-4 grid gap-2 text-sm font-semibold text-slate-300">
                <div>Impact: <span className="text-emerald-200">{rec.impact}</span></div>
                <div>Cost: <span className="text-cyan-200">{rec.cost}</span></div>
                <div>Payback: <span className="text-slate-100">{rec.payback}</span></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4" aria-labelledby="carbon-industries">
        <h2 id="carbon-industries" className="text-2xl font-black tracking-[-0.04em] text-cyan-50">
          Target industries
        </h2>
        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-9">
          {industries.map((industry) => (
            <div key={industry} className="rounded-xl border border-cyan-300/15 bg-slate-950/55 p-3 text-center text-sm font-black text-slate-200">
              {industry}
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.18em] text-emerald-200">
              <Building2 className="h-4 w-4" />
              Carbon pilot
            </div>
            <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-cyan-50">Start your first carbon check today</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <MockActionModal
              triggerLabel="Upload Sample Bill"
              title="Demo upload coming soon"
              message="Demo upload coming soon. Request a demo to test Carbon Kavach."
              ctaHref="/contact?interest=carbon"
              variant="default"
            />
            <ActionLink href="/contact?interest=carbon" variant="outline">
              <FileText className="h-4 w-4" />
              Request Demo
            </ActionLink>
          </div>
        </div>
      </section>
    </div>
  );
}
