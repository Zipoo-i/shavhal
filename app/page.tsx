import { Suspense } from 'react';
import { TableProvider } from '@/context/TableContext';
import MenuApp from '@/components/MenuApp';
import { getProducts } from '@/lib/db';

// Server component: the catalog is fetched here (from the same lib/db
// layer the API routes use) and streamed down as part of the initial HTML,
// so guests see the menu immediately instead of waiting on a client-side
// fetch + loading skeleton.
export default async function Page() {
  const products = await getProducts();

  return (
    // useSearchParams (used inside TableProvider) requires a Suspense
    // boundary so the route can still prerender.
    <Suspense fallback={null}>
      <TableProvider>
        <MenuApp products={products} />
      </TableProvider>
    </Suspense>
  );
}
