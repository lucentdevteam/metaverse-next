"use client";
import React from "react";
import SelectUser from "./SelectUser";
import "./style.scss";
import AccountDialog from "@/components/accountDialog/AccountDialog";
import Link from "next/link";

const Register = () => {
  const UserRegisteration = () => {};

  return (
    <div className="register-page">
      {/* For Choose User */}
      <AccountDialog>
        <div className="register-container">
          <SelectUser />
          <div className="link-to-sign">
            Already have an account? <Link href="/">Sign In</Link>
          </div>
        </div>
      </AccountDialog>
    </div>
  );
};

export default Register;
