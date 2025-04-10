import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import cartReducer from '@/store/cartSlice';
import favoriteReducer from "@/store/favoriteSlice";

const cartPersistConfig = {
  key: 'storecart', 
  storage,
  whitelist: ['items'],
};

const favoritePersistConfig = {
  key: 'favorites',
  storage,
  whitelist: ['items'],
};

const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);
const persistedFavoriteReducer = persistReducer(favoritePersistConfig, favoriteReducer);

export const store = configureStore({
  reducer: {
    cart: persistedCartReducer,
    favorites: persistedFavoriteReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', REHYDRATE],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;