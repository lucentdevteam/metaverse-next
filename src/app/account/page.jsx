"use client";
import React, { useEffect, useState } from "react";
import WelcomePopup from "../../components/welcome-popup/WelcomePopup";
import { useSelector } from "react-redux";
import SignIn from "../signIn/page";
const AccountPage = () => {
  const isUserLoggedIn = useSelector((state) => state.user.isUserLoggedIn);
  const [showPopup, setPopup] = useState(true);

  useEffect(() => {}, []);

  return (
    <div className="signin-container">
      {isUserLoggedIn ? (
        showPopup && <WelcomePopup setPopup={setPopup} />
      ) : (
        <SignIn />
      )}
    </div>
  );
};

export default AccountPage;
