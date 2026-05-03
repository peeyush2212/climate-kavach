# Climate Kavach - Futuristic En-ROADS style India simulator

A Vercel-ready standalone website for an India-tailored climate / emissions simulator. The dashboard uses a futuristic dark sci-fi theme while keeping the En-ROADS layout: top energy chart, net greenhouse-gas emissions chart, a large 2100 temperature signal, grouped sliders, scenario tools, explorer views and premium downloads.

## Included features

- **Next.js App Router + TypeScript + Tailwind**
- **Apache ECharts** interactive charts: stacked primary energy, net GHG emissions, indicator time-series, waterfall, Monte Carlo explorer and scenario comparison.
- **All En-ROADS-style slider groups from the main En-ROADS layout**:
  - Energy Supply: Coal, Oil, Natural Gas, Renewables, Bioenergy, Nuclear, New Zero-Carbon, Carbon Price
  - Transport: Energy Efficiency, Electrification
  - Buildings & Industry: Energy Efficiency, Electrification
  - Carbon Dioxide Removal: Nature-Based, Technological
  - Other GHG: Agricultural Emissions, Waste & Leakage
  - Land Use: Deforestation
  - Growth: Population, Economic Growth
- **India-specific additions**:
  - Energy intensity improvement (required efficiency proxy)
  - Renewable energy share target (required renewable proxy)
  - Grid T&D losses
  - Clean cooking access
  - Urbanization
  - Manufacturing share of GDP
  - Clean-tech R&D
  - Forest area
  - Air pollution controls / PM2.5 co-benefits
- **Premium data flow**:
  - Free sample data pack via `/api/download/sample`
  - Premium data pack via protected `/api/download/premium`
  - GPay/UPI modal using `peeyush2212@okhdfcbank` and the uploaded QR image
  - Stripe Checkout flow with server-side session verification and a signed httpOnly premium cookie

## Local development

Use Node **20.9+**. The project uses Next 16, which intentionally requires Node 20.9 or newer.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production build

```bash
npm run build
npm run start
```

## Deploy on Vercel

1. Push this folder to GitHub/GitLab.
2. In Vercel: **New Project → Import**.
3. Framework should auto-detect as **Next.js**.
4. Ensure the Node runtime is **20.9+** (Vercel’s modern Node runtimes are fine).
5. Set environment variables for Stripe checkout:

```bash
STRIPE_SECRET_KEY=sk_live_or_test_...
# Optional: use your own Stripe Price ID instead of inline price_data
STRIPE_PRICE_ID=price_...
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
# Strong random string used to sign the premium access cookie
PREMIUM_COOKIE_SECRET=<generate-with-openssl-rand-hex-32>
```

If `STRIPE_SECRET_KEY` is missing, the Stripe button stays visible but returns a clear “not configured” message. UPI/GPay remains visible for manual payment UX.

## Premium locking model

Premium data is **not** inside `/public`.

- Free sample pack: `data/sample/climate_kavach_sample_data_pack.zip`
- Premium pack: `data/premium/climate_kavach_premium_data_pack.zip`

Downloads are served through API routes:

- `/api/download/sample` - open to everyone
- `/api/download/premium` - requires a valid signed httpOnly cookie

Stripe success redirects to:

```txt
/premium/success?session_id={CHECKOUT_SESSION_ID}
```

The success page calls `/api/stripe/verify-session`, which checks Stripe server-side and sets the premium cookie. This is safer than a localStorage flag. `next.config.js` includes output-file tracing rules so the protected ZIP files are bundled into the Vercel serverless functions.

## Verification performed in this workspace

- `tsc --noEmit` passes with no TypeScript errors.
- `npm run build` could not be executed in this sandbox because the sandbox Node version is 18.20.4 and Next 16 requires Node >=20.9. The project is configured for Node >=20.9 in `package.json`, so it should build on Vercel or any local machine using Node 20.9+.

## Model notes

The simulator is an explainable emulator, not an official government forecast. It combines:

- Kaya/IPAT decomposition
- Energy intensity proxy from uploaded India data
- Renewables proxy from uploaded World Bank-style data
- Fuel-mix emissions factors calibrated to India’s 2021 CO2 baseline
- Conservative non-CO2 GHG proxies
- Forest/nature/tech CDR sinks
- IPCC-style CO2 impulse response for atmospheric ppm contribution
- PM2.5 proxy from the included calibration pack

The large 2100 temperature display is an En-ROADS-style global-equivalent pathway analog. The app also exposes India’s direct simplified TCRE contribution in the same panel.
