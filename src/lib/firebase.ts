import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCmdC5h4a06FZOvGe9gsXAi18aKrpw4Wt8",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "web-techzone.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "web-techzone",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "web-techzone.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "395849305846",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:395849305846:web:442e16caf68b7cc82666d7",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-C45BTPLJ30"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let analytics = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch((err) => console.warn("Analytics not supported:", err));
}
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, analytics, db, auth, storage };
