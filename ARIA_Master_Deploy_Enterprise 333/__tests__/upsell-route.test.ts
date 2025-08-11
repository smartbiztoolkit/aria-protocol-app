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

describe('POST /api/upsell', () => {
  beforeEach(() => {
    jest.resetModules();
    createSessionMock.mockClear();
    process.env.STRIPE_SECRET_KEY = 'sk_test';
    process.env.NEXT_PUBLIC_SITE_URL = 'https://example.com';
    process.env.NEXT_PUBLIC_STRIPE_PRICE_UPGRADE_TO_PRO = 'price_pro';
    process.env.NEXT_PUBLIC_STRIPE_PRICE_UPGRADE_TO_MASTER = 'price_master';
  });

  it('creates session for pro-upgrade offer', async () => {
    const { POST } = await import('@/app/api/upsell/route');

    const body = { offer: 'pro-upgrade' };
    const req = { json: async () => body } as unknown as NextRequest;

    await POST(req);

    expect(createSessionMock).toHaveBeenCalledWith(
      expect.objectContaining({
        line_items: [{ price: 'price_pro', quantity: 1 }],
      }),
    );
  });

  it('creates session for master-upgrade offer', async () => {
    const { POST } = await import('@/app/api/upsell/route');

    const body = { offer: 'master-upgrade' };
    const req = { json: async () => body } as unknown as NextRequest;

    await POST(req);

    expect(createSessionMock).toHaveBeenCalledWith(
      expect.objectContaining({
        line_items: [{ price: 'price_master', quantity: 1 }],
      }),
    );
  });

  it('returns 400 for invalid offer', async () => {
    const { POST } = await import('@/app/api/upsell/route');

    const body = { offer: 'invalid' };
    const req = { json: async () => body } as unknown as NextRequest;

    const res = await POST(req);

    expect(res.status).toBe(400);
    expect(createSessionMock).not.toHaveBeenCalled();
  });
});

