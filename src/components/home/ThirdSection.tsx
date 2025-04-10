import useFetch from "@/hooks/useFetch";
import ProductSection from "@/components/products/ProductSection";
import { Product } from "@/types/product";

export default function ThirdSection() {
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
      title="Best Selling"
      subtitle="Shop Now"
      products={highlightedProducts}
      loading={loading}
      error={error}
    />
  );
}
