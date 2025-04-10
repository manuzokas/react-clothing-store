// services/wishlistService.ts
import { Product } from "@/types/product";

export const addToWishlist = async (userId: string, product: Product) => {
  try {
    const response = await fetch("http://localhost:3001/wishlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        product,
        date: new Date().toISOString(),
      }),
    });

    if (response.ok) {
      console.log("Produto adicionado à wishlist!");
      return true;
    } else {
      console.error("Erro ao adicionar à wishlist.");
      return false;
    }
  } catch (error) {
    console.error("Erro ao adicionar à wishlist:", error);
    return false;
  }
};

export const removeFromWishlist = async (wishlistItemId: string) => {
  try {
    const response = await fetch(`http://localhost:3001/wishlist/${wishlistItemId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      console.log("Produto removido da wishlist!");
      return true;
    } else {
      console.error("Erro ao remover da wishlist.");
      return false;
    }
  } catch (error) {
    console.error("Erro ao remover da wishlist:", error);
    return false;
  }
};

export const getWishlist = async (userId: string) => {
  try {
    const response = await fetch(`http://localhost:3001/wishlist?userId=${userId}`);
    if (!response.ok) throw new Error("Erro ao buscar wishlist");

    const wishlistItems = await response.json();
    return wishlistItems;
  } catch (error) {
    console.error("Erro ao carregar a wishlist:", error);
    return [];
  }
};

export const findWishlistItemId = async (userId: string, productId: string) => {
  try {
    const response = await fetch(`http://localhost:3001/wishlist?userId=${userId}&product.id=${productId}`);
    if (!response.ok) throw new Error("Erro ao buscar item da wishlist");

    const wishlistItems = await response.json();
    return wishlistItems[0]?.id; 
  } catch (error) {
    console.error("Erro ao buscar item da wishlist:", error);
    return null;
  }
};