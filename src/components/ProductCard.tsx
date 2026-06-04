import { Card, Button, Alert } from "react-bootstrap";
import type { Product } from "../types/Product";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  showSuccess: boolean;
}

const ProductCard = ({
  product,
  onAddToCart,
  showSuccess,
}: ProductCardProps) => {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Img
        variant="top"
        src={product.image}
        alt={product.title}
        style={{
          height: "220px",
          objectFit: "contain",
          padding: "1rem",
        }}
        onError={(e) => {
          e.currentTarget.src =
            "https://via.placeholder.com/220x220?text=No+Image";
        }}
      />

      <Card.Body className="d-flex flex-column">
        <Card.Title
          style={{
            minHeight: "60px",
            fontSize: "1rem",
          }}
        >
          {product.title}
        </Card.Title>

        <Card.Text>
          <strong>Price:</strong> ${product.price.toFixed(2)}
          <br />
          <strong>Category:</strong> {product.category}
          <br />
          <strong>Rating:</strong> {product.rating.rate} / 5
        </Card.Text>

        <Card.Text>{product.description.slice(0, 120)}...</Card.Text>

        {showSuccess && (
          <Alert variant="success" className="py-1 mb-2">
            Added to Cart!
          </Alert>
        )}

        <Button className="mt-auto" onClick={() => onAddToCart(product)}>
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
