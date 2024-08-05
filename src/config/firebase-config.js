// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from  'firebase/auth';
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQgFoBnjMaJaIAGC_bPI3YjUKIOuPkuGc",
  authDomain: "expense-tracker-9a272.firebaseapp.com",
  projectId: "expense-tracker-9a272",
  storageBucket: "expense-tracker-9a272.appspot.com",
  messagingSenderId: "468920975421",
  appId: "1:468920975421:web:ab3159fcf68dde5367ea54",
  measurementId: "G-47WENJJ48D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)