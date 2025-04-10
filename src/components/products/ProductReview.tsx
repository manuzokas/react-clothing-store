// components/products/ProductReviews.tsx
import { Star } from "lucide-react";
import { cn } from "@/utils/utils";
import { useTheme } from "@/hooks/useTheme";

interface ProductReviewsProps {
  inStock: boolean;
}

export default function ProductReviews({
  inStock,
}: ProductReviewsProps) {
    const { theme } = useTheme();
  return (
    <div className="flex flex-row items-center my-3">
      <div
        className={cn(
          "flex items-center gap-1 px-6 py-1 rounded-full",
          theme === "dark" ? "bg-gray-600" : "bg-gray-100"
        )}
      >
        <Star
          className={cn(
            "hover:text-yellow-300",
            theme === "dark" ? "text-yellow-400" : ""
          )}
          size={15}
        />
        <p className="text-[13px]">4.2 — 54 Reviews</p>
      </div>
      <div
        className={cn(
          "ml-2 px-3 py-1 rounded-full border-1",
          theme === "dark"
            ? "bg-gray-600 border-gray-500"
            : "bg-white border-gray-200"
        )}
      >
        <p className="text-[12px]">{inStock ? "IN STOCK" : "OUT OF STOCK"}</p>
      </div>
    </div>
  );
}
