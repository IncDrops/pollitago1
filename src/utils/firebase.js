// src/firebase.js
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyBbygIbTA-KUOo4n8uMGEDj4LsAoD3JV-c",
  authDomain: "pollitago-web-app.firebaseapp.com",
  projectId: "pollitago-web-app",
  storageBucket: "pollitago-web-app.appspot.com", // fixed domain!
  messagingSenderId: "690089067831",
  appId: "1:690089067831:web:e11838229a48a4e1ad46b2",
  measurementId: "G-QDJ2CEFD0L"
};

const app = initializeApp(firebaseConfig);

export default app;


