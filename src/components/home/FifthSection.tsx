import useFetch from "@/hooks/useFetch";
import ProductSection from "@/components/products/ProductSection";
import { cn } from "@/utils/utils";
import { useTheme } from "@/hooks/useTheme";
import { Product } from "@/types/product";

export default function FifthSection() {
  const { theme } = useTheme();
  const {
    data: products,
    loading,
    error,
  } = useFetch<Product[]>("http://localhost:3001/products");

  const highlightedProducts = products
    ? products.filter((product) => product.highlight)
    : [];

  return (
    <ProductSection
      products={highlightedProducts}
      loading={loading}
      error={error}
    >
      <h2
        className={cn(
          "rounded-full px-4 py-1 text-[14px] font-[700]",
          theme === "dark" ? "bg-white text-black border border-black" : "text-black border border-gray-400"
        )}
      >
        On Offer
      </h2>
    </ProductSection>
  );
}
