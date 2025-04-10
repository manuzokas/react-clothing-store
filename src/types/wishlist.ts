import { Product } from "@/types/product";

export interface WishlistItem {
  id: string;
  userId: string;
  product: Product;
  date: string;
}