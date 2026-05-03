import { AlertTriangle, Building2, CheckCircle2, CloudRain, MapPinned, RadioTower, ShieldAlert, Truck, Waves } from "lucide-react";
import { FloodDashboardDemo } from "@/components/demo/flood-dashboard-demo";
import { ActionLink } from "@/components/marketing/action-link";

const painPoints = [
  "Warehouse gates flood suddenly",
  "Basements and parking areas are exposed",
  "Deliveries get delayed",
  "Inventory gets damaged",
  "Roads become inaccessible",
  "Insurance documentation is weak",
];

const steps = [
  {
    title: "Add business location",
    text: "Enter location, building type, entry points, basement details, and asset exposure.",
    icon: MapPinned,
  },
  {
    title: "Analyse flood risk",
    text: "The system uses rainfall forecasts, elevation, flood history, drainage risk, and road access data.",
    icon: ShieldAlert,
  },
  {
    title: "Connect sensors",
    text: "Install water-level, rainfall, and drain overflow sensors for better accuracy.",
    icon: RadioTower,
  },
  {
    title: "Receive alerts and actions",
    text: "Get alerts and business continuity checklists before damage happens.",
    icon: AlertTriangle,
  },
];

const features = [
  "Location flood-risk score",
  "Real-time rainfall alerts",
  "Water-level sensor reading",
  "Drain overflow risk",
  "Safe access routes",
  "Business continuity checklist",
  "Insurance risk report",
  "Multi-location monitoring",
];

const alertExamples = [
  {
    title: "Moderate Alert",
    text: "Heavy rainfall expected near your location in the next 6 hours. Check drains and secure outdoor inventory.",
    tone: "border-yellow-300/20 bg-yellow-300/10 text-yellow-100",
  },
  {
    title: "High Alert",
    text: "Flood risk is high near your warehouse entrance. Move ground-level stock and avoid Gate 2.",
    tone: "border-orange-300/25 bg-orange-300/10 text-orange-100",
  },
  {
    title: "Critical Alert",
    text: "Water-level sensor has detected rapid water rise near the basement entrance. Stop basement access and shift vehicles immediately.",
    tone: "border-red-300/25 bg-red-400/10 text-red-100",
  },
];

const industries = [
  "Warehouses",
  "Logistics companies",
  "Hotels",
  "Malls",
  "Hospitals",
  "Colleges",
  "Factories",
  "Retail chains",
  "Housing societies",
  "Industrial parks",
];

export default function FloodKavachPage() {
  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-2xl border border-orange-300/20 bg-slate-950/70 p-6 shadow-[0_0_90px_rgba(251,146,60,.12)] backdrop-blur-xl sm:p-8">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-300/60 to-transparent" />
        <div className="relative z-10 grid gap-6 lg:grid-cols-[1fr_360px] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-300/25 bg-orange-300/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-orange-100">
              <Waves className="h-3.5 w-3.5" />
              Flood Kavach
            </div>
            <h1 className="mt-5 max-w-4xl text-3xl font-black tracking-[-0.055em] text-cyan-50 sm:text-5xl">
              Hyperlocal flood protection for Indian businesses
            </h1>
            <p className="mt-4 max-w-3xl text-sm font-semibold leading-6 text-slate-400 sm:text-base">
              Predict flood risk, monitor water levels, track rainfall, and receive real-time alerts before flooding
              damages your business.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ActionLink href="/contact?interest=flood" size="lg">
                Check Flood Risk
              </ActionLink>
              <ActionLink href="#flood-demo" variant="outline" size="lg">
                View Sensor Demo
              </ActionLink>
            </div>
          </div>
          <div className="rounded-2xl border border-orange-300/20 bg-slate-950/75 p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-sm font-black uppercase tracking-[0.16em] text-slate-500">Warehouse Zone A</div>
                <div className="mt-1 text-2xl font-black text-orange-100">Risk score 78/100</div>
              </div>
              <CloudRain className="h-10 w-10 text-orange-300" />
            </div>
            <div className="mt-5 grid gap-3 text-sm font-semibold text-slate-300">
              <div className="flex items-center justify-between rounded-lg border border-orange-300/15 bg-orange-300/10 px-3 py-2">
                <span>Rainfall next 3 hours</span>
                <span className="text-orange-100">64 mm</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-red-300/15 bg-red-400/10 px-3 py-2">
                <span>Drain overflow</span>
                <span className="text-red-100">Critical</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-emerald-300/15 bg-emerald-300/10 px-3 py-2">
                <span>Safe access route</span>
                <span className="text-emerald-100">Gate 3</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4" aria-labelledby="flood-problem">
        <h2 id="flood-problem" className="text-2xl font-black tracking-[-0.04em] text-cyan-50">
          City-wide flood alerts are not enough
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {painPoints.map((point) => (
            <div key={point} className="rounded-xl border border-orange-300/15 bg-slate-950/55 p-4 text-sm font-black text-slate-200">
              {point}
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4" aria-labelledby="flood-how">
        <h2 id="flood-how" className="text-2xl font-black tracking-[-0.04em] text-cyan-50">
          How Flood Kavach Works
        </h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {steps.map(({ title, text, icon: Icon }, idx) => (
            <div key={title} className="rounded-xl border border-orange-300/15 bg-slate-950/60 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-orange-300/20 bg-orange-300/10 text-orange-200">
                <Icon className="h-5 w-5" />
              </div>
              <div className="mt-4 text-xs font-black uppercase tracking-[0.18em] text-slate-500">Step {idx + 1}</div>
              <h3 className="mt-1 text-lg font-black text-cyan-50">{title}</h3>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-400">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4" aria-labelledby="flood-features">
        <h2 id="flood-features" className="text-2xl font-black tracking-[-0.04em] text-cyan-50">
          Dashboard features
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div key={feature} className="rounded-xl border border-cyan-300/15 bg-cyan-300/5 p-4 text-sm font-bold text-slate-200">
              <CheckCircle2 className="mb-3 h-4 w-4 text-cyan-300" />
              {feature}
            </div>
          ))}
        </div>
      </section>

      <section id="flood-demo" className="scroll-mt-24">
        <FloodDashboardDemo />
      </section>

      <section className="space-y-4" aria-labelledby="flood-alerts">
        <h2 id="flood-alerts" className="text-2xl font-black tracking-[-0.04em] text-cyan-50">
          Alert examples
        </h2>
        <div className="grid gap-4 lg:grid-cols-3">
          {alertExamples.map((alert) => (
            <div key={alert.title} className={`rounded-xl border p-4 ${alert.tone}`}>
              <AlertTriangle className="h-5 w-5" />
              <h3 className="mt-3 text-lg font-black">{alert.title}</h3>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-300">{alert.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4" aria-labelledby="flood-industries">
        <h2 id="flood-industries" className="text-2xl font-black tracking-[-0.04em] text-cyan-50">
          Target industries
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {industries.map((industry) => (
            <div key={industry} className="rounded-xl border border-cyan-300/15 bg-slate-950/55 p-3 text-center text-sm font-black text-slate-200">
              {industry}
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-orange-300/20 bg-orange-300/10 p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.18em] text-orange-200">
              <Truck className="h-4 w-4" />
              Business continuity
            </div>
            <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-cyan-50">Protect your location before the next flood</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <ActionLink href="/contact?interest=flood">
              <Building2 className="h-4 w-4" />
              Check My Flood Risk
            </ActionLink>
            <ActionLink href="/contact?interest=sensors" variant="outline">
              <RadioTower className="h-4 w-4" />
              Request Sensor Kit
            </ActionLink>
          </div>
        </div>
      </section>
    </div>
  );
}
