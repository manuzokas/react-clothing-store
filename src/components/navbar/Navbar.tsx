import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { NavLinks } from "@/components/navbar/NavLinks";
import { CartIcon } from "@/components/navbar/CartIcon";
import { UserIcon } from "@/components/navbar/UserIcon";
import { ThemeToggle } from "@/components/theme/index";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/utils/utils";
import logo from "@/assets/Logomark.png";
import MiniNavbarTop from "@/components/navbar/MiniNavbarTop";

export function Navbar({ onMenuToggle }: { onMenuToggle: () => void }) {
  const { theme } = useTheme();

  return (
    <div>
      <div className="fixed top-0 left-0 w-full z-50">
        <MiniNavbarTop />
      </div>

      <nav
        className={cn(
          "fixed top-8 left-0 w-full z-20 border-b shadow-xl h-18 backdrop-blur-md", // Alterado para fixed
          theme === "dark"
            ? "border-blue-500/30 text-blue-100"
            : "border-blue-500/30 text-black bg-white/100"
        )}
      >
        <div className="container px-4 sm:px-10 lg:px-15 xl:px-35">
          <div className="flex items-center justify-between h-18">
            <div className="flex items-center gap-4">
              <button
                type="button"
                className="md:hidden p-2 rounded-md hover:bg-blue-500/20 transition-colors duration-200"
                onClick={onMenuToggle}
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6 " />
              </button>
              <Link to="/" className="hidden sm:flex items-center gap-2">
                <img src={logo} alt="Logo" className="h-8 w-8" />
                <span
                  className={cn(
                    "flex text-lg sm:text-md lg:xl xl:text-2xl font-bold hover:text-gray-600 transition-colors duration-200",
                    theme === "dark" ? "text-blue-100" : "text-black"
                  )}
                >
                  eCompass
                </span>
              </Link>
            </div>

            <NavLinks className="hidden md:flex mx-6 space-x-5 xl:pr-10 2xl:pr-80" />

            <div className="flex items-center gap-6">
              <CartIcon />
              <UserIcon />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
