import { lazy, Suspense } from "react";
import { createRoutesFromElements, Route } from "react-router-dom";
import { ProtectedRoute } from "@/components/protectedRoute";
import { Layout } from "@/components/layout/Layout";
import { App } from "@/App";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

// Lazy loading para as páginas
const HomePage = lazy(() => import("@/pages/HomePage"));
const DashboardPage = lazy(() => import("@/pages/DasboardPage"));
const LoginPage = lazy(() => import("@/pages/LoginPage"));
const RegisterPage = lazy(() => import("@/pages/RegisterPage"));
const ListingPage = lazy(() => import("@/pages/ListingPage"));
const ProductPage = lazy(() => import("@/pages/ProductPage"));
const CartPage = lazy(() => import("@/pages/CartPage"));
const CheckoutPage = lazy(() => import("@/pages/CheckoutPage"));
const SucessfulOrder = lazy(() => import("@/pages/SuccessfulOrder"));
const ProfilePage = lazy(() => import("@/pages/ProfilePage"));
const OAuthCallback = lazy(() => import("@/components/oAuth/OAuthCallback"));
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const ForgotPasswordPage = lazy(() => import("@/pages/ForgotPasswordPage"));
const ResetPasswordPage = lazy(() => import("@/pages/ResetPasswordPage"));
const ResetPasswordSuccessPage = lazy(() => import("@/pages/ResetPasswordSuccessPage"));
const NotFound = lazy(() => import("@/pages/NotFoundPage"));
const ForbiddenPage = lazy(() => import("@/pages/ForbiddenPage"));

export const routes = createRoutesFromElements(
  <Route element={<App />}>
    {/* Rotas com Layout (Navbar + Footer) */}
    <Route element={<Layout />}>
      <Route
        path="/"
        element={
          <Suspense fallback={<LoadingSpinner fullScreen />}>
            <HomePage />
          </Suspense>
        }
      />
      <Route
        path="/listing"
        element={
          <Suspense fallback={<LoadingSpinner fullScreen />}>
            <ListingPage />
          </Suspense>
        }
      />
      <Route
        path="/cart"
        element={
          <Suspense fallback={<LoadingSpinner fullScreen />}>
            <CartPage />
          </Suspense>
        }
      />
      <Route
        path="/sign-in"
        element={
          <Suspense fallback={<LoadingSpinner fullScreen />}>
            <LoginPage />
          </Suspense>
        }
      />
      <Route
        path="/register"
        element={
          <Suspense fallback={<LoadingSpinner fullScreen />}>
            <RegisterPage />
          </Suspense>
        }
      />

      {/* Rota para callback do OAuth */}
      <Route
        path="/oauth-callback"
        element={
          <Suspense fallback={<LoadingSpinner fullScreen />}>
            <OAuthCallback />
          </Suspense>
        }
      />
      
      {/* Rota para redefinição de senha */}
      <Route
        path="/forgot-password"
        element={
          <Suspense fallback={<LoadingSpinner fullScreen />}>
            <ForgotPasswordPage />
          </Suspense>
        }
      />

      {/* Rota para redefinição de senha */}
      <Route
        path="/reset-password"
        element={
          <Suspense fallback={<LoadingSpinner fullScreen />}>
            <ResetPasswordPage />
          </Suspense>
        }
      />


      {/* Rota para sucesso de redefinição de senha */}
      <Route
        path="/reset-password-success"
        element={
          <Suspense fallback={<LoadingSpinner fullScreen />}>
            <ResetPasswordSuccessPage />
          </Suspense>
        }
      />
      
      {/* Rota para página não encontrada */}
      <Route
        path="/404"
        element={
          <Suspense fallback={<LoadingSpinner fullScreen />}>
            <NotFound />
          </Suspense>
        }
      />
      
      {/* Rota para página de acesso negado */}
      <Route
        path="/403"
        element={
          <Suspense fallback={<LoadingSpinner fullScreen />}>
            <ForbiddenPage />
          </Suspense>
        }
      />
      
      {/* Rotas protegidas */}
      <Route element={<ProtectedRoute />}>
        <Route
          path="/dashboard"
          element={
            <Suspense fallback={<LoadingSpinner fullScreen />}>
              <DashboardPage />
            </Suspense>
          }
        />
        <Route
          path="/product/:id"
          element={
            <Suspense fallback={<LoadingSpinner fullScreen />}>
              <ProductPage />
            </Suspense>
          }
        />
        <Route
          path="/checkout"
          element={
            <Suspense fallback={<LoadingSpinner fullScreen />}>
              <CheckoutPage />
            </Suspense>
          }
        />
        <Route
          path="/successful-order"
          element={
            <Suspense fallback={<LoadingSpinner fullScreen />}>
              <SucessfulOrder />
            </Suspense>
          }
        />
        <Route
          path="/profile"
          element={
            <Suspense fallback={<LoadingSpinner fullScreen />}>
              <ProfilePage />
            </Suspense>
          }
        />
      </Route>
    </Route>

    {/* Rota AboutPage */}
    <Route
      path="/about"
      element={
        <Suspense fallback={<LoadingSpinner fullScreen />}>
          <AboutPage />
        </Suspense>
      }
    />
  </Route>
);
