"use client";

import { create } from "zustand";
import type { ModelInputs, Scenario, SimulationResult } from "@/lib/types";
import { defaultScenario, simulate } from "@/lib/simulator";
import { checkPremiumUnlocked } from "@/lib/premium";
import modelInputs from "@/data/model_inputs.json";

export type SavedScenario = {
  id: string;
  name: string;
  createdAt: number;
  scenario: Scenario;
};

type ZoomWindow = {
  startYear: number;
  endYear: number;
};

type State = {
  inputs: ModelInputs | null;

  baselineScenario: Scenario | null;
  scenario: Scenario | null;

  baselineSim: SimulationResult | null;
  sim: SimulationResult | null;

  saved: SavedScenario[];
  compareIds: string[];

  zoom: ZoomWindow | null;

  premiumUnlocked: boolean;
  paywallOpen: boolean;

  // actions
  init: (inputs: ModelInputs) => void;
  hydrateClientState: () => void;
  setScenario: (patch: Partial<Scenario>) => void;
  resetScenario: () => void;

  saveScenario: (name: string) => void;
  deleteScenario: (id: string) => void;
  loadScenario: (id: string) => void;
  toggleCompare: (id: string) => void;

  setZoom: (z: ZoomWindow | null) => void;

  openPaywall: () => void;
  closePaywall: () => void;
  refreshPremiumStatus: () => Promise<void>;
};

function uid() {
  return Math.random().toString(36).slice(2, 10) + "_" + Date.now().toString(36);
}

const LS_KEY = "climate_kavach_saved_scenarios_v1";
const initialInputs = modelInputs as unknown as ModelInputs;
const initialBaselineScenario = defaultScenario(initialInputs);
const initialBaselineSim = simulate(initialInputs, initialBaselineScenario);

function loadSaved(): SavedScenario[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(LS_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr)) return [];
    return arr as SavedScenario[];
  } catch {
    return [];
  }
}

function persistSaved(saved: SavedScenario[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LS_KEY, JSON.stringify(saved));
  } catch {
    // ignore
  }
}

export const useClimateKavachStore = create<State>((set, get) => ({
  inputs: initialInputs,
  baselineScenario: initialBaselineScenario,
  scenario: initialBaselineScenario,
  baselineSim: initialBaselineSim,
  sim: initialBaselineSim,

  saved: [],
  compareIds: [],
  zoom: { startYear: initialInputs.meta.baseYear, endYear: initialInputs.meta.endYear },

  premiumUnlocked: false,
  paywallOpen: false,

  init: (inputs) => {
    if (get().inputs) return;

    const baselineScenario = defaultScenario(inputs);
    const baselineSim = simulate(inputs, baselineScenario);

    set({
      inputs,
      baselineScenario,
      scenario: baselineScenario,
      baselineSim,
      sim: baselineSim,
      zoom: { startYear: inputs.meta.baseYear, endYear: inputs.meta.endYear },
    });
  },

  hydrateClientState: () => {
    set({
      saved: loadSaved(),
    });
    void get().refreshPremiumStatus();
  },

  setScenario: (patch) => {
    const st = get();
    if (!st.inputs || !st.scenario) return;
    const next = { ...st.scenario, ...patch };
    const sim = simulate(st.inputs, next);
    set({ scenario: next, sim });
  },

  resetScenario: () => {
    const st = get();
    if (!st.inputs || !st.baselineScenario) return;
    const sim = simulate(st.inputs, st.baselineScenario);
    set({ scenario: st.baselineScenario, sim });
  },

  saveScenario: (name) => {
    const st = get();
    if (!st.scenario) return;
    const s: SavedScenario = {
      id: uid(),
      name: name.trim() || "Scenario",
      createdAt: Date.now(),
      scenario: st.scenario,
    };
    const saved = [s, ...st.saved].slice(0, 50);
    persistSaved(saved);
    set({ saved });
  },

  deleteScenario: (id) => {
    const st = get();
    const saved = st.saved.filter((x) => x.id !== id);
    persistSaved(saved);
    set({ saved, compareIds: st.compareIds.filter((x) => x !== id) });
  },

  loadScenario: (id) => {
    const st = get();
    if (!st.inputs) return;
    const s = st.saved.find((x) => x.id === id);
    if (!s) return;
    const sim = simulate(st.inputs, s.scenario);
    set({ scenario: s.scenario, sim });
  },

  toggleCompare: (id) => {
    const st = get();
    const exists = st.compareIds.includes(id);
    const next = exists ? st.compareIds.filter((x) => x !== id) : [...st.compareIds, id].slice(-3);
    set({ compareIds: next });
  },

  setZoom: (z) => set({ zoom: z }),

  openPaywall: () => set({ paywallOpen: true }),
  closePaywall: () => set({ paywallOpen: false }),

  refreshPremiumStatus: async () => {
    const unlocked = await checkPremiumUnlocked();
    set({ premiumUnlocked: unlocked });
  },
}));
