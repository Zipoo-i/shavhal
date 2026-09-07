'use client';

import Image from 'next/image';
import { Product } from '@/types/product';
import { formatPrice } from '@/lib/format';
import { useCart } from '@/context/CartContext';
import Badge from './Badge';
import QuantityControl from './QuantityControl';

interface ProductCardProps {
  product: Product;
  onOpen: (product: Product) => void;
}

export default function ProductCard({ product, onOpen }: ProductCardProps) {
  const { getQuantity, addItem, incrementItem, decrementItem } = useCart();
  const quantity = getQuantity(product.id);

  return (
    <article
      className={`product-card${!product.available ? ' product-card--unavailable' : ''}`}
      onClick={() => onOpen(product)}
    >
      <div className="product-card__photo">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="product-card__img"
        />
        {product.badge && (
          <div className="product-card__badge">
            <Badge type={product.badge} />
          </div>
        )}
        {!product.available && (
          <div className="product-card__unavailable-tag">Sold out</div>
        )}
      </div>

      <div className="product-card__body">
        <h3 className="product-card__title">{product.name}</h3>
        <div className="product-card__footer">
          <span className="product-card__price">{formatPrice(product.price)}</span>

          {product.available &&
            (quantity > 0 ? (
              <QuantityControl
                quantity={quantity}
                size="sm"
                onIncrement={() => incrementItem(product.id)}
                onDecrement={() => decrementItem(product.id)}
              />
            ) : (
              <button
                type="button"
                className="product-card__add"
                aria-label={`Add ${product.name} to cart`}
                onClick={(e) => {
                  e.stopPropagation();
                  addItem(product);
                }}
              >
                +
              </button>
            ))}
        </div>
      </div>
    </article>
  );
}
