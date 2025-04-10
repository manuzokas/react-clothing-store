import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import { useTheme } from "@/hooks/useTheme";
import DetailSection from "@/components/products/DetailSection";
import SimilarProducts from "@/components/products/SimilarProducts";
import { useAppDispatch } from "@/hooks/useRedux";
import { addItem } from "@/store/cartSlice";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import ImageCarousel from "@/components/carousel/ImageCarousel";
import { Product } from "@/types/product";
import ProductDetails from "@/components/products/ProductDetails";
import { cn } from "@/utils/utils";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [showFeedback, setShowFeedback] = useState(false);
  const { theme } = useTheme();
  const dispatch = useAppDispatch();

    useEffect(() => {
        document.title = "Products | eCompass";
      }, []);

  useEffect(() => {
    if (product && product.sizes.length > 0) {
      setSelectedSize(product.sizes[0]);
    }
  }, [product]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3001/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Erro ao buscar o produto:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleShare = async () => {
    if (!product) return;

    const productUrl = window.location.href;
    const shareData = {
      title: product.name,
      text: `Check out this amazing product: ${product.name}`,
      url: productUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(productUrl);
        alert("Link copied to clipboard!");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;

    const cartItem = {
      id: `${product.id}-${selectedColor}-${selectedSize}`,
      name: product.name,
      price: product.price,
      quantity: quantity,
      images: product.images,
      color: selectedColor,
      size: selectedSize,
    };

    dispatch(addItem(cartItem));

    setShowFeedback(true);

    setTimeout(() => {
      setShowFeedback(false);
    }, 2000);
  };

  if (!product) {
    return <LoadingSpinner />;
  }

  const breadcrumbItems = [
    { label: "Ecommerce", href: "/" },
    { label: product.name },
  ];

  return (
    <div
      className={cn(
        "flex flex-col min-h-screen mt-26",
        theme === "dark" ? "bg-gray-300 text-white" : "bg-white text-black"
      )}
    >
      <div
        className={cn(
          "flex items-center justify-start w-full py-5 px-5 md:px-45",
          theme === "dark" ? "bg-gray-600" : "bg-gray-100"
        )}
      >
        <Breadcrumb items={breadcrumbItems} />
      </div>

      <div className="w-full md:max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 py-15">
        <div className="w-full relative">
          <ImageCarousel images={product.images} />
        </div>
        <ProductDetails
          product={product}
          selectedColor={selectedColor}
          selectedSize={selectedSize}
          quantity={quantity}
          showFeedback={showFeedback}
          onShare={handleShare}
          onSelectColor={setSelectedColor}
          onSelectSize={setSelectedSize}
          onDecreaseQuantity={() =>
            setQuantity(quantity > 1 ? quantity - 1 : 1)
          }
          onIncreaseQuantity={() => setQuantity(quantity + 1)}
          onAddToCart={handleAddToCart}
        />
      </div>
      <DetailSection />
      <SimilarProducts />
    </div>
  );
}
