// components/products/ProductDetails.tsx
import ProductHeader from "@/components/products/ProductHeader";
import ProductPrice from "@/components/products/ProductPrice";
import ProductColors from "@/components/products/ProductColors";
import ProductSizes from "@/components/products/ProductSizes";
import ProductQuantity from "@/components/products/ProductQuantity";
import AddToCartButton from "@/components/products/AddToCartButton";
import ProductShippingInfo from "@/components/products/ProductShippingInfo";
import ProductReviews from "@/components/products/ProductReview";
import { Product } from "@/types/product";

interface ProductDetailsProps {
  product: Product;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
  showFeedback: boolean;
  onShare: () => void;
  onSelectColor: (color: string) => void;
  onSelectSize: (size: string) => void;
  onDecreaseQuantity: () => void;
  onIncreaseQuantity: () => void;
  onAddToCart: () => void;
}

export default function ProductDetails({
  product,
  selectedColor,
  selectedSize,
  quantity,
  showFeedback,
  onShare,
  onSelectColor,
  onSelectSize,
  onDecreaseQuantity,
  onIncreaseQuantity,
  onAddToCart,
}: ProductDetailsProps) {
  return (
    <div className="flex flex-col px-25 md:px-20">
      <ProductHeader name={product.name} onShare={onShare} />
      <ProductReviews inStock={product.inStock} />
      <ProductPrice price={product.price} />
      {product.inStock && (
        <>
          <ProductColors
            colors={product.colors}
            selectedColor={selectedColor}
            onSelectColor={onSelectColor}
          />
          <ProductSizes
            sizes={product.sizes}
            selectedSize={selectedSize}
            onSelectSize={onSelectSize}
          />
          <ProductQuantity
            quantity={quantity}
            onDecrease={onDecreaseQuantity}
            onIncrease={onIncreaseQuantity}
          />
          <AddToCartButton
            onClick={onAddToCart}
            showFeedback={showFeedback}
          />
          <ProductShippingInfo />
        </>
      )}
    </div>
  );
}
