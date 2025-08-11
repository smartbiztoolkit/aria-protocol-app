import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Simple in-memory stores used to keep the example self‑contained.
// In a production application these would be replaced with real
// persistence, email and CRM integrations.
const processedSessions = new Set<string>();

async function grantUserAccess(session: Stripe.Checkout.Session) {
  // Simulate persisting the purchase to grant the user access.
  processedSessions.add(session.id);
  console.log(`Access granted for session ${session.id}`);
}

async function sendConfirmationEmail(session: Stripe.Checkout.Session) {
  console.log(`Confirmation email sent to ${session.customer_email ?? 'unknown user'}`);
}

async function tagUserInCRM(session: Stripe.Checkout.Session) {
  console.log(`User ${session.customer_email ?? 'unknown'} tagged in CRM`);
}

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

    if (processedSessions.has(session.id)) {
      console.log(`Session already processed: ${session.id}`);
    } else {
      try {
        await grantUserAccess(session);
        await sendConfirmationEmail(session);
        await tagUserInCRM(session);
      } catch (err) {
        console.error(`Error processing session ${session.id}`, err);
      }
    }
  }

  return NextResponse.json({ received: true });
}
