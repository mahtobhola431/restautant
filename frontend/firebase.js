

// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // ✅ Import auth
import { getAnalytics } from "firebase/analytics";

// ✅ Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAegDjD7Jo-kl4gYyJ4tON90llMR1eVE3U",
  authDomain: "resto-bc02a.firebaseapp.com",
  projectId: "resto-bc02a",
  storageBucket: "resto-bc02a.firebasestorage.app",
  messagingSenderId: "49738211499",
  appId: "1:49738211499:web:8b9138f1a7dbb56e1e97ee",
  measurementId: "G-SMK5P9K7GV"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // ✅ Initialize and export auth
const analytics = getAnalytics(app);

export { auth }; // ✅ Export auth so you can import it in SignUp.jsx
