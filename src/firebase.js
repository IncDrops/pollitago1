// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDi8uECsVTlrqNozWmBsOcQ_ROmHWtiNAc",
  authDomain: "pollitago-366a0.firebaseapp.com",
  projectId: "pollitago-366a0",
  storageBucket: "pollitago-366a0.firebasestorage.app",
  messagingSenderId: "35394160409",
  appId: "1:35394160409:web:aa18564cc9f81b58796788",
  measurementId: "G-PNKFSJPBCW"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
