// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyB9KXm4y7Ycyhr34ufNdsFlulHKHi_t0",
  authDomain: "journal-app-8b69d.firebaseapp.com",
  projectId: "journal-app-8b69d",
  storageBucket: "journal-app-8b69d.appspot.com",
  messagingSenderId: "410460347512",
  appId: "1:410460347512:web:a2fed9049978b952d9e18d",
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
