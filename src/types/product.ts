export interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  highlight: boolean;
  category: string;
  inStock: boolean;
  colors: string[];
  sizes: string[];
}