import React from "react";
import ProductCard from "@/components/listing/ProductCard";
import { Product } from "@/types/product";

// Props do componente ProductList
interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 justify-items-center">
      {products.map((product) => (
      <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
