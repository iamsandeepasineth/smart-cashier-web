import { useState } from "react";
import { Eyebrow, H2, Reveal, section } from "./ui";

// Same flow as the real app (POS/src/utils/repairStatus.ts).
const STAGES = ["Received", "Inspecting", "Waiting Approval", "Repairing", "Completed", "Delivered"];

export function Repairs() {
  const [stage, setStage] = useState(3);
  const progress = ((stage + 1) / STAGES.length) * 100;

  return (
    <section id="repairs" className={`${section} pt-24 sm:pt-32`}>
      <div className="flex flex-wrap-reverse items-center gap-14">
        <Reveal className="min-w-0 flex-[999_1_520px]">
          <div className="flex flex-col gap-4 rounded-[28px] bg-soft p-[clamp(18px,4vw,44px)]">
            <div role="group" aria-label="Repair status" className="flex flex-wrap gap-2">
              {STAGES.map((label, i) => {
                const cur = i === stage;
                return (
                  <button
                    key={label}
                    type="button"
                    aria-pressed={cur}
                    onClick={() => setStage(i)}
                    className={`h-11 cursor-pointer rounded-full border px-4 font-sans text-[14px] font-semibold transition-colors ${
                      cur ? "border-ink bg-ink text-white" : "border-line-2 bg-white text-ink hover:border-ink"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            <div className="flex flex-col gap-4 rounded-[18px] bg-white p-6 shadow-[0_1px_2px_rgba(17,17,17,.05)]">
              <div className="flex flex-wrap justify-between gap-3 text-[13px] text-muted">
                <span className="font-mono">Job #R-0418</span>
                <span>Counter 2 · Repairs desk</span>
              </div>
              <div className="font-display text-[clamp(22px,3vw,26px)] font-bold tracking-[-0.02em]">Galaxy A54 · cracked screen</div>
              <div aria-hidden="true" className="h-1.5 overflow-hidden rounded-full bg-line">
                <div className="h-full rounded-full bg-ink transition-[width] duration-300" style={{ width: `${progress}%` }} />
              </div>
              <dl className="m-0 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-[15px]">
                <dt className="text-muted">Customer</dt>
                <dd className="m-0">Demo customer · 07X XXX XXXX</dd>
                <dt className="text-muted">Status</dt>
                <dd className="m-0 font-semibold" aria-live="polite">{STAGES[stage]}</dd>
                <dt className="text-muted">Estimate</dt>
                <dd className="m-0 tabular-nums">Rs. 18,500 · parts + labour</dd>
              </dl>
            </div>
          </div>
        </Reveal>

        <Reveal className="min-w-0 flex-[1_1_380px]" delay={100}>
          <Eyebrow>Repairs desk</Eyebrow>
          <H2>Answer “is my phone ready?” in seconds.</H2>
          <p className="m-0 mt-5 max-w-[460px] text-muted">
            Every device that comes in gets a job ticket with the customer, the fault, parts used and the status. Anyone at any counter can look it up, and warranty claims stay attached to the job.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
