'use client';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 pt-16 pb-20 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="font-display text-5xl leading-tight">
            Relationship Intelligence, <span className="aria-gold-text">Engineered</span> for Results.
          </h1>
          <p className="mt-6 text-lg text-aria-gray">
            Evidence-based tools blending attachment theory, emotional intelligence, and AI-driven guidance.
          </p>
          <div className="mt-8 flex gap-4">
            <Link href="/products" className="btn-primary">Explore Products</Link>
            <Link href="/contact" className="btn-ghost">Book a Session</Link>
          </div>
          <div className="mt-6 text-sm text-aria-gray">🔒 Secure checkout · 💯 Money-back guarantee</div>
        </div>
        <div className="card">
          <div className="aspect-[16/10] w-full bg-white/40 rounded-xl" />
        </div>
      </div>
    </section>
  );
}
