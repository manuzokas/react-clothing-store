import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux";
import OrderSummary from "@/components/products/OrderSummary";
import { useUser } from "@clerk/clerk-react";
import ShippingAddressForm from "@/components/forms/ShippingAddressForm";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import { useNavigate } from "react-router-dom";
import { clearCart } from "@/store/cartSlice";
import { cn } from "@/utils/utils";
import { useTheme } from "@/hooks/useTheme";
import { useEffect } from "react";

const CheckoutPage = () => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();
  const { user } = useUser();
  const navigate = useNavigate();
  const [isFormValid, setIsFormValid] = useState(false);
  const { theme } = useTheme();

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = 5.99;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  const userEmail = user?.primaryEmailAddress?.emailAddress || "";
  const userFullName = user?.fullName || "";

  const breadcrumbItems = [
    { label: "Ecommerce", href: "/" },
    { label: "Checkout" },
  ];

  const handlePlaceOrder = async () => {
    if (!user) {
      console.error("Usuário não está logado.");
      return;
    }

    const order = {
      userId: user.id,
      items: cartItems.map((item) => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.images[0],
      })),
      total: total,
      status: "Completed",
      date: new Date().toISOString().split("T")[0],
    };

    try {
      const response = await fetch("http://localhost:3001/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });

      if (response.ok) {
        dispatch(clearCart());
        navigate("/successful-order");
      } else {
        console.error("Erro ao salvar o pedido.");
      }
    } catch (error) {
      console.error("Erro ao enviar o pedido:", error);
    }
  };

  useEffect(() => {
      document.title = "Checkout | eCompass";
    }, []);

  return (
    <div
      className={cn(
        "h-full mt-26",
        theme === "dark" ? "bg-gray-500 text-white" : "bg-white text-black"
      )}
    >
      {/* Breadcrumb e Título */}
      <div
        className={cn(
          "flex flex-col items-start justify-start w-full py-4 px-15 md:py-8 md:px-30",
          theme === "dark" ? "bg-gray-600" : "bg-gray-100"
        )}
      >
        <h1 className="text-[24px] font-bold">Checkout</h1>
        <Breadcrumb items={breadcrumbItems} />
      </div>

      {/* Conteúdo Principal */}
      <div className="max-w-7xl mx-auto py-10 flex flex-col lg:flex-row gap-8">
        {/* Lado Esquerdo: Formulário de Endereço */}
        <ShippingAddressForm
          userEmail={userEmail}
          userFullName={userFullName}
          onFormValid={setIsFormValid}
        />

        {/* Lado Direito: Resumo do Pedido */}
        <div className="w-full lg:w-96 md:px-5">
          <OrderSummary
            subtotal={subtotal}
            shipping={shipping}
            tax={tax}
            total={total}
            isSignedIn={true}
            title="Your Order"
            titleClassName="text-[16px] font-bold"
            primaryButtonText="Place Order"
            buttonClassName={
              !isFormValid ? "opacity-50 cursor-not-allowed" : ""
            }
            onPrimaryButtonClick={isFormValid ? handlePlaceOrder : undefined}
          >
            <button
              onClick={() => navigate("/cart")}
              className={cn(
                "px-4 py-2 rounded-sm text-sm font-normal transition",
                theme === "dark"
                  ? "border border-gray-400 text-white hover:bg-gray-500"
                  : "border border-black text-black hover:bg-black hover:text-white"
              )}
            >
              Edit Cart
            </button>
          </OrderSummary>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
