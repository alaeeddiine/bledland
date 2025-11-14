import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAKCRjaJH5Ftz73RuzXWqOUViyDpvZYeKM",
  authDomain: "bledland.firebaseapp.com",
  projectId: "bledland",
  storageBucket: "bledland.firebasestorage.app",
  messagingSenderId: "404587394585",
  appId: "1:404587394585:web:e8afa6e9d42c212c2fdc88",
  measurementId: "G-B344XLQPZS"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);