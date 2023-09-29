import React from "react";
import "./style.scss";
import { motion } from "framer-motion";

const AccountDialog = ({ children }) => {
  return (
    <motion.div
      transition={{ layout: { duration: 1, type: "spring" } }}
      layout
      className="dialog-box"
      layoutId="AccountDialog"
    >
      {children}
    </motion.div>
  );
};

export default AccountDialog;
