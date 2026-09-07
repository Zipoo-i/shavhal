import { getProducts, listOrders } from '@/lib/db';

// Phase 6 checkpoint: this now reads through the same lib/db layer the API
// routes use, instead of importing the static product array — proving the
// data plumbing end to end. Phase 7 will turn the order list below into an
// interactive kitchen panel (accept / cook / ready buttons calling
// PATCH /api/orders/:id, which already exists and works).
export default async function AdminPage() {
  const [products, orders] = await Promise.all([getProducts(), listOrders()]);

  return (
    <main style={{ padding: 24, fontFamily: 'sans-serif', maxWidth: 720, margin: '0 auto' }}>
      <h1 style={{ fontSize: 20, marginBottom: 4 }}>Admin (preview)</h1>
      <p style={{ color: '#777', fontSize: 14, marginBottom: 28 }}>
        Read-only for now. Phase 7 adds staff controls to accept orders and
        move them through Cooking → Ready here.
      </p>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 15, marginBottom: 10 }}>Live orders ({orders.length})</h2>
        {orders.length === 0 ? (
          <p style={{ color: '#777', fontSize: 13 }}>No orders placed yet this session.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '1px solid #E9E9EB' }}>
                <th style={{ padding: '8px 4px' }}>Order</th>
                <th style={{ padding: '8px 4px' }}>Table</th>
                <th style={{ padding: '8px 4px' }}>Items</th>
                <th style={{ padding: '8px 4px' }}>Total</th>
                <th style={{ padding: '8px 4px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} style={{ borderBottom: '1px solid #F0F0F2' }}>
                  <td style={{ padding: '8px 4px' }}>{order.id}</td>
                  <td style={{ padding: '8px 4px' }}>#{order.table}</td>
                  <td style={{ padding: '8px 4px' }}>
                    {order.items.reduce((sum, i) => sum + i.quantity, 0)}
                  </td>
                  <td style={{ padding: '8px 4px' }}>{order.total} ₽</td>
                  <td style={{ padding: '8px 4px', textTransform: 'capitalize' }}>
                    {order.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section>
        <h2 style={{ fontSize: 15, marginBottom: 10 }}>Menu catalog ({products.length})</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '1px solid #E9E9EB' }}>
              <th style={{ padding: '8px 4px' }}>Name</th>
              <th style={{ padding: '8px 4px' }}>Category</th>
              <th style={{ padding: '8px 4px' }}>Price</th>
              <th style={{ padding: '8px 4px' }}>Available</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} style={{ borderBottom: '1px solid #F0F0F2' }}>
                <td style={{ padding: '8px 4px' }}>{p.name}</td>
                <td style={{ padding: '8px 4px' }}>{p.category}</td>
                <td style={{ padding: '8px 4px' }}>{p.price} ₽</td>
                <td style={{ padding: '8px 4px' }}>{p.available ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
