import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const UPSSELL_MAP: Record<string, string> = {
  'pro-upgrade': process.env.NEXT_PUBLIC_STRIPE_PRICE_UPGRADE_TO_PRO || '',
  'master-upgrade': process.env.NEXT_PUBLIC_STRIPE_PRICE_UPGRADE_TO_MASTER || ''
};

export async function POST(req: NextRequest) {
  const { offer } = await req.json();
  const priceId = UPSSELL_MAP[offer];
  if (!priceId) return NextResponse.json({ error: 'Offer not available' }, { status: 400 });

  if (!process.env.STRIPE_SECRET_KEY) return NextResponse.json({ error: 'Missing STRIPE_SECRET_KEY' }, { status: 500 });
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2024-06-20' });

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cancel`,
  });

  return NextResponse.json({ url: session.url });
}
