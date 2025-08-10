# ARIA Master Deploy Pack — Enterprise Edition

Premium 3-tier funnel with order bump + post-purchase upsell. Next.js 14 + Stripe + Vercel.

## 1) Push to GitHub
```
git init && git add .
git commit -m "ARIA enterprise"
git branch -M main
git remote add origin https://github.com/<you>/aria-intelligence-site.git
git push -u origin main
```

## 2) Import to Vercel
- New Project → select the repo → Deploy
- Add env vars later (below) and redeploy

## 3) Create Stripe products in ONE command
```
npm i
export STRIPE_SECRET_KEY=sk_test_***   # or set in your shell
npm run stripe:bootstrap
```
- This creates: Starter, Pro, Master, **Order Bump ($47)**, and two **Upgrade prices ($100 each)**
- See `data/env.output.txt` for all generated price IDs

## 4) Paste env vars
Copy from `data/env.output.txt` into `.env.local` and Vercel Project → Environment Variables:
```
NEXT_PUBLIC_SITE_URL=https://<your-site>.vercel.app
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_***
STRIPE_SECRET_KEY=sk_test_***
STRIPE_WEBHOOK_SECRET=whsec_test_***
NEXT_PUBLIC_STRIPE_PRICE_STARTER=price_***
NEXT_PUBLIC_STRIPE_PRICE_PRO=price_***
NEXT_PUBLIC_STRIPE_PRICE_MASTER=price_***
NEXT_PUBLIC_STRIPE_PRICE_BUMP=price_***
NEXT_PUBLIC_STRIPE_PRICE_UPGRADE_TO_PRO=price_***
NEXT_PUBLIC_STRIPE_PRICE_UPGRADE_TO_MASTER=price_***
```

## 5) Webhook
Stripe Dashboard → Developers → Webhooks → Add endpoint:
- `https://<your-site>.vercel.app/api/webhook`
- Events: `checkout.session.completed`
- Copy **signing secret** to `STRIPE_WEBHOOK_SECRET`

## 6) Test
- Go to `/products`
- Leave order bump checked (default) and complete a test payment (4242 4242 4242 4242)
- You should land on `/success` with an **Upgrade for $100** offer

## 7) Go live
- Repeat steps 3–6 with **LIVE** keys and webhook
- Update Vercel envs to live values and redeploy

---

### Notes
- Upsell endpoint: `/api/upsell` uses `NEXT_PUBLIC_STRIPE_PRICE_UPGRADE_TO_PRO/MASTER`
- Bump checkbox toggles a second line item in `/api/checkout`
- Extend fulfillment logic in `/api/webhook` (email access, CRM tags, etc.)

Enjoy 🚀
