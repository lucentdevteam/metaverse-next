import Image from "next/image";
import "./page.scss";
import Header from "@/layout/header/Header";
import SignIn from "./signIn/page";

export default function Home() {
  return (
    <div className="body-content">
      <SignIn />
    </div>
  );
}
