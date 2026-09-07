import { Product } from './product';

export interface CartItem {
  product: Product;
  quantity: number;
}

export type OrderStatus =
  | 'new'
  | 'accepted'
  | 'cooking'
  | 'ready'
  | 'completed';

export interface Order {
  id: string;
  table: string;
  items: CartItem[];
  total: number;
  createdAt: string;
  status: OrderStatus;
}
