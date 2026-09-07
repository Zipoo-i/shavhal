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

  async function handlePlaceOrder() {
    setSubmitting(true);
    // Mock checkout handler for phase 1 — shaped to map directly onto a
    // future POST /api/orders call once the backend exists (see §22).
    const order: Order = {
      id: `ORD-${Date.now().toString(36).toUpperCase()}`,
      table: table ?? 'unspecified',
      items,
      total,
      createdAt: new Date().toISOString(),
      status: 'new',
    };
    await new Promise((resolve) => setTimeout(resolve, 500));
    clearCart();
    setSubmitting(false);
    onOrderPlaced(order);
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
