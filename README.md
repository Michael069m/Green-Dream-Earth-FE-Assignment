## 🌿 Green Dream Earth – Admin UI

A modern, responsive dashboard built for speed and clarity.

This project is a technical demonstration of a high-performance admin interface. Built with Next.js, Material UI (MUI), and Zustand, it provides a seamless experience for managing users and products, featuring smart data caching and a refined Earth-tone design language.

## 🚀 Getting Started

Want to see it in action? You can be up and running in less than a minute.

**Install dependencies**

```bash
npm install
```

**Start the engine**

```bash
npm run dev
# http://localhost:3000
```

## 🔑 Demo Credentials

Log in with these credentials to access the protected dashboard:

- Username: `emilys`
- Password: `emilyspass`

## ✨ What’s Inside?

### 🧠 Smart State & Caching

- Zustand with localStorage persistence keeps you signed in across refreshes.
- Cache-first list fetching avoids repeat calls; revisiting a page uses cached data for instant loads.

### 📱 Designed for Every Device

- Desktop: permanent sidebar for quick navigation.
- Mobile: hamburger + temporary drawer; collapse is disabled on mobile to avoid broken layouts.
- Responsive grids: dashboard shortcuts stack (`xs=12 md=6`); products use CSS grid (1/2/3/4 columns at xs/sm/md/lg).

### 🛠️ Built for Stability

- Auth guards protect routes; logged-in users are redirected away from `/login`.
- Clear errors: login shows “Email or password incorrect”; list errors render a retryable error state.

## 🏗️ Architecture

- Next.js (Pages Router) with SSR for detail pages.
- MUI with custom forest/earth palette and rounded shapes.
- DummyJSON API for users/products data.

## Project Map

- `/src/pages` – Views (Login, Dashboard, Users, Products).
- `/src/components` – Building blocks (layout, pagination, search, skeletons, error state).
- `/src/store/useStore.js` – Auth logic, data fetching, and caching.
- `/src/theme/theme.js` – MUI theme setup.

## Scripts

- `npm run dev` – start dev server
- `npm run build` – production build
- `npm run start` – run built app

## 📝 Environment Variables

- None required for this demo; DummyJSON is public and tokens are stored via Zustand persist in localStorage.
- If you move to a secure token backend, add `.env.local` (e.g., `API_URL`, `AUTH_TOKEN`) and update `src/store/useStore.js`.

## Notes
### 🧠 State Management: Why Zustand?
For this project, I chose Zustand over other libraries like Redux for several key reasons:
Simplicity & Less Boilerplate: Unlike Redux, which requires actions, reducers, and dispatchers, Zustand allows for a more concise and readable store definition.
Small Footprint: It is a lightweight library (approx. 1KB), which is ideal for maintaining high performance in a medium-sized application.
Built-in Async Actions: Handling API calls directly within the store is straightforward, making the data fetching logic clean and modular.
Middlewares (Persist): The ease of integrating persist middleware made implementing a persistent authentication session (via localStorage) seamless.
Performance: It uses a simplified pub/sub model, ensuring components only re-render when the specific state they subscribe to actually changes.
- Auth and caches are persisted locally; logout clears auth.
- Pagination and filters are passed as query params and cached per page/filter.
