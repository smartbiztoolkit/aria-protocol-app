import { products } from "@/lib/products";
import Link from "next/link";

export default function Products() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="font-display text-4xl">Products</h1>
      <p className="text-aria-gray mt-2">Purchase digital programs or book premium sessions.</p>
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        {products.map((p) => (
          <div className="card" key={p.id}>
            <div className="font-display text-xl">{p.name}</div>
            <div className="text-aria-gray mt-1">{p.description}</div>
            <div className="mt-4 font-semibold">${"{(p.price/100).toFixed(2)}"}</div>
            <form action="/api/checkout" method="POST" className="mt-6">
              <input type="hidden" name="priceId" value={p.stripePriceId ?? ""} />
              <button className="btn-primary w-full" type="submit" disabled={!p.stripePriceId}>
                {p.stripePriceId ? "Buy Now" : "Set PRICE IDs"}
              </button>
            </form>
          </div>
        ))}
      </div>
      <div className="mt-10 text-sm text-aria-gray">
        Tip: Replace the Stripe <code>PRICE_ID</code>s in <code>lib/products.ts</code> after creating prices in your Stripe Dashboard.
      </div>
      <div className="mt-8">
        <Link href="/success" className="btn-ghost">Test Success Page</Link>
      </div>
    </div>
  );
}
