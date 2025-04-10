import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/navbar/Navbar";
import { MobileMenu } from "@/components/navbar/MobileMenu";
import Footer from "@/components/footer/Footer";

export function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div>
      <Navbar onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      <Outlet />

      <Footer />
    </div>
  );
}
