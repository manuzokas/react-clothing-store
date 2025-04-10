// components/products/ProductSizes.tsx
import { cn } from "@/utils/utils";
import { useTheme } from "@/hooks/useTheme";

interface ProductSizesProps {
  sizes: string[];
  selectedSize: string;
  onSelectSize: (size: string) => void;
}

export default function ProductSizes({
  sizes,
  selectedSize,
  onSelectSize,
}: ProductSizesProps) {
    const { theme } = useTheme();
  return (
    <div className="mt-4">
      <h3
        className={cn(
          "text-sm font-medium",
          theme === "dark" ? "text-gray-800" : "text-gray-700"
        )}
      >
        Select Size
      </h3>
      <div className="flex gap-2 mt-2">
        {sizes.map((size) => (
          <button
            key={size}
            className={`w-6 h-6 md:w-8 md:h-8 border rounded-lg text-[12px] md:text-sm font-medium transition ${
              selectedSize === size
                ? theme === "dark"
                  ? "text-black border-black"
                  : "text-black border-black"
                : theme === "dark"
                ? "border-gray-500 text-gray-900 hover:border-white"
                : "border-gray-300 text-gray-700 hover:border-black"
            }`}
            onClick={() => onSelectSize(size)}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
