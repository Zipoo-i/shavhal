# Shaukhaloves Cake — QR Menu & Ordering

A mobile-first QR menu and ordering web app, built to feel like an installed
food-ordering app rather than a restaurant website.

## Stack

Next.js 14 (App Router) · React 18 · TypeScript · plain CSS · PWA manifest.
No Tailwind, no Redux — cart state lives in a small React Context +
`useReducer` (see `context/CartContext.tsx`), which is enough for this
scope without pulling in Zustand.

## Getting started

This project's dependencies were **not** installed in the environment that
generated it (no network access there), so the first run needs one setup
step:

```bash
npm install
npm run dev
```

Then open `http://localhost:3000/?table=7` to simulate a guest scanning the
QR code at table 7. Opening the app with no `table` param (e.g. just
`http://localhost:3000`) shows "Table Unspecified" and the menu stays fully
browsable, per spec.

Every source file was written and syntax-checked by hand (via the
TypeScript compiler's parser) since `next build` couldn't be run without
package installation — so give `npm run build` a run once you've pulled
dependencies, and open an issue-style note back to me if anything doesn't
compile and I'll fix it directly.

## What's implemented (Phases 1–5)

- Table detection from `?table=` with session persistence, no re-prompting
- Header, live client-side search, single-row scrollable category bar
- Two-zone product cards (photo zone + white detail zone), badges, 2/3/4
  column responsive grid
- Product bottom sheet: full description, weight, ingredients, allergens,
  nutrition pills, non-intrusive drink upsells, `+ price` CTA
- In-card and in-sheet quantity steppers (`− 1 +`)
- Persistent floating cart bar respecting `env(safe-area-inset-bottom)`
- Cart sheet → mock "Place Order" → confirmation screen with an
  Accepted → Cooking → Ready step tracker (static for now, but wired to
  `Order.status` so a future live feed just flips the highlighted step)
- Web manifest + icons + theme color for standalone/installed feel
  (`public/manifest.json`, `public/icons/`)

## What's stubbed for later (Phases 6–7)

- `app/admin/page.tsx` is a placeholder read-only table over
  `data/products.ts`, proving the `Product`/`Order` types are already
  shaped for a real admin screen once there's a backend.
- `Cart.tsx`'s `handlePlaceOrder` builds an `Order` object locally — swap
  its body for a `POST /api/orders` call when Next.js API Routes /
  Supabase land, no other file needs to change.

## Product photos

`public/images/*.png` are generated placeholder tiles (soft brand-tinted
gradients), since no real food photography was supplied. Drop in real
photos under the same filenames referenced in `data/products.ts` — no code
changes needed.

## Project structure

```
app/            routes: /, /admin, layout, global styles
components/     Header, SearchBar, CategoryBar, ProductGrid, ProductCard,
                ProductModal, CartBar, Cart, QuantityControl, Badge,
                BottomSheet, OrderConfirmation
context/        CartContext (cart state), TableContext (table# from URL)
data/           products.ts, categories.ts (typed, admin-ready)
types/          product.ts, order.ts
public/         manifest.json, icons/, images/
```
