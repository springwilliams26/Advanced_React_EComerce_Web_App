import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import type { Product } from "../types/Product";

const productsCollection = collection(db, "products");

export const getProductsFromFirestore = async (): Promise<Product[]> => {
  const querySnapshot = await getDocs(productsCollection);

  return querySnapshot.docs.map((document) => ({
    id: document.id,
    ...(document.data() as Omit<Product, "id">),
  }));
};

export const addProductToFirestore = async (product: Omit<Product, "id">) => {
  await addDoc(productsCollection, product);
};

export const updateProductInFirestore = async (
  id: string,
  updatedProduct: Partial<Product>,
) => {
  const productDoc = doc(db, "products", id);
  await updateDoc(productDoc, updatedProduct);
};

export const deleteProductFromFirestore = async (id: string) => {
  const productDoc = doc(db, "products", id);
  await deleteDoc(productDoc);
};
