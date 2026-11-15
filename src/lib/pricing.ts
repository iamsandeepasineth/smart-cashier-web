import type { PricingConfig } from "../config/pricing";

export interface PriceInput {
  shopType: string;
  counters: number;
  users: number;
  branches: number;
  volumeTier: string;
  addons: string[];
  billing: "monthly" | "annual";
}

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, Math.round(Number(n) || 0)));

/** Pure price calculation - no UI code. */
export function calculatePrice(input: PriceInput, config: PricingConfig) {
  const shop = config.shopTypes.find((s) => s.id === input.shopType) ?? config.shopTypes[0];
  const tier = config.volumeTiers.find((v) => v.id === input.volumeTier) ?? config.volumeTiers[0];
  const counters = clamp(input.counters, config.counters.min, config.counters.max);
  const users = clamp(input.users, config.users.min, config.users.max);
  const branches = clamp(input.branches, config.branches.min, config.branches.max);

  const extraCounters = Math.max(0, counters - config.counters.included);
  const extraUsers = Math.max(0, users - config.users.included);
  const counterFee = extraCounters * config.counters.perExtra;
  const userFee = extraUsers * config.users.perExtra;
  const addons = config.addons.filter((a) => input.addons.includes(a.id));
  const addonsTotal = addons.reduce((sum, a) => sum + a.price, 0);

  const subtotal = config.base + counterFee + userFee + tier.fee + addonsTotal;
  const perBranch = Math.round(subtotal * shop.factor);
  const monthly = perBranch * branches;

  const billing: "monthly" | "annual" = input.billing === "annual" ? "annual" : "monthly";
  const fullYear = monthly * config.annual.monthsGiven;
  const annualTotal = monthly * config.annual.monthsCharged;
  const plan = config.plans.find((p) => p.maxMonthly === null || monthly <= p.maxMonthly)!.name;

  return {
    shop, tier, counters, users, branches,
    base: config.base,
    extraCounters, counterFee, extraUsers, userFee,
    addons, addonsTotal,
    subtotal,
    factorAdjustment: perBranch - subtotal,
    perBranch,
    monthly,
    billing,
    fullYear,
    annualTotal,
    annualSaving: fullYear - annualTotal,
    effectiveMonthly: Math.round(annualTotal / config.annual.monthsGiven),
    total: billing === "annual" ? annualTotal : monthly,
    plan,
  };
}

export type PriceResult = ReturnType<typeof calculatePrice>;

export function formatRs(n: number) {
  return (n < 0 ? "−" : "") + "Rs. " + Math.abs(Math.round(n)).toLocaleString("en-US");
}
