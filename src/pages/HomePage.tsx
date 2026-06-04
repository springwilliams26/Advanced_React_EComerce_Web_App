import { useState } from "react";
import { Alert, Col, Container, Row, Spinner } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../redux/store";
import { addToCart } from "../redux/cartSlice";
import type { Product } from "../types/Product";
import {} from "../api/productApi";
import ProductCard from "../components/ProductCard";
import CategoryFilter from "../components/CategoryFilter";
import { getProductsFromFirestore } from "../services/productService";

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [lastAddedId, setLastAddedId] = useState<string | null>(null);

  const {
    data: products,
    isLoading: productsLoading,
    error: productsError,
  } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getProductsFromFirestore,
  });

  const categories = [...new Set(products?.map((product) => product.category))];

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products?.filter((product) => product.category === selectedCategory);

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));

    setLastAddedId(product.id);

    setTimeout(() => {
      setLastAddedId(null);
    }, 2000);
  };

  if (productsLoading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" />
        <p>Loading products...</p>
      </Container>
    );
  }

  if (productsError) {
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
        {filteredProducts?.map((product) => (
          <Col lg={4} md={6} sm={12} className="mb-4" key={product.id}>
            <ProductCard
              product={product}
              onAddToCart={handleAddToCart}
              showSuccess={lastAddedId === product.id}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HomePage;
