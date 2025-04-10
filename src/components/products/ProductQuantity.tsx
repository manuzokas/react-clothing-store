// components/products/ProductQuantity.tsx
import { cn } from "@/utils/utils";
import { useTheme } from "@/hooks/useTheme";

interface ProductQuantityProps {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
}

export default function ProductQuantity({
  quantity,
  onDecrease,
  onIncrease,
}: ProductQuantityProps) {
    const { theme } = useTheme();
  return (
    <div className="flex flex-col w-25 md:w-fit mt-4">
      <h3
        className={cn(
          "text-sm font-medium",
          theme === "dark" ? "text-gray-800" : "text-gray-700"
        )}
      >
        Quantity
      </h3>
      <div
        className={cn(
          "flex h-10 md:h-full items-center justify-start mt-2 border rounded",
          theme === "dark" ? "border-gray-500" : "border-gray-300"
        )}
      >
        <button
          className={cn(
            "px-2 md:px-5 py-2 md:text-lg",
            theme === "dark" ? "text-gray-900" : "text-gray-700"
          )}
          onClick={onDecrease}
        >
          -
        </button>
        <span
          className={cn(
            "ml-3 md:ml-0 px-2 md:px-4 py-2 text-sm md:text-lg",
            theme === "dark" ? "text-black" : "text-black"
          )}
        >
          {quantity}
        </span>
        <button
          className={cn(
            "px-4 py-2 md:text-lg",
            theme === "dark" ? "text-gray-900" : "text-gray-700"
          )}
          onClick={onIncrease}
        >
          +
        </button>
      </div>
    </div>
  );
}
