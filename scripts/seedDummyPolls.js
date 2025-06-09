// scripts/seedDummyPolls.js (This script runs locally using Node.js, NOT in the browser)

// Load environment variables from your .env file
require('dotenv').config(); 

// Import Firebase modules for Node.js (using require() syntax)
const { initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth'); 
const { getFirestore, collection, addDoc, serverTimestamp } = require('firebase/firestore');

// Make sure your .env has PARCEL_PUBLIC_FIREBASE_... keys for this script to use
// These keys are safe here because this script runs locally, not in the browser.
const firebaseConfig = {
  apiKey: process.env.PARCEL_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.PARCEL_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.PARCEL_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.PARCEL_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.PARCEL_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.PARCEL_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.PARCEL_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase app and services within this script
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// --- IMPORTANT: CONFIGURE YOUR ADMIN USER FOR SEEDING ---
// This user must exist in your Firebase Authentication
const ADMIN_USER_EMAIL = 'graphics@incdrops.com'; // <--- REPLACE WITH YOUR ACTUAL ADMIN EMAIL
const ADMIN_USER_PASSWORD = 'YOUR_ADMIN_PASSWORD';       // <--- REPLACE WITH YOUR ACTUAL ADMIN PASSWORD

const dummyPolls = [
  {
    title: "Engagement location in two weeks: Paris or Italy?",
    options: ["Paris", "Italy"],
    duration: 1036800
  },
  {
    title: "Losing my virginity, condom or no condom?",
    options: ["Use a condom", "Go raw"],
    duration: 604800
  },
  {
    title: "Which house to buy? Option A or Option B?",
    options: ["Option A", "Option B"],
    duration: 2592000
  },
  {
    title: "What to eat for lunch? Tuna sandwich or grilled chicken wrap?",
    options: ["Tuna sandwich", "Grilled chicken wrap"],
    duration: 60
  },
  {
    title: "Dress for the New Orleans Jazz Festival? (Two options)",
    options: ["Floral jumpsuit", "Mesh + fringe combo"],
    duration: 1209600
  },
  {
    title: "Should I quit my job? Yes or No?",
    options: ["Yes", "No"],
    duration: 1036800
  },
  {
    title: "Which career path should I pursue? Tech or Art?",
    options: ["Tech", "Art"],
    duration: 1814400
  },
  {
    title: "Should I break up with my boyfriend? Yes or No?",
    options: ["Yes", "No"],
    duration: 345600
  },
  {
    title: "Should we get back together?",
    options: ["Yes", "Hell no"],
    duration: 1800
  },
  {
    title: "Should I try to reunite with a relative I haven't gotten along with in years?",
    options: ["Reach out", "Let it go"],
    duration: 864000
  },
  {
    title: "My husband cheated, should I stay and try therapy or take this as a sign to run?",
    options: ["Try therapy", "RUN"],
    duration: 28800
  },
  {
    title: "Do these jeans make me look fat, should I workout?",
    options: ["Yes, hit the gym", "Nah, you’re fine"],
    duration: 259200
  }
];

async function seedDummyPolls() {
  console.log("Starting seeding process...");
  console.log("Attempting to sign in to Firebase with user:", ADMIN_USER_EMAIL);

  let user;
  try {
    // Sign in the admin user programmatically
    const userCredential = await signInWithEmailAndPassword(auth, ADMIN_USER_EMAIL, ADMIN_USER_PASSWORD);
    user = userCredential.user;
    console.log(`Successfully signed in as: ${user.email} (UID: ${user.uid})`);
  } catch (error) {
    console.error("Error signing in to Firebase. Seeding aborted.", error.message);
    console.error("Please ensure:");
    console.error("1. ADMIN_USER_EMAIL and ADMIN_USER_PASSWORD are correctly set in this script.");
    console.error("2. The user exists in your Firebase Authentication.");
    console.error("3. Your Firebase project's sign-in methods (e.g., Email/Password) are enabled.");
    return;
  }

  console.log("Starting to add dummy polls to Firestore...");
  for (const poll of dummyPolls) {
    try {
      await addDoc(collection(db, "polls"), {
        title: poll.title,
        options: poll.options,
        votes: {
          optionA: [],
          optionB: []
        },
        creator: user.uid, // Use the signed-in user's UID as the creator
        duration: poll.duration,
        createdAt: serverTimestamp(),
        images: {},
        videoURL: ""
      });
      console.log(`Added poll: "${poll.title}"`);
    } catch (error) {
      console.error(`Error adding poll "${poll.title}":`, error.message);
    }
  }

  console.log("Dummy polls seeding complete!");
  // Optionally sign out after seeding
  // await auth.signOut();
  // console.log("Signed out.");
}

// Run the seeding function
seedDummyPolls();