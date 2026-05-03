import { Suspense } from "react";
import { PremiumSuccess } from "@/components/app/premium-success";

export default function PremiumSuccessPage() {
  return (
    <Suspense fallback={<div className="text-sm text-slate-400">Verifying...</div>}>
      <PremiumSuccess />
    </Suspense>
  );
}
