import { useState } from "react";
import { Info } from "lucide-react";
import { PRICING, PRICING_DEFAULTS } from "../config/pricing";
import { calculatePrice, formatRs, type PriceInput, type PriceResult } from "../lib/pricing";
import { useCountUp } from "../lib/motion";
import { hasWhatsApp, whatsappLink } from "../lib/whatsapp";
import { ArrowIcon, Eyebrow, H2, Reveal, WhatsAppIcon, section } from "./ui";

type Row = { label: string; amount: string; strong?: boolean; good?: boolean };

function breakdown(r: PriceResult): Row[] {
  const C = PRICING;
  const rows: Row[] = [{ label: "Base subscription", amount: formatRs(r.base) }];
  if (r.extraCounters) rows.push({ label: `Extra counters (${r.extraCounters} × ${formatRs(C.counters.perExtra)})`, amount: formatRs(r.counterFee) });
  if (r.extraUsers) rows.push({ label: `Extra staff logins (${r.extraUsers} × ${formatRs(C.users.perExtra)})`, amount: formatRs(r.userFee) });
  if (r.tier.fee) rows.push({ label: `Bill volume (${r.tier.label})`, amount: formatRs(r.tier.fee) });
  r.addons.forEach((a) => rows.push({ label: a.label, amount: formatRs(a.price) }));
  rows.push({ label: "Subtotal", amount: formatRs(r.subtotal), strong: true });
  if (r.factorAdjustment)
    rows.push({ label: `Shop type: ${r.shop.label} (×${r.shop.factor.toFixed(1)})`, amount: (r.factorAdjustment > 0 ? "+" : "") + formatRs(r.factorAdjustment) });
  if (r.branches > 1) {
    rows.push({ label: "Per branch", amount: formatRs(r.perBranch), strong: true });
    rows.push({ label: `× ${r.branches} branches`, amount: formatRs(r.monthly) });
  }
  rows.push({ label: "Monthly price", amount: formatRs(r.monthly), strong: true });
  if (r.billing === "annual") {
    rows.push({ label: "12 months at the monthly price", amount: formatRs(r.fullYear) });
    rows.push({ label: "Annual saving (2 months free)", amount: formatRs(-r.annualSaving), good: true });
    rows.push({ label: "Annual total", amount: formatRs(r.annualTotal), strong: true });
  }
  return rows;
}

function quoteMessage(r: PriceResult) {
  const parts = [
    r.shop.label,
    `${r.counters} ${r.counters === 1 ? "PC" : "PCs"}`,
    `${r.users} staff`,
    `${r.branches} ${r.branches === 1 ? "branch" : "branches"}`,
    r.tier.label,
    ...r.addons.map((a) => a.label),
    r.billing === "annual" ? "Annual" : "Monthly",
  ];
  const est = r.billing === "annual" ? `${formatRs(r.annualTotal)}/year` : `${formatRs(r.monthly)}/mo`;
  return `Hi, I'm interested in Smart Cashier. ${parts.join(" · ")} — estimate ${est}. Can you confirm the price?`;
}

export function Pricing() {
  const [q, setQ] = useState<PriceInput>({ ...PRICING_DEFAULTS, addons: [...PRICING_DEFAULTS.addons] });
  const set = (patch: Partial<PriceInput>) => setQ((prev) => ({ ...prev, ...patch }));
  const r = calculatePrice(q, PRICING);
  const shown = useCountUp(r.total);
  const C = PRICING;

  const toggleAddon = (id: string) =>
    set({ addons: q.addons.includes(id) ? q.addons.filter((x) => x !== id) : [...q.addons, id] });

  return (
    <section id="pricing" aria-labelledby="pricing-title" className={`${section} pt-24 sm:pt-32`}>
      <Reveal className="text-center">
        <Eyebrow center>Pricing</Eyebrow>
        <H2 id="pricing-title" className="mx-auto max-w-[760px]">What will Smart Cashier cost your shop?</H2>
        <p className="mx-auto mb-12 mt-3 max-w-[560px] text-muted">Choose your shop type, counters, branches and extras. The estimate updates as you go.</p>
      </Reveal>

      <div className="flex flex-wrap items-start gap-5">
        {/* Inputs */}
        <div className="flex min-w-0 flex-[999_1_560px] flex-col gap-9 rounded-3xl border border-line-2 p-[clamp(18px,3.5vw,36px)]">
          <fieldset className="m-0 min-w-0 border-0 p-0">
            <legend className="mb-3.5 p-0 text-[17px] font-semibold">Shop type</legend>
            <div className="flex flex-wrap gap-2">
              {C.shopTypes.map((s) => {
                const on = s.id === r.shop.id;
                return (
                  <label
                    key={s.id}
                    className={`relative inline-flex min-h-11 cursor-pointer items-center rounded-full border px-[18px] text-[15px] font-medium transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[#3b6fe0] ${
                      on ? "border-ink bg-ink text-white" : "border-line-3 bg-white text-ink hover:border-ink"
                    }`}
                  >
                    <input className="sr-only" type="radio" name="shop-type" value={s.id} checked={on} onChange={() => set({ shopType: s.id })} />
                    {s.label}
                  </label>
                );
              })}
            </div>
          </fieldset>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(200px,100%),1fr))] gap-4">
            <Stepper
              label="Counters (PCs)"
              hint={`${C.counters.included} included · ${formatRs(C.counters.perExtra)} per extra`}
              value={r.counters}
              min={C.counters.min}
              max={C.counters.max}
              onChange={(v) => set({ counters: v })}
              noun="counter"
            />
            <Stepper
              label="Staff logins"
              hint={`${C.users.included} included · ${formatRs(C.users.perExtra)} per extra`}
              value={r.users}
              min={C.users.min}
              max={C.users.max}
              onChange={(v) => set({ users: v })}
              noun="staff login"
            />
            <Stepper
              label="Branches"
              hint="Price is multiplied by branches"
              value={r.branches}
              min={C.branches.min}
              max={C.branches.max}
              onChange={(v) => set({ branches: v })}
              noun="branch"
            />
          </div>

          <div className="flex flex-col gap-2.5">
            <label htmlFor="bill-volume" className="text-[17px] font-semibold">Bills per month</label>
            <select
              id="bill-volume"
              value={r.tier.id}
              onChange={(e) => set({ volumeTier: e.target.value })}
              className="h-[52px] cursor-pointer rounded-[14px] border border-line-3 bg-white px-4 font-sans text-[16px] text-ink"
            >
              {C.volumeTiers.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.label} — {v.fee ? `+${formatRs(v.fee)}/mo` : "included"}
                </option>
              ))}
            </select>
          </div>

          <fieldset className="m-0 min-w-0 border-0 p-0">
            <legend className="mb-3.5 p-0 text-[17px] font-semibold">Add-ons</legend>
            <div className="grid gap-2.5">
              {C.addons.map((a) => {
                const on = q.addons.includes(a.id);
                return (
                  <label
                    key={a.id}
                    className={`flex min-h-16 cursor-pointer items-center gap-3.5 rounded-2xl border px-4 py-3.5 transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[#3b6fe0] ${
                      on ? "border-ink bg-soft" : "border-line-2 bg-white hover:border-ink"
                    }`}
                  >
                    <input type="checkbox" checked={on} onChange={() => toggleAddon(a.id)} className="m-0 h-5 w-5 flex-none accent-ink" />
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className="flex flex-wrap items-center gap-2 font-medium">
                        {a.label}
                        {a.comingSoon && (
                          <span className="rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-[0.04em] text-ink">Coming soon</span>
                        )}
                      </span>
                      <span className="text-[14px] text-muted">{a.description}</span>
                    </span>
                    <span className="shrink-0 text-[15px] font-semibold tabular-nums">+{formatRs(a.price)}/mo</span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        </div>

        {/* Summary */}
        <div className="flex min-w-0 flex-[1_1_360px] flex-col gap-5 rounded-3xl bg-ink p-[clamp(20px,3.5vw,32px)] text-white lg:sticky lg:top-24">
          <fieldset className="m-0 min-w-0 border-0 p-0">
            <legend className="sr-only">Billing period</legend>
            <div className="grid grid-cols-2 gap-1 rounded-full bg-ink-2 p-1">
              {(["monthly", "annual"] as const).map((b) => {
                const on = r.billing === b;
                return (
                  <label
                    key={b}
                    className={`relative flex min-h-11 cursor-pointer flex-wrap items-center justify-center gap-x-1.5 rounded-full px-2 text-[15px] whitespace-nowrap font-semibold transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-[#3b6fe0] ${
                      on ? "bg-white text-ink" : "text-white"
                    }`}
                  >
                    <input className="sr-only" type="radio" name="billing" value={b} checked={on} onChange={() => set({ billing: b })} />
                    {b === "monthly" ? "Monthly" : "Annual"}
                    {b === "annual" && <span className="whitespace-nowrap rounded-full bg-accent px-2 py-0.5 text-[11px] font-semibold text-ink">2 months free</span>}
                  </label>
                );
              })}
            </div>
          </fieldset>

          <div className="flex flex-col gap-1.5">
            <span className="self-start rounded-full bg-accent px-3 py-1 text-[13px] font-bold uppercase tracking-[0.04em] text-ink">{r.plan} plan</span>
            <div aria-live="polite" className="mt-2 flex flex-col gap-0.5">
              <span className="font-display text-[clamp(42px,5vw,60px)] font-bold leading-none tracking-[-0.035em] tabular-nums">
                {formatRs(shown)}
              </span>
              <span className="text-[15px] text-on-dark">
                {r.billing === "annual" ? `per year · ${formatRs(r.effectiveMonthly)}/mo effective` : "per month"}
                {r.branches > 1 ? ` · ${r.branches} branches` : ""}
              </span>
            </div>
          </div>

          <dl className="m-0 flex flex-col border-t border-ink-line">
            {breakdown(r).map((b, i) => (
              <div key={i} className="flex justify-between gap-4 border-b border-ink-line py-2.5 text-[14px]">
                <dt className={b.strong ? "font-semibold text-white" : "text-on-dark"}>{b.label}</dt>
                <dd className={`m-0 whitespace-nowrap tabular-nums ${b.good ? "text-good-on-dark" : "text-white"} ${b.strong ? "font-semibold" : ""}`}>{b.amount}</dd>
              </div>
            ))}
          </dl>

          <div className="flex gap-3 rounded-2xl bg-ink-2 p-4 text-[14px] leading-snug text-on-dark">
            <Info size={18} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
            <p className="m-0">
              <strong className="font-semibold text-white">These prices are only to give you an idea.</strong> Contact us on WhatsApp for an exact quote for your shop.
            </p>
          </div>

          {hasWhatsApp && (
            <a
              href={whatsappLink(quoteMessage(r))}
              target="_blank"
              rel="noopener"
              className="inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-white font-semibold text-ink no-underline transition-colors hover:bg-soft"
            >
              <span className="text-whatsapp"><WhatsAppIcon /></span>
              Get a quote on WhatsApp
              <ArrowIcon />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

function Stepper(props: { label: string; hint: string; value: number; min: number; max: number; onChange: (v: number) => void; noun: string }) {
  const { label, hint, value, min, max, onChange, noun } = props;
  const id = label.toLowerCase().replace(/\W+/g, "-");
  const btn = "grid h-11 w-11 cursor-pointer place-items-center rounded-full border-0 bg-transparent text-[20px] text-ink hover:bg-soft disabled:cursor-not-allowed disabled:opacity-35";
  return (
    <div role="group" aria-labelledby={id} className="flex flex-col gap-3.5 rounded-[18px] bg-soft p-5">
      <div className="flex flex-col gap-0.5">
        <span id={id} className="font-semibold">{label}</span>
        <span className="text-[14px] text-muted">{hint}</span>
      </div>
      <div className="flex items-center justify-between rounded-full bg-white p-1">
        <button type="button" className={btn} disabled={value <= min} onClick={() => onChange(value - 1)} aria-label={`Remove a ${noun}`}>−</button>
        <output aria-live="polite" aria-label={label} className="font-display text-[22px] font-bold tabular-nums">{value}</output>
        <button type="button" className={btn} disabled={value >= max} onClick={() => onChange(value + 1)} aria-label={`Add a ${noun}`}>+</button>
      </div>
    </div>
  );
}
