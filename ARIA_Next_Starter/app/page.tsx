import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="relative">
      <div className="absolute inset-0 hero-overlay pointer-events-none" />
      <div className="max-w-6xl mx-auto px-4 pt-16 pb-24 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="font-display text-5xl leading-tight">
            Relationship Intelligence, <span className="gold-gradient">Engineered</span> for Results.
          </h1>
          <p className="mt-6 text-lg text-aria-gray">
            Evidence-based tools blending attachment theory, emotional intelligence, and AI-driven guidance.
          </p>
          <div className="mt-8 flex gap-4">
            <Link href="/products" className="btn-primary">Explore Products</Link>
            <Link href="/contact" className="btn-ghost">Book a Session</Link>
          </div>
        </div>
        <div className="card">
          <Image
            src="/hero-banner.png"
            alt="ARIA Intelligence"
            width={1200}
            height={800}
            className="rounded-xl w-full h-auto"
            priority
          />
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-6">
        {[
          { title: "Attachment Profiling", copy: "Professional-grade assessment flows."},
          { title: "Guided Programs", copy: "Step-by-step transformation tracks."},
          { title: "Expert Sessions", copy: "One-on-one or group intensives."},
        ].map((c) => (
          <div key={c.title} className="card">
            <div className="font-display text-xl">{c.title}</div>
            <div className="mt-2 text-aria-gray">{c.copy}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
