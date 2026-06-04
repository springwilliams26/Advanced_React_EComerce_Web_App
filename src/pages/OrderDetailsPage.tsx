import { Card, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getOrderById } from "../services/orderService";
import type { Order } from "../types/Order";

const OrderDetailsPage = () => {
  const { id } = useParams();

  const { data: order, isLoading } = useQuery<Order | null>({
    queryKey: ["order", id],
    queryFn: () => getOrderById(id || ""),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <Container className="mt-4">
        <p>Loading order details...</p>
      </Container>
    );
  }

  if (!order) {
    return (
      <Container className="mt-4">
        <h1>Order Not Found</h1>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h1>Order Details</h1>

      <Card className="mb-4">
        <Card.Body>
          <h5>Order #{order.id}</h5>
          <p>
            <strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}
          </p>
          <p>
            <strong>Total:</strong> ${order.totalPrice.toFixed(2)}
          </p>
          <p>
            <strong>Total Items:</strong>{" "}
            {order.products.reduce(
              (total, product) => total + product.quantity,
              0,
            )}
          </p>
        </Card.Body>
      </Card>

      <h3>Products</h3>

      {order.products.map((product) => (
        <Card key={product.id} className="mb-3">
          <Card.Body>
            <h5>{product.title}</h5>
            <p>
              <strong>Quantity:</strong> {product.quantity}
            </p>
            <p>
              <strong>Price:</strong> ${product.price.toFixed(2)}
            </p>
            <p>
              <strong>Subtotal:</strong> $
              {(product.price * product.quantity).toFixed(2)}
            </p>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default OrderDetailsPage;
