export type ModelMeta = {
  baseYear: number;
  endYear: number;
  currency: string;
};

export type IndiaBaseline = {
  co2_mt: number;
  population: number;
  gdppc_ppp: number;
  energy_intensity: number;
  renewables_share: number;
  grid_losses: number;
  forest_pct: number;
  agri_pct: number;
  pop_density: number;
  land_area_km2: number;
  clean_cooking: number;
  urban_pct: number;
  manufacturing_pct_gdp: number;
  industry_pct_gdp: number;
  rnd_pct_gdp: number;
  renew_patents: number;
  trade_pct_gdp: number;
  gcf_pct_gdp: number;
  energy_imports_pct: number;
  domestic_credit_pct_gdp: number;
  pm25_exposed_pct: number;
};

export type Betas = Record<string, number>;

export type SklearnTree = {
  children_left: number[];
  children_right: number[];
  feature: number[];
  threshold: number[];
  value: number[];
};

export type GradientBoostingModel = {
  type: "GradientBoostingRegressor";
  n_estimators: number;
  learning_rate: number;
  init: number;
  estimators: SklearnTree[];
};

export type CalibrationPack = {
  betas: Betas;
  pm_features: string[];
  pm_metrics: Record<string, number>;
  pm_model: GradientBoostingModel;
};

export type IndiaHistory = {
  year: number[];
  [k: string]: (number | null)[];
};

export type WorldInsights = {
  percentiles: Record<string, number>;
  peersLargePop: Array<Record<string, number | string>>;
};

export type ModelInputs = {
  meta: ModelMeta;
  indiaBaseline: IndiaBaseline;
  calibration: CalibrationPack;
  indiaHistory: IndiaHistory;
  worldInsights: WorldInsights;
};

/**
 * En-ROADS-style levers plus India-specific sliders.
 * Most En-ROADS levers are action scales from -100 to +100.
 * Positive values mean: encourage/strengthen/accelerate the lever.
 * Negative values mean: discourage/weaken/delay the lever.
 */
export type Scenario = {
  // Energy supply — En-ROADS-style
  Coal_action: number;
  Oil_action: number;
  Gas_action: number;
  Renewables2050_pct: number;
  Bioenergy_action: number;
  Nuclear_action: number;
  NewZero_action: number;
  CarbonPrice_INR_tCO2: number;

  // Transport — En-ROADS-style
  TransportEfficiency_action: number;
  TransportElectrification_action: number;

  // Buildings and industry — En-ROADS-style
  BuildingsIndustryEfficiency_action: number;
  BuildingsIndustryElectrification_action: number;

  // Carbon dioxide removal — En-ROADS-style
  NatureBasedRemoval_action: number;
  TechRemoval_action: number;

  // Other sources of greenhouse gases — En-ROADS-style
  AgriculturalEmissions_action: number;
  WasteLeakage_action: number;
  Deforestation_action: number;

  // Growth — En-ROADS-style
  Pop2050_billion: number;
  GDPpc_CAGR_pct: number;

  // India-specific additions
  EI_improve_pct_per_year: number;
  GridLoss2050_pct: number;
  CleanCooking2050_pct: number;
  Urban2050_pct: number;
  Manuf2050_pct: number;
  RD2050_pct_gdp: number;
  Forest2050_pct: number;
  AirControls_strength: number;
};

export type SimulationRow = {
  year: number;
  population: number;
  gdppc_ppp: number;
  energy_intensity: number;
  renewables_share: number;
  grid_losses: number;
  clean_cooking: number;
  urban_pct: number;
  manufacturing_pct_gdp: number;
  rnd_pct_gdp: number;
  forest_pct: number;

  // Energy system outputs
  primary_energy_EJ: number;
  primary_energy_MJ: number;
  primary_energy_per_capita_GJ: number;
  coal_EJ: number;
  oil_EJ: number;
  gas_EJ: number;
  renewables_EJ: number;
  bioenergy_EJ: number;
  nuclear_EJ: number;
  new_zero_EJ: number;
  electricity_share_pct: number;
  clean_energy_share_pct: number;

  // Emissions outputs
  emissions_mtco2: number;            // fossil+energy CO2
  nonco2_mtco2e: number;              // agricultural + waste/leakage proxy
  forest_sink_mtco2: number;
  tech_cdr_mtco2: number;
  net_emissions_mtco2: number;        // net CO2 after CDR/sinks
  net_ghg_mtco2e: number;             // net GHG after CDR/sinks
  atm_co2_ppm_contribution: number;
  temperature_contribution_c: number;
  temperature_analog_c: number;

  // Sustainability / intensity outputs
  pm25_exposed_pct: number;
  co2_per_capita_t: number;
  net_co2_per_capita_t: number;
  ghg_per_capita_t: number;
  gdp_total_ppp: number;
  co2_intensity_kg_per_$: number;
  ghg_intensity_kg_per_$: number;
  carbon_intensity_kg_per_GJ: number;
  net_carbon_intensity_kg_per_GJ: number;
  cum_emissions_gtco2: number;
  cum_net_emissions_gtco2: number;
  cum_net_ghg_gtco2e: number;
};

export type SimulationResult = {
  rows: SimulationRow[];
  scenario: Scenario;
};
