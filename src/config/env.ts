// Every VITE_* value is read here and nowhere else. Edit them in .env (see .env.example).
const clean = (v: string | undefined) => (v ?? "").trim();

const whatsappDigits = clean(import.meta.env.VITE_WHATSAPP_NUMBER).replace(/\D/g, "");

export const ENV = {
  whatsappNumber: whatsappDigits,
  phone: clean(import.meta.env.VITE_CONTACT_PHONE),
  email: clean(import.meta.env.VITE_CONTACT_EMAIL),
  githubRepo: clean(import.meta.env.VITE_GITHUB_REPO),
  downloadUrl: clean(import.meta.env.VITE_DOWNLOAD_URL),
  releasesPageUrl: clean(import.meta.env.VITE_RELEASES_PAGE_URL),
} as const;

if (import.meta.env.DEV) {
  if (!ENV.whatsappNumber) console.warn("[env] VITE_WHATSAPP_NUMBER is empty - WhatsApp buttons will be hidden.");
  if (!ENV.githubRepo && !ENV.downloadUrl) console.warn("[env] Set VITE_GITHUB_REPO or VITE_DOWNLOAD_URL for the download button.");
}
