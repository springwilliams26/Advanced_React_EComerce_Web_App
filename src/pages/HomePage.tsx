import { useState } from "react";
import { Alert, Col, Container, Row, Spinner } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../redux/store";
import { addToCart } from "../redux/cartSlice";
import type { Product } from "../types/Product";
import {
  fetchCategories,
  fetchProducts,
  fetchProductsByCategory,
} from "../api/productApi";
import ProductCard from "../components/ProductCard";
import CategoryFilter from "../components/CategoryFilter";

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const {
    data: categories,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useQuery<string[]>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const {
    data: products,
    isLoading: productsLoading,
    error: productsError,
  } = useQuery<Product[]>({
    queryKey: ["products", selectedCategory],
    queryFn: () =>
      selectedCategory === "all"
        ? fetchProducts()
        : fetchProductsByCategory(selectedCategory),
  });

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };

  if (categoriesLoading || productsLoading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" />
        <p>Loading products...</p>
      </Container>
    );
  }

  if (categoriesError || productsError) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">There was an error loading products.</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h1>Advanced E-Commerce Store</h1>

      <p>
        Browse products from FakeStoreAPI, filter by category, and add items to
        your shopping cart.
      </p>

      <CategoryFilter
        categories={categories || []}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <Row>
        {products?.map((product) => (
          <Col md={4} className="mb-4" key={product.id}>
            <ProductCard product={product} onAddToCart={handleAddToCart} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HomePage;
