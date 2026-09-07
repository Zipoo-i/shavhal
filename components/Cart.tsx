'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useTable } from '@/context/TableContext';
import { formatPrice } from '@/lib/format';
import BottomSheet from './BottomSheet';
import QuantityControl from './QuantityControl';
import { Order } from '@/types/order';

interface CartProps {
  open: boolean;
  onClose: () => void;
  onOrderPlaced: (order: Order) => void;
}

export default function Cart({ open, onClose, onOrderPlaced }: CartProps) {
  const { items, total, incrementItem, decrementItem, clearCart } = useCart();
  const { table, label } = useTable();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handlePlaceOrder() {
    setSubmitting(true);
    setError(null);
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          table: table ?? 'unspecified',
          items: items.map((i) => ({
            productId: i.product.id,
            quantity: i.quantity,
          })),
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error ?? 'Could not place order');
      }

      clearCart();
      onOrderPlaced(data.order as Order);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not place order');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <BottomSheet open={open} onClose={onClose} ariaLabel="Your cart">
      <div className="cart-sheet">
        <div className="cart-sheet__header">
          <h2 className="cart-sheet__title">Your Order</h2>
          <button
            type="button"
            className="cart-sheet__close"
            aria-label="Close"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <p className="cart-sheet__table">{label}</p>

        {items.length === 0 ? (
          <p className="cart-sheet__empty">Your cart is empty.</p>
        ) : (
          <ul className="cart-sheet__list">
            {items.map(({ product, quantity }) => (
              <li key={product.id} className="cart-line">
                <div className="cart-line__photo">
                  <Image src={product.image} alt={product.name} fill sizes="64px" />
                </div>
                <div className="cart-line__info">
                  <span className="cart-line__name">{product.name}</span>
                  <span className="cart-line__price">{formatPrice(product.price)}</span>
                </div>
                <QuantityControl
                  quantity={quantity}
                  size="sm"
                  onIncrement={() => incrementItem(product.id)}
                  onDecrement={() => decrementItem(product.id)}
                />
              </li>
            ))}
          </ul>
        )}

        {items.length > 0 && (
          <div className="cart-sheet__footer">
            <div className="cart-sheet__total-row">
              <span>Total</span>
              <span className="cart-sheet__total-value">{formatPrice(total)}</span>
            </div>
            {error && <p className="cart-sheet__error">{error}</p>}
            <button
              type="button"
              className="cart-sheet__submit"
              disabled={submitting}
              onClick={handlePlaceOrder}
            >
              {submitting ? 'Placing order…' : 'Place Order'}
            </button>
          </div>
        )}
      </div>
    </BottomSheet>
  );
}
