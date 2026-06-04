import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCpfgxvGc13mBjF4Cy84eQPLbyNBqojbTc",
  authDomain: "advanced-e-commerce-fireside.firebaseapp.com",
  projectId: "advanced-e-commerce-fireside",
  storageBucket: "advanced-e-commerce-fireside.firebasestorage.app",
  messagingSenderId: "631614085159",
  appId: "1:631614085159:web:547b68ccc0ac8c90015602",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
