import useFetch from "@/hooks/useFetch";
import ProductSection from "@/components/products/ProductSection";
import { cn } from "@/utils/utils";
import { useTheme } from "@/hooks/useTheme";
import { Product } from "@/types/product";

export default function SimilarProducts() {
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
      <div className="flex flex-col items-start mr-auto pl-40 gap-2">
        {/* Alinha o conteúdo à esquerda */}
        <h2 className={cn("text-black text-[24px] font-[700]", theme === "dark" ? "text-white" : "text-black")}>
          You might also like
        </h2>
        <p className={cn("text-gray-500 text-[12px] font-[500]", theme === "dark" ? "text-gray-300" : "text-gray-500")}>
          SIMILAR PRODUCTS
        </p>
      </div>
    </ProductSection>
  );
}
