export interface Category {
  id: string;
  label: string;
}

// Order here defines the order of the horizontal category bar.
// "popular" is a virtual category: it filters products by badge, not by
// their real category field (see data/products.ts).
export const categories: Category[] = [
  { id: 'popular', label: 'Popular' },
  { id: 'Breakfast', label: 'Breakfast' },
  { id: 'Soups', label: 'Soups' },
  { id: 'Meat', label: 'Meat' },
  { id: 'Fish', label: 'Fish' },
  { id: 'Fast Food', label: 'Fast Food' },
  { id: 'Salads', label: 'Salads' },
  { id: 'Pasta', label: 'Pasta' },
  { id: 'Pizza', label: 'Pizza' },
  { id: 'Rolls', label: 'Rolls' },
  { id: 'Cold Dishes', label: 'Cold Dishes' },
  { id: 'Coffee', label: 'Coffee' },
  { id: 'Tea', label: 'Tea' },
  { id: 'Lemonades', label: 'Lemonades' },
  { id: 'Milkshakes', label: 'Milkshakes' },
  { id: 'Fresh Juice', label: 'Fresh Juice' },
  { id: 'Desserts', label: 'Desserts' },
  { id: 'Cakes', label: 'Cakes' },
];
