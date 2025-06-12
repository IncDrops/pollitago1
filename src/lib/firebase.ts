import { initializeApp, getApps, getApp } from 'firebase/app';

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: "AIzaSyCMoRNprk8XyWsYQCGIj3i9n2w3zMNSl3Q",
  authDomain: "pollitago1.firebaseapp.com",
  projectId: "pollitago1",
  storageBucket: "pollitago1.firebasestorage.app",
  messagingSenderId: "561166920314",
  appId: "1:561166920314:web:da258aa6b423cde0dfe9c3",
  measurementId: "G-77D4LWPVNX"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export { app };