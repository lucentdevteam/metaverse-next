"use client";
import Image from "next/image";
import "./page.scss";
import Header from "@/layout/header/Header";
import SignIn from "./signIn/page";
import { useSelector } from "react-redux";
import { getIsUserExist } from "@/api/utils";
 
export default function Home() {
  const userDetails = useSelector((state) => state.user)
  
  return (
    <div className="body-content">
      {userDetails && userDetails?.isUserLoggedIn ? null : <SignIn /> }
    </div>
  );
}
