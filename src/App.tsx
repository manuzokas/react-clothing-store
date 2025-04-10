import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "@/providers/themeProvider";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import ScrollToTop from "@/components/ui/ScrollToTop";

export function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        <ScrollToTop />
        <Suspense fallback={<LoadingSpinner fullScreen />}>
          <Outlet />
        </Suspense>
      </div>
    </ThemeProvider>
  );
}
