import { render, screen, fireEvent } from "@testing-library/react";
import CategoryFilter from "../components/CategoryFilter";

test("renders category options and handles category change", () => {
  const mockCategoryChange = jest.fn();

  render(
    <CategoryFilter
      categories={["electronics", "bags", "home"]}
      selectedCategory="all"
      onCategoryChange={mockCategoryChange}
    />,
  );

  expect(screen.getByText("Filter by Category")).toBeInTheDocument();
  expect(screen.getByText("All Products")).toBeInTheDocument();
  expect(screen.getByText("electronics")).toBeInTheDocument();

  fireEvent.change(screen.getByRole("combobox"), {
    target: { value: "bags" },
  });

  expect(mockCategoryChange).toHaveBeenCalledWith("bags");
});
