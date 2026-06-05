import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from "../components/ProductCard";
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

test("renders product details and handles add to cart click", () => {
  const mockAddToCart = jest.fn();

  render(
    <ProductCard
      product={mockProduct}
      onAddToCart={mockAddToCart}
      showSuccess={false}
    />,
  );

  expect(screen.getByText("Wireless Headphones")).toBeInTheDocument();
  expect(screen.getByText(/89.99/i)).toBeInTheDocument();
  expect(screen.getByText(/electronics/i)).toBeInTheDocument();

  fireEvent.click(screen.getByText("Add to Cart"));

  expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);
});
