export type Product = {
  id: string;            // slug
  name: string;
  description: string;
  price: number;         // cents
  stripePriceId?: string;
};

export const ORDER_BUMP_PRICE_ID = process.env.NEXT_PUBLIC_STRIPE_PRICE_BUMP || '';

export const products: Product[] = [
  {
    id: 'starter-kit',
    name: 'ARIA Starter Kit',
    description: 'Complete framework + implementation guides for personal growth.',
    price: 9700,
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_STARTER
  },
  {
    id: 'professional-suite',
    name: 'ARIA Professional Suite',
    description: 'Full professional package with advanced tools and training.',
    price: 19700,
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO
  },
  {
    id: 'master-collection',
    name: 'ARIA Master Collection',
    description: 'Ultimate system with exclusive templates, community, and consultation.',
    price: 29700,
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_MASTER
  }
];
