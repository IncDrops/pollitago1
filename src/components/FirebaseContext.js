// src/components/FirebaseContext.js

import React, { createContext, useState, useEffect } from 'react';
// Import the initialized Firebase app and services from your firebase.js file
// Adjust the path '../src/firebase' if your folder structure is different
import app, { auth, db } from '../src/firebase'; // Make sure auth and db are exported from firebase.js if you use them

// Create the context
export const FirebaseContext = createContext(null);

// Create the FirebaseProvider component
export const FirebaseProvider = ({ children }) => {
    // You might use state/effects here to manage user data, loading states, etc.
    const [currentUser, setCurrentUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(true);

    useEffect(() => {
        // Example: Listen for auth state changes if you're using Firebase Auth
        if (auth) { // Check if auth is defined (exported from firebase.js)
            const unsubscribe = auth.onAuthStateChanged(user => {
                setCurrentUser(user);
                setLoadingAuth(false);
            });
            return () => unsubscribe(); // Clean up subscription
        } else {
            setLoadingAuth(false); // If auth isn't used, stop loading immediately
        }
    }, []);

    // The value provided to consumers of this context
    const firebaseData = {
        // Provide the initialized Firebase app and any services you need
        app: app, 
        auth: auth, // The Firebase Auth instance
        db: db,     // The Firestore DB instance
        currentUser: currentUser, // Current authenticated user
        loadingAuth: loadingAuth, // Auth loading state
        // Add any other Firebase-related data or functions you want to expose
    };

    // Render children within the provider
    return (
        <FirebaseContext.Provider value={firebaseData}>
            {!loadingAuth ? children : <div>Loading Firebase...</div>} {/* Simple loading indicator */}
        </FirebaseContext.Provider>
    );
};