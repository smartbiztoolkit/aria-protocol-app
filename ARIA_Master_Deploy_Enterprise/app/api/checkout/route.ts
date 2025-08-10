import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { ORDER_BUMP_PRICE_ID } from '@/lib/products';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const priceId: string = body.priceId;
  const bump: boolean = !!body.bump;

  if (!process.env.STRIPE_SECRET_KEY) return NextResponse.json({ error: 'Missing STRIPE_SECRET_KEY' }, { status: 500 });
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2024-06-20' });

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
    { price: priceId, quantity: 1 }
  ];
  if (bump && ORDER_BUMP_PRICE_ID) {
    line_items.push({ price: ORDER_BUMP_PRICE_ID, quantity: 1 });
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items,
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?tier=${encodeURIComponent(body.tier || '')}&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cancel`,
    allow_promotion_codes: true
  });

  return NextResponse.json({ url: session.url });
}
