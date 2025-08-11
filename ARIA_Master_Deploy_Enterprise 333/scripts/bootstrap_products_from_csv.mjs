// Usage: npm run stripe:bootstrap
import fs from 'node:fs';
import path from 'node:path';
import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  console.error('Missing STRIPE_SECRET_KEY');
  process.exit(1);
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2024-06-20' });

const csvPath = path.join(process.cwd(), 'data', 'products.csv');
const rows = fs.readFileSync(csvPath, 'utf-8').trim().split(/\n/);
const headers = rows.shift().split(',').map(h => h.trim());
  const cells = line.split(',').map(c => c.trim());
  const obj = {};
  headers.forEach((h, i) => { obj[h] = cells[i] || ''; });
NEXT_PUBLIC_STRIPE_PRICE_STARTER=${results.find(x => x.sku === 'starter')?.priceId || ''}
NEXT_PUBLIC_STRIPE_PRICE_PRO=${results.find(x => x.sku === 'pro')?.priceId || ''}
NEXT_PUBLIC_STRIPE_PRICE_MASTER=${results.find(x => x.sku === 'master')?.priceId || ''}

console.log('Wrote env.output.txt with the price IDs. Paste them into .env.local and Vercel.');

const items = rows.map(parseRow);

const results = [];
for (const item of items) {
  const product = await stripe.products.create({
    name: item.name,
    description: item.description
  });
  const price = await stripe.prices.create({
    product: product.id,
    currency: item.currency || 'usd',
    unit_amount: parseInt(item.amount_cents, 10),
  });
  results.push({ name: item.name, priceId: price.id, sku: item.sku });
  console.log(`Created ${item.name} -> ${price.id}`);
}

// Create upgrades (flat $100 top-ups)
const createUpgrade = async (name, amount) => {
  const p = await stripe.products.create({ name });
  const price = await stripe.prices.create({ product: p.id, currency: 'usd', unit_amount: amount });
  return price.id;
};

const upgradeToProId = await createUpgrade('Upgrade: Starter → Professional', 10000);
const upgradeToMasterId = await createUpgrade('Upgrade: Professional → Master', 10000);

const bumpPrice = results.find(x => x.sku === 'order-bump');

const envHints = `
# Place these in your .env.local (and on Vercel)
NEXT_PUBLIC_STRIPE_PRICE_STARTER=${results.find(x=>x.sku==='starter')?.priceId || ''}
NEXT_PUBLIC_STRIPE_PRICE_PRO=${results.find(x=>x.sku==='pro')?.priceId || ''}
NEXT_PUBLIC_STRIPE_PRICE_MASTER=${results.find(x=>x.sku==='master')?.priceId || ''}
NEXT_PUBLIC_STRIPE_PRICE_BUMP=${bumpPrice?.priceId || ''}
NEXT_PUBLIC_STRIPE_PRICE_UPGRADE_TO_PRO=${upgradeToProId}
NEXT_PUBLIC_STRIPE_PRICE_UPGRADE_TO_MASTER=${upgradeToMasterId}
`;
fs.writeFileSync(path.join(process.cwd(), 'data', 'env.output.txt'), envHints.trim());
console.log('
Wrote env.output.txt with the price IDs. Paste them into .env.local and Vercel.');
