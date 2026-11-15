import type { LucideIcon } from "lucide-react";
import { BarChart3, FileText, Package, ScanBarcode, Smartphone, Wallet, Network } from "lucide-react";
import { H2, Reveal, section } from "./ui";

const FEATURES: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: ScanBarcode, title: "Fast checkout", text: "Search or scan a barcode, adjust quantities and print the receipt. Each sale counts toward the day's totals as soon as it's paid." },
  { icon: Package, title: "Products & stock", text: "Stock goes down as you sell, with serial numbers and IMEIs for phones. See what's running low before a customer asks." },
  { icon: Smartphone, title: "Repair tickets", text: "Log the device, the fault and the customer, then move the job from received to delivered. Print labels and invoices." },
  { icon: Wallet, title: "Installments", text: "Sell now, collect later. Set a plan, record each payment and see who still owes what." },
  { icon: FileText, title: "Supplier invoices", text: "Record each delivery against its supplier. Part-payments go into a running ledger, so you always know what you owe." },
  { icon: BarChart3, title: "Reports", text: "Sales, top products, stock, repairs and supplier dues on dashboards you can read at closing time." },
];

export function Features() {
  return (
    <section id="features" className={`${section} pt-24 sm:pt-32`}>
      <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-x-12 gap-y-4">
        <H2 className="max-w-[640px]">Everything the shop needs, in one app.</H2>
        <p className="m-0 max-w-[420px] text-muted">
          No more separate till, stock book, repairs notebook, installment card and supplier ledger.
        </p>
      </Reveal>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map(({ icon: Icon, title, text }, i) => (
          <Reveal key={title} delay={(i % 4) * 70}>
            <article className="flex h-full flex-col gap-3.5 rounded-[22px] bg-soft p-7 transition-transform duration-200 hover:-translate-y-1">
              <Icon size={32} strokeWidth={1.7} aria-hidden="true" />
              <h3 className="m-0 font-display text-[22px] font-semibold tracking-[-0.01em]">{title}</h3>
              <p className="m-0 text-[16px] text-muted">{text}</p>
            </article>
          </Reveal>
        ))}
        <Reveal className="md:col-span-2" delay={140}>
          <article className="flex h-full flex-col gap-3.5 rounded-[22px] bg-ink p-7 text-white transition-transform duration-200 hover:-translate-y-1">
            <Network size={32} strokeWidth={1.7} aria-hidden="true" />
            <h3 className="m-0 font-display text-[22px] font-semibold tracking-[-0.01em]">Multi-counter sync</h3>
            <p className="m-0 max-w-[520px] text-[16px] text-on-dark">
              Every PC in the shop works from the same data, kept in a cloud database for your shop alone. Keeps working offline and catches up when the internet is back.
            </p>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
