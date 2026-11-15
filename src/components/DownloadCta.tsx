import { ENV } from "../config/env";
import { releaseLine, type ReleaseInfo } from "../lib/useLatestRelease";
import { DEMO_MESSAGE, hasWhatsApp, whatsappLink } from "../lib/whatsapp";
import { DownloadIcon, Reveal, WhatsAppIcon, btnWhite, section } from "./ui";

export function DownloadCta({ release }: { release: ReleaseInfo }) {
  return (
    <section id="download" className={`${section} pb-16 pt-24 sm:pt-32`}>
      <Reveal>
        <div className="relative overflow-hidden rounded-[32px] bg-[linear-gradient(135deg,#0f6e49_0%,#0b2e20_70%)] p-[clamp(32px,7vw,88px)] text-center text-white">
          <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
          <div className="relative flex flex-col items-center gap-5">
            <h2 className="m-0 max-w-[760px] font-display text-[clamp(34px,5.4vw,68px)] font-bold leading-[1.03] tracking-[-0.035em]">
              Open tomorrow on Smart Cashier.
            </h2>
            <p className="m-0 max-w-[520px] text-on-dark">
              Install it on your counter PC today and try every feature free for 7 days. Add more counters whenever you need them.
            </p>
            <div className="mt-2 flex flex-wrap justify-center gap-3">
              <a href={release.url} rel="noopener" className={btnWhite}>
                <DownloadIcon /> Download for Windows
              </a>
              {hasWhatsApp && (
                <a
                  href={whatsappLink(DEMO_MESSAGE)}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex h-14 items-center justify-center gap-2.5 rounded-full border border-white/25 px-6 font-semibold text-white no-underline transition-colors hover:bg-white/10"
                >
                  <span className="text-whatsapp"><WhatsAppIcon /></span> Talk to us
                </a>
              )}
            </div>
            <span className="text-[13px] text-on-dark">
              {releaseLine(release)} · Free 7-day trial · No credit card
            </span>
            {ENV.releasesPageUrl && (
              <a href={ENV.releasesPageUrl} target="_blank" rel="noopener" className="text-[13px] text-on-dark underline underline-offset-4 hover:text-white">
                All releases
              </a>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
