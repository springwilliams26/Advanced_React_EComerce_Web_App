import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../types/Product";
import type { CartItem } from "../types/CartItem";

interface CartState {
  items: CartItem[];
}

const loadCartFromSessionStorage = (): CartItem[] => {
  const storedCart = sessionStorage.getItem("cart");

  if (storedCart) {
    return JSON.parse(storedCart);
  }

  return [];
};

const saveCartToSessionStorage = (items: CartItem[]) => {
  sessionStorage.setItem("cart", JSON.stringify(items));
};

const initialState: CartState = {
  items: loadCartFromSessionStorage(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id,
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1,
        });
      }

      saveCartToSessionStorage(state.items);
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload,
      );

      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      } else {
        state.items = state.items.filter((item) => item.id !== action.payload);
      }

      saveCartToSessionStorage(state.items);
    },

    clearCart: (state) => {
      state.items = [];
      sessionStorage.removeItem("cart");
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
