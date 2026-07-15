# ACM Pure Life Services — Website

Marketing site for **ACM Pure Life Services LLC**, a family-owned HVAC contractor
serving Florida homes and light commercial properties.

Built with **Next.js 16** (App Router) + **Tailwind v4**. Deploys cleanly to Vercel.
Intended production domain: **acmpurelife.com**.

## What's inside

- Single-page marketing homepage (`app/page.tsx`) — premium "construction" look:
  asphalt charcoal + concrete off-white + a tangy amber-yellow accent, Oswald display
  type over Manrope body.
- **Bilingual**: full English / Spanish toggle (EN/ES in the top bar). The choice is
  saved in the browser and auto-detects Spanish browsers. All copy lives in translation
  dictionaries at the top of `app/page.tsx`.
- Brand logo recreated as a crisp inline SVG (house + snowflake + flame + wordmark).
- Service detail pages (`app/[slug]/page.tsx`), `robots.ts`, `sitemap.ts`, and a
  service-request API route (`app/api/service-requests/route.ts`).
- Real HVAC photos in `public/` (residential condenser hero, commercial rooftop RTUs).

## Run locally

```bash
npm install
npm run dev
# open http://localhost:3000
```

## Deploy to Vercel (permanent, public URL)

**Option A — GitHub + Vercel dashboard (recommended)**

1. Create an empty GitHub repo (e.g. `acm-pure-life-web`).
2. From this folder:
   ```bash
   git remote add origin https://github.com/<your-username>/acm-pure-life-web.git
   git branch -M main
   git push -u origin main
   ```
3. Go to https://vercel.com/new, import the repo. Framework auto-detects as **Next.js**.
   Click **Deploy**. You get a permanent public URL like `acm-pure-life-web.vercel.app`.

**Option B — Vercel CLI**

```bash
npm i -g vercel
vercel        # first run links/creates the project
vercel --prod # promote to a permanent production URL
```

> Note: if the project has **Deployment Protection** turned on (Project → Settings →
> Deployment Protection), turn it off so the link is publicly viewable without a Vercel login.

## Connect the domain (acmpurelife.com)

The domain owner does this once:

1. In the Vercel project → **Settings → Domains** → add `acmpurelife.com` (and `www.acmpurelife.com`).
2. Vercel shows the DNS records to add at the domain's registrar:
   - `A` record for `acmpurelife.com` → `76.76.21.21`
   - `CNAME` for `www` → `cname.vercel-dns.com`
   (Vercel displays the exact current values — use those.)
3. Once DNS propagates, Vercel issues HTTPS automatically.

`metadataBase` and canonical/OG tags already point at `https://acmpurelife.com`.

## Content notes (please keep accurate)

- "10 years in the trade" is trade/industry experience, not company age.
- No invented certifications, licenses, reviews, awards, guarantees, or 24-hour/
  emergency service. Add those only when they are real.
- Phone/text CTAs point at **(954) 278-4733** — update `app/page.tsx` if that changes.
- The payment form posts to `/pay` and the request form to `/api/service-requests`
  (currently validates + acknowledges; wire to email/CRM/payments when ready).

© ACM Pure Life Services LLC
