import type { ReactNode } from "react";
import { useReveal } from "../lib/motion";

export function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.23 8.23 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.16.04-.31-.02-.43-.06-.13-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48a.92.92 0 0 0-.66.31c-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.22-.16-.47-.29Z" />
    </svg>
  );
}

export function DownloadIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 2v10M4.5 7.5 9 12l4.5-4.5M2.5 15.5h13" />
    </svg>
  );
}

export function ArrowIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

/** Fades its children up when scrolled into view. */
export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={`reveal ${className}`} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </div>
  );
}

export function Eyebrow({ children, center = false }: { children: ReactNode; center?: boolean }) {
  return <p className={`m-0 mb-3 text-[15px] font-semibold text-muted ${center ? "text-center" : ""}`}>{children}</p>;
}

export function H2({ children, className = "", id }: { children: ReactNode; className?: string; id?: string }) {
  return (
    <h2 id={id} className={`m-0 font-display font-bold text-[clamp(34px,4.6vw,56px)] leading-[1.05] tracking-[-0.03em] ${className}`}>
      {children}
    </h2>
  );
}

export const btnDark =
  "inline-flex items-center justify-center gap-2.5 rounded-full bg-brand px-7 h-[54px] font-semibold text-white no-underline shadow-[0_8px_24px_-10px_rgba(22,133,90,.6)] transition-colors hover:bg-brand-2";
export const btnLight =
  "inline-flex items-center justify-center gap-2.5 rounded-full border border-line-3 bg-white px-6 h-[54px] font-semibold text-ink no-underline transition-colors hover:bg-soft";
export const btnWhite =
  "inline-flex items-center justify-center gap-2.5 rounded-full bg-white px-7 h-[56px] font-semibold text-ink no-underline transition-colors hover:bg-soft";

export const section = "mx-auto max-w-[1240px] px-4 sm:px-8";

/** "SmartCashier" text logo. `onDark` switches to the light colors. */
export function Wordmark({ className = "", onDark = false }: { className?: string; onDark?: boolean }) {
  return (
    <span className={`inline-flex items-baseline whitespace-nowrap font-display leading-none tracking-[-0.04em] ${className}`}>
      <span className={`font-semibold ${onDark ? "text-[#4fd394]" : "text-brand"}`}>Smart</span>
      <span className={`ml-[.06em] font-extrabold ${onDark ? "text-white" : "text-ink"}`}>
        Cash<span className="wm-i">&#305;<span className="wm-coin" /></span>er
      </span>
    </span>
  );
}
