'use client';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmaDOrO1Vvs88w_j4eaapK_UnJFO7HZT0",
  authDomain: "frontendapp-71ad4.firebaseapp.com",
  projectId: "frontendapp-71ad4",
  storageBucket: "frontendapp-71ad4.firebasestorage.app",
  messagingSenderId: "588206477860",
  appId: "1:588206477860:web:b1f75031d10894450a3eb1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };