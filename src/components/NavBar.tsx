import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import type { RootState } from "../redux/store";
import { auth } from "../firebase/firebaseConfig";
import { useAuthContext } from "../auth/AuthContext";

const NavBar = () => {
  const { currentUser } = useAuthContext();

  const cartItems = useSelector((state: RootState) => state.cart.items);

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Advanced Store
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />

        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>

            {currentUser && (
              <>
                <Nav.Link as={Link} to="/cart">
                  Cart
                  <span className="ms-1 badge bg-light text-dark">
                    {totalItems}
                  </span>
                </Nav.Link>

                <Nav.Link as={Link} to="/profile">
                  Profile
                </Nav.Link>

                <Nav.Link as={Link} to="/orders">
                  Orders
                </Nav.Link>

                <Nav.Link as={Link} to="/products/manage">
                  Manage Products
                </Nav.Link>

                <Button
                  variant="outline-light"
                  size="sm"
                  className="ms-2 align-self-center"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            )}

            {!currentUser && (
              <Nav.Link as={Link} to="/auth">
                Login/Register
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
