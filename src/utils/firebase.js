// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7ttsWkxWEiagcvOZnMb09VD-5JIAz3nY",
  authDomain: "netflixgpt-aa58f.firebaseapp.com",
  projectId: "netflixgpt-aa58f",
  storageBucket: "netflixgpt-aa58f.firebasestorage.app",
  messagingSenderId: "782875380098",
  appId: "1:782875380098:web:1c358d10b3bf6e088ce79b",
  measurementId: "G-LR55H4504L",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
