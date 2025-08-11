'use client';
import { useState } from 'react';
import { products } from '@/lib/products';

export default function Products() {
  const [bumpChecked, setBumpChecked] = useState(true);
  const handleCheckout = async (priceId?: string, tier?: string) => {
    if (!priceId) return;
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId, bump: bumpChecked, tier })
      });
      if (!res.ok) throw new Error('Request failed');
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (err) {
      console.error('Checkout request failed', err);
      alert('Unable to start checkout. Please try again later.');
    }
  };
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="font-display text-4xl">Choose Your ARIA Package</h1>
      <p className="text-aria-gray mt-2">Premium, psychology-based programs built on attachment theory and emotional intelligence.</p>
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        {products.map(p => (
          <div className="card" key={p.id}>
            <div className="font-display text-xl">{p.name}</div>
            <div className="text-aria-gray mt-1">{p.description}</div>
            <ul className="mt-4 text-sm text-aria-gray space-y-1">
              <li>✔ Evidence-based framework</li>
              <li>✔ Instant digital access</li>
              <li>✔ Money-back guarantee</li>
            </ul>
            <div className="mt-4 font-semibold">${(p.price/100).toFixed(2)}</div>
            <button className="btn-primary w-full mt-6" onClick={() => handleCheckout(p.stripePriceId, p.id)} disabled={!p.stripePriceId}>
              {p.stripePriceId ? 'Buy Now' : 'Set PRICE ID'}
            </button>
          </div>
        ))}
      </div>

      <div className="card mt-8">
        <label className="flex items-center gap-3">
          <input type="checkbox" checked={bumpChecked} onChange={e=>setBumpChecked(e.target.checked)} />
          <span><strong>$47 Fast‑Start Worksheets</strong> — actionable templates to accelerate results (order bump)</span>
        </label>
      </div>
    </div>
  );
}
