import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ClerkProvider } from "@/lib/clerk";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routes } from "@/routes";
import "@/styles/index.css";
import { Provider } from "react-redux";
import { store, persistor } from "@/store";
import { PersistGate } from "redux-persist/integration/react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider>
      <Provider store={store}>
        <PersistGate loading={<LoadingSpinner />} persistor={persistor}>
          <RouterProvider router={router} />
        </PersistGate>
      </Provider>
    </ClerkProvider>
  </StrictMode>
);
