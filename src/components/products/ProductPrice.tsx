// components/products/ProductPrice.tsx
import { cn } from "@/utils/utils";
import { useTheme } from "@/hooks/useTheme";

interface ProductPriceProps {
  price: number;
}

export default function ProductPrice({ price }: ProductPriceProps) {
    const { theme } = useTheme();
  return (
    <p
      className={cn(
        "text-[18px] mt-3 font-semibold",
        theme === "dark" ? "text-black" : "text-black"
      )}
    >
      $ {price.toFixed(2)}
    </p>
  );
}
