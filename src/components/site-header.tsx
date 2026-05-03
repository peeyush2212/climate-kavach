import Link from "next/link";
import { Activity, BarChart3, Database, Gauge, Sparkles } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

const navItems = [
  { href: "/", label: "Simulation", icon: Gauge },
  { href: "/explorer", label: "Explorer", icon: Activity },
  { href: "/data-model", label: "Data & Model", icon: Database },
  { href: "/premium", label: "Premium", icon: BarChart3 },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-cyan-300/15 bg-slate-950/75 backdrop-blur-2xl">
      <div className="mx-auto flex min-h-16 max-w-[1600px] flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-300/35 bg-cyan-300/10 text-cyan-200 shadow-[0_0_35px_rgba(34,211,238,.30)] transition-transform group-hover:scale-105">
            <Sparkles className="h-5 w-5" />
          </span>
          <span>
            <span className="block text-base font-black tracking-[-0.04em] text-cyan-50">INDIA-ROADS</span>
            <span className="block text-[10px] font-black uppercase tracking-[0.28em] text-cyan-300/70">En-ROADS style simulator</span>
          </span>
        </Link>

        <nav className="order-3 flex w-full items-center gap-1 overflow-x-auto text-sm sm:order-none sm:w-auto">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} className="inline-flex h-10 shrink-0 items-center gap-2 rounded-lg border border-transparent px-3 font-bold text-slate-400 transition-colors hover:border-cyan-300/30 hover:bg-cyan-300/10 hover:text-cyan-100">
              <Icon className="h-4 w-4" />{label}
            </Link>
          ))}
        </nav>

        <ThemeToggle />
      </div>
    </header>
  );
}
