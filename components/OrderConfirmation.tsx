'use client';

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

// Static for phase 1 — the step list is already wired to OrderStatus so a
// future websocket/poll can flip `order.status` and this will light up
// live without any markup changes.
export default function OrderConfirmation({ order, onClose }: OrderConfirmationProps) {
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
