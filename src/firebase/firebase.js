// Import the functions you need from the SDKs you need
import { initializeApp, firebase } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_Yjv0kPPEZJKR5M9liAGc3PcO6ami2x0",
  authDomain: "fir-f6929.firebaseapp.com",
  projectId: "fir-f6929",
  storageBucket: "fir-f6929.appspot.com",
  messagingSenderId: "1026676949293",
  appId: "1:1026676949293:web:12a8f991d4e7674960d3a4"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app);

 export const db = getFirestore(app); 