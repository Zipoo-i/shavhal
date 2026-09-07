import { NextRequest, NextResponse } from 'next/server';
import { createOrder, listOrders, CreateOrderInput } from '@/lib/db';

// GET /api/orders — full order list, for the kitchen/staff view (phase 7).
export async function GET() {
  const orders = await listOrders();
  return NextResponse.json({ orders });
}

// POST /api/orders — place a new order from the guest-facing cart.
// Body: { table: string, items: { productId: number, quantity: number }[] }
// Prices are never taken from the client — createOrder() re-prices every
// line against the server-side catalog.
export async function POST(request: NextRequest) {
  let body: CreateOrderInput;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (!body || !Array.isArray(body.items) || body.items.length === 0) {
    return NextResponse.json(
      { error: 'Order must include at least one item' },
      { status: 400 }
    );
  }

  try {
    const order = await createOrder(body);
    return NextResponse.json({ order }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Could not place order';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
