import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import { useNavigate } from "react-router-dom";
import useFetch from "@/hooks/useFetch";
import { useUser, useAuth } from "@clerk/clerk-react";
import { Order } from "@/types/order";
import { useAppDispatch } from "@/hooks/useRedux";
import { clearCart } from "@/store/cartSlice";
import { cn } from "@/utils/utils";
import { useTheme } from "@/hooks/useTheme";
import Sidebar from "@/components/profilepage/Sidebar";
import OrderList from "@/components/profilepage/OrderList";
import AccountDetails from "@/components/profilepage/AccountDetails";
import Wishlist from "@/components/profilepage/Wishlist";
import { WishlistItem } from "@/types/wishlist";
import { useEffect } from "react";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { signOut } = useAuth();
  const [activeSection, setActiveSection] = useState("orders");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { theme } = useTheme();

    useEffect(() => {
        document.title = "Profile | eCompass";
      }, []);

  const handleViewItem = (productId: string) => {
    setIsLoading(true);
    setTimeout(() => {
      navigate(`/product/${productId}`);
      setIsLoading(false);
    }, 1000);
  };

  const {
    data: orders,
    loading: ordersLoading,
    error: ordersError,
  } = useFetch<Order[]>(`http://localhost:3001/orders?userId=${user?.id}`);

  const {
    data: wishlist,
    loading: wishlistLoading,
    error: wishlistError,
  } = useFetch<WishlistItem[]>(`http://localhost:3001/wishlist?userId=${user?.id}`);
  console.log("Dados retornados pela API (wishlist):", wishlist);

  const breadcrumbItems = [
    { label: "Ecommerce", href: "/" },
    { label: "My Profile" },
  ];

  const handleLogout = () => {
    dispatch(clearCart());
    signOut();
    navigate("/sign-in");
  };

  return (
    <section
      className={cn(
        "flex flex-col min-h-screen mt-26",
        theme === "dark" ? "bg-gray-300 text-black" : "bg-white text-black"
      )}
    >
      <div
        className={cn(
          "flex flex-col items-start justify-start w-full py-5 px-15 md:py-10 md:px-30",
          theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-100"
        )}
      >
        <h1 className="text-[22px] font-bold">My Profile</h1>
        <Breadcrumb items={breadcrumbItems} />
      </div>
      <div className="flex flex-col md:flex-row md:py-25 md:px-45">
        <Sidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          handleLogout={handleLogout}
        />
        <div className="flex-1 md:px-10">
          <div className="mt-0">
            {activeSection === "orders" && (
              <OrderList
                orders={orders || []}
                ordersLoading={ordersLoading}
                ordersError={ordersError}
                handleViewItem={handleViewItem}
                isLoading={isLoading}
              />
            )}
            {activeSection === "account" && <AccountDetails />}
            {activeSection === "wishlist" && (
              <Wishlist
                wishlist={wishlist || []}
                wishlistLoading={wishlistLoading}
                wishlistError={wishlistError}
                handleViewItem={handleViewItem}
                isLoading={isLoading}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
