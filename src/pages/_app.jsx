import "../styles/globals.css";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { AppThemeProvider } from "@/theme/theme";
import { useStore } from "@/store/useStore";
import MainLayout from "@/components/MainLayout";

const PUBLIC_ROUTES = ["/login", "/_error", "/404"]; // allow these without auth

function AuthGuard({ children }) {
  const router = useRouter();
  const user = useStore((state) => state.user);
  const [hydrated, setHydrated] = useState(false);

  // Wait for Zustand persist hydration before enforcing auth, to avoid redirect loops.
  useEffect(() => {
    const hasHydrated = useStore.persist?.hasHydrated?.();
    if (hasHydrated) {
      setHydrated(true);
      return undefined;
    }
    const unsub = useStore.persist?.onFinishHydration?.(() => {
      setHydrated(true);
    });
    return unsub;
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const path = router.pathname;
    const isPublic = PUBLIC_ROUTES.includes(path);
    if (!isPublic && !user) {
      router.replace("/login");
    }
  }, [router, user, hydrated]);

  // While hydrating, render nothing to prevent flash/redirect loops.
  if (!hydrated) return null;

  return children;
}

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const layoutTitle = useMemo(() => {
    const path = router.pathname;
    if (path === "/dashboard") return "Dashboard";
    if (path.startsWith("/users")) return "Users";
    if (path.startsWith("/products")) return "Products";
    return "";
  }, [router.pathname]);

  const isAuthPage = router.pathname === "/login";

  const content = isAuthPage ? (
    <Component {...pageProps} />
  ) : (
    <MainLayout title={layoutTitle || "Dashboard"}>
      <Component {...pageProps} />
    </MainLayout>
  );

  return (
    <AppThemeProvider>
      <AuthGuard>{content}</AuthGuard>
    </AppThemeProvider>
  );
}
