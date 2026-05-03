import type { GradientBoostingModel, ModelInputs, Scenario, SimulationResult, SimulationRow, SklearnTree } from "@/lib/types";
import { clamp } from "@/lib/utils";
import { leverSpecs } from "@/lib/uiConfig";

// -----------------------------
// Numeric helpers
// -----------------------------
function smoothstep(x: number) {
  const t = clamp(x, 0, 1);
  return t * t * (3 - 2 * t);
}

function yearRange(startYear: number, endYear: number) {
  const years: number[] = [];
  for (let y = startYear; y <= endYear; y++) years.push(y);
  return years;
}

function annualRateToHitTarget(startValue: number, endValue: number, nYears: number) {
  if (nYears <= 0 || startValue <= 0 || endValue <= 0) return 0;
  return Math.pow(endValue / startValue, 1 / nYears) - 1;
}

function rampTo2050(years: number[], baseYear: number, startValue: number, endValue: number) {
  const endYear = 2050;
  const denom = Math.max(1, endYear - baseYear);
  return years.map((y) => {
    if (y >= endYear) return endValue;
    const t = (y - baseYear) / denom;
    const w = smoothstep(t);
    return startValue + (endValue - startValue) * w;
  });
}

function actionPath(years: number[], baseYear: number, action: number) {
  return rampTo2050(years, baseYear, 0, clamp(action, -100, 100)).map((x) => x / 100);
}

function expGrowth(years: number[], startYear: number, startValue: number, annualRate: number) {
  return years.map((y) => startValue * Math.pow(1 + annualRate, y - startYear));
}

function softCap(x: number, cap: number) {
  if (cap <= 0) return 0;
  return cap * (1 - Math.exp(-Math.max(0, x) / cap));
}

function sigmoid(x: number) {
  if (x >= 0) return 1 / (1 + Math.exp(-x));
  const e = Math.exp(x);
  return e / (1 + e);
}

function safeLogit(p: number, eps = 1e-6) {
  const pp = clamp(p, eps, 1 - eps);
  return Math.log(pp / (1 - pp));
}

// -----------------------------
// Simple carbon-cycle impulse response
// -----------------------------
const A0 = 0.2173;
const A1 = 0.2240;
const A2 = 0.2824;
const A3 = 0.2763;
const TAU1 = 394.4;
const TAU2 = 36.54;
const TAU3 = 4.304;
const PPM_PER_GTCO2_ATM = 1.0 / 7.81;
const TCRE_C_PER_GTCO2 = 0.00045; // 0.45 C per 1000 GtCO2, rounded directional emulator

function irf(dt: number) {
  return A0 + A1 * Math.exp(-dt / TAU1) + A2 * Math.exp(-dt / TAU2) + A3 * Math.exp(-dt / TAU3);
}

function emissionsToAtmosphericPpm(netEmissionsMt: number[], years: number[]) {
  const n = netEmissionsMt.length;
  const atmGt = new Array(n).fill(0);
  const eGt = netEmissionsMt.map((mt) => mt / 1000.0);
  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      atmGt[j] += eGt[i] * irf(years[j] - years[i]);
    }
  }
  return atmGt.map((gt) => gt * PPM_PER_GTCO2_ATM);
}

// -----------------------------
// PM2.5 GradientBoosting inference
// -----------------------------
function predictTree(tree: SklearnTree, row: number[]) {
  let node = 0;
  while (true) {
    const left = tree.children_left[node];
    const right = tree.children_right[node];
    if (left === -1 && right === -1) return tree.value[node];
    const feat = tree.feature[node];
    const thr = tree.threshold[node];
    node = row[feat] <= thr ? left : right;
    if (node < 0) return tree.value[0] ?? 0;
  }
}

function gbrPredict(model: GradientBoostingModel, X: number[][]) {
  return X.map((row) => {
    let s = 0;
    for (const tree of model.estimators) s += predictTree(tree, row);
    return model.init + model.learning_rate * s;
  });
}

function estimateRecentCagr(history: { year: number[]; [k: string]: (number | null)[] }, key: string, baseYear: number, lookbackYears = 10) {
  const years = history.year;
  const vals = history[key] as (number | null)[];
  const pairs = years
    .map((y, i) => ({ y, v: vals?.[i] }))
    .filter((p) => p.v !== null && p.v !== undefined && Number.isFinite(p.v as number) && p.y <= baseYear) as { y: number; v: number }[];
  if (pairs.length < 2) return 0;
  const lo = Math.max(pairs[0].y, baseYear - lookbackYears);
  const sub = pairs.filter((p) => p.y >= lo).sort((a, b) => a.y - b.y);
  if (sub.length < 2) return 0;
  const a = sub[0];
  const b = sub[sub.length - 1];
  const n = Math.max(1, b.y - a.y);
  if (a.v <= 0 || b.v <= 0) return 0;
  return Math.pow(b.v / a.v, 1 / n) - 1;
}

export function defaultScenario(inputs: ModelInputs): Scenario {
  const b = inputs.indiaBaseline;
  const baseYear = inputs.meta.baseYear;

  const popCagr = estimateRecentCagr(inputs.indiaHistory, "population", baseYear, 10);
  const pop2050 = b.population * Math.pow(1 + 0.5 * popCagr, 2050 - baseYear);
  const gdpCagr = estimateRecentCagr(inputs.indiaHistory, "gdppc_ppp", baseYear, 10) * 100;
  const eiCagr = estimateRecentCagr(inputs.indiaHistory, "energy_intensity", baseYear, 10);
  const eiImprove = Math.max(0, -eiCagr) * 100;

  return {
    Coal_action: 0,
    Oil_action: 0,
    Gas_action: 0,
    Renewables2050_pct: clamp(b.renewables_share + 10, 10, 95),
    Bioenergy_action: 0,
    Nuclear_action: 0,
    NewZero_action: 0,
    CarbonPrice_INR_tCO2: 0,
    TransportEfficiency_action: 0,
    TransportElectrification_action: 0,
    BuildingsIndustryEfficiency_action: 0,
    BuildingsIndustryElectrification_action: 0,
    NatureBasedRemoval_action: 0,
    TechRemoval_action: 0,
    AgriculturalEmissions_action: 0,
    WasteLeakage_action: 0,
    Deforestation_action: 0,
    Pop2050_billion: Number(clamp(pop2050 / 1e9, 1.1, 1.8).toFixed(2)),
    GDPpc_CAGR_pct: Number(clamp(gdpCagr, 1, 7.5).toFixed(1)),
    EI_improve_pct_per_year: Number(clamp(eiImprove, 0, 6).toFixed(1)),
    GridLoss2050_pct: Number(clamp(b.grid_losses * 0.6, 3, 25).toFixed(1)),
    CleanCooking2050_pct: Number(clamp(Math.max(b.clean_cooking, 70) + 20, 40, 100).toFixed(0)),
    Urban2050_pct: Number(clamp(b.urban_pct + 20, 25, 90).toFixed(0)),
    Manuf2050_pct: Number(clamp(b.manufacturing_pct_gdp + 2, 5, 35).toFixed(1)),
    RD2050_pct_gdp: Number(clamp((b.rnd_pct_gdp || 0.65) + 0.5, 0.1, 4).toFixed(2)),
    Forest2050_pct: Number(clamp(b.forest_pct + 2, 5, 60).toFixed(1)),
    AirControls_strength: 0.15,
  };
}

const BASE_ENERGY_SHARES = {
  coal: 0.44,
  oil: 0.25,
  gas: 0.06,
  renewables: 0.08,
  bioenergy: 0.18,
  nuclear: 0.01,
  newZero: 0.0,
};

const EMISSION_FACTORS_KG_PER_GJ = {
  coal: 94.6,
  oil: 73.3,
  gas: 56.1,
  renewables: 0,
  bioenergy: 8,
  nuclear: 0,
  newZero: 0,
};

type Shares = typeof BASE_ENERGY_SHARES;
const ENERGY_KEYS = Object.keys(BASE_ENERGY_SHARES) as Array<keyof Shares>;

function normalizeShares(weights: Record<keyof Shares, number>): Shares {
  let total = 0;
  for (const k of ENERGY_KEYS) total += Math.max(0, weights[k]);
  if (!isFinite(total) || total <= 0) return { ...BASE_ENERGY_SHARES };
  const out: any = {};
  for (const k of ENERGY_KEYS) out[k] = Math.max(0, weights[k]) / total;
  return out as Shares;
}

function mixCarbonIntensity(shares: Shares, scale = 1) {
  return (
    shares.coal * EMISSION_FACTORS_KG_PER_GJ.coal +
    shares.oil * EMISSION_FACTORS_KG_PER_GJ.oil +
    shares.gas * EMISSION_FACTORS_KG_PER_GJ.gas +
    shares.bioenergy * EMISSION_FACTORS_KG_PER_GJ.bioenergy
  ) * scale;
}

function getBeta(inputs: ModelInputs, name: string, dflt: number) {
  const v = inputs.calibration.betas?.[name];
  return typeof v === "number" && Number.isFinite(v) ? v : dflt;
}

function sectorFactor(action01: number, maxReduction: number, maxIncrease = 0.20) {
  if (action01 >= 0) return 1 - maxReduction * clamp(action01, 0, 1);
  return 1 + maxIncrease * clamp(-action01, 0, 1);
}

export function simulate(inputs: ModelInputs, rawScenario: Scenario): SimulationResult {
  const defaults = defaultScenario(inputs);
  const scenario = { ...defaults, ...rawScenario } as Scenario;

  const b = inputs.indiaBaseline;
  const baseYear = inputs.meta.baseYear;
  const endYear = inputs.meta.endYear || 2100;
  const years = yearRange(baseYear, endYear);

  const pop0 = b.population;
  const pop2050 = clamp(scenario.Pop2050_billion, 1.1, 1.8) * 1e9;
  const popR2050 = annualRateToHitTarget(pop0, pop2050, 2050 - baseYear);
  const pop = years.map((y) => {
    if (y <= 2050) return pop0 * Math.pow(1 + popR2050, y - baseYear);
    // India long-run population flattening emulator after 2050
    return pop2050 * Math.pow(1 + Math.min(0.002, popR2050 * 0.12), y - 2050);
  });

  const gdppc0 = b.gdppc_ppp;
  const g = clamp(scenario.GDPpc_CAGR_pct, 1, 7.5) / 100;
  const gdppc = expGrowth(years, baseYear, gdppc0, g);

  const cook0 = Number.isFinite(b.clean_cooking) ? b.clean_cooking : 70;
  const cook = rampTo2050(years, baseYear, cook0, clamp(scenario.CleanCooking2050_pct, 40, 100));
  const urban0 = Number.isFinite(b.urban_pct) ? b.urban_pct : 35;
  const urban = rampTo2050(years, baseYear, urban0, clamp(scenario.Urban2050_pct, 25, 90));
  const manuf0 = Number.isFinite(b.manufacturing_pct_gdp) ? b.manufacturing_pct_gdp : 14;
  const manuf = rampTo2050(years, baseYear, manuf0, clamp(scenario.Manuf2050_pct, 5, 35));
  const rd0 = Number.isFinite(b.rnd_pct_gdp) ? b.rnd_pct_gdp : 0.65;
  const rnd = rampTo2050(years, baseYear, rd0, clamp(scenario.RD2050_pct_gdp, 0.1, 4));
  const loss0 = Number.isFinite(b.grid_losses) ? b.grid_losses : 16;
  const losses = rampTo2050(years, baseYear, loss0, clamp(scenario.GridLoss2050_pct, 3, 25)).map((x) => clamp(x, 0.1, 40));

  const coalA = actionPath(years, baseYear, scenario.Coal_action);
  const oilA = actionPath(years, baseYear, scenario.Oil_action);
  const gasA = actionPath(years, baseYear, scenario.Gas_action);
  const bioA = actionPath(years, baseYear, scenario.Bioenergy_action);
  const nucA = actionPath(years, baseYear, scenario.Nuclear_action);
  const nzA = actionPath(years, baseYear, scenario.NewZero_action);
  const teffA = actionPath(years, baseYear, scenario.TransportEfficiency_action);
  const telecA = actionPath(years, baseYear, scenario.TransportElectrification_action);
  const bieffA = actionPath(years, baseYear, scenario.BuildingsIndustryEfficiency_action);
  const bielecA = actionPath(years, baseYear, scenario.BuildingsIndustryElectrification_action);
  const natureA = actionPath(years, baseYear, scenario.NatureBasedRemoval_action);
  const techA = actionPath(years, baseYear, scenario.TechRemoval_action);
  const agA = actionPath(years, baseYear, scenario.AgriculturalEmissions_action);
  const wasteA = actionPath(years, baseYear, scenario.WasteLeakage_action);
  const deforA = actionPath(years, baseYear, scenario.Deforestation_action);
  const carbonPrice = rampTo2050(years, baseYear, 0, clamp(scenario.CarbonPrice_INR_tCO2, 0, 15000));

  // Required renewable share target, adjusted by clean-tech R&D in bounded logit space.
  const reTarget = clamp(scenario.Renewables2050_pct, 10, 95);
  const reCore = rampTo2050(years, baseYear, b.renewables_share, reTarget).map((x) => clamp(x, 1, 98));
  const betaR = getBeta(inputs, "beta_logitRE_Research and development expenditure (% of GDP)", 0.20);
  const reAdjusted = reCore.map((x, i) => {
    const rdBoost = betaR * (rnd[i] - rnd[0]);
    return clamp(sigmoid(safeLogit(x / 100) + clamp(rdBoost, -0.8, 0.8)) * 100, 1, 98);
  });

  // Energy intensity base + structural adjustment.
  const ei0 = Math.max(0.1, b.energy_intensity || 4.2);
  const eiImprove = clamp(scenario.EI_improve_pct_per_year, 0, 6) / 100;
  const gammaMan = getBeta(inputs, "gamma_EI_Manufacturing, value added (% of GDP)_pp", 0.01);
  const gammaUrban = getBeta(inputs, "gamma_EI_Urban population (% of total population)_pp", -0.002);
  const gammaRD = getBeta(inputs, "gamma_EI_Research and development expenditure (% of GDP)_pp", -0.03);

  const baseCIObserved = b.co2_mt / (b.population * b.gdppc_ppp * ei0) * 1e12; // kg/GJ equivalent
  const rawMixCI0 = mixCarbonIntensity(BASE_ENERGY_SHARES, 1);
  const efScale = rawMixCI0 > 0 ? clamp(baseCIObserved / rawMixCI0, 0.55, 1.15) : 0.85;

  // Land and forest: Forest target gets pushed around by deforestation lever.
  const forest0 = Number.isFinite(b.forest_pct) ? b.forest_pct : 24;
  const deforTargetAdjustment = -8 * clamp(scenario.Deforestation_action, -100, 100) / 100;
  const forestTarget = clamp(scenario.Forest2050_pct + deforTargetAdjustment, 5, 60);
  const forest = rampTo2050(years, baseYear, forest0, forestTarget);
  const landKm2 = Math.max(1, b.land_area_km2 || 2973190);

  const rowsPre: Omit<SimulationRow, "atm_co2_ppm_contribution" | "temperature_contribution_c" | "temperature_analog_c" | "cum_emissions_gtco2" | "cum_net_emissions_gtco2" | "cum_net_ghg_gtco2e">[] = [];

  const baseNonCo2Mt = b.co2_mt * 0.36; // agriculture/waste/methane proxy; CO2e directional emulator

  for (let i = 0; i < years.length; i++) {
    const y = years[i];
    const dt = y - baseYear;
    let ei = ei0 * Math.pow(1 - eiImprove, dt);

    // India-specific structural adjustments: bounded, data-calibrated signs.
    const structuralLog =
      gammaMan * (manuf[i] - manuf[0]) +
      gammaUrban * (urban[i] - urban[0]) +
      gammaRD * (rnd[i] - rnd[0]);
    ei *= Math.exp(clamp(structuralLog, -0.45, 0.45));

    // En-ROADS sector levers reduce/increase energy demand.
    const transportShare = 0.18;
    const bldgIndustryShare = 0.54;
    const transportEnergyFactor = sectorFactor(teffA[i], 0.42, 0.15) * sectorFactor(telecA[i], 0.16, 0.08);
    const biEnergyFactor = sectorFactor(bieffA[i], 0.38, 0.15) * sectorFactor(bielecA[i], 0.12, 0.05);
    const sectorDemandFactor =
      (1 - transportShare - bldgIndustryShare) + transportShare * transportEnergyFactor + bldgIndustryShare * biEnergyFactor;

    // Carbon price suppresses total energy demand slightly at high price.
    const cp01 = clamp(carbonPrice[i] / 15000, 0, 1);
    const carbonPriceDemandFactor = 1 - 0.08 * cp01;

    // Grid losses factor on electricity-related part.
    const electricityBaseShare = 0.26;
    const electrificationBoost = Math.max(0, telecA[i]) * 0.12 + Math.max(0, bielecA[i]) * 0.16;
    const electricityShare = clamp(electricityBaseShare + electrificationBoost, 0.20, 0.55);
    const lossFrac0 = clamp(losses[0] / 100, 0.001, 0.5);
    const lossFrac = clamp(losses[i] / 100, 0.001, 0.5);
    const gridFactor = Math.pow((1 - lossFrac0) / (1 - lossFrac), electricityShare);

    const gdpTotal = pop[i] * gdppc[i];
    const primaryEnergyMJ = ei * gdpTotal * sectorDemandFactor * carbonPriceDemandFactor * gridFactor;
    const primaryEnergyEJ = primaryEnergyMJ / 1e12;

    // Energy mix weights. Positive coal/oil/gas action encourages those fuels; carbon price discourages fossil fuels.
    const weights: Record<keyof Shares, number> = { ...BASE_ENERGY_SHARES };
    weights.coal *= Math.exp(1.15 * coalA[i] - 1.20 * cp01 - 0.28 * Math.max(0, bielecA[i]));
    weights.oil *= Math.exp(1.05 * oilA[i] - 0.75 * cp01 - 0.90 * Math.max(0, telecA[i]));
    weights.gas *= Math.exp(0.95 * gasA[i] - 0.55 * cp01 + 0.12 * Math.max(0, bielecA[i]));
    weights.bioenergy *= Math.exp(0.65 * bioA[i] - 0.10 * Math.max(0, telecA[i]));
    weights.nuclear *= Math.exp(1.65 * nucA[i] + 0.20 * cp01);
    weights.newZero = Math.max(0.0001, 0.002 + 0.11 * Math.max(0, nzA[i]) + 0.02 * cp01);

    // Required renewables target imposed in share space.
    weights.renewables *= Math.exp(2.8 * (reAdjusted[i] / 100 - b.renewables_share / 100) + 0.75 * cp01 + 0.45 * Math.max(0, telecA[i]) + 0.35 * Math.max(0, bielecA[i]));

    let shares = normalizeShares(weights);
    // Force the dedicated renewables slice toward the slider target while leaving bioenergy separate.
    const desiredRenew = clamp(reAdjusted[i] / 100, 0.01, 0.80);
    const maxRenew = 0.78;
    const targetRenew = Math.min(desiredRenew, maxRenew);
    const otherSum = 1 - shares.renewables;
    if (otherSum > 0) {
      const scaleOthers = (1 - targetRenew) / otherSum;
      shares = {
        coal: shares.coal * scaleOthers,
        oil: shares.oil * scaleOthers,
        gas: shares.gas * scaleOthers,
        renewables: targetRenew,
        bioenergy: shares.bioenergy * scaleOthers,
        nuclear: shares.nuclear * scaleOthers,
        newZero: shares.newZero * scaleOthers,
      };
    }
    shares = normalizeShares(shares);

    const carbonIntensity = mixCarbonIntensity(shares, efScale);
    const emissionsMt = (carbonIntensity * primaryEnergyMJ) / 1e12; // kg/GJ * MJ / 1000? Since 1 GJ=1000 MJ -> kg/GJ*MJ/1000 = kg; kg/1e9 = Mt => /1e12

    // CO2 removals / land sink.
    const forestKm2 = (forest[i] / 100) * landKm2;
    const forest0Km2 = (forest[0] / 100) * landKm2;
    const forestDeltaKm2 = forestKm2 - forest0Km2;
    const forestSinkMt = Math.max(0, (forestDeltaKm2 * 100 * 3.0) / 1e6); // 3 tCO2/ha/yr conservative
    const natureExtraSinkMt = softCap(Math.max(0, natureA[i]) * 220, 220) + softCap(Math.max(0, -deforA[i]) * 80, 80);
    const deforestationEmissionMt = Math.max(0, deforA[i]) * 180;
    const techCdrMt = softCap(Math.max(0, techA[i]) * 300, 300);

    // Other GHG proxy.
    const agFactor = agA[i] >= 0 ? 1 - 0.42 * agA[i] : 1 + 0.30 * Math.abs(agA[i]);
    const wasteFactor = wasteA[i] >= 0 ? 1 - 0.50 * wasteA[i] : 1 + 0.35 * Math.abs(wasteA[i]);
    const nonco2Mt = baseNonCo2Mt * (0.65 * agFactor + 0.35 * wasteFactor) * (pop[i] / pop0) * Math.pow(gdppc[i] / gdppc0, 0.18);

    const netCo2Mt = emissionsMt + deforestationEmissionMt - forestSinkMt - natureExtraSinkMt - techCdrMt;
    const netGhgMt = emissionsMt + nonco2Mt + deforestationEmissionMt - forestSinkMt - natureExtraSinkMt - techCdrMt;

    const pePcGJ = (primaryEnergyMJ / pop[i]) / 1000;
    const co2Pc = (emissionsMt * 1e6) / pop[i];
    const netCo2Pc = (netCo2Mt * 1e6) / pop[i];
    const ghgPc = (netGhgMt * 1e6) / pop[i];
    const co2Intensity = (emissionsMt * 1e9) / gdpTotal;
    const ghgIntensity = (netGhgMt * 1e9) / gdpTotal;

    rowsPre.push({
      year: y,
      population: pop[i],
      gdppc_ppp: gdppc[i],
      energy_intensity: ei * sectorDemandFactor * carbonPriceDemandFactor * gridFactor,
      renewables_share: reAdjusted[i],
      grid_losses: losses[i],
      clean_cooking: cook[i],
      urban_pct: urban[i],
      manufacturing_pct_gdp: manuf[i],
      rnd_pct_gdp: rnd[i],
      forest_pct: forest[i],
      primary_energy_EJ: primaryEnergyEJ,
      primary_energy_MJ: primaryEnergyMJ,
      primary_energy_per_capita_GJ: pePcGJ,
      coal_EJ: primaryEnergyEJ * shares.coal,
      oil_EJ: primaryEnergyEJ * shares.oil,
      gas_EJ: primaryEnergyEJ * shares.gas,
      renewables_EJ: primaryEnergyEJ * shares.renewables,
      bioenergy_EJ: primaryEnergyEJ * shares.bioenergy,
      nuclear_EJ: primaryEnergyEJ * shares.nuclear,
      new_zero_EJ: primaryEnergyEJ * shares.newZero,
      electricity_share_pct: electricityShare * 100,
      clean_energy_share_pct: (shares.renewables + shares.nuclear + shares.newZero) * 100,
      emissions_mtco2: emissionsMt,
      nonco2_mtco2e: nonco2Mt,
      forest_sink_mtco2: forestSinkMt + natureExtraSinkMt,
      tech_cdr_mtco2: techCdrMt,
      net_emissions_mtco2: netCo2Mt,
      net_ghg_mtco2e: netGhgMt,
      pm25_exposed_pct: NaN,
      co2_per_capita_t: co2Pc,
      net_co2_per_capita_t: netCo2Pc,
      ghg_per_capita_t: ghgPc,
      gdp_total_ppp: gdpTotal,
      co2_intensity_kg_per_$: co2Intensity,
      ghg_intensity_kg_per_$: ghgIntensity,
      carbon_intensity_kg_per_GJ: carbonIntensity,
      net_carbon_intensity_kg_per_GJ: (netCo2Mt * 1e12) / Math.max(1, primaryEnergyMJ),
    });
  }

  // PM2.5 proxy model + direct control lever.
  const pmModel = inputs.calibration.pm_model;
  const pmFeatures = inputs.calibration.pm_features;
  if (pmModel && pmFeatures?.length) {
    const X = rowsPre.map((r) => {
      const featMap: Record<string, number> = {
        log_gdppc: Math.log(Math.max(1e-6, r.gdppc_ppp)),
        log_co2_pc: Math.log(Math.max(1e-6, r.co2_per_capita_t)),
        "Access to clean fuels and technologies for cooking (% of population)": r.clean_cooking,
        "Urban population (% of total population)": r.urban_pct,
        "Renewable energy consumption (% of total final energy consumption)_x": r.renewables_share,
      };
      return pmFeatures.map((f) => featMap[f] ?? 0);
    });
    const pred = gbrPredict(pmModel, X).map((v) => clamp(v, 0, 1));
    const air = clamp(scenario.AirControls_strength, 0, 0.9);
    for (let i = 0; i < rowsPre.length; i++) {
      // Clean cooking and air controls materially reduce exposure.
      const cookingHealthFactor = 1 - 0.26 * clamp((rowsPre[i].clean_cooking - cook0) / Math.max(1, 100 - cook0), 0, 1);
      rowsPre[i].pm25_exposed_pct = pred[i] * cookingHealthFactor * (1 - air) * 100;
    }
  } else {
    for (const r of rowsPre) r.pm25_exposed_pct = clamp(b.pm25_exposed_pct || 100, 0, 100) * (1 - clamp(scenario.AirControls_strength, 0, 0.9));
  }

  const ppm = emissionsToAtmosphericPpm(rowsPre.map((r) => Math.max(0, r.net_emissions_mtco2)), years);

  const rows: SimulationRow[] = [];
  let cumGross = 0;
  let cumNet = 0;
  let cumGhg = 0;
  for (let i = 0; i < rowsPre.length; i++) {
    cumGross += rowsPre[i].emissions_mtco2 / 1000;
    cumNet += rowsPre[i].net_emissions_mtco2 / 1000;
    cumGhg += rowsPre[i].net_ghg_mtco2e / 1000;
    const tempContribution = Math.max(0, cumNet) * TCRE_C_PER_GTCO2;
    // Futuristic En-ROADS style display: global-equivalent warming analog from India trajectory intensity.
    // This is intentionally labeled as an analog, not a forecast of India's sole warming.
    const baseAnalog = 2.7;
    const stress = Math.max(0, rowsPre[i].net_ghg_mtco2e / Math.max(1, rowsPre[0].net_ghg_mtco2e));
    const temperatureAnalog = clamp(baseAnalog + 0.55 * Math.log(Math.max(0.2, stress)) + 0.0022 * (ppm[i] - ppm[0]), 1.2, 6.5);
    rows.push({
      ...rowsPre[i],
      atm_co2_ppm_contribution: ppm[i],
      temperature_contribution_c: tempContribution,
      temperature_analog_c: temperatureAnalog,
      cum_emissions_gtco2: cumGross,
      cum_net_emissions_gtco2: cumNet,
      cum_net_ghg_gtco2e: cumGhg,
    });
  }

  return { rows, scenario };
}

export function toCsv(rows: SimulationRow[]) {
  const cols = Object.keys(rows[0] ?? {});
  const header = cols.join(",");
  const lines = rows.map((r) => cols.map((c) => {
    const v = (r as any)[c];
    if (v === null || v === undefined || Number.isNaN(v)) return "";
    return typeof v === "number" ? String(v) : JSON.stringify(v);
  }).join(","));
  return [header, ...lines].join("\n");
}

function findYear(rows: SimulationRow[], year: number) {
  return rows.find((r) => r.year === year) ?? rows[rows.length - 1];
}

export function summarize2050(res: SimulationResult) {
  const r2050 = findYear(res.rows, 2050);
  const r2100 = findYear(res.rows, 2100);
  const base = res.rows[0];
  return {
    year: 2050,
    emissions2050: r2050.emissions_mtco2,
    netEmissions2050: r2050.net_emissions_mtco2,
    netGhg2050: r2050.net_ghg_mtco2e,
    cumNetGt: r2100.cum_net_emissions_gtco2,
    cumNetGhgGt: r2100.cum_net_ghg_gtco2e,
    ppmContribution2050: r2050.atm_co2_ppm_contribution,
    ppmContribution2100: r2100.atm_co2_ppm_contribution,
    renewables2050: r2050.renewables_share,
    cleanEnergy2050: r2050.clean_energy_share_pct,
    ei2050: r2050.energy_intensity,
    pm25_2050: r2050.pm25_exposed_pct,
    co2pc_2050: r2050.co2_per_capita_t,
    primaryEnergy2050: r2050.primary_energy_EJ,
    primaryEnergy2100: r2100.primary_energy_EJ,
    temperature2100: r2100.temperature_analog_c,
    indiaTempContribution2100: r2100.temperature_contribution_c,
    baselineYear: base.year,
  };
}

export function makeWaterfallContributions(baseline: SimulationResult, current: SimulationResult) {
  const b2050 = findYear(baseline.rows, 2050);
  const c2050 = findYear(current.rows, 2050);

  const baseNet = b2050.net_ghg_mtco2e;
  const curNet = c2050.net_ghg_mtco2e;
  const deltaNet = curNet - baseNet;

  const factors = {
    Population: c2050.population / Math.max(1, b2050.population),
    "GDP/cap": c2050.gdppc_ppp / Math.max(1, b2050.gdppc_ppp),
    "Energy demand": c2050.energy_intensity / Math.max(1e-6, b2050.energy_intensity),
    "Fuel mix": c2050.carbon_intensity_kg_per_GJ / Math.max(1e-6, b2050.carbon_intensity_kg_per_GJ),
    "Non-CO2": c2050.nonco2_mtco2e / Math.max(1e-6, b2050.nonco2_mtco2e),
  };
  const logRatios = Object.fromEntries(Object.entries(factors).map(([k, v]) => [k, Math.log(Math.max(1e-9, v))])) as Record<string, number>;
  const totalLog = Object.values(logRatios).reduce((a, b) => a + b, 0);
  const contrib: { name: string; value: number }[] = [];
  if (Math.abs(totalLog) < 1e-9) {
    Object.keys(logRatios).forEach((k) => contrib.push({ name: k, value: 0 }));
  } else {
    for (const [k, lr] of Object.entries(logRatios)) contrib.push({ name: k, value: deltaNet * (lr / totalLog) });
  }
  const deltaCdr = (c2050.forest_sink_mtco2 + c2050.tech_cdr_mtco2) - (b2050.forest_sink_mtco2 + b2050.tech_cdr_mtco2);
  contrib.push({ name: "CDR & forests", value: -deltaCdr });

  return { baselineNet: baseNet, currentNet: curNet, deltaNet, contrib };
}

export function randomScenarioAround(s: Scenario, spread = 0.15): Scenario {
  const out: any = { ...s };
  for (const spec of leverSpecs) {
    const v = Number((s as any)[spec.key]);
    const width = (spec.max - spec.min) * spread;
    const jitter = (Math.random() * 2 - 1) * width;
    out[spec.key] = clamp(v + jitter, spec.min, spec.max);
  }
  return out as Scenario;
}
