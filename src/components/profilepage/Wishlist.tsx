import { FaHeart } from "react-icons/fa";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeFavorite } from "@/store/favoriteSlice";
import { useUser } from "@clerk/clerk-react";
import { AppDispatch } from "@/store";
import { WishlistItem } from "@/types/wishlist";


interface WishlistProps {
  wishlist: WishlistItem[];
  wishlistLoading: boolean;
  wishlistError: string | null;
  handleViewItem: (productId: string) => void;
  isLoading: boolean;
}

const Wishlist = ({
  wishlist,
  wishlistLoading,
  wishlistError,
  handleViewItem,
  isLoading,
}: WishlistProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useUser();

  const handleRemoveItem = async (productId: string) => {
    if (!user || !user.id) {
      console.error("Usuário não autenticado.");
      return;
    }

    try {
      await dispatch(removeFavorite({ productId, userId: user.id })).unwrap();
      console.log("Item removido da wishlist!");
    } catch (error) {
      console.error("Erro ao remover item da wishlist:", error);
    }
  };

  if (wishlistLoading) return <LoadingSpinner />;
  if (wishlistError) return <p>Erro ao carregar wishlist: {wishlistError}</p>;
  if (wishlist.length === 0) {
    return (
      <div className="flex flex-col gap-4 items-center justify-center h-96">
        <FaHeart className="w-14 h-14 text-gray-500" />
        <p>Your wishlist is empty. Start adding your favorite products!</p>
        <Link
          to="/listing"
          className="bg-black hover:bg-gray-700 text-white text-[14px] px-5 py-2"
        >
          Explore Products →
        </Link>
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {wishlist.map((item) => {
        if (!item.product) {
          console.warn("Produto não encontrado no item da wishlist:", item);
          return null;
        }

        return (
          <li
            key={item.id}
            className="flex items-center justify-between pb-6 border-b border-gray-100"
          >
            <div className="flex items-start space-x-4 px-3 md:px-0 md:space-x-5">
              <div className="w-[70px] h-[70px] md:w-[80px] md:h-[80px] rounded-lg flex items-center justify-center">
                <img
                  src={
                    item.product.images && item.product.images.length > 0
                      ? item.product.images[0]
                      : "/placeholder.jpg"
                  }
                  alt={item.product.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="flex-1 flex flex-col">
                <h3 className="font-semibold">{item.product.name}</h3>
                <div className="flex flex-col">
                  <p className="text-sm text-gray-600">
                    Added on: {new Date(item.date).toLocaleDateString()}
                  </p>
                  <button
                    className="text-left font-bold text-sm"
                    onClick={() => handleRemoveItem(item.product.id)}
                  >
                    Remove Item
                  </button>
                </div>
              </div>
            </div>
            <p className="font-semibold">
              ${item.product.price ? item.product.price.toFixed(2) : "N/A"}
            </p>
            <Link
              to={`/product/${item.product.id}`}
              onClick={(e) => {
                e.preventDefault();
                handleViewItem(item.product.id);
              }}
              className="px-2 py-1.5 mr-2 md:mr-0 md:px-4 md:py-2 bg-white text-black border border-gray-800 text-sm font-semibold rounded-sm hover:bg-gray-800 hover:text-white transition"
            >
              {isLoading ? <LoadingSpinner /> : "Add to Cart"}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Wishlist;
