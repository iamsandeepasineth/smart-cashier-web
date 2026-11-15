import { ENV } from "../config/env";

export const hasWhatsApp = ENV.whatsappNumber.length > 0;

export function whatsappLink(message: string) {
  return `https://wa.me/${ENV.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const DEMO_MESSAGE = "Hi, I'd like a demo of Smart Cashier.";
