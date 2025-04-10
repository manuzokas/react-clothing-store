// components/products/AddToCartButton.tsx
import { cn } from "@/utils/utils";
import { useTheme } from "@/hooks/useTheme";

interface AddToCartButtonProps {
  onClick: () => void;
  showFeedback: boolean;
}

export default function AddToCartButton({
  onClick,
  showFeedback,
}: AddToCartButtonProps) {
    const { theme } = useTheme();
  return (
    <>
      <button
        onClick={onClick}
        className={cn(
          "mt-6 w-80 py-3 rounded-sm text-sm font-medium transition",
          theme === "dark"
            ? "bg-gray-600 text-white hover:bg-gray-200"
            : "bg-black text-white hover:bg-gray-700"
        )}
      >
        Add to Cart
      </button>

      {showFeedback && (
        <div className="flex items-center justify-center gap-2 text-sm bg-black/80 w-80 text-center py-2 text-white mt-2 animate-fade-in">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10A8 8 0 11 2 10a8 8 0 0116 0zm-8-4a1 1 0 100 2 1 1 0 000-2zm-1 4a1 1 0 012 0v4a1 1 0 11-2 0v-4z"
              clipRule="evenodd"
            />
          </svg>
          <p>Item added to cart successfully!</p>
        </div>
      )}
    </>
  );
}
