"use client";
import Image from "next/image";
import "./page.scss";
import Header from "@/layout/header/Header";
import SignIn from "./signIn/page";
import { useSelector } from "react-redux";
import { getIsUserExist } from "@/api/utils";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Home() {
  const userDetails = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);

  console.log({ isOpen1, userDetails });

  return (
    <div className="body-content">
      {/* <button onClick={() => setIsOpen(!isOpen)}>Click IT</button>

      <button onClick={() => setIsOpen1(!isOpen1)}>Click IT 1</button>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <motion.div
          transition={{ layout: { duration: 1, type: "spring" } }}
          layout
          className="card"
        >
          <motion.h2 layout="position"> Hello CodeSandbox</motion.h2>
          {isOpen && (
            <motion.div className="expand">
              <p>
                Start editing to see some magic happen! Start editing to see
                some magic happen! Start editing to see some magic happen! Start
                editing to see some magic happen! Start editing to see some
                magic happen! Start editing to see some magic happen! Start
                editing to see some magic happen! Start editing to see some
                magic happen!
              </p>
              <p>Start editing to see some magic happen! </p>
              <p>Start editing to see some magic happen! </p>
              <button
                onClick={() => {
                  setIsOpen1(false);
                }}
              >
                Click It
              </button>
            </motion.div>
          )}
          {isOpen1 && (
            <motion.div>
              <p>Akhileesh Patidar </p>
              <button onClick={() => setIsOpen1(true)}>Click It</button>
            </motion.div>
          )}
        </motion.div> 
      </div> */}
      {userDetails && userDetails?.isUserLoggedIn ? null : <SignIn />}
    </div>
  );
}
