import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { grantAccess, sendEmail, tagCRM } from '@/lib/webhookHandlers';

export async function POST(req: NextRequest) {
  const sig = req.headers.get('stripe-signature') as string;
  const secret = process.env.STRIPE_WEBHOOK_SECRET as string;
  const buf = await req.arrayBuffer();

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(Buffer.from(buf), sig, secret);
  } catch (err: any) {
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    await grantAccess(session);
    await sendEmail(session);
    await tagCRM(session);
    console.log('Order completed:', session.id);
  }

  return NextResponse.json({ received: true });
}
