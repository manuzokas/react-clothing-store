export interface OrderItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: number;
  userId: string;
  items: OrderItem[];
  total: number;
  status: string;
  date: string;
}