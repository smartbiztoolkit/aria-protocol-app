export type Product = {
  id: string;
  name: string;
  description: string;
  price: number; // in cents
  stripePriceId?: string; // set in Stripe Dashboard
};

export const products: Product[] = [
  {
    id: "attach-profile",
    name: "Attachment Profile Pro",
    description: "Advanced assessment + personalized roadmap (digital).",
    price: 8900,
    stripePriceId: "PRICE_ID_1",
  },
  {
    id: "program-core",
    name: "Guided Program: Core",
    description: "4-week self-paced track with weekly AI guidance.",
    price: 14900,
    stripePriceId: "PRICE_ID_2",
  },
  {
    id: "intensive-1on1",
    name: "1:1 Expert Intensive (60m)",
    description: "Live session with certified ARIA practitioner.",
    price: 24900,
    stripePriceId: "PRICE_ID_3",
  },
];
