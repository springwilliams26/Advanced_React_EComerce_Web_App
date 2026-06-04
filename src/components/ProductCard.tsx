import { Card, Button } from "react-bootstrap";
import type { Product } from "../types/Product";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
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
        <Card.Title>{product.title}</Card.Title>

        <Card.Text>
          <strong>Price:</strong> ${product.price.toFixed(2)}
          <br />
          <strong>Category:</strong> {product.category}
          <br />
          <strong>Rating:</strong> {product.rating.rate} / 5
        </Card.Text>

        <Card.Text>{product.description}</Card.Text>

        <Button className="mt-auto" onClick={() => onAddToCart(product)}>
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
