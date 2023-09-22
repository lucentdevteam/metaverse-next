// "use-client";
"use client";
import Image from "next/image";
import "./page.scss";
import Header from "@/layout/header/Header";
import SignIn from "./signIn/page";
import { useSelector } from "react-redux";
import { signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '../../firebase.js';

export default function Home() {
  const userData = useSelector((state) => state.user);

  const SignIn = () => {
    debugger;
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  }
  const logOut = () => {
    signOut(auth);
  }

  return (
    <div className="body-content">
      <button onClick={SignIn}>Sign in</button>
      <SignIn />
    </div>
  );
}
