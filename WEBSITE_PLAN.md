# Smart Cashier Website Redesign: Plan (v2)

**Status:** Approved and built (2026-11-15). Hosting: own server, new domain. The design reference folder has been deleted.
**What changed since v1:**
- The site is now a React + Vite app instead of a single HTML file.
- Contact details and download links come from a `.env` file.
- The WhatsApp number is now 072 125 1002.
- Customer loyalty is removed.
- The download comes from your GitHub releases page.
- Your email is shown in the footer.

---

## 1. Tech stack

The stack matches your Smart Cashier desktop app, so it will feel familiar:

| Part | Choice | Why |
|---|---|---|
| Build | **Vite 5** + **React 18** + **TypeScript** | Same as the POS app |
| Styling | **Tailwind CSS v4** (`@tailwindcss/vite`) | Same as the POS app. The design colors become theme tokens. |
| Icons | **lucide-react** | The real app uses these icons, so the app mockup matches exactly |
| Fonts | Inter Tight + Inter (Google Fonts) | From the "clean & simple" design |
| Tests | **Vitest** for the pricing math only | So price changes can't silently break the totals |

No router and no backend. It's a single landing page that builds to static files in `dist/`, so it can be hosted on GitHub Pages, Netlify, Vercel or any static host.

## 2. Environment variables

A committed **`.env.example`** lists every setting, and you fill in your real values in **`.env`** (which git ignores).

```env
# Contact
VITE_WHATSAPP_NUMBER=94721251002        # international format, no + or spaces (072 125 1002)
VITE_CONTACT_PHONE=+94 72 125 1002      # shown in the footer, tap-to-call
VITE_CONTACT_EMAIL=                     # your new email

# Download (GitHub Releases)
VITE_GITHUB_REPO=                       # e.g. iamsandeepasineth/minipos-releases
VITE_DOWNLOAD_URL=                      # optional fallback: direct .exe link or the releases page URL
VITE_RELEASES_PAGE_URL=                 # e.g. https://github.com/<owner>/<repo>/releases

# Hosting
VITE_BASE_PATH=/                        # set to /pos-web/ if hosted on GitHub Pages under the repo name
```

**How the download button works:**

1. **If `VITE_GITHUB_REPO` is set**, the page asks GitHub for the latest release (`api.github.com/repos/<repo>/releases/latest`). The button then links straight to that release's `.exe` and shows its real version and size, e.g. *"v1.1.3 · Windows installer · 116 MB"*. **Each new release you publish on GitHub shows up on the site automatically, with no rebuild.**
2. **If that request fails** (rate limit or offline), the button falls back to `VITE_DOWNLOAD_URL`, then to `VITE_RELEASES_PAGE_URL`.
3. A small **"All releases"** link points to `VITE_RELEASES_PAGE_URL`.

> Note: Vite builds `VITE_*` values into the public JavaScript. That's fine here, because these details are meant to be public. Never put secrets in this file.

## 3. Project structure

The Vite app replaces the current `index.html` at the root of this repo (`pos-web`). The old page stays in git history, and the `images/logo.png` logo moves into the app.

```
POS - web/
├── .env.example          committed, documents every variable
├── .env                  yours, gitignored
├── index.html            Vite entry
├── package.json
├── vite.config.ts        base path from VITE_BASE_PATH
├── public/
│   └── logo.png          favicon + nav logo
└── src/
    ├── main.tsx
    ├── App.tsx           assembles the sections
    ├── index.css         Tailwind + design tokens
    ├── config/
    │   ├── env.ts        reads and validates the VITE_* values in one place
    │   └── pricing.ts    PRICING config object (all the numbers)
    ├── lib/
    │   ├── pricing.ts    pure calculatePrice() + formatRs()
    │   ├── pricing.test.ts
    │   ├── whatsapp.ts   builds wa.me links with a prefilled message
    │   └── useLatestRelease.ts   GitHub latest-release hook with fallback
    └── components/
        ├── Nav.tsx
        ├── Hero.tsx
        ├── AppMockup/    real Smart Cashier UI replica
        │   ├── AppMockup.tsx  Sidebar.tsx  ProductGrid.tsx  CartPanel.tsx
        ├── Features.tsx
        ├── MultiCounter.tsx
        ├── Repairs.tsx
        ├── Pricing.tsx
        ├── Videos.tsx
        ├── DownloadCta.tsx
        ├── Footer.tsx
        └── WhatsAppFab.tsx   floating WhatsApp button
```

The `Smart Cashier — clean & simple-html/` folder is only a design reference. Should I keep it in the repo or delete it once the site is built? (See question 2.)

## 4. Design direction (unchanged from v1)

- **Style:** the "clean & simple" look. Near-black `#111111` and warm off-white `#F4F4F2`, pill buttons, large rounded panels, large Inter Tight headings, and the yellow `#FFC93C` accent only on small chips.
- **The real logo** instead of the mockup's placeholder icon.
- **Small animations** (all turned off for users who set `prefers-reduced-motion`):
  - The hero app window starts slightly tilted in 3D and settles flat as you scroll.
  - Sections fade up as they come into view.
  - The price counts up or down smoothly when it changes.
- **Phones:** works down to 360px wide, with a 16px side margin and no sideways scrolling.

## 5. Changes you asked for

| # | Request | Implementation |
|---|---|---|
| 1 | Remove the top dot and text | The hero pill is gone; the page opens on the headline |
| 2 | No live demo, use WhatsApp | The demo button becomes **"Book a demo on WhatsApp"**, linking to `wa.me/94721251002` with the message "Hi, I'd like a demo of Smart Cashier." The floating WhatsApp button also stays visible. |
| 3 | Show the real app UI | The hero mockup is a replica of the real POS screen (§6) |
| 4 | Many PCs | **"Many PCs. One shop. No re-typing."** The diagram shows Counter 1, 2, 3, … N connected to one shop database |
| 5 | Advanced inventory | **+Rs. 4,000/mo**, "Manage and view your stock online", with a **Coming soon** badge |
| 6 | Multi-branch | A **Branches** stepper (1–20). Total = monthly price per branch × number of branches |
| 7 | No SMS receipts | Removed |
| 8 | No accounting export | Removed |
| 9 | Estimate note | Shown under the price: *"These prices are only to give you an idea. Contact us on WhatsApp for an exact quote."* |
| 10 | Customer loyalty | Removed |
| 11 | Contact details and download links in env | §2 |

## 6. Hero mockup: the real Smart Cashier app

This is built from the app's own source (`AppLayout.tsx`, `features/pos/*`, `index.css`), using its real colors: background `#fdf8f7`, primary `#1c1c1b`, borders `#c6c7c1`, and amber/red badges.

- **Window:** a Windows-style title bar reading "Smart Cashier".
- **Sidebar:**
  - Shop logo and name.
  - User card.
  - Navigation: POS (active), Sales, Installments, Products, Repairs, Suppliers, Reports, Settings, Support, with the same Lucide icons as the app.
  - A green **Synced** pill at the bottom.
- **Main area:**
  - The heading "Current Sale" and the search bar "Search product or scan barcode…".
  - A product grid. Each tile shows an image box, name, SKU, price, and badges such as "3 left" or "Out of stock".
- **Cart:**
  - Cart lines with − / + quantity buttons.
  - A **Total** in `LKR 12,450.00` format.
  - A dark **Checkout · 3 items** button.
- **Interactive:**
  - Tapping a product adds it to the cart.
  - Checkout shows "Paid · receipt printed" and then starts a new sale.
  - It's labeled "Demo data".
- **On phones:** the sidebar shrinks to an icon rail and the cart moves below the product grid.

## 7. Page sections (top → bottom)

1. **Nav:** logo, then Features · Multi-counter · Repairs · Pricing, then a **Download** pill. On mobile the links move into a hamburger menu.
2. **Hero:** headline, subtext, **Download for Windows** and **Book a demo on WhatsApp**, the release version line, then the app mockup with three stat cards beside it.
3. **Features:** six cards matching what the app really does:
   - Fast checkout & barcode scanning
   - Products, stock & serials/IMEI
   - Repair tickets
   - Installments
   - Supplier invoices & ledger
   - Reports
   - A dark **Multi-counter sync** card.
4. **Multi-counter:** "Many PCs. One shop.", the N-counter diagram, and "Works offline, syncs when back online".
5. **Repairs:** a clickable status stepper with a sample job card.
6. **Pricing estimator:** see §8.
7. **Videos:** the YouTube demo grid, set from a list in `src/config/videos.ts`. The section is hidden if the list is empty.
8. **Download CTA:**
   - Dark panel: "Open tomorrow on Smart Cashier."
   - Download button and the release version line.
   - "Free 7-day trial · No credit card".
9. **Footer:** © 2026 Smart Cashier · WhatsApp · phone (tap-to-call) · email (mailto). These values come from env, and any that are empty are hidden.

## 8. Pricing estimator

All the numbers live in `src/config/pricing.ts`:

```
base                 Rs. 2,000 / mo
counters (PCs)       1 included, Rs. 750 per extra   (1–50)
staff logins         3 included, Rs. 300 per extra   (1–200)
bill volume          Up to 1,000: 0 · 1,001–5,000: 500 · 5,001–20,000: 1,500 · 20,000+: 3,500
shop type factor     Kiosk 0.8 · Retail 1.0 · Pharmacy 1.2 · Restaurant 1.3 · Hardware 1.1
add-ons              Advanced inventory  Rs. 4,000  "Manage and view stock online" · Coming soon
branches             1–20

per branch / mo  = round((base + extra counters + extra logins + volume + add-ons) × shop factor)
monthly total    = per branch × branches
annual           = monthly total × 10      (2 months free)
plan badge       Starter ≤ 3,000 · Business ≤ 7,000 · Pro above (on monthly total)
```

- **Breakdown panel:** base, extras, volume, add-ons, subtotal, shop-type adjustment, **per branch**, **× N branches**, monthly total, and the annual lines when Annual billing is selected.
- **Note** below the price: *"These prices are only to give you an idea. Contact us on WhatsApp for an exact quote."*
- **"Get a quote on WhatsApp" button:** the message is prefilled with the visitor's choices, e.g. *"Hi, I'm interested in Smart Cashier. Retail · 3 PCs · 4 staff · 2 branches · Advanced inventory · Monthly — estimate Rs. 18,700/mo."*
- **Unit tests:** branch multiplication, the included counters and logins, the annual discount, and the plan badge thresholds.

## 9. Scripts

```
npm install
npm run dev       # local preview at http://localhost:5173
npm run build     # static site → dist/
npm run preview   # serve the built site
npm test          # pricing tests
```

## 10. Questions before I build

1. **Hosting:** where will the site live? If it's GitHub Pages on `iamsandeepasineth/pos-web`, I'll add a GitHub Actions workflow that builds and deploys on every push to `main`. It would get your env values from repository **Variables** in the repo settings.
2. **Design reference folder:** keep `Smart Cashier — clean & simple-html/` in the repo, or delete it after the build?
3. **GitHub releases repo:** is it **public**? The automatic "latest version" lookup only works on a public repo. If it's private, I'll use only the fixed `VITE_DOWNLOAD_URL`.

Approve this plan (with answers to the 3 questions, or "use defaults") and I'll build it. The defaults are: GitHub Pages + Actions, delete the reference folder, and assume the repo is public.
