import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { db } from "../firebase/firebaseConfig";
import type { Order } from "../types/Order";

const ordersCollection = collection(db, "orders");

export const createOrder = async (order: Omit<Order, "id">) => {
  await addDoc(ordersCollection, order);
};

export const getUserOrders = async (userId: string): Promise<Order[]> => {
  const ordersQuery = query(ordersCollection, where("userId", "==", userId));

  const querySnapshot = await getDocs(ordersQuery);

  return querySnapshot.docs.map((document) => ({
    id: document.id,
    ...(document.data() as Omit<Order, "id">),
  }));
};

export const getOrderById = async (orderId: string): Promise<Order | null> => {
  const orderDoc = doc(db, "orders", orderId);
  const orderSnapshot = await getDoc(orderDoc);

  if (!orderSnapshot.exists()) {
    return null;
  }

  return {
    id: orderSnapshot.id,
    ...(orderSnapshot.data() as Omit<Order, "id">),
  };
};
