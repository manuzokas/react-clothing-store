// components/products/ProductColors.tsx
import { cn } from "@/utils/utils";
import { useTheme } from "@/hooks/useTheme";

interface ProductColorsProps {
  colors: string[];
  selectedColor: string;
  onSelectColor: (color: string) => void;
}

export default function ProductColors({
  colors,
  selectedColor,
  onSelectColor,
}: ProductColorsProps) {
    const { theme } = useTheme();
  return (
    <div className="mt-4">
      <h3
        className={cn(
          "text-sm font-medium",
          theme === "dark" ? "text-gray-900" : "text-gray-700"
        )}
      >
        Available Colors
      </h3>
      <div className="flex gap-2 mt-2">
        {colors.map((color) => (
          <button
            key={color}
            className={`w-6 h-6 rounded-full border-2 ${
              selectedColor === color
                ? theme === "dark"
                  ? "border-white"
                  : "border-black"
                : "border-gray-300"
            }`}
            style={{ backgroundColor: color.toLowerCase() }}
            onClick={() => onSelectColor(color)}
          />
        ))}
      </div>
    </div>
  );
}
