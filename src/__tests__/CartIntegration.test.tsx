import { configureStore } from "@reduxjs/toolkit";
import cartReducer, { addToCart } from "../redux/cartSlice";
import type { Product } from "../types/Product";

const mockProduct: Product = {
  id: "1",
  title: "Wireless Headphones",
  price: 89.99,
  description: "Comfortable wireless headphones with long battery life.",
  category: "electronics",
  image: "https://placehold.co/300x300?text=Headphones",
  rating: {
    rate: 4.6,
    count: 124,
  },
};

test("adds a product to the cart and updates cart quantity", () => {
  const store = configureStore({
    reducer: {
      cart: cartReducer,
    },
  });

  store.dispatch(addToCart(mockProduct));
  store.dispatch(addToCart(mockProduct));

  const state = store.getState();

  expect(state.cart.items).toHaveLength(1);
  expect(state.cart.items[0].title).toBe("Wireless Headphones");
  expect(state.cart.items[0].quantity).toBe(2);
});
