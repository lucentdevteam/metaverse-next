"use client";

import React from "react";
import "./style.scss";
import { SiteLogo } from "../../assets/Icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsUserLoggedIn,
  setUserDetails,
} from "@/store/slices/userDetailSlice";
import { UserAuth } from "@/firebase/AuthContext";

const Header = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { logOut } = UserAuth();
  const userDetails = useSelector((state) => state.user);

  const renderRedirectButton = (path) => {
    switch (pathname) {
      case "/":
        return (
          <div className="redirect-button-container">
            <Link href="/register">
              <div className="redirect-button">Register</div>
            </Link>
          </div>
        );

      case "/register/client-register":
        return (
          <div className="redirect-button-container">
            <Link href="talent-register">
              <div className="redirect-button">Or Join As Talent</div>
            </Link>
          </div>
        );

      case "/register/talent-register":
        return (
          <div className="redirect-button-container">
            <Link href="client-register">
              <div className="redirect-button">Or Join As Client</div>
            </Link>
          </div>
        );

      case "/forget-password":
        return (
          <div className="redirect-button-container">
            <Link href="/register">
              <div className="redirect-button">Register</div>
            </Link>
          </div>
        );

      case "/account":
        return userDetails && userDetails?.isUserLoggedIn ? null : (
          <div className="redirect-button-container">
            <Link href="/register">
              <div className="redirect-button">Register</div>
            </Link>
          </div>
        );

      default:
        return null;
    }
  };

  const handleSignOut = async () => {
    dispatch(setUserDetails({}));
    dispatch(setIsUserLoggedIn(false));
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="header">
      <div className="header-wrapper">
        <div className="header-logo">
          <Link href={"/"}>
            <SiteLogo />
          </Link>
        </div>
        <div className="header-button">
          {userDetails &&
          userDetails?.isUserLoggedIn &&
          userDetails?.userDetails?.user_type?.length > 0 ? (
            <div className="" style={{ display: "flex", gap: "10px" }}>
              <div>
                <div className="redirect-button">
                  {userDetails?.userDetails?.first_name}
                </div>
              </div>
              <div onClick={handleSignOut}>
                <div className="redirect-button">Sign Out</div>
              </div>
            </div>
          ) : (
            renderRedirectButton()
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
