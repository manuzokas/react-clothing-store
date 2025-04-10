import { Link } from "react-router-dom";
import { cn } from "@/utils/utils";
import { useTheme } from "@/hooks/useTheme";

interface OrderSummaryProps {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  isSignedIn: boolean;
  title?: string;
  className?: string;
  titleClassName?: string;
  buttonClassName?: string;
  buttonText?: string;
  buttonOnClick?: () => void;
  primaryButtonText?: string;
  onPrimaryButtonClick?: () => void;
  children?: React.ReactNode;
}

export default function OrderSummary({
  subtotal,
  shipping,
  tax,
  total,
  isSignedIn,
  title = "Order Summary",
  className = "",
  titleClassName = "",
  buttonClassName = "",
  buttonText,
  buttonOnClick,
  primaryButtonText = "Checkout",
  onPrimaryButtonClick,
  children,
}: OrderSummaryProps) {
  const { theme } = useTheme();

  return (
    <div
      className={`w-120 h-full pb-10 md:py-0 lg:w-96 px-12 md:px-5 ${className}`}
    >
      <div
        className={cn(
          "p-10 rounded-sm border",
          theme === "dark"
            ? "bg-black border-gray-500 text-white"
            : "bg-white border-gray-200 text-black"
        )}
      >
        <div className="flex justify-between items-center mb-6">
          <h2
            className={cn(
              theme === "dark" ? "text-white" : "text-black",
              titleClassName
            )}
          >
            {title}
          </h2>
          {/* Renderiza o botão adicional apenas se buttonText e buttonOnClick forem fornecidos */}
          {buttonText && buttonOnClick && (
            <button
              onClick={buttonOnClick}
              className={cn(
                "px-4 py-2 rounded-sm text-sm font-normal transition",
                theme === "dark"
                  ? "border border-gray-400 text-white hover:bg-gray-500"
                  : "border border-black text-black hover:bg-black hover:text-white"
              )}
            >
              {buttonText}
            </button>
          )}
          {children}
        </div>

        {/* Subtotal */}
        <div className="flex justify-between mb-4 text-sm">
          <p className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>
            Subtotal
          </p>
          <p className="font-semibold">${subtotal.toFixed(2)}</p>
        </div>

        {/* Shipping */}
        <div className="flex justify-between mb-4 text-sm">
          <p className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>
            Shipping
          </p>
          <p className="font-semibold">${shipping.toFixed(2)}</p>
        </div>

        {/* Tax */}
        <div
          className={cn(
            "flex text-sm justify-between mb-4 border-b pb-5",
            theme === "dark" ? "border-gray-500" : "border-gray-200"
          )}
        >
          <p className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>
            Tax
          </p>
          <p className="font-semibold">${tax.toFixed(2)}</p>
        </div>

        {/* Total */}
        <div className="flex justify-between mb-6 text-sm">
          <p
            className={cn(
              "font-bold",
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            )}
          >
            Total
          </p>
          <p className="font-semibold">${total.toFixed(2)}</p>
        </div>

        {/* Botão de Checkout ou Login to Checkout */}
        {isSignedIn ? (
          <button
            onClick={onPrimaryButtonClick}
            className={cn(
              "md:w-full px-30 py-2 md:px-0 md:py-3 rounded-lg font-semibold transition block text-center",
              theme === "dark"
                ? "bg-white text-black hover:bg-gray-200"
                : "bg-black text-white hover:bg-gray-800",
              buttonClassName
            )}
            disabled={
              !onPrimaryButtonClick || buttonClassName.includes("opacity-50")
            }
          >
            {primaryButtonText}
          </button>
        ) : (
          <Link
            to="/sign-in"
            className={cn(
              "w-full py-3 rounded-lg font-semibold transition block text-center",
              theme === "dark"
                ? "bg-white text-black hover:bg-gray-200"
                : "bg-black text-white hover:bg-gray-800",
              buttonClassName
            )}
          >
            Login to Checkout
          </Link>
        )}

        {/* Link para Continuar Comprando */}
        <Link
          to="/listing"
          className={cn(
            "block text-center text-[14px] pt-10 underline",
            theme === "dark" ? "text-gray-300" : "text-black"
          )}
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
