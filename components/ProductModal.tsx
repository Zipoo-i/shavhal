'use client';

import Image from 'next/image';
import { Product } from '@/types/product';
import { formatPrice } from '@/lib/format';
import { useCart } from '@/context/CartContext';
import { addOns } from '@/data/products';
import BottomSheet from './BottomSheet';
import Badge from './Badge';
import QuantityControl from './QuantityControl';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const { getQuantity, addItem, incrementItem, decrementItem } = useCart();

  if (!product) return null;
  const quantity = getQuantity(product.id);

  return (
    <BottomSheet open={!!product} onClose={onClose} ariaLabel={product.name}>
      <div className="product-sheet">
        <button
          type="button"
          className="product-sheet__close"
          aria-label="Close"
          onClick={onClose}
        >
          ×
        </button>

        <div className="product-sheet__photo">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="100vw"
            className="product-sheet__img"
          />
          {product.badge && (
            <div className="product-sheet__badge">
              <Badge type={product.badge} />
            </div>
          )}
        </div>

        <div className="product-sheet__content">
          <h2 className="product-sheet__title">{product.name}</h2>
          <p className="product-sheet__weight">{product.weight}</p>
          <p className="product-sheet__description">{product.description}</p>

          {product.ingredients && (
            <div className="product-sheet__row">
              <span className="product-sheet__label">Ingredients</span>
              <span className="product-sheet__value">{product.ingredients}</span>
            </div>
          )}
          {product.allergens && (
            <div className="product-sheet__row">
              <span className="product-sheet__label">Allergens</span>
              <span className="product-sheet__value">{product.allergens}</span>
            </div>
          )}
          {product.nutrition && (
            <div className="product-sheet__nutrition">
              <div className="nutrition-pill">
                <span className="nutrition-pill__value">{product.nutrition.calories}</span>
                <span className="nutrition-pill__label">kcal</span>
              </div>
              <div className="nutrition-pill">
                <span className="nutrition-pill__value">{product.nutrition.protein}g</span>
                <span className="nutrition-pill__label">protein</span>
              </div>
              <div className="nutrition-pill">
                <span className="nutrition-pill__value">{product.nutrition.fat}g</span>
                <span className="nutrition-pill__label">fat</span>
              </div>
              <div className="nutrition-pill">
                <span className="nutrition-pill__value">{product.nutrition.carbs}g</span>
                <span className="nutrition-pill__label">carbs</span>
              </div>
            </div>
          )}

          <div className="product-sheet__upsell">
            <p className="product-sheet__upsell-title">Add a drink?</p>
            <div className="product-sheet__upsell-list">
              {addOns.map((addOn) => (
                <button
                  key={addOn.id}
                  type="button"
                  className="upsell-chip"
                  onClick={() =>
                    addItem({
                      id: addOn.id,
                      name: addOn.name,
                      price: addOn.price,
                      image: '/images/cappuccino.png',
                      category: 'Coffee',
                      description: '',
                      weight: '',
                      badge: null,
                      available: true,
                    })
                  }
                >
                  {addOn.name} · {formatPrice(addOn.price)}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="product-sheet__footer">
          {quantity > 0 ? (
            <div className="product-sheet__stepper">
              <QuantityControl
                quantity={quantity}
                onIncrement={() => incrementItem(product.id)}
                onDecrement={() => decrementItem(product.id)}
              />
              <span className="product-sheet__stepper-total">
                {formatPrice(quantity * product.price)}
              </span>
            </div>
          ) : (
            <button
              type="button"
              className="product-sheet__cta"
              disabled={!product.available}
              onClick={() => addItem(product)}
            >
              {product.available
                ? `+ ${formatPrice(product.price)}`
                : 'Currently unavailable'}
            </button>
          )}
        </div>
      </div>
    </BottomSheet>
  );
}
