import type { NextRequest } from 'next/server';
import { grantAccess, sendEmail, tagCRM } from '@/lib/webhookHandlers';

jest.mock('@/lib/webhookHandlers', () => ({
  grantAccess: jest.fn(),
  sendEmail: jest.fn(),
  tagCRM: jest.fn(),
}));

const constructEventMock = jest.fn();

jest.mock('stripe', () => {
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(() => ({
      webhooks: { constructEvent: constructEventMock },
    })),
  };
});

describe('POST /api/webhook', () => {
  beforeEach(() => {
    jest.resetModules();
    constructEventMock.mockReset();
    (grantAccess as jest.Mock).mockReset();
    (sendEmail as jest.Mock).mockReset();
    (tagCRM as jest.Mock).mockReset();
    process.env.STRIPE_WEBHOOK_SECRET = 'whsec';
    process.env.STRIPE_SECRET_KEY = 'sk_test';
  });

  it('processes checkout.session.completed events', async () => {
    const session = { id: 'sess_123' } as any;
    constructEventMock.mockReturnValue({
      type: 'checkout.session.completed',
      data: { object: session },
    });

    const { POST } = await import('@/app/api/webhook/route');

    const req = {
      headers: new Headers({ 'stripe-signature': 'sig' }),
      arrayBuffer: async () => new ArrayBuffer(0),
    } as unknown as NextRequest;

    await POST(req);

    expect(grantAccess).toHaveBeenCalledWith(session);
    expect(sendEmail).toHaveBeenCalledWith(session);
    expect(tagCRM).toHaveBeenCalledWith(session);
  });

  it('ignores other events', async () => {
    constructEventMock.mockReturnValue({
      type: 'payment.failed',
      data: { object: { id: 'sess_456' } },
    });

    const { POST } = await import('@/app/api/webhook/route');

    const req = {
      headers: new Headers({ 'stripe-signature': 'sig' }),
      arrayBuffer: async () => new ArrayBuffer(0),
    } as unknown as NextRequest;

    await POST(req);

    expect(grantAccess).not.toHaveBeenCalled();
    expect(sendEmail).not.toHaveBeenCalled();
    expect(tagCRM).not.toHaveBeenCalled();
  });
});

