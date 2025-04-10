import { Link, useNavigate } from "react-router-dom";
import { ShoppingCartIcon } from "lucide-react";
import { useAppSelector } from "@/hooks/useRedux";
import { useAuth } from "@clerk/clerk-react";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/utils/utils";
import { useMemo } from "react";

export function CartIcon() {
  const cartItems = useAppSelector((state) => state.cart.items);
  console.log("🛒 Itens do carrinho recuperados:", cartItems);
  const { isSignedIn } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();

  // Usa useMemo para evitar cálculos desnecessários
  const itemCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const handleCartClick = (e: React.MouseEvent) => {
    if (!isSignedIn) {
      e.preventDefault();
      navigate("/sign-in"); // Redireciona corretamente para o login
    }
  };

  return (
    <Link
      to={isSignedIn ? "/cart" : "#"}
      onClick={handleCartClick}
      className={cn(
        "relative p-2 rounded-md transition-colors",
        theme === "dark" ? "text-white" : "text-black"
      )}
    >
      <ShoppingCartIcon
        className={cn(
          "h-5 w-5",
          theme === "dark" ? "text-white" : "text-black"
        )}
      />
      {itemCount > 0 && (
        <span
          className={cn(
            "absolute bottom-0 right-0 text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center",
            theme === "dark"
              ? "bg-red-500 text-blue-200"
              : "bg-red-500 text-white"
          )}
        >
          {itemCount}
        </span>
      )}
    </Link>
  );
}
