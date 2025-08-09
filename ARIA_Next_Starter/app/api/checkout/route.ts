import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.formData();
  const priceId = body.get("priceId")?.toString();
  if (!priceId) {
    return NextResponse.redirect(new URL("/products?error=missing_price", req.url));
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2024-06-20" });

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${new URL("/success", req.url)}`,
    cancel_url: `${new URL("/cancel", req.url)}`,
    allow_promotion_codes: true,
    shipping_address_collection: { allowed_countries: ["US", "CA", "GB", "AU"] },
    automatic_tax: { enabled: true },
    billing_address_collection: "auto",
  });

  return NextResponse.redirect(session.url!, { status: 303 });
}
