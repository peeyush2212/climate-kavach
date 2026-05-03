import { Building2, Database, Gauge, ShieldCheck, Sparkles } from "lucide-react";
import { ActionLink } from "@/components/marketing/action-link";

const plans = [
  {
    name: "Free Demo",
    price: "Rs 0",
    includes: ["Sample carbon dashboard", "Sample flood-risk score", "Policy simulator demo", "Data pack preview"],
    button: "Try Demo",
    href: "/simulator",
  },
  {
    name: "Carbon Kavach Basic",
    price: "Rs 999/month",
    includes: ["Bill upload", "Monthly carbon estimate", "Basic emissions breakdown", "Reduction suggestions", "PDF report"],
    button: "Start Carbon Basic",
    href: "/contact?plan=carbon-basic",
  },
  {
    name: "Carbon Kavach Pro",
    price: "Rs 4,999/month",
    includes: ["Scope 1 and 2 emissions", "Basic Scope 3 estimate", "ESG report generator", "Benchmarking", "Reduction roadmap", "Sensor compatibility"],
    button: "Start Carbon Pro",
    href: "/contact?plan=carbon-pro",
  },
  {
    name: "Flood Kavach Basic",
    price: "Rs 2,999/month",
    includes: ["Location flood-risk score", "Rainfall alerts", "Flood dashboard", "Business continuity checklist", "Basic risk report"],
    button: "Start Flood Kavach",
    href: "/contact?plan=flood-basic",
  },
  {
    name: "Flood Kavach Sensor Plan",
    price: "Rs 7,999/month + sensor cost",
    includes: ["Water-level sensor integration", "Drain overflow alerts", "Real-time dashboard", "Incident reports", "Insurance support report"],
    button: "Explore Sensor Plan",
    href: "/contact?plan=flood-sensor",
  },
  {
    name: "Enterprise",
    price: "Custom",
    includes: ["Policy simulator access", "Custom data packs", "Multi-location dashboards", "API access", "Advanced analytics", "Custom reports", "Dedicated support"],
    button: "Contact Sales",
    href: "/contact?plan=enterprise",
  },
];

export default function PricingPage() {
  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-2xl border border-cyan-300/20 bg-slate-950/70 p-6 shadow-[0_0_90px_rgba(34,211,238,.13)] backdrop-blur-xl sm:p-8">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent" />
        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-cyan-100">
            <Gauge className="h-3.5 w-3.5" />
            Pricing
          </div>
          <h1 className="mt-5 text-3xl font-black tracking-[-0.055em] text-cyan-50 sm:text-5xl">
            Plans for businesses, agencies, and governments
          </h1>
          <p className="mt-4 max-w-3xl text-sm font-semibold leading-6 text-slate-400 sm:text-base">
            Start with a free demo, upgrade to carbon or flood intelligence, or choose enterprise access for
            multi-location and policy use cases.
          </p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3" aria-label="Pricing plans">
        {plans.map((plan) => (
          <article key={plan.name} className="flex rounded-2xl border border-cyan-300/15 bg-slate-950/60 p-5">
            <div className="flex w-full flex-col">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-black text-cyan-50">{plan.name}</h2>
                  <div className="mt-2 text-2xl font-black tracking-[-0.04em] text-cyan-200">{plan.price}</div>
                </div>
                <ShieldCheck className="h-5 w-5 text-cyan-300" />
              </div>
              <ul className="mt-5 flex-1 space-y-2 text-sm font-semibold leading-6 text-slate-300">
                {plan.includes.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
              <ActionLink href={plan.href} className="mt-5 w-full" variant={plan.name === "Enterprise" ? "default" : "outline"}>
                {plan.button}
              </ActionLink>
            </div>
          </article>
        ))}
      </section>

      <section className="rounded-2xl border border-fuchsia-300/20 bg-fuchsia-300/10 p-6">
        <div className="grid gap-5 lg:grid-cols-[1fr_280px] lg:items-center">
          <div>
            <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.18em] text-fuchsia-200">
              <Database className="h-4 w-4" />
              Premium climate data pack
            </div>
            <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-cyan-50">Unlock the full analysed India climate data pack</h2>
            <p className="mt-3 text-sm font-semibold leading-6 text-slate-300">
              Use the existing Stripe or UPI/GPay flow to unlock protected premium downloads. No duplicate payment
              system is created for Data Kavach.
            </p>
          </div>
          <ActionLink href="/premium" className="w-full">
            <Sparkles className="h-4 w-4" />
            Unlock Premium Data
          </ActionLink>
        </div>
      </section>

      <section className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.18em] text-cyan-200">
              <Building2 className="h-4 w-4" />
              Pilot support
            </div>
            <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-cyan-50">Need a custom deployment?</h2>
          </div>
          <ActionLink href="/contact?plan=enterprise" variant="outline">Contact Sales</ActionLink>
        </div>
      </section>
    </div>
  );
}
