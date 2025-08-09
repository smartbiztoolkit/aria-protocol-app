import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs"; // ensure edge is not used due to crypto

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature") || "";
  const buf = await req.text();

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2024-06-20" });
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    // TODO: fulfill the order (e.g., grant access, send digital file, schedule session)
    console.log("Payment received for session:", session.id);
  }

  return NextResponse.json({ received: true });
}

export const config = {
  api: { bodyParser: false },
};
