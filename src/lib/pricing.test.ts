import { describe, expect, it } from "vitest";
import { calculatePrice, formatRs, type PriceInput } from "./pricing";
import { PRICING } from "../config/pricing";

const base: PriceInput = {
  shopType: "retail", counters: 1, users: 2, branches: 1,
  volumeTier: "upto-1000", addons: [], billing: "monthly",
};

describe("calculatePrice", () => {
  it("charges only the base for the default setup", () => {
    const r = calculatePrice(base, PRICING);
    expect(r.monthly).toBe(2000);
    expect(r.plan).toBe("Starter");
  });

  it("includes one counter and three staff logins", () => {
    const r = calculatePrice({ ...base, counters: 3, users: 5 }, PRICING);
    expect(r.counterFee).toBe(2 * 750);
    expect(r.userFee).toBe(2 * 300);
    expect(r.monthly).toBe(2000 + 1500 + 600);
  });

  it("adds Rs. 4,000 for advanced inventory", () => {
    const r = calculatePrice({ ...base, addons: ["advanced-inventory"] }, PRICING);
    expect(r.monthly).toBe(6000);
  });

  it("multiplies the whole bill by the branch count", () => {
    const one = calculatePrice({ ...base, counters: 2, shopType: "pharmacy" }, PRICING);
    const three = calculatePrice({ ...base, counters: 2, shopType: "pharmacy", branches: 3 }, PRICING);
    expect(three.perBranch).toBe(one.monthly);
    expect(three.monthly).toBe(one.monthly * 3);
  });

  it("applies the shop type factor per branch", () => {
    const r = calculatePrice({ ...base, shopType: "kiosk" }, PRICING);
    expect(r.perBranch).toBe(1600);
    expect(r.factorAdjustment).toBe(-400);
  });

  it("gives two months free on annual billing", () => {
    const r = calculatePrice({ ...base, branches: 2, billing: "annual" }, PRICING);
    expect(r.total).toBe(4000 * 10);
    expect(r.annualSaving).toBe(4000 * 2);
  });

  it("picks the plan from the monthly total", () => {
    expect(calculatePrice({ ...base, branches: 3 }, PRICING).plan).toBe("Business");
    expect(calculatePrice({ ...base, branches: 4 }, PRICING).plan).toBe("Pro");
  });

  it("clamps out-of-range input", () => {
    const r = calculatePrice({ ...base, branches: 0, counters: 999 }, PRICING);
    expect(r.branches).toBe(1);
    expect(r.counters).toBe(50);
  });
});

describe("formatRs", () => {
  it("formats with separators and a minus sign", () => {
    expect(formatRs(18700)).toBe("Rs. 18,700");
    expect(formatRs(-400)).toBe("−Rs. 400");
  });
});
