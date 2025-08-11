import type Stripe from 'stripe';

export async function grantAccess(session: Stripe.Checkout.Session) {
  console.log(`Granting access for session ${session.id}`);
}

export async function sendEmail(session: Stripe.Checkout.Session) {
  console.log(`Sending confirmation email for session ${session.id}`);
}

export async function tagCRM(session: Stripe.Checkout.Session) {
  console.log(`Tagging CRM for session ${session.id}`);
}

