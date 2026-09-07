import { NextResponse } from 'next/server';
import { getProducts } from '@/lib/db';

// GET /api/products — the full menu catalog.
// Consumed today by the admin screen and available for any future client
// (a native app, a kiosk) that shouldn't have to import server-only code.
export async function GET() {
  const products = await getProducts();
  return NextResponse.json({ products });
}
