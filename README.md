# Emergency Plumber UK — Next.js 16

24/7 emergency plumbing site for the UK. Built with Next.js 16 App Router (SSG), TypeScript, Tailwind, and a content-as-code architecture designed to scale from 12 city pages today to 5,000+ pages (sub-areas, postcodes, area×service combinations) without re-architecting.

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export of all pages, runs next-sitemap on postbuild
npm start
```

Requirements: Node 20+, npm 10+.

## Tech stack

- Next.js 16.2.4 (App Router, SSG)
- React 19
- TypeScript (strict)
- Tailwind CSS 3
- Poppins via `next/font/google`
- `next-sitemap` (postbuild)

## Page inventory (current)

| URL | Source |
|---|---|
| `/` | `app/page.tsx` |
| `/services` | `app/services/page.tsx` |
| `/services/[service]` | `app/services/[service]/page.tsx` (8 services) |
| `/areas` | `app/areas/page.tsx` |
| `/emergency-plumber/[city]` | `app/emergency-plumber/[city]/page.tsx` (12 cities) |
| `/about` | `app/about/page.tsx` |
| `/contact` | `app/contact/page.tsx` |
| `/sitemap.xml` | `app/sitemap.ts` |
| `/robots.txt` | `app/robots.ts` |

All dynamic routes use `generateStaticParams` + `dynamicParams = false` so every route is statically generated at build time.

## Project structure

```
app/
  layout.tsx              # global layout, fonts, header/footer/sticky bar
  page.tsx                # homepage
  globals.css             # Tailwind layers + design tokens
  emergency-plumber/[city]/page.tsx
  services/
    page.tsx
    [service]/page.tsx
  areas/page.tsx
  about/page.tsx
  contact/page.tsx
  sitemap.ts
  robots.ts
  not-found.tsx

components/                # 14 shared components
  Header.tsx               # sticky, mobile menu
  Footer.tsx
  Hero.tsx
  CallButton.tsx
  MobileStickyBar.tsx
  ServiceCard.tsx
  ServiceIcon.tsx
  CityCard.tsx
  ReviewCard.tsx
  FaqAccordion.tsx
  TrustBar.tsx
  PostcodeChips.tsx
  RecentJobCard.tsx
  BreadcrumbNav.tsx
  SchemaMarkup.tsx
  CTASection.tsx

data/                      # content as TypeScript
  cities.ts                # 12 cities, 200-400 word housing notes each
  services.ts              # 8 services with FAQ, process, causes
  reviews.ts               # 50+ reviews tagged by city
  recentJobs.ts            # 8 recent jobs per city
  homeFaq.ts

lib/
  constants.ts             # BRAND, PHONE, EMAIL, GAS_SAFE_NUMBER, SITE_URL
  schema.ts                # JSON-LD builders (Plumber, Service, FAQ, Breadcrumb)
  cityFaq.ts               # generates city-specific FAQ from city data
```

## Customization

### Brand, phone, email, registration

Edit `lib/constants.ts`:

```ts
export const BRAND = 'RapidFix Plumbers';
export const PHONE_DISPLAY = '0800 123 4567';
export const PHONE_TEL = '+448001234567';
export const EMAIL = 'help@example.co.uk';
export const GAS_SAFE_NUMBER = '123456';
export const SITE_URL = 'https://example.co.uk';
```

These flow into every page, schema markup, footer and CTA - no hard-coded duplication.

### Adding a city

1. Append a new entry to `cities` in `data/cities.ts` (full schema in the file).
2. Add an entry to `recentJobs.ts` keyed by the new slug.
3. Add city-tagged reviews to `reviews.ts` (use `city: '<slug>'`).
4. Run `npm run build` - the dynamic city route will pick up the new slug.

### Adding a service

Append to `services` in `data/services.ts` and pick an icon name from `components/ServiceIcon.tsx` (or add a new SVG case). Build picks it up automatically.

### Phase 2: sub-areas

The architecture is ready - each city object has a `futureAreas: string[]` field already populated. To enable sub-area pages:

1. Create `app/emergency-plumber/[city]/[area]/page.tsx`.
2. Implement `generateStaticParams` that flat-maps cities × futureAreas.
3. Replace the `futureAreas` strings with full area objects (or load from a separate `data/areas.ts`).

The sitemap in `app/sitemap.ts` will need a third loop added for area pages — trivially scales to 5,000+ entries.

## SEO

- Per-page metadata via Next.js Metadata API (unique title, description, canonical on every page).
- JSON-LD schema injected via `<SchemaMarkup>`:
  - `Plumber` schema on homepage and every city page (with `geo` and `areaServed`).
  - `Service` schema on every service page.
  - `FAQPage` schema on every page with FAQ blocks.
  - `BreadcrumbList` schema on every sub-page.
- Open Graph + Twitter Card defaults on root layout.
- Auto-generated sitemap at `/sitemap.xml` and robots.txt at `/robots.txt`.
- All phone numbers wrapped in `tel:` links.
- Mobile sticky call bar with `tel:` link.
- Footer contains all 12 cities and all 8 services on every page (internal linking).

## Performance

- All pages SSG (no client-side JS for content).
- Only Header, FaqAccordion, MobileStickyBar use `'use client'`.
- Poppins preloaded with `display: swap` via `next/font`.
- Tailwind purges unused CSS in production.
- Aim: Lighthouse mobile 95+, LCP under 2s.

## Accessibility

- Semantic HTML (`main`, `nav`, `section`, `article`).
- ARIA labels on icon-only buttons.
- Keyboard navigation throughout (focus rings via `*:focus-visible`).
- Reduced-motion considerations in animations.
- WCAG AA color contrast.

## Deploy to Vercel

```bash
vercel
```

Set the `SITE_URL` env var in Vercel project settings to your production URL — `next-sitemap` and JSON-LD use it.

```env
SITE_URL=https://yourdomain.co.uk
```

## MCP / Supabase integration

A project-scoped MCP config is committed at `.mcp.json` pointing to the Supabase MCP server. To authenticate, run in a fresh terminal:

```bash
claude /mcp
```

Select `supabase` and choose Authenticate.

## License

Proprietary. All content and code copyright the operating brand.
