import type { CartItem } from "./CartItem";

export interface Order {
  id?: string;
  userId: string;
  products: CartItem[];
  totalPrice: number;
  createdAt: string;
}
