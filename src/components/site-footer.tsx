import Link from "next/link";

const platformLinks = [
  { href: "/simulator", label: "Policy Simulator" },
  { href: "/explorer", label: "Explorer" },
  { href: "/data-model", label: "Data & Model" },
  { href: "/carbon-kavach", label: "Carbon Kavach" },
  { href: "/flood-kavach", label: "Flood Kavach" },
  { href: "/sensor-kavach", label: "Sensor Kavach" },
  { href: "/data-kavach", label: "Data Kavach" },
];

const businessLinks = [
  { href: "/pricing", label: "Pricing" },
  { href: "/premium", label: "Premium Data" },
  { href: "/payments", label: "Payments" },
  { href: "/contact", label: "Request Demo" },
  { href: "/contact", label: "Contact" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-cyan-300/15 bg-slate-950/65 backdrop-blur-xl">
      <div className="mx-auto grid max-w-[1600px] gap-8 px-4 py-8 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <Link href="/" className="text-lg font-black tracking-[-0.04em] text-cyan-50">
            Climate Kavach
          </Link>
          <p className="mt-3 text-sm font-semibold leading-6 text-slate-400">
            India's climate protection platform for businesses and governments.
          </p>
        </div>
        <div>
          <div className="text-sm font-black uppercase tracking-[0.16em] text-cyan-200">Platform</div>
          <div className="mt-3 grid gap-2 text-sm font-semibold">
            {platformLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-slate-400 hover:text-cyan-100">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <div className="text-sm font-black uppercase tracking-[0.16em] text-cyan-200">Business</div>
          <div className="mt-3 grid gap-2 text-sm font-semibold">
            {businessLinks.map((link) => (
              <Link key={`${link.href}-${link.label}`} href={link.href} className="text-slate-400 hover:text-cyan-100">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <div className="text-sm font-black uppercase tracking-[0.16em] text-cyan-200">Contact</div>
          <div className="mt-3 space-y-2 text-sm font-semibold text-slate-400">
            <div>Full name: Peeyush Kumar Jha</div>
            <div>Location: India</div>
            <div>UPI: peeyush2212@okhdfcbank</div>
            <div>Email: peeyushkjha.12@gmail.com</div>
          </div>
          <div className="mt-4 flex gap-4 text-sm font-semibold">
            <Link href="/privacy" className="text-slate-400 hover:text-cyan-100">Privacy</Link>
            <Link href="/terms" className="text-slate-400 hover:text-cyan-100">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
