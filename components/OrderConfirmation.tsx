'use client';

import { useEffect, useState } from 'react';
import { Order, OrderStatus } from '@/types/order';

interface OrderConfirmationProps {
  order: Order;
  onClose: () => void;
}

const STEPS: { id: OrderStatus; label: string }[] = [
  { id: 'accepted', label: 'Accepted' },
  { id: 'cooking', label: 'Cooking' },
  { id: 'ready', label: 'Ready' },
];

const POLL_INTERVAL_MS = 5000;

// Polls GET /api/orders/:id so this tracker reflects real status changes
// once staff (phase 7's kitchen panel) start moving the order along —
// no markup changes needed when that lands, just a real PATCH somewhere.
export default function OrderConfirmation({ order: initialOrder, onClose }: OrderConfirmationProps) {
  const [order, setOrder] = useState(initialOrder);

  useEffect(() => {
    if (order.status === 'ready' || order.status === 'completed') return;

    let cancelled = false;
    const timer = setInterval(async () => {
      try {
        const response = await fetch(`/api/orders/${order.id}`);
        if (!response.ok || cancelled) return;
        const data = await response.json();
        if (!cancelled) setOrder(data.order as Order);
      } catch {
        // Silently ignore transient network errors — the next poll will retry.
      }
    }, POLL_INTERVAL_MS);

    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, [order.id, order.status]);

  const activeIndex = STEPS.findIndex((s) => s.id === order.status);

  return (
    <div className="confirmation">
      <div className="confirmation__icon" aria-hidden="true">
        💗
      </div>
      <h1 className="confirmation__title">Order Received</h1>
      <p className="confirmation__message">Your order has been sent to our staff.</p>
      <p className="confirmation__table">
        Table #{order.table === 'unspecified' ? '—' : order.table}
      </p>

      <ol className="confirmation__steps">
        {STEPS.map((step, index) => (
          <li
            key={step.id}
            className={`confirmation__step${
              index <= activeIndex ? ' confirmation__step--active' : ''
            }`}
          >
            <span className="confirmation__step-dot" aria-hidden="true" />
            {step.label}
          </li>
        ))}
      </ol>

      <p className="confirmation__order-id">Order {order.id}</p>

      <button type="button" className="confirmation__cta" onClick={onClose}>
        Back to Menu
      </button>
    </div>
  );
}
