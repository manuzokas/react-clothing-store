// components/products/ProductHeader.tsx
import { Share2 } from "lucide-react";
import { cn } from "@/utils/utils";
import { useTheme } from "@/hooks/useTheme";

interface ProductHeaderProps {
  name: string;
  onShare: () => void;
}

export default function ProductHeader({
  name,
  onShare,
}: ProductHeaderProps) {
    const { theme } = useTheme();
  return (
    <div className="flex flex-row justify-between items-center">
      <h1
        className={cn(
          "text-[17px] font-[800] md:text-[24px] md:font-[700]",
          theme === "dark" ? "text-black" : "text-gray-800"
        )}
      >
        {name}
      </h1>
      <button
        onClick={onShare}
        className={cn(
          "text-gray-500 hover:text-gray-700",
          theme === "dark" ? "text-gray-300 hover:text-gray-100" : ""
        )}
      >
        <Share2 size={20} />
      </button>
    </div>
  );
}
