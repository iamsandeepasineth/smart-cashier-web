import { AppMockup } from "./AppMockup/AppMockup";
import { formatLkr, useDemoSale } from "./AppMockup/demoSale";
import { DownloadIcon, WhatsAppIcon, btnDark, btnLight, section } from "./ui";
import { useCountUp, useScrollTilt } from "../lib/motion";
import { releaseLine, type ReleaseInfo } from "../lib/useLatestRelease";
import { DEMO_MESSAGE, hasWhatsApp, whatsappLink } from "../lib/whatsapp";

export function Hero({ release }: { release: ReleaseInfo }) {
  const sale = useDemoSale();
  const tiltRef = useScrollTilt<HTMLDivElement>();
  const today = useCountUp(sale.today);

  return (
    <section id="top" className={`${section} relative pt-16 text-center sm:pt-[88px]`}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -top-20 -z-10 mx-auto h-[520px] max-w-[1100px] bg-[radial-gradient(ellipse_at_top,rgba(34,160,107,.16),transparent_65%)]" />
      <h1 className="mx-auto m-0 max-w-[980px] font-display text-[clamp(42px,7vw,88px)] font-bold leading-[1.02] tracking-[-0.035em]">
        The point of sale that runs your <span className="text-brand">whole shop.</span>
      </h1>
      <p className="mx-auto mb-0 mt-6 max-w-[640px] text-[clamp(17px,2vw,20px)] text-muted">
        Sales, stock, repairs, installments and supplier payments in one simple Windows app. Every counter in the shop shares the same live data.
      </p>

      <div className="mt-9 flex flex-wrap justify-center gap-3">
        <a href={release.url} className={btnDark} rel="noopener">
          <DownloadIcon /> Download for Windows
        </a>
        {hasWhatsApp && (
          <a href={whatsappLink(DEMO_MESSAGE)} target="_blank" rel="noopener" className={btnLight}>
            <span className="text-whatsapp"><WhatsAppIcon /></span> Book a demo on WhatsApp
          </a>
        )}
      </div>
      <p className="m-0 mt-4 text-[13px] text-muted">
        Free 7-day trial{release.version ? ` · ${releaseLine(release)}` : " · Windows 10 & 11"}
      </p>

      {/* Real app, interactive */}
      <div className="mt-14 rounded-[28px] bg-soft p-3 text-left sm:mt-[72px] sm:p-[clamp(16px,3.5vw,48px)]">
        <div ref={tiltRef} className="tilt">
          <AppMockup sale={sale} />
        </div>

        <div className="mt-4 grid gap-3 sm:mt-5 sm:grid-cols-3 sm:gap-4">
          <div className="flex flex-col gap-1.5 rounded-[18px] bg-white p-5">
            <span className="text-[13px] text-muted">Today at all counters</span>
            <span className="font-display text-[28px] font-bold tracking-[-0.02em] tabular-nums">{formatLkr(Math.round(today))}</span>
            <span className="text-[13px] text-muted">{sale.todaySales} sales · demo data</span>
          </div>
          <div className="flex flex-col gap-2.5 rounded-[18px] bg-white p-5">
            <span className="text-[13px] text-muted">Running low</span>
            {sale.lowStock.slice(0, 3).map((s) => (
              <div key={s.name} className="flex justify-between gap-3 text-[14px]">
                <span className="truncate">{s.name}</span>
                <span className={`shrink-0 font-semibold ${s.stock <= 0 ? "text-app-bad" : "text-[#B4470E]"}`}>
                  {s.stock <= 0 ? "Out" : `${s.stock} left`}
                </span>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-1.5 rounded-[18px] bg-[linear-gradient(135deg,#16855a,#0b5a3a)] p-5 text-white">
            <span className="text-[13px] text-on-dark">Repair jobs</span>
            <span className="font-display text-[28px] font-bold">4 ready</span>
            <span className="text-[13px] text-on-dark">for collection · demo data</span>
          </div>
        </div>
        <p className="m-0 mt-4 text-center text-[13px] text-muted">
          This is the real Smart Cashier screen. Tap products and press Checkout to try it.
        </p>
      </div>
    </section>
  );
}
