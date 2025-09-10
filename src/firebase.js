// Import the functions you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBYK2tx39Cdoop8TNJlwppWcZ3XfEnZyNA",
  authDomain: "real-estate-app-6fb6f.firebaseapp.com",
  projectId: "real-estate-app-6fb6f",
  storageBucket: "real-estate-app-6fb6f.firebasestorage.app",
  messagingSenderId: "925540613077",
  appId: "1:925540613077:web:e542bf8013bfa40efddb5c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export auth instance so you can use it in Login/Signup
export const auth = getAuth(app);
export default app;