// Firebase Config
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBxziw0lb2L7_tE6H-0JBCHIKZevbok2wo",
  authDomain: "chrono-track-4f4a5.firebaseapp.com",
  projectId: "chrono-track-4f4a5",
  storageBucket: "chrono-track-4f4a5.appspot.com",
  messagingSenderId: "347632019486",
  appId: "1:347632019486:web:cda4140ca3fc84bd21a60f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const fireDB = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { auth, fireDB, googleProvider };
