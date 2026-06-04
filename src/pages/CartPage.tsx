import { Alert, Button, Card, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, removeFromCart } from "../redux/cartSlice";
import type { RootState, AppDispatch } from "../redux/store";
import { useState } from "react";

const CartPage = () => {
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const cartItems = useSelector((state: RootState) => state.cart.items);

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const handleCheckout = () => {
    dispatch(clearCart());

    setCheckoutSuccess(true);

    setTimeout(() => {
      setCheckoutSuccess(false);
    }, 3000);
  };

  return (
    <Container className="mt-4">
      <h1>Shopping Cart</h1>

      {checkoutSuccess && (
        <Alert variant="success">
          Checkout Complete! Your cart has been cleared.
        </Alert>
      )}

      <Card className="mb-4">
        <Card.Body>
          <h5>Total Items: {totalItems}</h5>
          <h5>Total Price: ${totalPrice.toFixed(2)}</h5>
        </Card.Body>
      </Card>

      {cartItems.length === 0 ? (
        <Card className="text-center p-4">
          <h4>Your cart is empty</h4>
          <p>Add products from the catalog to begin shopping.</p>
        </Card>
      ) : (
        <>
          {cartItems.map((item) => (
            <Card key={item.id} className="mb-3">
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>

                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "contain",
                  }}
                />

                <p>Quantity: {item.quantity}</p>

                <p>Price: ${item.price.toFixed(2)}</p>

                <Button
                  variant="danger"
                  onClick={() => dispatch(removeFromCart(item.id))}
                >
                  Remove
                </Button>
              </Card.Body>
            </Card>
          ))}

          <Button variant="success" onClick={handleCheckout}>
            Checkout
          </Button>
        </>
      )}
    </Container>
  );
};

export default CartPage;
