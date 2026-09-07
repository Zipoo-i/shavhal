import { NextRequest, NextResponse } from 'next/server';
import { getOrder, updateOrderStatus } from '@/lib/db';
import { OrderStatus } from '@/types/order';

const VALID_STATUSES: OrderStatus[] = [
  'new',
  'accepted',
  'cooking',
  'ready',
  'completed',
];

// GET /api/orders/:id — polled by the guest's confirmation screen so the
// Accepted → Cooking → Ready tracker reflects real status changes.
export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const order = await getOrder(params.id);
  if (!order) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  }
  return NextResponse.json({ order });
}

// PATCH /api/orders/:id — staff moves an order to the next status.
// Body: { status: 'new' | 'accepted' | 'cooking' | 'ready' | 'completed' }
// Not called from any UI yet — this is the endpoint phase 7's kitchen
// panel will call.
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  let body: { status?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (!body.status || !VALID_STATUSES.includes(body.status as OrderStatus)) {
    return NextResponse.json(
      { error: `status must be one of: ${VALID_STATUSES.join(', ')}` },
      { status: 400 }
    );
  }

  const order = await updateOrderStatus(params.id, body.status as OrderStatus);
  if (!order) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  }
  return NextResponse.json({ order });
}
