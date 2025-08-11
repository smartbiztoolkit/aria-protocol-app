import Stripe from 'stripe';
import type { NextRequest } from 'next/server';

// Mock the Stripe SDK
const createSessionMock = jest.fn().mockResolvedValue({ url: 'https://example.com/session' });

jest.mock('stripe', () => {
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(() => ({
      checkout: { sessions: { create: createSessionMock } },
    })),
  };
});

describe('POST /api/checkout', () => {
  beforeEach(() => {
    jest.resetModules();
    createSessionMock.mockClear();
    process.env.STRIPE_SECRET_KEY = 'sk_test';
    process.env.NEXT_PUBLIC_SITE_URL = 'https://example.com';
    process.env.NEXT_PUBLIC_STRIPE_PRICE_BUMP = 'price_bump';
  });

  it('adds order bump line item when bump is true', async () => {
    const { POST } = await import('@/app/api/checkout/route');
    const { ORDER_BUMP_PRICE_ID } = await import('@/lib/products');

    const body = { priceId: 'base_price', bump: true, tier: '' };
    const req = { json: async () => body } as unknown as NextRequest;

    await POST(req);

    expect(createSessionMock).toHaveBeenCalledWith(
      expect.objectContaining({
        line_items: [
          { price: 'base_price', quantity: 1 },
          { price: ORDER_BUMP_PRICE_ID, quantity: 1 },
        ],
      }),
    );
  });

  it('includes tier value in success_url', async () => {
    const { POST } = await import('@/app/api/checkout/route');

    const body = { priceId: 'base_price', bump: false, tier: 'starter-kit' };
    const req = { json: async () => body } as unknown as NextRequest;

    await POST(req);

    expect(createSessionMock).toHaveBeenCalledWith(
      expect.objectContaining({
        success_url: expect.stringContaining('tier=starter-kit'),
      }),
    );
  });

  it('rejects unknown tier', async () => {
    const { POST } = await import('@/app/api/checkout/route');

    const body = { priceId: 'base_price', bump: false, tier: 'invalid-tier' };
    const req = { json: async () => body } as unknown as NextRequest;

    const res = await POST(req);

    expect(res.status).toBe(400);
    expect(createSessionMock).not.toHaveBeenCalled();
  });
});

