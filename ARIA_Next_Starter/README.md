# ARIA Intelligence AI — Vercel + Stripe Starter

Branded Next.js 14 (App Router) starter aligned to ARIA guidelines, with Stripe Checkout.

## Quickstart

1) **Create Stripe Prices** for each product. Copy the `price_...` IDs into `lib/products.ts`.
2) **Set env vars** in Vercel (or `.env.local`): `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_SITE_URL`.
3) `npm i` then `npm run dev` locally, or import this repo to Vercel and hit Deploy.
4) In Stripe CLI: `stripe listen --forward-to localhost:3000/api/webhook` (dev only).

## Theming

- Playfair Display (headings) and Inter (body) via `next/font`.
- Palette: Navy `#0B1B2B`, Gold `#D4AF37`, Warm `#FAFAFA`, Gray `#6B7280`, Teal `#0DD3BF`.
- Edit in `tailwind.config.ts` and `app/globals.css`.

## Pages

- `/` Hero + value props
- `/products` Product grid with Stripe Checkout
- `/success`, `/cancel`
- `/about`, `/contact`

## Webhooks

`/api/webhook` handles `checkout.session.completed` — add your fulfillment logic there.
