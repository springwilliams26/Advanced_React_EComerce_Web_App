import { useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { Product } from "../types/Product";
import {
  addProductToFirestore,
  deleteProductFromFirestore,
  getProductsFromFirestore,
  updateProductInFirestore,
} from "../services/productService";

const emptyProduct = {
  title: "",
  price: 0,
  description: "",
  category: "",
  image: "",
  rating: {
    rate: 0,
    count: 0,
  },
};

const demoProducts = [
  {
    title: "Wireless Noise-Canceling Headphones",
    price: 89.99,
    description:
      "Comfortable wireless headphones with active noise cancellation and long battery life.",
    category: "electronics",
    image: "https://placehold.co/300x300?text=Headphones",
    rating: { rate: 4.6, count: 124 },
  },
  {
    title: "Bluetooth Portable Speaker",
    price: 49.99,
    description:
      "Compact Bluetooth speaker with clear sound and a water-resistant design.",
    category: "electronics",
    image: "https://placehold.co/300x300?text=Speaker",
    rating: { rate: 4.4, count: 88 },
  },
  {
    title: "Smart Fitness Watch",
    price: 119.99,
    description:
      "Fitness watch with heart rate tracking, step counting, and phone notifications.",
    category: "electronics",
    image: "https://placehold.co/300x300?text=Smart+Watch",
    rating: { rate: 4.3, count: 96 },
  },
  {
    title: "Laptop Travel Backpack",
    price: 54.99,
    description:
      "Durable backpack with padded laptop storage and multiple organizer pockets.",
    category: "bags",
    image: "https://placehold.co/300x300?text=Backpack",
    rating: { rate: 4.7, count: 140 },
  },
  {
    title: "Everyday Crossbody Bag",
    price: 34.99,
    description:
      "Lightweight crossbody bag for daily essentials and travel convenience.",
    category: "bags",
    image: "https://placehold.co/300x300?text=Crossbody+Bag",
    rating: { rate: 4.2, count: 73 },
  },
  {
    title: "Cotton Graphic T-Shirt",
    price: 19.99,
    description: "Soft cotton t-shirt with a casual fit for everyday wear.",
    category: "clothing",
    image: "https://placehold.co/300x300?text=T-Shirt",
    rating: { rate: 4.1, count: 65 },
  },
  {
    title: "Classic Denim Jacket",
    price: 69.99,
    description:
      "Classic denim jacket with a comfortable fit and timeless style.",
    category: "clothing",
    image: "https://placehold.co/300x300?text=Denim+Jacket",
    rating: { rate: 4.5, count: 91 },
  },
  {
    title: "Stainless Steel Water Bottle",
    price: 24.99,
    description:
      "Reusable insulated water bottle that keeps drinks cold or hot for hours.",
    category: "home",
    image: "https://placehold.co/300x300?text=Water+Bottle",
    rating: { rate: 4.8, count: 112 },
  },
  {
    title: "Ceramic Coffee Mug Set",
    price: 29.99,
    description: "Set of two ceramic coffee mugs designed for daily use.",
    category: "home",
    image: "https://placehold.co/300x300?text=Coffee+Mugs",
    rating: { rate: 4.4, count: 58 },
  },
  {
    title: "Desk Organizer Tray",
    price: 22.99,
    description:
      "Simple desk organizer tray for pens, notes, and office accessories.",
    category: "home",
    image: "https://placehold.co/300x300?text=Desk+Organizer",
    rating: { rate: 4.3, count: 47 },
  },
];

const ProductManagementPage = () => {
  const queryClient = useQueryClient();

  const [productForm, setProductForm] =
    useState<Omit<Product, "id">>(emptyProduct);

  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const { data: products } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getProductsFromFirestore,
  });

  const handleSeedProducts = async () => {
    for (const product of demoProducts) {
      await addProductToFirestore(product);
    }

    setMessage("Demo products added successfully.");
    queryClient.invalidateQueries({ queryKey: ["products"] });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    if (name === "price") {
      setProductForm({
        ...productForm,
        price: Number(value),
      });
      return;
    }

    if (name === "rate") {
      setProductForm({
        ...productForm,
        rating: {
          ...productForm.rating,
          rate: Number(value),
        },
      });
      return;
    }

    if (name === "count") {
      setProductForm({
        ...productForm,
        rating: {
          ...productForm.rating,
          count: Number(value),
        },
      });
      return;
    }

    setProductForm({
      ...productForm,
      [name]: value,
    });
  };

  const resetForm = () => {
    setProductForm(emptyProduct);
    setEditingProductId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingProductId) {
      await updateProductInFirestore(editingProductId, productForm);
      setMessage("Product updated successfully.");
    } else {
      await addProductToFirestore(productForm);
      setMessage("Product added successfully.");
    }

    resetForm();
    queryClient.invalidateQueries({ queryKey: ["products"] });
  };

  const handleEdit = (product: Product) => {
    setEditingProductId(product.id);
    setProductForm({
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image,
      rating: product.rating,
    });
  };

  const handleDelete = async (id: string) => {
    await deleteProductFromFirestore(id);
    queryClient.invalidateQueries({ queryKey: ["products"] });
    setMessage("Product deleted successfully.");
  };

  return (
    <Container className="mt-4">
      <h1>Product Management</h1>
      <p>Create, update, and delete products stored in Firestore.</p>

      <Button variant="success" className="mb-3" onClick={handleSeedProducts}>
        Seed Demo Products
      </Button>

      {message && <Alert variant="success">{message}</Alert>}

      <Card className="mb-4">
        <Card.Body>
          <h3>{editingProductId ? "Edit Product" : "Add Product"}</h3>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                name="title"
                value={productForm.title}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                name="price"
                type="number"
                value={productForm.price}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                name="category"
                value={productForm.category}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                name="image"
                value={productForm.image}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={productForm.description}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Rating</Form.Label>
                  <Form.Control
                    name="rate"
                    type="number"
                    value={productForm.rating.rate}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Rating Count</Form.Label>
                  <Form.Control
                    name="count"
                    type="number"
                    value={productForm.rating.count}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Button type="submit" className="me-2">
              {editingProductId ? "Update Product" : "Add Product"}
            </Button>

            {editingProductId && (
              <Button variant="secondary" onClick={resetForm}>
                Cancel Edit
              </Button>
            )}
          </Form>
        </Card.Body>
      </Card>

      <h3>Firestore Products</h3>

      {products?.map((product) => (
        <Card key={product.id} className="mb-3">
          <Card.Body>
            <h5>{product.title}</h5>
            <p>${product.price.toFixed(2)}</p>
            <p>{product.category}</p>

            <Button className="me-2" onClick={() => handleEdit(product)}>
              Edit
            </Button>

            <Button variant="danger" onClick={() => handleDelete(product.id)}>
              Delete
            </Button>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default ProductManagementPage;
