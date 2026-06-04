import { Card, Container } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";

import { useAuthContext } from "../auth/AuthContext";
import { getUserOrders } from "../services/orderService";
import type { Order } from "../types/Order";
import { Link } from "react-router-dom";

const OrderHistoryPage = () => {
  const { currentUser } = useAuthContext();

  const { data: orders, isLoading } = useQuery<Order[]>({
    queryKey: ["orders", currentUser?.uid],
    queryFn: () => getUserOrders(currentUser!.uid),
    enabled: !!currentUser,
  });

  if (!currentUser) {
    return (
      <Container className="mt-4">
        <h1>Order History</h1>
        <p>Please log in to view your order history.</p>
      </Container>
    );
  }

  if (isLoading) {
    return (
      <Container className="mt-4">
        <h1>Order History</h1>
        <p>Loading orders...</p>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h1>Order History</h1>

      {orders && orders.length > 0 ? (
        orders.map((order) => (
          <Card key={order.id} className="mb-3">
            <Card.Body>
              <h5>Order #{order.id}</h5>

              <p>
                <strong>Total:</strong> ${order.totalPrice.toFixed(2)}
              </p>

              <p>
                <strong>Date:</strong>{" "}
                {new Date(order.createdAt).toLocaleString()}
              </p>

              <p>
                <strong>Items:</strong> {order.products.length}
              </p>

              <Link to={`/orders/${order.id}`} className="btn btn-primary">
                View Details
              </Link>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p>No orders found.</p>
      )}
    </Container>
  );
};

export default OrderHistoryPage;
