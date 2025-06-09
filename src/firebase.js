// src/firebase.js file (This file initializes Firebase ONCE)

import { initializeApp } from 'firebase/app';
// Add imports for any specific Firebase services you use based on your app's needs
// If you use Firebase Authentication, UNCOMMENT the line below:
// import { getAuth } from 'firebase/auth'; 
// If you use Firestore Database, UNCOMMENT the line below:
// import { getFirestore } from 'firebase/firestore'; 

// Your Firebase configuration object, reading from process.env (Parcel's way)
const firebaseConfig = {
  apiKey: process.env.PARCEL_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.PARCEL_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.PARCEL_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.PARCEL_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.PARCEL_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.PARCEL_PUBLIC_FIREBASE_APP_ID, // <--- CORRECTED LINE: ONLY THE VARIABLE NAME HERE
  measurementId: process.env.PARCEL_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Export both auth and db so you can use them elsewhere
const auth = getAuth(app);
const db = getFirestore(app);

export { app as default, auth, db };