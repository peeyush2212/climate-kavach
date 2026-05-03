import { Activity, Droplets, Factory, Gauge, PlugZap, RadioTower, Satellite, ThermometerSun, Trash2, Waves, Wind, Zap } from "lucide-react";
import { ActionLink } from "@/components/marketing/action-link";

const sensorCategories = [
  {
    title: "Carbon Sensors",
    items: ["Smart energy meter", "Diesel generator sensor", "Water flow sensor", "Refrigeration sensor", "Waste bin sensor", "Air quality sensor"],
    icon: Zap,
    tone: "border-emerald-300/20 bg-emerald-300/10 text-emerald-100",
  },
  {
    title: "Flood Sensors",
    items: ["Water-level flood sensor", "Rainfall sensor", "Drain overflow sensor", "Soil moisture sensor", "Power disruption sensor"],
    icon: Waves,
    tone: "border-orange-300/20 bg-orange-300/10 text-orange-100",
  },
];

const sensors = [
  {
    name: "Smart Energy Meter",
    purpose: "Tracks real-time electricity use, peak demand, and abnormal consumption.",
    bestFor: "Offices, cafes, hotels, colleges, factories.",
    benefit: "Reduces electricity waste and improves carbon accuracy.",
    connectsTo: "Carbon Kavach",
    icon: Gauge,
  },
  {
    name: "Diesel Generator Sensor",
    purpose: "Tracks generator runtime and fuel-linked emissions.",
    bestFor: "Hospitals, factories, hotels, warehouses.",
    benefit: "Helps reduce diesel dependence and Scope 1 emissions.",
    connectsTo: "Carbon Kavach",
    icon: PlugZap,
  },
  {
    name: "Water Flow Sensor",
    purpose: "Detects water consumption, leakage, and abnormal use.",
    bestFor: "Hotels, colleges, hospitals, factories.",
    benefit: "Reduces water waste and operational inefficiency.",
    connectsTo: "Carbon Kavach",
    icon: Droplets,
  },
  {
    name: "Refrigeration Sensor",
    purpose: "Tracks cooling efficiency, temperature stability, and abnormal energy use.",
    bestFor: "Cafes, restaurants, supermarkets, cold storage, hospitals.",
    benefit: "Reduces cooling energy waste.",
    connectsTo: "Carbon Kavach",
    icon: ThermometerSun,
  },
  {
    name: "Waste Bin Sensor",
    purpose: "Tracks waste generation, bin fill levels, and collection patterns.",
    bestFor: "Malls, hotels, campuses, offices, restaurants.",
    benefit: "Helps reduce landfill waste and methane-linked emissions.",
    connectsTo: "Carbon Kavach",
    icon: Trash2,
  },
  {
    name: "Air Quality Sensor",
    purpose: "Measures PM2.5, PM10, CO2, temperature, humidity, and ventilation quality.",
    bestFor: "Schools, hospitals, offices, hotels.",
    benefit: "Supports healthier and more efficient buildings.",
    connectsTo: "Carbon Kavach",
    icon: Wind,
  },
  {
    name: "Water-Level Flood Sensor",
    purpose: "Detects rising water near gates, basements, drains, and loading bays.",
    bestFor: "Warehouses, hotels, malls, campuses, factories.",
    benefit: "Reduces flood damage and improves adaptation.",
    connectsTo: "Flood Kavach",
    icon: Waves,
  },
  {
    name: "Rainfall Sensor",
    purpose: "Measures local rainfall intensity and cloudburst conditions.",
    bestFor: "Campuses, factories, warehouses, city agencies.",
    benefit: "Improves hyperlocal flood-risk prediction.",
    connectsTo: "Flood Kavach",
    icon: Activity,
  },
  {
    name: "Drain Overflow Sensor",
    purpose: "Detects blocked or overflowing drains.",
    bestFor: "Industrial parks, hotels, malls, hospitals, housing societies.",
    benefit: "Enables earlier flood response.",
    connectsTo: "Flood Kavach",
    icon: Droplets,
  },
  {
    name: "Soil Moisture Sensor",
    purpose: "Measures ground saturation and waterlogging risk.",
    bestFor: "Campuses, solar farms, factories, large institutions.",
    benefit: "Improves waterlogging and runoff prediction.",
    connectsTo: "Flood Kavach",
    icon: Factory,
  },
  {
    name: "Power Disruption Sensor",
    purpose: "Detects power instability during heavy rainfall or flooding.",
    bestFor: "Hospitals, warehouses, hotels, factories.",
    benefit: "Improves business continuity during extreme weather.",
    connectsTo: "Flood Kavach",
    icon: PlugZap,
  },
];

const kits = [
  {
    title: "Carbon Starter Kit",
    includes: ["Smart energy meter", "Diesel generator sensor", "Water flow sensor"],
    bestFor: "Best for offices, cafes, hotels, and small factories.",
  },
  {
    title: "Flood Protection Kit",
    includes: ["Water-level sensor", "Rainfall sensor", "Drain overflow sensor"],
    bestFor: "Best for warehouses, basements, hotels, malls, and campuses.",
  },
  {
    title: "Enterprise Climate Kit",
    includes: [
      "Energy meter",
      "Diesel generator sensor",
      "Water-level sensor",
      "Rainfall sensor",
      "Drain overflow sensor",
      "Air quality sensor",
      "Waste bin sensor",
    ],
    bestFor: "Best for industrial parks, colleges, hospitals, and government buildings.",
  },
];

export default function SensorKavachPage() {
  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-2xl border border-blue-300/20 bg-slate-950/70 p-6 shadow-[0_0_90px_rgba(59,130,246,.13)] backdrop-blur-xl sm:p-8">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-300/60 to-transparent" />
        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-300/25 bg-blue-300/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-blue-100">
            <RadioTower className="h-3.5 w-3.5" />
            Sensor Kavach
          </div>
          <h1 className="mt-5 text-3xl font-black tracking-[-0.055em] text-cyan-50 sm:text-5xl">
            Smart sensors for real-time climate protection
          </h1>
          <p className="mt-4 max-w-3xl text-sm font-semibold leading-6 text-slate-400 sm:text-base">
            Connect energy, diesel, flood, rainfall, drain, water, waste, refrigeration, and air quality sensors to your
            Climate Kavach dashboard.
          </p>
          <div className="mt-6">
            <ActionLink href="#sensor-kits" size="lg">
              Explore Sensor Kits
            </ActionLink>
          </div>
        </div>
      </section>

      <section className="space-y-4" aria-labelledby="sensor-categories">
        <h2 id="sensor-categories" className="text-2xl font-black tracking-[-0.04em] text-cyan-50">
          Sensor Categories
        </h2>
        <div className="grid gap-4 lg:grid-cols-2">
          {sensorCategories.map(({ title, items, icon: Icon, tone }) => (
            <div key={title} className={`rounded-2xl border p-5 ${tone}`}>
              <div className="flex items-center gap-2 text-lg font-black">
                <Icon className="h-5 w-5" />
                {title}
              </div>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {items.map((item) => (
                  <div key={item} className="rounded-lg border border-white/10 bg-slate-950/50 px-3 py-2 text-sm font-semibold text-slate-200">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4" aria-labelledby="sensor-cards">
        <h2 id="sensor-cards" className="text-2xl font-black tracking-[-0.04em] text-cyan-50">
          Sensor Cards
        </h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {sensors.map(({ name, purpose, bestFor, benefit, connectsTo, icon: Icon }) => (
            <article key={name} className="rounded-xl border border-cyan-300/15 bg-slate-950/60 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-black text-cyan-50">{name}</h3>
                  <div className="mt-1 text-xs font-black uppercase tracking-[0.15em] text-cyan-300">{connectsTo}</div>
                </div>
                <Icon className="h-5 w-5 text-cyan-300" />
              </div>
              <div className="mt-4 space-y-3 text-sm font-semibold leading-6 text-slate-400">
                <p><span className="text-slate-200">Purpose:</span> {purpose}</p>
                <p><span className="text-slate-200">Best for:</span> {bestFor}</p>
                <p><span className="text-slate-200">Climate benefit:</span> {benefit}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="sensor-kits" className="scroll-mt-24 space-y-4" aria-labelledby="kits-title">
        <h2 id="kits-title" className="text-2xl font-black tracking-[-0.04em] text-cyan-50">
          Sensor Kit Packages
        </h2>
        <div className="grid gap-4 lg:grid-cols-3">
          {kits.map((kit) => (
            <div key={kit.title} className="rounded-2xl border border-blue-300/20 bg-slate-950/65 p-5">
              <Satellite className="h-6 w-6 text-blue-300" />
              <h3 className="mt-3 text-xl font-black text-cyan-50">{kit.title}</h3>
              <div className="mt-4 text-sm font-black uppercase tracking-[0.14em] text-slate-500">Includes</div>
              <ul className="mt-3 space-y-2 text-sm font-semibold text-slate-300">
                {kit.includes.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
              <p className="mt-4 text-sm font-semibold leading-6 text-slate-400">{kit.bestFor}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-blue-300/20 bg-blue-300/10 p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="text-sm font-black uppercase tracking-[0.18em] text-blue-200">Real-time layer</div>
            <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-cyan-50">Add real-time intelligence to your climate dashboard</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <ActionLink href="/contact?interest=sensors">Request Sensor Demo</ActionLink>
            <ActionLink href="/pricing" variant="outline">View Pricing</ActionLink>
          </div>
        </div>
      </section>
    </div>
  );
}
