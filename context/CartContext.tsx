'use client';

import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  ReactNode,
} from 'react';
import { Product } from '@/types/product';
import { CartItem } from '@/types/order';

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: 'ADD'; product: Product }
  | { type: 'INCREMENT'; productId: number }
  | { type: 'DECREMENT'; productId: number }
  | { type: 'REMOVE'; productId: number }
  | { type: 'CLEAR' };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD': {
      const existing = state.items.find(
        (i) => i.product.id === action.product.id
      );
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.product.id === action.product.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
      return { items: [...state.items, { product: action.product, quantity: 1 }] };
    }
    case 'INCREMENT': {
      return {
        items: state.items.map((i) =>
          i.product.id === action.productId
            ? { ...i, quantity: i.quantity + 1 }
            : i
        ),
      };
    }
    case 'DECREMENT': {
      return {
        items: state.items
          .map((i) =>
            i.product.id === action.productId
              ? { ...i, quantity: i.quantity - 1 }
              : i
          )
          .filter((i) => i.quantity > 0),
      };
    }
    case 'REMOVE': {
      return { items: state.items.filter((i) => i.product.id !== action.productId) };
    }
    case 'CLEAR':
      return { items: [] };
    default:
      return state;
  }
}

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  total: number;
  getQuantity: (productId: number) => number;
  addItem: (product: Product) => void;
  incrementItem: (productId: number) => void;
  decrementItem: (productId: number) => void;
  removeItem: (productId: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const value = useMemo<CartContextValue>(() => {
    const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0);
    const total = state.items.reduce(
      (sum, i) => sum + i.quantity * i.product.price,
      0
    );
    return {
      items: state.items,
      itemCount,
      total,
      getQuantity: (productId) =>
        state.items.find((i) => i.product.id === productId)?.quantity ?? 0,
      addItem: (product) => dispatch({ type: 'ADD', product }),
      incrementItem: (productId) => dispatch({ type: 'INCREMENT', productId }),
      decrementItem: (productId) => dispatch({ type: 'DECREMENT', productId }),
      removeItem: (productId) => dispatch({ type: 'REMOVE', productId }),
      clearCart: () => dispatch({ type: 'CLEAR' }),
    };
  }, [state]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return ctx;
}
