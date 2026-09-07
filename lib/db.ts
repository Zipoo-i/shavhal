import { Product } from '@/types/product';
import { Order, OrderStatus, CartItem } from '@/types/order';
import { products as seedProducts } from '@/data/products';

/**
 * Mock data layer for phase 6.
 *
 * Function names and shapes here (getProducts, createOrder, listOrders,
 * updateOrderStatus) are deliberately what a Postgres/Supabase-backed
 * version would expose too, so `app/api/**` route handlers and server
 * components never have to change when the real backend lands — only this
 * file gets swapped for actual `supabase.from(...)` / SQL calls.
 *
 * CAVEAT: this store lives in a Node global so it survives Next.js dev
 * hot-reloads, but it is still just process memory. It resets on every
 * server restart and is NOT shared across serverless instances in
 * production. Don't ship this file as-is — it exists to unblock frontend
 * work on a realistic API shape before the real database is wired up.
 */

interface Store {
  products: Product[];
  orders: Order[];
}

const globalForStore = globalThis as unknown as {
  __shaukhalovesStore?: Store;
};

function getStore(): Store {
  if (!globalForStore.__shaukhalovesStore) {
    globalForStore.__shaukhalovesStore = {
      products: seedProducts,
      orders: [],
    };
  }
  return globalForStore.__shaukhalovesStore;
}

export async function getProducts(): Promise<Product[]> {
  return getStore().products;
}

export async function getProduct(id: number): Promise<Product | undefined> {
  return getStore().products.find((p) => p.id === id);
}

export interface CreateOrderInput {
  table: string;
  items: { productId: number; quantity: number }[];
}

export async function createOrder(input: CreateOrderInput): Promise<Order> {
  const store = getStore();

  const items: CartItem[] = input.items
    .map(({ productId, quantity }) => {
      const product = store.products.find((p) => p.id === productId);
      if (!product || !Number.isFinite(quantity) || quantity <= 0) return null;
      return { product, quantity };
    })
    .filter((item): item is CartItem => item !== null);

  if (items.length === 0) {
    throw new Error('Cannot place an order with no valid items');
  }

  const unavailable = items.find((i) => !i.product.available);
  if (unavailable) {
    throw new Error(`${unavailable.product.name} is currently unavailable`);
  }

  // Total is always computed server-side from the catalog, never trusted
  // from the client, so a tampered request can't change what gets charged.
  const total = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  const order: Order = {
    id: `ORD-${Date.now().toString(36).toUpperCase()}`,
    table: input.table?.trim() || 'unspecified',
    items,
    total,
    createdAt: new Date().toISOString(),
    status: 'new',
  };

  store.orders.unshift(order);
  return order;
}

export async function listOrders(): Promise<Order[]> {
  return getStore().orders;
}

export async function getOrder(id: string): Promise<Order | undefined> {
  return getStore().orders.find((o) => o.id === id);
}

export async function updateOrderStatus(
  id: string,
  status: OrderStatus
): Promise<Order | undefined> {
  const store = getStore();
  const order = store.orders.find((o) => o.id === id);
  if (order) order.status = status;
  return order;
}
