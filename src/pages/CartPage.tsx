import { Button, Card, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, removeFromCart } from "../redux/cartSlice";
import type { RootState, AppDispatch } from "../redux/store";

const CartPage = () => {
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

    alert("Checkout Complete! Cart has been cleared.");
  };

  return (
    <Container className="mt-4">
      <h1>Shopping Cart</h1>

      <p>Total Items: {totalItems}</p>

      <p>Total Price: ${totalPrice.toFixed(2)}</p>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
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
