import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

const NavBar = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>Advanced Store</Navbar.Brand>

        <Nav>
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>

          <Nav.Link as={Link} to="/cart">
            Cart
            <span className="ms-1 badge bg-light text-dark">{totalItems}</span>
          </Nav.Link>

          <Nav.Link as={Link} to="/auth">
            Login/Register
          </Nav.Link>

          <Nav.Link as={Link} to="/profile">
            Profile
          </Nav.Link>

          <Nav.Link as={Link} to="/products/manage">
            Manage Products
          </Nav.Link>

          <Nav.Link as={Link} to="/orders">
            Orders
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
