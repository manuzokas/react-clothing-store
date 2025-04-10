// components/ProductSection/ProductSection.tsx
import { cn } from "@/utils/utils";
import { useTheme } from "@/hooks/useTheme";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaRegHeart, FaHeart, FaCartPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { addFavorite, removeFavorite } from "@/store/favoriteSlice";
import { useUser } from "@clerk/clerk-react";
import { Product } from "@/types/product";  
interface ProductSectionProps {
  title?: string;
  subtitle?: string;
  products: Product[];
  loading: boolean;
  error: string | null;
  children?: React.ReactNode;
}

export default function ProductSection({
  title,
  subtitle,
  products,
  loading,
  error,
  children,
}: ProductSectionProps) {
  const { theme } = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useUser();

  const [showOverlay, setShowOverlay] = useState<number | null>(null);
  const [isHeartHovered, setIsHeartHovered] = useState<number | null>(null);

  const navigate = useNavigate();

  const favoriteItems = useSelector(
    (state: RootState) => state.favorites.items
  );

  const isFavorited = (productId: number) => {
    return favoriteItems.some((item) => Number(item.id) === productId);
  };

  const handleToggleFavorite = (
    event: React.MouseEvent<HTMLButtonElement>,
    productId: number
  ) => {
    event.preventDefault();
    event.stopPropagation();

    if (!user || !user.id) {
      console.error("User not authenticated.");
      navigate("/sign-in");
      return;
    }

    const product = products.find((p) => p.id === productId.toString());
    if (!product) return;

    if (isFavorited(productId)) {
      dispatch(removeFavorite({ productId: productId.toString(), userId: user.id }));
    } else {
      dispatch(addFavorite({ product, userId: user.id }));
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  return (
    <section
      className={cn(
        "flex flex-col justify-center py-10 md:py-0 items-center h-full w-full gap-10 md:h-screen md:gap-20",
        theme === "dark" ? "bg-gray-500 text-white" : "bg-white"
      )}
    >
      {children ? (
        children
      ) : (
        <div className="flex flex-col">
          {title && <h2 className="text-[24px] font-[700]">{title}</h2>}
          {subtitle && <p className="text-[12px] font-[200]">{subtitle}</p>}
        </div>
      )}

      <div className="flex flex-col md:flex-row items-center justify-center gap-20">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex flex-col items-start relative"
            onMouseEnter={() => setShowOverlay(Number(product.id))}
            onMouseLeave={() => setShowOverlay(null)}
          >
            <Link to={`/product/${product.id}`}>
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-[237px] h-[312px] rounded-lg cursor-pointer"
              />

              {/* Overlay com botões */}
              {showOverlay === Number(product.id) && (
                <div className="absolute inset-0 bg-black/20 flex flex-col justify-end items-center rounded-lg h-80">
                  <button
                    className="absolute top-4 right-4 text-red-500 p-2 rounded-full transition hover:text-red-700"
                    onMouseEnter={() => setIsHeartHovered(Number(product.id))}
                    onMouseLeave={() => setIsHeartHovered(null)}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleToggleFavorite(e, Number(product.id));
                    }}
                  >
                    {isHeartHovered === Number(product.id) ||
                    isFavorited(Number(product.id)) ? (
                      <FaHeart className="fill-current" />
                    ) : (
                      <FaRegHeart className="fill-current" />
                    )}
                  </button>

                  <button
                    className="bg-black text-white w-full transition flex items-center justify-center gap-2 p-4"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      navigate(`/product/${product.id}`);
                    }}
                  >
                    <FaCartPlus /> Add to Cart
                  </button>
                </div>
              )}
            </Link>

            <h2 className="text-[14px] font-[500] mt-5">{product.name}</h2>
            <div className="flex flex-row gap-4 mt-2 items-center justify-center text-center">
              <p
                className={cn(
                  "text-[10px] font-medium px-4 py-1 rounded-full",
                  theme === "dark"
                    ? "bg-black border-1 border-white text-white"
                    : "bg-white border-1 border-gray-200"
                )}
              >
                {product.inStock ? "In Stock" : "Out of Stock"}
              </p>
              <p
                className={cn(
                  "text-[14px] font-[200]",
                  theme === "dark" ? "text-white" : "text-gray-700"
                )}
              >
                ${product.price.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
