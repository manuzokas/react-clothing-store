import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { addToWishlist, removeFromWishlist, findWishlistItemId } from "@/api/wishlistService";
import { Product } from "@/types/product";

interface FavoriteItem extends Product {
  id: string;
}

interface FavoriteState {
  items: FavoriteItem[];
  loading: boolean;
  error: string | null;
}

const loadFavorites = (): FavoriteItem[] => {
  const storedFavorites = localStorage.getItem("favorites");
  return storedFavorites ? JSON.parse(storedFavorites) : [];
};

const initialState: FavoriteState = {
  items: loadFavorites(),
  loading: false,
  error: null,
};

export const addFavorite = createAsyncThunk(
  "favorites/addFavorite",
  async ({ product, userId }: { product: FavoriteItem; userId: string }, { rejectWithValue }) => {
    try {
      const success = await addToWishlist(userId, product);
      if (success) {
        return product;
      } else {
        return rejectWithValue("Erro ao adicionar à wishlist.");
      }
    } catch {
      return rejectWithValue("Erro ao adicionar à wishlist.");
    }
  }
);


export const removeFavorite = createAsyncThunk(
  "favorites/removeFavorite",
  async ({ productId, userId }: { productId: string; userId: string }, { rejectWithValue }) => {
    try {
      const wishlistItemId = await findWishlistItemId(userId, productId);
      if (!wishlistItemId) {
        return rejectWithValue("Item da wishlist não encontrado.");
      }

      const success = await removeFromWishlist(wishlistItemId);
      if (success) {
        return productId;
      } else {
        return rejectWithValue("Erro ao remover da wishlist.");
      }
    } catch {
      return rejectWithValue("Erro ao remover da wishlist.");
    }
  }
);

const favoriteSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    clearFavorites: (state) => {
      state.items = [];
      localStorage.removeItem("favorites");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addFavorite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addFavorite.fulfilled, (state, action: PayloadAction<FavoriteItem>) => {
        const exists = state.items.some((item) => item.id === action.payload.id);
        if (!exists) {
          state.items.push(action.payload);
          localStorage.setItem("favorites", JSON.stringify(state.items));
        }
        state.loading = false;
      })
      .addCase(addFavorite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(removeFavorite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFavorite.fulfilled, (state, action: PayloadAction<string>) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
        localStorage.setItem("favorites", JSON.stringify(state.items));
        state.loading = false;
      })
      .addCase(removeFavorite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearFavorites } = favoriteSlice.actions;
export default favoriteSlice.reducer;