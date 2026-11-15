import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Wordmark } from "./ui";

const LINKS = [
  { href: "#features", label: "Features" },
  { href: "#counters", label: "Multi-counter" },
  { href: "#repairs", label: "Repairs" },
  { href: "#pricing", label: "Pricing" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b bg-white/85 backdrop-blur-md transition-colors ${
        scrolled ? "border-line" : "border-transparent"
      }`}
    >
      <nav aria-label="Main" className="mx-auto flex max-w-[1240px] items-center justify-between gap-4 px-4 py-3.5 sm:px-8">
        <a href="#top" aria-label="Smart Cashier home" className="flex items-center py-1 no-underline">
          <Wordmark className="text-[25px]" />
        </a>

        <div className="hidden items-center gap-7 text-[15px] font-medium text-body md:flex">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-body no-underline underline-offset-4 hover:text-ink hover:underline">
              {l.label}
            </a>
          ))}
          <a href="#download" className="inline-flex h-11 items-center rounded-full bg-brand px-5 font-semibold text-white no-underline transition-colors hover:bg-brand-2">
            Download
          </a>
        </div>

        <button
          type="button"
          className="grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-line-3 bg-white text-ink md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-line bg-white px-4 pb-5 pt-2 md:hidden">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block border-b border-line py-3.5 text-[17px] font-medium text-ink no-underline">
              {l.label}
            </a>
          ))}
          <a href="#download" onClick={() => setOpen(false)} className="mt-4 flex h-12 items-center justify-center rounded-full bg-brand font-semibold text-white no-underline">
            Download
          </a>
        </div>
      )}
    </header>
  );
}
