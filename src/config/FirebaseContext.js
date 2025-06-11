// src/components/FirebaseContext.js

import React, { createContext, useState, useEffect } from 'react';
// Import the initialized Firebase app and services from your firebase.js file
import app, { auth, db } from '../firebase'; // ✅ Corrected path

// Create the context
export const FirebaseContext = createContext(null);

// Create the FirebaseProvider component
export const FirebaseProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    if (auth) {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        setCurrentUser(user);
        setLoadingAuth(false);
      });
      return () => unsubscribe();
    } else {
      setLoadingAuth(false);
    }
  }, []);

  const firebaseData = {
    app,
    auth,
    db,
    currentUser,
    loadingAuth,
  };

  return (
    <FirebaseContext.Provider value={firebaseData}>
      {!loadingAuth ? (
        children
      ) : (
        <div>Loading Firebase...</div> // ✅ Moved comment outside JSX expression
      )}
    </FirebaseContext.Provider>
  );
};
