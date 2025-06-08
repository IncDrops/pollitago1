import React, { createContext, useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInAnonymously,
  signInWithCustomToken,
  onAuthStateChanged
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc
} from 'firebase/firestore';
import { Buffer } from 'buffer';
window.Buffer = Buffer;


/**
 * FirebaseContext
 * Provides Firestore, Auth, userId, and auth status globally.
 */
export const FirebaseContext = createContext(null);

export const FirebaseProvider = ({ children }) => {
  const [db, setDb] = useState(null);
  const [auth, setAuth] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false); // Track auth status

  useEffect(() => {
    let unsubscribeAuth = () => {}; // Fallback cleanup

    const initFirebase = async () => {
      try {
        // Replace with your Firebase project config
        const firebaseConfig = {
          apiKey: "AIzaSyBbygIbTA-KUOo4n8uMGEDj4LsAoD3JV-c",
          authDomain: "pollitago-web-app.firebaseapp.com",
          projectId: "pollitago-web-app",
          storageBucket: "pollitago-web-app.firebasestorage.app",
          messagingSenderId: "690089067831",
          appId: "1:690089067831:web:e11838229a48a4e1ad46b2",
          measurementId: "G-QDJ2CEFD0L"
        };

        const app = initializeApp(firebaseConfig);
        const firestoreDb = getFirestore(app);
        const firebaseAuth = getAuth(app);

        setDb(firestoreDb);
        setAuth(firebaseAuth);

        const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

        if (initialAuthToken) {
          await signInWithCustomToken(firebaseAuth, initialAuthToken);
        } else {
          await signInAnonymously(firebaseAuth);
        }

        unsubscribeAuth = onAuthStateChanged(firebaseAuth, (user) => {
          if (user) {
            setUserId(user.uid);
          } else {
            setUserId(null);
          }
          setIsAuthReady(true);
        });

      } catch (error) {
        console.error("Error initializing Firebase or signing in:", error);
        setIsAuthReady(true); // Still unblock UI
      }
    };

    initFirebase();

    return () => unsubscribeAuth(); // Clean up on unmount
  }, []);

  return (
    <FirebaseContext.Provider value={{ db, auth, userId, isAuthReady }}>
      {children}
    </FirebaseContext.Provider>
  );
};
