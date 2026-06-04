import axios from "axios";
import type { Product } from "../types/Product";

const BASE_URL = "https://fakestoreapi.com/products";

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const fetchCategories = async (): Promise<string[]> => {
  const response = await axios.get(`${BASE_URL}/categories`);

  return response.data;
};

export const fetchProductsByCategory = async (
  category: string,
): Promise<Product[]> => {
  const response = await axios.get(`${BASE_URL}/category/${category}`);

  return response.data;
};
