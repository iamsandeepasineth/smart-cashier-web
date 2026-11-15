import { DEMO_MESSAGE, hasWhatsApp, whatsappLink } from "../lib/whatsapp";
import { WhatsAppIcon } from "./ui";

export function WhatsAppFab() {
  if (!hasWhatsApp) return null;
  return (
    <a
      href={whatsappLink(DEMO_MESSAGE)}
      target="_blank"
      rel="noopener"
      aria-label="Chat with us on WhatsApp"
      className="fab fixed bottom-4 right-4 z-50 grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-white shadow-[0_10px_30px_-6px_rgba(37,211,102,.55)] transition-transform hover:scale-105 sm:bottom-6 sm:right-6"
    >
      <WhatsAppIcon size={28} />
    </a>
  );
}
