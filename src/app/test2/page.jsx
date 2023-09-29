// Test2.js
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

const Test2 = () => {
  const test2Ref = useRef();

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ duration: 0.5 }}
      ref={test2Ref}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          color: "white",
          marginTop: "20px",
          fontSize: "30px",
        }}
      >
        Test 2<Link href={"/test1"}>Test 1</Link>
      </div>
    </motion.div>
  );
};

export default Test2;
