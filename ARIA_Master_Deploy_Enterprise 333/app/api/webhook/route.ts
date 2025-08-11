import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const processedSessions = new Set<string>();

async function grantUserAccess(session: Stripe.Checkout.Session) {
  // Example: mark the purchase in a database
  console.log(`Granting access for session ${session.id}`);
}

async function sendConfirmationEmail(session: Stripe.Checkout.Session) {
  // Example: dispatch a confirmation email to the customer
  console.log(`Sending confirmation email to ${session.customer_email}`);
}

async function tagUserInCRM(session: Stripe.Checkout.Session) {
  // Example: tag the user in a CRM system
  console.log(`Tagging user ${session.customer_email} in CRM`);
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
      console.log('Session already processed:', session.id);
    } else {
      try {
        await grantUserAccess(session);
        await sendConfirmationEmail(session);
        await tagUserInCRM(session);
        processedSessions.add(session.id);
        console.log('Order completed:', session.id);
      } catch (error) {
        console.error('Error processing checkout session:', session.id, error);
        return new NextResponse('Webhook Error', { status: 500 });
      }
    }
  }

  return NextResponse.json({ received: true });
}
