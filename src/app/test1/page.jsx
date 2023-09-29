// Test1.js
"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

const Test1 = () => {
  const test1Ref = useRef();

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ duration: 1 }}
      ref={test1Ref}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          //   color: "white",
          //   marginTop: "20px",
          //   fontSize: "30px",
        }}
        className="text-3xl font-bold underline text-red-700 text-[50px] "
      >
        Test 1<Link href={"/test2"}>Test 2</Link>
      </div>
    </motion.div>
  );
};

export default Test1;
