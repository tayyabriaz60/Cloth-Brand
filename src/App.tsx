import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense, type ReactNode } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { AppShell } from "./components/layout/AppShell";
import { AuthProvider, useAuth } from "./hooks/useAuth";
import { LanguageProvider } from "./i18n/LanguageContext";
import { ApiError } from "./lib/api/client";
import { PAGE_BG, ROUTES } from "./lib/constants";

const LoginPage = lazy(() => import("./pages/LoginPage").then((m) => ({ default: m.LoginPage })));
const DashboardPage = lazy(() => import("./pages/DashboardPage").then((m) => ({ default: m.DashboardPage })));
const ProductsPage = lazy(() => import("./pages/ProductsPage").then((m) => ({ default: m.ProductsPage })));
const ComingSoonPage = lazy(() =>
  import("./pages/ComingSoonPage").then((m) => ({ default: m.ComingSoonPage })),
);

const MAX_QUERY_RETRIES = 1;
const HTTP_CLIENT_ERROR_MIN = 400;
const HTTP_SERVER_ERROR_MIN = 500;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        const isClientError =
          error instanceof ApiError &&
          error.status >= HTTP_CLIENT_ERROR_MIN &&
          error.status < HTTP_SERVER_ERROR_MIN;
        return !isClientError && failureCount < MAX_QUERY_RETRIES;
      },
      refetchOnWindowFocus: false,
    },
  },
});

function RequireAuth({ children }: { children: ReactNode }) {
  const { token } = useAuth();
  return token ? children : <Navigate to={ROUTES.login} replace />;
}

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <AuthProvider>
          <BrowserRouter>
            <Suspense fallback={<div className="min-h-dvh" style={{ backgroundColor: PAGE_BG }} />}>
              <Routes>
                <Route path={ROUTES.login} element={<LoginPage />} />
                <Route
                  element={
                    <RequireAuth>
                      <AppShell />
                    </RequireAuth>
                  }
                >
                  <Route path={ROUTES.home} element={<DashboardPage />} />
                  <Route path={ROUTES.products} element={<ProductsPage />} />
                  <Route path={ROUTES.newBill} element={<ComingSoonPage />} />
                  <Route path={ROUTES.stock} element={<ComingSoonPage />} />
                  <Route path={ROUTES.udhaar} element={<ComingSoonPage />} />
                  <Route path={ROUTES.settings} element={<ComingSoonPage />} />
                </Route>
                <Route path="*" element={<Navigate to={ROUTES.home} replace />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </AuthProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}
