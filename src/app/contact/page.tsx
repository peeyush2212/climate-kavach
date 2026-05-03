import { Suspense } from "react";
import { ContactPage } from "@/components/app/contact-page";

export default function ContactRoute() {
  return (
    <Suspense fallback={<div className="text-sm text-slate-400">Loading contact form...</div>}>
      <ContactPage />
    </Suspense>
  );
}
