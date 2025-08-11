'use client';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function SuccessContent() {
  const params = useSearchParams();
  const tier = params.get('tier'); // 'starter-kit' | 'professional-suite' | 'master-collection'
  const nextOffer = tier === 'starter-kit' ? { name: 'Upgrade to Professional', key: 'pro-upgrade' } :
                    tier === 'professional-suite' ? { name: 'Upgrade to Master', key: 'master-upgrade' } : null;

  const accept = async () => {
    if (!nextOffer) return;
    const res = await fetch('/api/upsell', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ offer: nextOffer.key })});
    const data = await res.json();
    if (data.url) window.location.href = data.url;
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <h1 className="font-display text-4xl">You’re in. Check your email for access.</h1>
      {nextOffer ? (
        <div className="card mt-8">
          <div className="text-xl font-semibold">{nextOffer.name} — only $100 more</div>
          <p className="text-aria-gray mt-2">Unlock the next tier instantly with one click. No need to re‑enter payment details.</p>
          <button className="btn-primary mt-4" onClick={accept}>Accept Upgrade</button>
        </div>
      ) : (
        <p className="text-aria-gray mt-6">Thanks for choosing the Master Collection. A bonus pack is on its way 🎁</p>
      )}
    </div>
  );
}

export default function Success() {
  return (
    <Suspense>
      <SuccessContent />
    </Suspense>
  );
}
