import { useAppSelector, useAppDispatch } from "@/hooks/useRedux";
import { updateQuantity, removeItem } from "@/store/cartSlice";
import { useAuth } from "@clerk/clerk-react";
import OrderSummary from "@/components/products/OrderSummary";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { cn } from "@/utils/utils";
import { useTheme } from "@/hooks/useTheme";

export default function Cart() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const { userId } = useAuth();
  const navigate = useNavigate();
  const { theme } = useTheme();

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = 5.99; // custo de envio frete
  const tax = subtotal * 0.1; // valor da tax
  const total = subtotal + shipping + tax;

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleRemoveItem = (id: string) => {
    dispatch(removeItem(id));
  };

  // Função para redirecionar para a página de checkout
  const handleCheckout = () => {
    navigate("/checkout");
  };

  // Função para redirecionar para a página de produtos
  const handleContinueShopping = () => {
    navigate("/listing");
  };

  return (
    <section
      className={cn(
        "h-auto md:py-10",
        theme === "dark" ? "bg-gray-300 text-white" : "bg-white text-black"
      )}
    >
      <div className="max-w-7xl mx-auto md:py-10 flex flex-col lg:flex-row gap-8">
        {/* Lado Esquerdo: Itens do Carrinho */}
        <div className="flex-1 px-5 md:px-15">
          <h2
            className={cn(
              "text-[14px] md:text-[16px] border-b-1 py-4 font-bold mb-6",
              theme === "dark" ? "border-gray-400" : "border-gray-200"
            )}
          >
            Your Cart
          </h2>

          {/* Verifica se o carrinho está vazio */}
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-96 gap-6">
              {/* Ícone de carrinho vazio */}
              <FaShoppingCart
                className={cn(
                  "w-16 h-16",
                  theme === "dark" ? "text-gray-300" : "text-gray-400"
                )}
              />

              {/* Mensagem */}
              <p
                className={cn(
                  "text-xl font-semibold",
                  theme === "dark" ? "text-gray-200" : "text-gray-700"
                )}
              >
                Your cart is empty
              </p>

              {/* Botão para continuar comprando */}
              <button
                onClick={handleContinueShopping}
                className={cn(
                  "px-6 py-2 rounded-sm transition-colors",
                  theme === "dark"
                    ? "bg-white text-black hover:bg-gray-200"
                    : "bg-black text-white hover:bg-gray-800"
                )}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className={cn(
                    "flex items-center gap-3 md:gap-6 md:p-4 rounded-lg transition-shadow",
                    theme === "dark"
                      ? "hover:border-gray-400 hover:shadow-lg"
                      : "hover:border-black hover:shadow-md"
                  )}
                >
                  {/* Imagem do Produto */}
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-sm"
                  />

                  {/* Detalhes do Produto */}
                  <div className="flex-1">
                    <h3 className="text-md md:text-lg font-semibold">{item.name}</h3>
                    <div className="flex space-x-2 md:space-x-4">
                      {item.color && (
                        <div className="flex items-center space-x-2">
                          <span
                            className={cn(
                              "text-sm",
                              theme === "dark"
                                ? "text-gray-300"
                                : "text-gray-500"
                            )}
                          >
                            Color:
                          </span>
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: item.color }}
                          ></div>
                        </div>
                      )}
                      <div>—</div>
                      {item.size && (
                        <p
                          className={cn(
                            "text-sm",
                            theme === "dark" ? "text-gray-300" : "text-gray-500"
                          )}
                        >
                          Size: {item.size}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Preço Total do Item */}
                  <p className="text-md md:text-lg font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>

                  {/* Quantidade */}
                  <div
                    className={cn(
                      "flex items-center gap-2 border px-5",
                      theme === "dark" ? "border-gray-400" : "border-gray-100"
                    )}
                  >
                    <button
                      onClick={() =>
                        handleUpdateQuantity(item.id, item.quantity - 1)
                      }
                      className={cn(
                        theme === "dark"
                          ? "text-gray-300 hover:text-white"
                          : "text-gray-500 hover:text-black"
                      )}
                    >
                      -
                    </button>
                    <span className="text-lg">{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleUpdateQuantity(item.id, item.quantity + 1)
                      }
                      className={cn(
                        theme === "dark"
                          ? "text-gray-300 hover:text-white"
                          : "text-gray-500 hover:text-black"
                      )}
                    >
                      +
                    </button>
                  </div>

                  {/* Botão de Remover */}
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className={cn(
                      "w-7 h-7 font-bold",
                      theme === "dark"
                        ? "bg-gray-600 text-white hover:text-red-500"
                        : "bg-gray-100 text-black hover:text-red-700"
                    )}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Lado Direito: Resumo do Pedido */}
        {cartItems.length > 0 && (
          <OrderSummary
            subtotal={subtotal}
            shipping={shipping}
            tax={tax}
            total={total}
            isSignedIn={!!userId}
            title="Order Summary"
            titleClassName="text-md md:text-[22px] font-bold"
            primaryButtonText="Checkout"
            onPrimaryButtonClick={handleCheckout}
          />
        )}
      </div>
    </section>
  );
}
