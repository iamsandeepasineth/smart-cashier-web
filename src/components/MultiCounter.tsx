import { Database, Plus } from "lucide-react";
import { Eyebrow, H2, Reveal, section } from "./ui";

const COUNTERS = [
  { id: "Counter 1", name: "Front till", does: "Sales and payments" },
  { id: "Counter 2", name: "Repairs desk", does: "Jobs and status" },
  { id: "Counter 3", name: "Back office", does: "Suppliers and reports" },
];

export function MultiCounter() {
  return (
    <section id="counters" className={`${section} pt-24 sm:pt-32`}>
      <div className="flex flex-wrap items-center gap-14">
        <Reveal className="min-w-0 flex-[1_1_380px]">
          <Eyebrow>Multi-counter</Eyebrow>
          <H2>Many PCs. One shop. No re-typing.</H2>
          <p className="m-0 mt-5 max-w-[460px] text-muted">
            Add as many counters as you need. A sale at the front till drops the stock the repairs desk sees right away, and the back office gets the day's totals without anyone copying them across.
          </p>
          <ul className="m-0 mt-6 flex list-none flex-col gap-2.5 p-0 text-[16px]">
            {["One database for each shop, never mixed with another store's", "Works offline, syncs when the internet is back", "Each staff member signs in with their own login"].map((t) => (
              <li key={t} className="flex gap-3">
                <span aria-hidden="true" className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-ink" />
                {t}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="min-w-0 flex-[999_1_520px]" delay={100}>
          <div className="rounded-[28px] bg-soft p-[clamp(18px,4vw,44px)]">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {COUNTERS.map((c) => (
                <div key={c.id} className="flex flex-col gap-1.5 rounded-2xl bg-white p-4">
                  <span className="flex items-center gap-1.5 text-[12px] text-muted">
                    <span aria-hidden="true" className="h-[7px] w-[7px] animate-pulse rounded-full bg-good" />
                    {c.id}
                  </span>
                  <span className="text-[16px] font-semibold">{c.name}</span>
                  <span className="text-[14px] text-muted">{c.does}</span>
                </div>
              ))}
              <div className="flex flex-col justify-center gap-1.5 rounded-2xl border-2 border-dashed border-line-3 p-4 text-muted">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-white text-ink"><Plus size={15} /></span>
                <span className="text-[16px] font-semibold text-ink">Counter N</span>
                <span className="text-[14px]">Add as many as you need</span>
              </div>
            </div>

            <div aria-hidden="true" className="flex h-12 justify-center">
              <div className="flow-line w-[2px]" />
            </div>

            <div className="flex flex-wrap items-center gap-4 rounded-2xl bg-ink px-6 py-5 text-white">
              <Database size={32} strokeWidth={1.7} aria-hidden="true" />
              <div className="min-w-[200px] flex-1">
                <div className="font-semibold">Your shop's database</div>
                <div className="text-[14px] text-on-dark">Every counter reads and writes the same live data.</div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
