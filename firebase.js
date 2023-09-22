// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAHhlztOMxKYnlDNETYfZeHMMJjMaUNqNY",
  authDomain: "flash-chat-de3c3.firebaseapp.com",
  projectId: "flash-chat-de3c3",
  storageBucket: "flash-chat-de3c3.appspot.com",
  messagingSenderId: "868809106125",
  appId: "1:868809106125:web:81f2740881812983d4ff84",
  measurementId: "G-GDJJ2KQG38"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app);
