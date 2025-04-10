// components/products/ProductShippingInfo.tsx
import { cn } from "@/utils/utils";
import { useTheme } from "@/hooks/useTheme";



export default function ProductShippingInfo() {
    const { theme } = useTheme();
  return (
    <p
      className={cn(
        "text-[12px] mt-2 font-[400]",
        theme === "dark" ? "text-gray-300" : "text-gray-700"
      )}
    >
      — FREE SHIPPING ON ORDERS $100+
    </p>
  );
}
