"use client";

import React from "react";
import "./style.scss";
import { SiteLogo } from "../../assets/Icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  console.log({ pathname });

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

      default:
        return null;
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
        <div className="header-button">{renderRedirectButton()}</div>
      </div>
    </div>
  );
};

export default Header;
