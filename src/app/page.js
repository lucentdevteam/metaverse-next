// "use-client";
"use client";
import Image from "next/image";
import "./page.scss";
import Header from "@/layout/header/Header";
import SignIn from "./signIn/page";
import { useSelector } from "react-redux";

export default function Home() {
  const userData = useSelector((state) => state.user);

  console.log({ userData });

  return (
    <div className="body-content">
      <SignIn />
    </div>
  );
}
