import { Form } from "react-bootstrap";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter = ({
  categories,
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) => {
  return (
    <Form.Group className="mb-4">
      <Form.Label>Filter by Category</Form.Label>

      <Form.Select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="all">All Products</option>

        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
};

export default CategoryFilter;
