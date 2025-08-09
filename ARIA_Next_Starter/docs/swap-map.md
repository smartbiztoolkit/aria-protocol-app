# ARIA Visual Upgrade Kit — Swap Map

This kit is designed to drop into the Next.js starter you deployed (or any Next.js app).

## 1) Copy assets
- Copy `/public/images/*` into your project's `/public/images/`.

## 2) Add theme CSS
- Merge `/styles/aria-theme.css` into your `app/globals.css` (or import it).
- Ensure Tailwind theme has the ARIA tokens (`aria` colors or CSS variables).

## 3) Use the components
- Place components in `/components/` and import them into your pages.

### Example `app/page.tsx`
```tsx
import Hero from '@/components/Hero';
import TrustStrip from '@/components/TrustStrip';
import ServicesCarousel from '@/components/ServicesCarousel';
import Testimonials from '@/components/Testimonials';
import CTA from '@/components/CTA';

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <ServicesCarousel />
      <Testimonials />
      <CTA />
    </>
  );
}
```

## 4) Performance checks
- Use `.webp` or `.avif` variants for hero if you have them.
- Keep hero under 250KB for LCP; add `priority` to the hero Image.
- Add `alt` copy with benefit-driven phrasing, not generic file names.

## 5) Conversion checks (above the fold)
- Headline = outcome focused (+ subhead credibility).
- Primary CTA = “Explore Products” (commerce), secondary = “Book a Session”.
- Show trust signals directly under hero (secure, results-backed, support).
