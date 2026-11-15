// All prices live here (LKR per month). Change numbers here only.
export interface PricingConfig {
  base: number;
  counters: { included: number; perExtra: number; min: number; max: number };
  users: { included: number; perExtra: number; min: number; max: number };
  branches: { min: number; max: number };
  shopTypes: { id: string; label: string; factor: number }[];
  volumeTiers: { id: string; label: string; fee: number }[];
  addons: { id: string; label: string; description: string; price: number; comingSoon?: boolean }[];
  annual: { monthsCharged: number; monthsGiven: number };
  plans: { name: string; maxMonthly: number | null }[];
}

export const PRICING: PricingConfig = {
  base: 2000,
  counters: { included: 1, perExtra: 750, min: 1, max: 50 },
  users: { included: 3, perExtra: 300, min: 1, max: 200 },
  branches: { min: 1, max: 20 },
  shopTypes: [
    { id: "kiosk", label: "Kiosk / Small shop", factor: 0.8 },
    { id: "retail", label: "Retail / Grocery", factor: 1.0 },
    { id: "pharmacy", label: "Pharmacy", factor: 1.2 },
    { id: "restaurant", label: "Restaurant / Café", factor: 1.3 },
    { id: "hardware", label: "Hardware", factor: 1.1 },
  ],
  volumeTiers: [
    { id: "upto-1000", label: "Up to 1,000 bills", fee: 0 },
    { id: "1001-5000", label: "1,001–5,000 bills", fee: 500 },
    { id: "5001-20000", label: "5,001–20,000 bills", fee: 1500 },
    { id: "20000-plus", label: "20,000+ bills", fee: 3500 },
  ],
  addons: [
    {
      id: "advanced-inventory",
      label: "Advanced inventory",
      description: "Manage and view your stock online",
      price: 4000,
      comingSoon: true,
    },
  ],
  annual: { monthsCharged: 10, monthsGiven: 12 },
  plans: [
    { name: "Starter", maxMonthly: 3000 },
    { name: "Business", maxMonthly: 7000 },
    { name: "Pro", maxMonthly: null },
  ],
};

export const PRICING_DEFAULTS = {
  shopType: "retail",
  counters: 1,
  users: 2,
  branches: 1,
  volumeTier: "upto-1000",
  addons: [] as string[],
  billing: "monthly" as "monthly" | "annual",
};
