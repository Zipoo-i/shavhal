import { products } from '@/data/products';

// Phase 1 placeholder only (see spec §22 "Future-proofing"). The real admin
// module — viewing/accepting orders, editing menu items — lands once
// Phase 6/7 wire this up to Next.js API Routes + a database. For now this
// just proves the existing `Product`/`Order` types are already shaped for
// that screen, without touching any of the guest-facing UI.
export default function AdminPage() {
  return (
    <main style={{ padding: 24, fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: 20, marginBottom: 4 }}>Admin (coming soon)</h1>
      <p style={{ color: '#777', fontSize: 14, marginBottom: 24 }}>
        This screen will let staff manage live orders and edit the menu once
        the backend (Phase 6) is connected. For now, here&apos;s the current
        static catalog that phase will replace with editable data.
      </p>
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
    </main>
  );
}
