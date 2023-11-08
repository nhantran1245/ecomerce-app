import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import "firebase/auth";
import { getFirestore } from "firebase/firestore";

const app = initializeApp({
  // apiKey: process.env.FIREBASE_API_KEY,
  // authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  // projectId: process.env.FIREBASE_PROJECT_ID,
  // storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.FIREBASE_APP_ID,
  apiKey: "AIzaSyBVMldjskaps7wAg3JAuhlVHjqCvpRjKaE",
  authDomain: "flower-shop-caa2e.firebaseapp.com",
  projectId: "flower-shop-caa2e",
  storageBucket: "flower-shop-caa2e.appspot.com",
  messagingSenderId: "945577682273",
});

export const db = getFirestore();
export const auth = getAuth();
export default app;
