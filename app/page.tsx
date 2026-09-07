'use client';

import { Suspense, useMemo, useState } from 'react';
import { TableProvider } from '@/context/TableContext';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import CategoryBar from '@/components/CategoryBar';
import ProductGrid from '@/components/ProductGrid';
import ProductModal from '@/components/ProductModal';
import CartBar from '@/components/CartBar';
import Cart from '@/components/Cart';
import OrderConfirmation from '@/components/OrderConfirmation';
import { products } from '@/data/products';
import { categories } from '@/data/categories';
import { Product } from '@/types/product';
import { Order } from '@/types/order';

export default function Page() {
  // useSearchParams (used inside TableProvider) requires a Suspense
  // boundary so the route can still prerender.
  return (
    <Suspense fallback={null}>
      <TableProvider>
        <MenuApp />
      </TableProvider>
    </Suspense>
  );
}

function MenuApp() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('popular');
  const [openProduct, setOpenProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  const filteredProducts = useMemo(() => {
    const trimmed = query.trim().toLowerCase();

    return products.filter((p) => {
      const matchesCategory =
        activeCategory === 'popular'
          ? p.badge === 'popular' || p.badge === 'hit'
          : p.category === activeCategory;

      if (!trimmed) return matchesCategory;

      // While actively searching, search spans the whole menu rather than
      // just the selected category, so results aren't hidden unexpectedly.
      const matchesQuery =
        p.name.toLowerCase().includes(trimmed) ||
        p.category.toLowerCase().includes(trimmed) ||
        p.description.toLowerCase().includes(trimmed);

      return matchesQuery;
    });
  }, [query, activeCategory]);

  if (completedOrder) {
    return (
      <OrderConfirmation
        order={completedOrder}
        onClose={() => setCompletedOrder(null)}
      />
    );
  }

  return (
    <div className="app">
      <Header />

      <div className="app__controls">
        <SearchBar value={query} onChange={setQuery} />
        {!query && (
          <CategoryBar
            categories={categories}
            activeId={activeCategory}
            onSelect={setActiveCategory}
          />
        )}
      </div>

      <main className="app__main">
        <ProductGrid products={filteredProducts} onOpenProduct={setOpenProduct} />
      </main>

      <ProductModal product={openProduct} onClose={() => setOpenProduct(null)} />

      <Cart
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onOrderPlaced={(order) => {
          setCartOpen(false);
          setCompletedOrder(order);
        }}
      />

      <CartBar onOpenCart={() => setCartOpen(true)} />
    </div>
  );
}
