"use client";
import React from "react";
import SelectUser from "./SelectUser";
import "./style.scss";
import AccountDialog from "@/components/accountDialog/AccountDialog";
import Link from "next/link";

const Register = () => {
  const UserRegisteration = () => {};

  return (
    <div className="flex justify-center py-5 px-0">
      {/* For Choose User */}
      <AccountDialog>
        <div className="flex gap-8 flex-col">
          <SelectUser />
          <div className="text-[20px] font-medium leading-normal text-center foundation-violet-violet-200 ">
            Already have an account?{" "}
            <Link
              className="font-semibold no-underline foundation-blue-primary-blue-500"
              href="/"
            >
              Sign In
            </Link>
          </div>
        </div>
      </AccountDialog>
    </div>
  );
};

export default Register;
