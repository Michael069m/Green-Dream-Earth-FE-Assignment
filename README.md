## Green Dream Earth – Admin UI (Next.js + MUI + Zustand)

Responsive admin dashboard using Next.js (Pages router), Material UI, and Zustand with persist/cache for DummyJSON users/products.

## Quick start

```bash
npm install
npm run dev
# http://localhost:3000
```

## Environment

- No environment variables are required. Auth tokens are stored via Zustand persist (localStorage). If you later switch to a secure token backend, add the necessary secrets to a `.env.local` file (e.g., `API_URL` or `AUTH_TOKEN`) and update `src/store/useStore.js` accordingly.

### Demo login

- Username: `emilys`
- Password: `emilyspass`

## Key features

- Auth with persisted session (Zustand + localStorage); login redirect and protected routes.
- Responsive layout: desktop shows permanent sidebar; mobile shows hamburger + temporary drawer (collapse disabled on mobile).
- Dashboard with stats, recent users table, and shortcut cards.
- Users/products lists with search, pagination, category filter, and cached pages to avoid repeat fetches.
- Detail pages via `getServerSideProps` for server-rendered fetch.

## Project structure

- `src/pages` – Next.js Pages router (login, dashboard, users, products).
- `src/components` – Layout, shared UI (search, pagination, skeletons, error state).
- `src/store/useStore.js` – Zustand store with persist, auth, users/products/category fetch + cache.
- `src/theme/theme.js` – MUI theme setup.

## Scripts

- `npm run dev` – start dev server
- `npm run build` – production build
- `npm run start` – run built app

## Auth & routing

- Login required for all routes except `/login`. Auth guard waits for persist hydration to avoid redirect loops.
- Successful login redirects to `/dashboard`; already-authenticated users hitting `/login` are redirected.
- Logout clears store and returns to `/login`.

## Data & caching

- API: DummyJSON (`https://dummyjson.com`).
- Pagination and filters are passed as query params; caches keyed by `limit-skip-search[-category]`.
- Cache-first reads prevent repeat network calls for the same page/filter combo; persisted auth uses localStorage.

## Responsive behavior

- Sidebar: permanent on `md+`; temporary drawer with hamburger on `sm`/mobile; collapse toggle hidden on mobile.
- Dashboard shortcuts: `xs=12 md=6` so they stack on mobile.
- Products grid: CSS grid 1/2/3/4 columns at `xs/sm/md/lg`.

## Error handling

- Login failures show “Email or password incorrect.”
- List fetch errors render an error state with retry.

## Design tokens

- Custom MUI palette (forest/earth tones), rounded shapes, responsive typography.

## Notes

- No environment variables required; all endpoints public DummyJSON.
- If you change API credentials/URLs, update `src/store/useStore.js`.
