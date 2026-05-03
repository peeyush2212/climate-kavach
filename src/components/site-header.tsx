"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  BarChart3,
  ChevronDown,
  CloudRain,
  Database,
  Gauge,
  Menu,
  RadioTower,
  ReceiptText,
  Sparkles,
  X,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const primaryNavItems = [
  { href: "/simulator", label: "Simulation", icon: Gauge },
  { href: "/carbon-kavach", label: "Carbon Kavach", icon: ReceiptText },
  { href: "/flood-kavach", label: "Flood Kavach", icon: CloudRain },
  { href: "/pricing", label: "Pricing", icon: BarChart3 },
  { href: "/contact", label: "Contact", icon: Activity },
  { href: "/about", label: "About", icon: Sparkles },
];

const otherNavItems = [
  { href: "/explorer", label: "Explorer", icon: Activity },
  { href: "/data-model", label: "Data & Model", icon: Database },
  { href: "/sensor-kavach", label: "Sensors", icon: RadioTower },
  { href: "/data-kavach", label: "Data Packs", icon: Database },
  { href: "/premium", label: "Premium", icon: Sparkles },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const [otherOpen, setOtherOpen] = React.useState(false);

  React.useEffect(() => {
    setOpen(false);
    setOtherOpen(false);
  }, [pathname]);

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  const navLinkClass = (href: string) =>
    cn(
      "inline-flex h-10 shrink-0 items-center gap-2 rounded-lg border px-3 text-sm font-bold transition-colors",
      isActive(href)
        ? "border-cyan-300/35 bg-cyan-300/12 text-cyan-100"
        : "border-transparent text-slate-400 hover:border-cyan-300/30 hover:bg-cyan-300/10 hover:text-cyan-100"
    );

  return (
    <header className="sticky top-0 z-40 border-b border-cyan-300/15 bg-slate-950/75 backdrop-blur-2xl">
      <div className="mx-auto flex min-h-16 max-w-[1600px] items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-300/35 bg-cyan-300/10 text-cyan-200 shadow-[0_0_35px_rgba(34,211,238,.30)] transition-transform group-hover:scale-105">
            <Sparkles className="h-5 w-5" />
          </span>
          <span>
            <span className="block text-base font-black tracking-[-0.04em] text-cyan-50">Climate Kavach</span>
            <span className="block text-[10px] font-black uppercase tracking-[0.28em] text-cyan-300/70">En-ROADS style simulator</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 xl:flex" aria-label="Primary navigation">
          {primaryNavItems.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} className={navLinkClass(href)}>
              <Icon className="h-4 w-4" />{label}
            </Link>
          ))}
          <div className="relative">
            <button
              type="button"
              className={cn(
                "inline-flex h-10 shrink-0 items-center gap-2 rounded-lg border px-3 text-sm font-bold transition-colors",
                otherNavItems.some((item) => isActive(item.href))
                  ? "border-cyan-300/35 bg-cyan-300/12 text-cyan-100"
                  : "border-transparent text-slate-400 hover:border-cyan-300/30 hover:bg-cyan-300/10 hover:text-cyan-100"
              )}
              aria-haspopup="menu"
              aria-expanded={otherOpen}
              onClick={() => setOtherOpen((value) => !value)}
            >
              Other
              <ChevronDown className={cn("h-4 w-4 transition-transform", otherOpen && "rotate-180")} />
            </button>
            {otherOpen && (
              <div
                className="absolute right-0 top-12 z-50 min-w-56 rounded-xl border border-cyan-300/20 bg-slate-950/95 p-2 shadow-[0_20px_70px_rgba(0,0,0,.35)]"
                role="menu"
              >
                {otherNavItems.map(({ href, label, icon: Icon }) => (
                  <Link key={href} href={href} className={cn(navLinkClass(href), "w-full justify-start")} role="menuitem">
                    <Icon className="h-4 w-4" />
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-300/20 bg-slate-950/55 text-cyan-100 xl:hidden"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-cyan-300/10 bg-slate-950/95 px-4 py-3 xl:hidden" aria-label="Mobile navigation">
          <div className="mx-auto grid max-w-[1600px] gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {primaryNavItems.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href} className={navLinkClass(href)}>
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
            <div className="rounded-lg border border-cyan-300/15 bg-slate-950/50 p-2 sm:col-span-2 lg:col-span-3">
              <div className="px-2 pb-2 text-xs font-black uppercase tracking-[0.16em] text-slate-500">Other</div>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {otherNavItems.map(({ href, label, icon: Icon }) => (
                  <Link key={href} href={href} className={navLinkClass(href)}>
                    <Icon className="h-4 w-4" />
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
