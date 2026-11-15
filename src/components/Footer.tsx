import { Mail, Phone } from "lucide-react";
import { ENV } from "../config/env";
import { DEMO_MESSAGE, hasWhatsApp, whatsappLink } from "../lib/whatsapp";
import { WhatsAppIcon, Wordmark } from "./ui";

export function Footer() {
  const tel = ENV.phone.replace(/[^\d+]/g, "");
  const link = "inline-flex items-center gap-2 text-muted no-underline hover:text-ink";
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-x-8 gap-y-4 px-4 py-7 text-[14px] text-muted sm:px-8">
        <div className="flex items-center gap-2.5">
          <Wordmark className="text-[19px]" />
          <span>© {new Date().getFullYear()} Smart Cashier · Made in Sri Lanka</span>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          {hasWhatsApp && (
            <a href={whatsappLink(DEMO_MESSAGE)} target="_blank" rel="noopener" className={link}>
              <WhatsAppIcon size={16} /> WhatsApp
            </a>
          )}
          {ENV.phone && (
            <a href={`tel:${tel}`} className={link}>
              <Phone size={15} /> {ENV.phone}
            </a>
          )}
          {ENV.email && (
            <a href={`mailto:${ENV.email}`} className={link}>
              <Mail size={15} /> {ENV.email}
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
