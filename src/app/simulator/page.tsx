import { Suspense } from "react";
import modelInputs from "@/data/model_inputs.json";
import type { ModelInputs } from "@/lib/types";
import { AppInitializer } from "@/components/app/app-initializer";
import { Dashboard } from "@/components/app/dashboard";

export default function SimulatorPage() {
  return (
    <>
      <Suspense fallback={null}>
        <AppInitializer inputs={modelInputs as unknown as ModelInputs} />
      </Suspense>
      <Dashboard />
    </>
  );
}
