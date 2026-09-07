'use client';

import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/format';

interface CartBarProps {
  onOpenCart: () => void;
}

export default function CartBar({ onOpenCart }: CartBarProps) {
  const { itemCount, total } = useCart();

  if (itemCount === 0) return null;

  const itemWord = itemCount === 1 ? 'item' : 'items';

  return (
    <div className="cart-bar-wrap">
      <button type="button" className="cart-bar" onClick={onOpenCart}>
        <span className="cart-bar__summary">
          {itemCount} {itemWord} · {formatPrice(total)}
        </span>
        <span className="cart-bar__cta">View Cart</span>
      </button>
    </div>
  );
}
