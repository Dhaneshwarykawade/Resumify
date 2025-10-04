
// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD9R3xov5doKA4svU4X_ZRh3j5B5ttqjt8",
  authDomain: "resumebuilder-8ed35.firebaseapp.com",
  projectId: "resumebuilder-8ed35",
  storageBucket: "resumebuilder-8ed35.firebasestorage.app",
  messagingSenderId: "829610542985",
  appId: "1:829610542985:web:258c6db9c7508f565d4358",
  measurementId: "G-EHBQTXPTKM"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app); // ✅ add this
