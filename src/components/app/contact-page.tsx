"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Mail, MapPin, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const organizationTypes = ["Business", "Government", "Agency", "College", "NGO", "Consultant", "Other"];
const interests = [
  "Policy Simulator",
  "Carbon Kavach",
  "Flood Kavach",
  "Sensor Kavach",
  "Data Kavach",
  "Enterprise Plan",
];

const interestMap: Record<string, string> = {
  carbon: "Carbon Kavach",
  flood: "Flood Kavach",
  sensors: "Sensor Kavach",
  sensor: "Sensor Kavach",
  data: "Data Kavach",
  simulator: "Policy Simulator",
  enterprise: "Enterprise Plan",
  "carbon-basic": "Carbon Kavach",
  "carbon-pro": "Carbon Kavach",
  "flood-basic": "Flood Kavach",
  "flood-sensor": "Sensor Kavach",
};

type FormState = {
  name: string;
  organization: string;
  email: string;
  phone: string;
  city: string;
  organizationType: string;
  interest: string;
  message: string;
};

const emptyForm: FormState = {
  name: "",
  organization: "",
  email: "",
  phone: "",
  city: "",
  organizationType: "Business",
  interest: "",
  message: "",
};

function fieldClass(error?: boolean) {
  return cn(
    "h-11 w-full rounded-lg border bg-slate-950/70 px-3 text-sm text-slate-100 placeholder:text-slate-500",
    error ? "border-red-300/60" : "border-cyan-300/15"
  );
}

export function ContactPage() {
  const searchParams = useSearchParams();
  const [form, setForm] = React.useState<FormState>(emptyForm);
  const [errors, setErrors] = React.useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = React.useState(false);

  React.useEffect(() => {
    const interestParam = searchParams.get("interest");
    const planParam = searchParams.get("plan");
    const mapped = interestMap[(interestParam || planParam || "").toLowerCase()];
    if (!mapped) return;
    setForm((current) => ({
      ...current,
      interest: mapped,
      message: planParam && !current.message ? `Interested in plan: ${planParam}` : current.message,
    }));
  }, [searchParams]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  function validate() {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) next.name = "Name is required.";
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) next.email = "A valid email is required.";
    if (!form.interest) next.interest = "Select an interest.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  }

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-2xl border border-cyan-300/20 bg-slate-950/70 p-6 shadow-[0_0_80px_rgba(34,211,238,.12)] backdrop-blur-xl">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent" />
        <div className="relative z-10 max-w-4xl">
          <div className="text-sm font-black uppercase tracking-[0.22em] text-cyan-300">Contact / Request Demo</div>
          <h1 className="mt-4 text-3xl font-black tracking-[-0.05em] text-cyan-50 sm:text-5xl">Start with Climate Kavach</h1>
          <p className="mt-4 text-sm font-semibold leading-6 text-slate-400 sm:text-base">
            Request a demo, explore data packs, check your business risk, or pilot Climate Kavach for your organization.
          </p>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <form onSubmit={onSubmit} className="rounded-2xl border border-cyan-300/20 bg-slate-950/65 p-5 backdrop-blur-xl" noValidate>
          {submitted ? (
            <div className="flex min-h-[440px] flex-col items-center justify-center rounded-xl border border-emerald-300/20 bg-emerald-300/10 p-8 text-center">
              <CheckCircle2 className="h-12 w-12 text-emerald-300" />
              <h2 className="mt-4 text-2xl font-black text-cyan-50">Thank you. Climate Kavach will contact you soon.</h2>
              <p className="mt-3 max-w-xl text-sm font-semibold leading-6 text-slate-400">
                Your request is saved in this browser session for the demo. A production build can connect this form to
                email, CRM, or a database endpoint.
              </p>
              <Button className="mt-5" type="button" onClick={() => setSubmitted(false)}>
                Send another request
              </Button>
            </div>
          ) : (
            <>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-2">
                  <span className="text-sm font-black text-slate-200">Name</span>
                  <input className={fieldClass(Boolean(errors.name))} value={form.name} onChange={(e) => update("name", e.target.value)} required />
                  {errors.name && <span className="text-xs font-semibold text-red-200">{errors.name}</span>}
                </label>
                <label className="space-y-2">
                  <span className="text-sm font-black text-slate-200">Organization</span>
                  <input className={fieldClass()} value={form.organization} onChange={(e) => update("organization", e.target.value)} />
                </label>
                <label className="space-y-2">
                  <span className="text-sm font-black text-slate-200">Email</span>
                  <input
                    className={fieldClass(Boolean(errors.email))}
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    required
                  />
                  {errors.email && <span className="text-xs font-semibold text-red-200">{errors.email}</span>}
                </label>
                <label className="space-y-2">
                  <span className="text-sm font-black text-slate-200">Phone</span>
                  <input className={fieldClass()} value={form.phone} onChange={(e) => update("phone", e.target.value)} />
                </label>
                <label className="space-y-2">
                  <span className="text-sm font-black text-slate-200">City</span>
                  <input className={fieldClass()} value={form.city} onChange={(e) => update("city", e.target.value)} />
                </label>
                <label className="space-y-2">
                  <span className="text-sm font-black text-slate-200">Organization type</span>
                  <select
                    className={fieldClass()}
                    value={form.organizationType}
                    onChange={(e) => update("organizationType", e.target.value)}
                  >
                    {organizationTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="space-y-2 md:col-span-2">
                  <span className="text-sm font-black text-slate-200">Interested in</span>
                  <select
                    className={fieldClass(Boolean(errors.interest))}
                    value={form.interest}
                    onChange={(e) => update("interest", e.target.value)}
                    required
                  >
                    <option value="">Select interest</option>
                    {interests.map((interest) => (
                      <option key={interest} value={interest}>
                        {interest}
                      </option>
                    ))}
                  </select>
                  {errors.interest && <span className="text-xs font-semibold text-red-200">{errors.interest}</span>}
                </label>
                <label className="space-y-2 md:col-span-2">
                  <span className="text-sm font-black text-slate-200">Message</span>
                  <textarea
                    className="min-h-32 w-full rounded-lg border border-cyan-300/15 bg-slate-950/70 px-3 py-3 text-sm text-slate-100 placeholder:text-slate-500"
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    placeholder="Tell us about your location, use case, or timeline."
                  />
                </label>
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Button type="submit">
                  <Send className="h-4 w-4" />
                  Submit request
                </Button>
                <span className="text-xs font-semibold text-slate-500">No backend is required for this demo form.</span>
              </div>
            </>
          )}
        </form>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-cyan-300/20 bg-slate-950/65 p-5 backdrop-blur-xl">
            <h2 className="text-lg font-black text-cyan-50">Contact</h2>
            <div className="mt-4 space-y-3 text-sm font-semibold text-slate-300">
              <div className="flex gap-3">
                <MapPin className="h-4 w-4 shrink-0 text-cyan-300" />
                India
              </div>
              <div className="flex gap-3">
                <Mail className="h-4 w-4 shrink-0 text-cyan-300" />
                hello@climatekavach.in
              </div>
              <div className="flex gap-3">
                <Phone className="h-4 w-4 shrink-0 text-cyan-300" />
                Request a callback
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-fuchsia-300/20 bg-fuchsia-300/10 p-5">
            <h2 className="text-lg font-black text-cyan-50">Best fit pilots</h2>
            <ul className="mt-3 space-y-2 text-sm font-semibold leading-6 text-slate-300">
              <li>- SMEs measuring emissions for the first time.</li>
              <li>- Warehouses and campuses exposed to flooding.</li>
              <li>- Agencies needing district or city climate packs.</li>
              <li>- Institutions testing sensors and dashboards.</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
