import { useState } from "react";
import { Alert, Button, Card, Container, Form } from "react-bootstrap";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig";

const AuthPage = () => {
  const [isRegistering, setIsRegistering] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      await setDoc(doc(db, "users", userCredential.user.uid), {
        uid: userCredential.user.uid,
        email,
        name,
        address,
      });

      setMessage("Registration successful!");
      setEmail("");
      setPassword("");
      setName("");
      setAddress("");
    } catch (err) {
      setError("Registration failed. Please check your information.");
      console.error(err);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      await signInWithEmailAndPassword(auth, email, password);

      setMessage("Login successful!");
      setEmail("");
      setPassword("");
    } catch (err) {
      setError("Login failed. Please check your email and password.");
      console.error(err);
    }
  };

  return (
    <Container className="mt-4">
      <Card className="mx-auto" style={{ maxWidth: "500px" }}>
        <Card.Body>
          <h1>{isRegistering ? "Register" : "Login"}</h1>

          {message && <Alert variant="success">{message}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={isRegistering ? handleRegister : handleLogin}>
            {isRegistering && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </Form.Group>
              </>
            )}

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button type="submit">
              {isRegistering ? "Register" : "Login"}
            </Button>
          </Form>

          <Button
            variant="link"
            className="mt-3"
            onClick={() => {
              setIsRegistering(!isRegistering);
              setError("");
              setMessage("");
            }}
          >
            {isRegistering
              ? "Already have an account? Login"
              : "Need an account? Register"}
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AuthPage;
