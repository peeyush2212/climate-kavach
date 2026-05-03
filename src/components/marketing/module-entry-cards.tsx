import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { BarChart3, CloudRain, Database, Lock, RadioTower, ReceiptText } from "lucide-react";
import { cn } from "@/lib/utils";

type ModuleCard = {
  title: string;
  href: string;
  description: string;
  icon: LucideIcon;
  accent: string;
};

const modules: ModuleCard[] = [
  {
    title: "Carbon Kavach",
    href: "/carbon-kavach",
    description: "Carbon accounting, bill uploads, emissions dashboards, and reduction actions for Indian businesses.",
    icon: ReceiptText,
    accent: "from-emerald-300/25 to-cyan-300/10 text-emerald-200",
  },
  {
    title: "Flood Kavach",
    href: "/flood-kavach",
    description: "Hyperlocal flood risk, water-level intelligence, alert workflows, and business continuity support.",
    icon: CloudRain,
    accent: "from-orange-300/25 to-cyan-300/10 text-orange-200",
  },
  {
    title: "Sensor Kavach",
    href: "/sensor-kavach",
    description: "Optional energy, diesel, flood, drain, water, waste, refrigeration, and air quality sensors.",
    icon: RadioTower,
    accent: "from-blue-300/25 to-cyan-300/10 text-blue-200",
  },
  {
    title: "Data Kavach",
    href: "/data-kavach",
    description: "Analysed climate, risk, energy, emissions, and policy data packs for India-focused decisions.",
    icon: Database,
    accent: "from-cyan-300/25 to-emerald-300/10 text-cyan-200",
  },
  {
    title: "Premium Data",
    href: "/premium",
    description: "Unlock protected climate data packs through the existing Stripe or UPI/GPay premium flow.",
    icon: Lock,
    accent: "from-fuchsia-300/25 to-cyan-300/10 text-fuchsia-200",
  },
  {
    title: "Policy Simulator",
    href: "/simulator",
    description: "Use the existing En-ROADS-style India simulator for policy, energy, and emissions scenarios.",
    icon: BarChart3,
    accent: "from-cyan-300/25 to-blue-300/10 text-cyan-200",
  },
];

export function ModuleEntryCards({ className }: { className?: string }) {
  return (
    <section className={cn("space-y-3", className)} aria-labelledby="platform-modules">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 id="platform-modules" className="text-lg font-black tracking-[-0.03em] text-cyan-50">
            Climate Kavach platform modules
          </h2>
          <p className="mt-1 max-w-3xl text-sm font-semibold leading-6 text-slate-400">
            The simulator stays the core experience. These entry points connect it to carbon, flood, sensor, and
            decision-ready data products.
          </p>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {modules.map(({ title, href, description, icon: Icon, accent }) => (
          <Link
            key={title}
            href={href}
            className="group rounded-xl border border-cyan-300/15 bg-slate-950/55 p-4 transition-colors hover:border-cyan-300/35 hover:bg-cyan-300/5"
          >
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ring-1 ring-white/10",
                accent
              )}
            >
              <Icon className="h-5 w-5" />
            </div>
            <div className="mt-3 text-base font-black text-cyan-50 transition-colors group-hover:text-cyan-200">
              {title}
            </div>
            <p className="mt-2 text-sm font-semibold leading-6 text-slate-400">{description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
