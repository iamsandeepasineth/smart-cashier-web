# Smart Cashier website

The landing page for Smart Cashier, built with React, Vite, TypeScript and Tailwind CSS v4.

## Setup

```bash
npm install
cp .env.example .env   # then fill in your values
npm run dev            # local preview at http://localhost:5173
```

## Settings (`.env`)

| Variable | What it does |
|---|---|
| `VITE_WHATSAPP_NUMBER` | WhatsApp Business number, digits only, e.g. `94721251002` |
| `VITE_CONTACT_PHONE` | Phone shown in the footer (hidden if empty) |
| `VITE_CONTACT_EMAIL` | Email shown in the footer (hidden if empty) |
| `VITE_GITHUB_REPO` | Public releases repo. The site links the latest `.exe` automatically |
| `VITE_DOWNLOAD_URL` | Fallback download link if the GitHub lookup fails |
| `VITE_RELEASES_PAGE_URL` | Link for "All releases" |
| `VITE_BASE_PATH` | `/` when the site is at the root of its domain |

These values are built into the public JavaScript, so never put passwords or tokens in `.env`.
Because the values are baked in at build time, run `npm run build` again after changing `.env`.

## Content

- **Prices:** `src/config/pricing.ts`. Run `npm test` after changing them.
- **Demo videos:** `src/config/videos.ts`. The section is hidden while the list is empty.

## Deploy to your server

```bash
npm run build          # outputs static files to dist/
```

Upload the contents of `dist/` to your web root, for example `/var/www/minipos`. It is a single
static page, so no server-side code is needed. Example nginx config:

```nginx
server {
    server_name your-domain.com;
    root /var/www/minipos;
    location / { try_files $uri /index.html; }
    location /assets/ { expires 1y; add_header Cache-Control "public, immutable"; }
}
```

New app releases appear on the site automatically. You do not need to rebuild after publishing a
GitHub release.
