
# KULT Salon — Phase 1 Demo Build

**Stack note:** The spec asks for Next.js 14, but this project is TanStack Start (React 19 + Vite + Tailwind v4). I'll build the same design and features on TanStack Start — routes under `src/routes/`, images via `<img>`, fonts via `<link>` in `__root.tsx`, `framer-motion` for animations. Everything visual matches the brief.

## Design tokens (src/styles.css)
Add brand colors as CSS vars + Tailwind theme:
- `--kult-black #000`, `--kult-red #E60012`, `--kult-white #FFF`, `--kult-gray #B8B8B8`, `--kult-off-white #F7F7F7`
- Global radius override → `0` (hard edges). No shadows, no gradients.
- Load Bebas Neue, Montserrat, DM Sans via `<link>` in `__root.tsx` head; add font-family utilities.

## Shared layout
- `src/routes/__root.tsx` — swap placeholder head to KULT metadata; add font `<link>`s; render `<Navbar />` + `<Outlet />` + `<Footer />` inside `QueryClientProvider`.
- `src/components/layout/Navbar.tsx` — sticky black, KULT logo, nav links with sliding red underline hover, BOOK NOW button, mobile full-screen overlay.
- `src/components/layout/Footer.tsx` — 4-column black footer with red top rule.

## Routes (7 pages)
Replace placeholder `src/routes/index.tsx` and add:
- `index.tsx` → Homepage (hero, marquee, about, services-4, gallery strip, team preview, testimonials carousel, loyalty teaser, final CTA)
- `services.tsx` → filter tabs + list rows + bridal card
- `team.tsx` → alternating editorial layout, 3 profiles
- `gallery.tsx` → filter tabs + masonry + lightbox modal
- `loyalty.tsx` → 3-step flow, points explainer, 3 tier cards, mock dashboard
- `contact.tsx` → split black/off-white, form with success state
- `book.tsx` → 4-step booking wizard + animated success screen

Each route sets its own `head()` (title, description, og:title, og:description).

## Shared components
- `src/components/shared/SectionEyebrow.tsx`, `RevealWrapper.tsx` (framer-motion fadeInUp + stagger), `RedDivider.tsx`, `Marquee.tsx`, `Lightbox.tsx`, `BookingStepper.tsx`.
- `src/components/home/*` — one file per homepage section.

## Data & utils
- `src/lib/mock-data.ts` — services, staff, testimonials, galleryImages, mockLoyalty (verbatim from spec).
- `src/lib/animations.ts` — shared framer-motion variants.

## Dependencies
Install: `framer-motion`, `lucide-react` (icons). shadcn utils already present.

## Animations
Framer Motion: hero lift 0.4s, staggered scroll reveals (0.1s), 150ms hovers, marquee via CSS keyframes, gallery `layout` reorder on filter, booking step slide via `AnimatePresence`, animated SVG checkmark on booking success, spring width on progress bar.

## Out of scope (Phase 1)
No real backend. Booking + contact submit → styled mock success states. All images = Unsplash URLs from spec.

## Technical notes
- Tailwind v4: register brand colors and font families inside `@theme inline` in `src/styles.css`; keep tokens semantic (`bg-kult-black`, `text-kult-red`, `font-display`, `font-heading`, `font-body`).
- Fonts loaded via `<link>` in root head (Tailwind v4 Lightning CSS can't `@import` remote URLs).
- No server functions, no DB, no Cloud enablement needed.
- `<Link to>` for nav; sharp corners enforced by overriding `--radius` to 0 for KULT surfaces (or by using `rounded-none` explicitly).

## Deliverables checklist
All 7 pages responsive (375 / 768 / 1280 / 1440), hovers + scroll animations, gallery lightbox with filter animation, 4-step booking → animated success.
