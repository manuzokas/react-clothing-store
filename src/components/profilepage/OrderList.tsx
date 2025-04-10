// components/OrderList/OrderList.tsx
import { Order, OrderItem } from "@/types/order";
import { FaBoxOpen } from "react-icons/fa";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { Link } from "react-router-dom";

interface OrderListProps {
  orders: Order[];
  ordersLoading: boolean;
  ordersError: string | null;
  handleViewItem: (productId: string) => void;
  isLoading: boolean;
}

const OrderList = ({
  orders,
  ordersLoading,
  ordersError,
  handleViewItem,
  isLoading,
}: OrderListProps) => {
  if (ordersLoading) return <LoadingSpinner />;
  if (ordersError) return <p>Erro ao carregar pedidos: {ordersError}</p>;
  if (orders.length === 0) {
    return (
      <div className="flex flex-col gap-4 items-center justify-center h-96">
        <FaBoxOpen className="w-20 h-20 text-gray-500" />
        <p>Your order history is waiting to be filled.</p>
        <Link
          to="/listing"
          className="bg-black hover:bg-gray-700 text-white text-[14px] px-5 py-2"
        >
          Start Shopping →
        </Link>
      </div>
    );
  }

  return (
    <ul>
      {orders.map((order: Order) => (
        <li key={order.id} className="p-4">
          <ul className="space-y-4">
            {order.items.map((item: OrderItem) => (
              <li
                key={item.productId}
                className="flex items-center justify-between pb-6 border-b border-gray-100"
              >
                <div className="flex items-start space-x-1 md:space-x-5">
                  <div className="w-[80px] h-[80px] rounded-lg flex items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <h3 className="font-semibold">{item.name}</h3>
                    <div className="flex flex-col gap-1">
                      <p className="text-sm text-gray-600">
                        Ordered On: {order.date}
                      </p>
                      <p className="text-sm text-black font-semibold">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="underline text-sm md:text-md">{order.status}</div>
                <Link
                  to={`/product/${item.productId.toString().split("-")[0]}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleViewItem(item.productId.toString().split("-")[0]);
                  }}
                  className="px-2 py-1.5 md:px-4 md:py-2 bg-white text-black border border-gray-800 text-sm font-semibold rounded-sm hover:bg-gray-800 hover:text-white transition"
                >
                  {isLoading ? <LoadingSpinner /> : "View Item"}
                </Link>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};

export default OrderList;
