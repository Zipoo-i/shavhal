'use client';

import { Product } from '@/types/product';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  onOpenProduct: (product: Product) => void;
  emptyMessage?: string;
}

export default function ProductGrid({
  products,
  onOpenProduct,
  emptyMessage = 'No dishes found. Try another search.',
}: ProductGridProps) {
  if (products.length === 0) {
    return <p className="product-grid__empty">{emptyMessage}</p>;
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onOpen={onOpenProduct} />
      ))}
    </div>
  );
}
