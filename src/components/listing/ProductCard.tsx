import { useState } from "react";
import { Link } from "react-router-dom";
import { FaRegHeart, FaHeart, FaCartPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { addFavorite, removeFavorite } from "@/store/favoriteSlice";
import { Product } from "@/types/product";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch: AppDispatch = useDispatch();
  const {user} = useUser();
  const isFavorited = useSelector((state: RootState) =>
    state.favorites.items.some((item) => item.id === product.id)
  );

  const [showOverlay, setShowOverlay] = useState(false);

  const handleMouseEnter = () => setShowOverlay(true);
  const handleMouseLeave = () => setShowOverlay(false);

  const handleToggleFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();

    if (!user || !user.id) {
      console.error("User not authenticated.");
      navigate("/sign-in");
      return;
    }

    if (isFavorited) {
      dispatch(removeFavorite({ productId: product.id, userId: user.id }));
    } else {
      dispatch(addFavorite({ product, userId: user.id }));
    }
  };

  const navigate = useNavigate();

  const handleRedirectToProduct = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <Link to={`/product/${product.id}`}>
      <div className="flex flex-col rounded-lg md:w-[264px] md:h-[434px] overflow-hidden">
        <div
          className="relative md:w-[240px] md:h-[312px]"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-40 h-50 md:w-full md:h-full object-cover"
          />

          {showOverlay && (
            <div className="absolute inset-0 bg-black/20 flex flex-col justify-end items-center">
              <button
                className="absolute top-4 right-4 text-red-500 p-2 rounded-full transition hover:text-red-700"
                onClick={handleToggleFavorite}
              >
                {isFavorited ? (
                  <FaHeart className="fill-current" />
                ) : (
                  <FaRegHeart className="fill-current" />
                )}
              </button>

              <button
                className="bg-black text-white w-full transition flex items-center justify-center gap-2 p-4"
                onClick={handleRedirectToProduct}
              >
                <FaCartPlus /> Add to Cart
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col py-5 gap-2">
          <p className="text-[14px] font-[500] text-gray-700">{product.name}</p>
          <div className="flex flex-row gap-2 items-center">
            <p className="text-[12px] font-[500] border border-gray-100 px-3 rounded-full">
              {product.inStock ? "In Stock" : "Out of Stock"}
            </p>
            <p className="text-[14px] font-[400] text-gray-900">
              $ {product.price.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
