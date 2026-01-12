import { create } from "zustand";

import { persist } from "zustand/middleware";

const API_BASE = "https://dummyjson.com";

export const useStore = create(
  persist(
    (set, get) => ({
      // Auth state
      user: null,
      token: null,
      authLoading: false,
      authError: null,

      // Users state
      users: [],
      usersTotal: 0,
      usersLoading: false,
      usersError: null,
      usersQuery: { limit: 10, skip: 0, search: "" },
      usersCache: {},

      // Products state
      products: [],
      productsTotal: 0,
      productsLoading: false,
      productsError: null,
      productsQuery: { limit: 10, skip: 0, search: "", category: "" },
      productsCache: {},
      categories: [],
      categoriesLoading: false,
      categoriesError: null,

      // Auth actions
      login: async (username, password) => {
        set({ authLoading: true, authError: null });
        try {
          const res = await fetch(`${API_BASE}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
            // credentials: "include",
          });

          if (!res.ok) {
            const err = await res.json();
            const message = err?.message || "Email or password incorrect";
            throw new Error(message);
          }

          const data = await res.json();
          set({ user: data, token: data.token, authLoading: false });
          return data;
        } catch (error) {
          set({
            authLoading: false,
            authError: error.message || "Login failed",
          });
          throw error;
        }
      },

      logout: () => {
        set({ user: null, token: null });
      },

      // Users actions
      // Cache-first pagination: avoid repeat network calls for the same page/search combo
      fetchUsers: async ({ limit = 10, skip = 0, search = "" } = {}) => {
        const cacheKey = `${limit}-${skip}-${search}`;
        const { usersCache } = get();

        if (usersCache[cacheKey]) {
          const cached = usersCache[cacheKey];
          set({
            users: cached.users,
            usersTotal: cached.total,
            usersQuery: { limit, skip, search },
          });
          return cached;
        }

        set({ usersLoading: true, usersError: null });
        try {
          const url = search
            ? `${API_BASE}/users/search?q=${encodeURIComponent(
                search
              )}&limit=${limit}&skip=${skip}`
            : `${API_BASE}/users?limit=${limit}&skip=${skip}`;
          const res = await fetch(url);
          if (!res.ok) throw new Error("Failed to load users");
          const data = await res.json();

          set((state) => ({
            users: data.users,
            usersTotal: data.total,
            usersQuery: { limit, skip, search },
            usersLoading: false,
            usersCache: {
              ...state.usersCache,
              [cacheKey]: { users: data.users, total: data.total },
            },
          }));

          return data;
        } catch (error) {
          set({
            usersLoading: false,
            usersError: error.message || "Error loading users",
          });
          throw error;
        }
      },

      fetchUserById: async (id) => {
        const res = await fetch(`${API_BASE}/users/${id}`);
        if (!res.ok) throw new Error("Failed to load user");
        return res.json();
      },

      // Products actions
      // Cache-first pagination + filters: prevents re-fetching identical slices
      fetchProducts: async ({
        limit = 10,
        skip = 0,
        search = "",
        category = "",
      } = {}) => {
        const cacheKey = `${limit}-${skip}-${search}-${category}`;
        const { productsCache } = get();

        if (productsCache[cacheKey]) {
          const cached = productsCache[cacheKey];
          set({
            products: cached.products,
            productsTotal: cached.total,
            productsQuery: { limit, skip, search, category },
          });
          return cached;
        }

        set({ productsLoading: true, productsError: null });
        try {
          let url = `${API_BASE}/products?limit=${limit}&skip=${skip}`;
          if (search) {
            url = `${API_BASE}/products/search?q=${encodeURIComponent(
              search
            )}&limit=${limit}&skip=${skip}`;
          } else if (category) {
            url = `${API_BASE}/products/category/${encodeURIComponent(
              category
            )}?limit=${limit}&skip=${skip}`;
          }

          const res = await fetch(url);
          if (!res.ok) throw new Error("Failed to load products");
          const data = await res.json();

          set((state) => ({
            products: data.products,
            productsTotal: data.total,
            productsQuery: { limit, skip, search, category },
            productsLoading: false,
            productsCache: {
              ...state.productsCache,
              [cacheKey]: { products: data.products, total: data.total },
            },
          }));

          return data;
        } catch (error) {
          set({
            productsLoading: false,
            productsError: error.message || "Error loading products",
          });
          throw error;
        }
      },

      fetchProductById: async (id) => {
        const res = await fetch(`${API_BASE}/products/${id}`);
        if (!res.ok) throw new Error("Failed to load product");
        return res.json();
      },

      fetchCategories: async () => {
        set({ categoriesLoading: true, categoriesError: null });
        try {
          const res = await fetch(`${API_BASE}/products/category-list`);
          if (!res.ok) throw new Error("Failed to load categories");
          const data = await res.json();
          set({ categories: data, categoriesLoading: false });
          return data;
        } catch (error) {
          set({
            categoriesLoading: false,
            categoriesError: error.message || "Error loading categories",
          });
          throw error;
        }
      },
    }),
    {
      name: "gde-store",
      partialize: (state) => ({ user: state.user, token: state.token }),
    }
  )
);
