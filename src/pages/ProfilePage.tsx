import { useEffect, useState } from "react";
import { Alert, Button, Card, Container, Form } from "react-bootstrap";
import { deleteUser } from "firebase/auth";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useAuthContext } from "../auth/AuthContext";
import type { UserProfile } from "../types/UserProfile";

const ProfilePage = () => {
  const { currentUser } = useAuthContext();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      if (!currentUser) return;

      const userDocRef = doc(db, "users", currentUser.uid);
      const userSnapshot = await getDoc(userDocRef);

      if (userSnapshot.exists()) {
        const userData = userSnapshot.data() as UserProfile;
        setProfile(userData);
        setName(userData.name);
        setAddress(userData.address);
      }
    };

    fetchProfile();
  }, [currentUser]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser) return;

    try {
      const userDocRef = doc(db, "users", currentUser.uid);

      await updateDoc(userDocRef, {
        name,
        address,
      });

      setProfile({
        uid: currentUser.uid,
        email: currentUser.email || "",
        name,
        address,
      });

      setMessage("Profile updated successfully.");
      setError("");
    } catch (err) {
      setError("Profile update failed.");
      setMessage("");
      console.error(err);
    }
  };

  const handleDeleteAccount = async () => {
    if (!currentUser) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account?",
    );

    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "users", currentUser.uid));
      await deleteUser(currentUser);

      setMessage("Account deleted successfully.");
      setError("");
    } catch (err) {
      setError("Account deletion failed. Please log in again and try.");
      setMessage("");
      console.error(err);
    }
  };

  if (!currentUser) {
    return (
      <Container className="mt-4">
        <Alert variant="warning">Please log in to view your profile.</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Card className="mx-auto" style={{ maxWidth: "600px" }}>
        <Card.Body>
          <h1>User Profile</h1>

          {message && <Alert variant="success">{message}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}

          <p>
            <strong>Email:</strong> {profile?.email || currentUser.email}
          </p>

          <Form onSubmit={handleUpdateProfile}>
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

            <Button type="submit" className="me-2">
              Update Profile
            </Button>

            <Button variant="danger" onClick={handleDeleteAccount}>
              Delete Account
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProfilePage;
